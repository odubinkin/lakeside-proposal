/**
 * @file Exposes Willow's validated, abortable, non-cacheable NDJSON chat endpoint.
 */

import {
  AI_PROTOCOL_VERSION,
  GENERIC_COMMUNICATION_ERROR,
  chatRequestSchema,
  type ChatErrorCode,
  type ChatRequest,
  type ChatStreamEvent,
} from '@/lib/ai/contracts'
import { encodeChatEvent } from '@/lib/ai/stream'
import {
  ServerAssistantCommunicationError,
  ServerAssistantProtocolError,
  type AssistantAdapter,
} from '@/lib/ai/server/assistant'
import {
  createAssistantAdapter,
  createAssistantContext,
} from '@/lib/ai/server/provider'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

type AdapterFactory = () => AssistantAdapter
type StreamEventPayload = ChatStreamEvent extends infer Event
  ? Event extends ChatStreamEvent
    ? Omit<Event, 'protocolVersion' | 'runId' | 'sequence'>
    : never
  : never

/**
 * Validates a public chat request and starts a response with the selected adapter.
 *
 * @param request - Incoming HTTP request containing a versioned Willow payload.
 * @param adapterFactory - Factory used to select the production adapter or inject a test adapter.
 * @returns A JSON validation/provider error or a streaming NDJSON response.
 */
export async function handleChatRequest(
  request: Request,
  adapterFactory: AdapterFactory = createAssistantAdapter,
): Promise<Response> {
  let raw: unknown
  try {
    raw = await request.json()
  } catch {
    return jsonError(400, 'INVALID_REQUEST', 'Invalid assistant request.', false)
  }

  const parsed = chatRequestSchema.safeParse(raw)
  if (!parsed.success) {
    return jsonError(400, 'INVALID_REQUEST', 'Invalid assistant request.', false)
  }

  let adapter: AssistantAdapter
  try {
    adapter = adapterFactory()
  } catch {
    return jsonError(
      502,
      'ASSISTANT_COMMUNICATION_ERROR',
      GENERIC_COMMUNICATION_ERROR,
      true,
    )
  }

  return streamAssistantResponse(parsed.data, adapter, request.signal)
}

/**
 * Handles POST requests for the Willow chat endpoint.
 *
 * @param request - Incoming Next.js route request.
 * @returns The validated JSON error or assistant event-stream response.
 */
export async function POST(request: Request): Promise<Response> {
  return handleChatRequest(request)
}

/**
 * Converts normalized adapter output into a correlated public event stream.
 *
 * @param request - Validated assistant request and run identifier.
 * @param adapter - Selected server-side assistant implementation.
 * @param requestSignal - Signal that aborts work when the client disconnects.
 * @returns A non-cacheable NDJSON response containing one assistant message lifecycle.
 */
function streamAssistantResponse(
  request: ChatRequest,
  adapter: AssistantAdapter,
  requestSignal: AbortSignal,
): Response {
  const abortController = new AbortController()
  const signal = AbortSignal.any([requestSignal, abortController.signal])
  let sequence = 0

  const stream = new ReadableStream<Uint8Array>({
    /**
     * Pulls normalized adapter chunks and emits one complete public message lifecycle.
     *
     * @param controller - Byte-stream controller used to enqueue events and close the response.
     * @returns A promise that resolves after the stream closes or is aborted.
     */
    async start(controller) {
      const messageId = crypto.randomUUID()

      /**
       * Correlates and writes one event payload to the response stream.
       *
       * @param event - Event-specific payload without the shared envelope fields.
       * @returns Nothing.
       */
      const send = (event: StreamEventPayload) => {
        const envelope = {
          protocolVersion: AI_PROTOCOL_VERSION,
          runId: request.runId,
          sequence: sequence++,
          ...event,
        } as ChatStreamEvent
        controller.enqueue(encodeChatEvent(envelope))
      }

      try {
        send({ type: 'message_start', messageId })
        let toolStarted = false
        let sawTool = false
        for await (const chunk of adapter.stream(createAssistantContext(request), signal)) {
          if (signal.aborted) return
          if (chunk.type === 'text_delta') {
            if (toolStarted) throw new ServerAssistantProtocolError()
            send({ type: 'message_delta', messageId, delta: chunk.delta })
          } else if (chunk.type === 'tool_call_start') {
            if (toolStarted) throw new ServerAssistantProtocolError()
            toolStarted = true
            send({ type: 'tool_call_start', messageId })
          } else {
            if (sawTool) throw new ServerAssistantProtocolError()
            if (!toolStarted) {
              toolStarted = true
              send({ type: 'tool_call_start', messageId })
            }
            sawTool = true
            send({
              type: 'tool_call',
              messageId,
              toolCallId: chunk.toolCallId,
              name: 'edit_proposal_form',
              arguments: chunk.arguments,
            })
          }
        }

        if (signal.aborted) return
        if (toolStarted && !sawTool) throw new ServerAssistantProtocolError()
        send({
          type: 'message_end',
          messageId,
          finishReason: sawTool ? 'tool_call' : 'stop',
        })
        controller.close()
      } catch (error) {
        if (signal.aborted) {
          controller.close()
          return
        }

        const mapped = mapStreamError(error, adapter.mode)
        send({
          type: 'error',
          code: mapped.code,
          message: mapped.message,
          retryable: mapped.retryable,
          messageId,
        })
        controller.close()
      }
    },

    /**
     * Propagates consumer cancellation to the active assistant adapter.
     *
     * @returns Nothing.
     */
    cancel() {
      abortController.abort()
    },
  })

  return new Response(stream, {
    status: 200,
    headers: {
      'Content-Type': 'application/x-ndjson; charset=utf-8',
      'Cache-Control': 'no-store, no-cache, must-revalidate',
      'X-Accel-Buffering': 'no',
    },
  })
}

/**
 * Maps internal adapter failures to safe public stream errors.
 *
 * @param error - Unknown failure raised while producing assistant output.
 * @param mode - Active adapter mode used to sanitize real-provider failures.
 * @returns Public error code, safe message, and retryability flag.
 */
function mapStreamError(
  error: unknown,
  mode: AssistantAdapter['mode'],
): { code: ChatErrorCode; message: string; retryable: boolean } {
  if (error instanceof ServerAssistantProtocolError) {
    return {
      code: 'ASSISTANT_PROTOCOL_ERROR',
      message: 'The assistant returned an invalid response.',
      retryable: false,
    }
  }
  if (error instanceof ServerAssistantCommunicationError || mode === 'openrouter') {
    return {
      code: 'ASSISTANT_COMMUNICATION_ERROR',
      message: GENERIC_COMMUNICATION_ERROR,
      retryable: true,
    }
  }
  return {
    code: 'INTERNAL_ERROR',
    message: 'The assistant could not complete the request.',
    retryable: true,
  }
}

/**
 * Creates a non-cacheable JSON error response before streaming begins.
 *
 * @param status - HTTP status code for the failed request.
 * @param code - Public assistant error category.
 * @param message - Safe user-facing error message.
 * @param retryable - Whether retrying the request may succeed.
 * @returns JSON response containing the normalized error envelope.
 */
function jsonError(
  status: number,
  code: ChatErrorCode,
  message: string,
  retryable: boolean,
): Response {
  return Response.json(
    { error: { code, message, retryable } },
    { status, headers: { 'Cache-Control': 'no-store' } },
  )
}
