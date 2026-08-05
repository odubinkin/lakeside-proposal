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

export async function POST(request: Request): Promise<Response> {
  return handleChatRequest(request)
}

function streamAssistantResponse(
  request: ChatRequest,
  adapter: AssistantAdapter,
  requestSignal: AbortSignal,
): Response {
  const abortController = new AbortController()
  const signal = AbortSignal.any([requestSignal, abortController.signal])
  let sequence = 0

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const messageId = crypto.randomUUID()
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
        let sawTool = false
        for await (const chunk of adapter.stream(createAssistantContext(request), signal)) {
          if (signal.aborted) return
          if (chunk.type === 'text_delta') {
            if (sawTool) throw new ServerAssistantProtocolError()
            send({ type: 'message_delta', messageId, delta: chunk.delta })
          } else {
            if (sawTool) throw new ServerAssistantProtocolError()
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
