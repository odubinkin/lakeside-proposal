/**
 * @file Implements Willow's OpenRouter-backed LangChain adapter and stream normalization.
 */

import 'server-only'

import { AIMessageChunk } from '@langchain/core/messages'
import { tool } from '@langchain/core/tools'
import { ChatOpenAI } from '@langchain/openai'
import {
  EDIT_PROPOSAL_FORM_TOOL,
  proposalFormPatchSchema,
} from '@/lib/ai/contracts'
import {
  ServerAssistantCommunicationError,
  ServerAssistantProtocolError,
  type AssistantAdapter,
  type AssistantContext,
  type AssistantOutputChunk,
} from '@/lib/ai/server/assistant'
import { buildModelMessages } from '@/lib/ai/server/prompt'

/**
 * Strict LangChain tool definition that lets the model request a client-side form patch.
 */
const editProposalFormTool = tool(
  async () => 'The client executes this tool and returns its result in a continuation.',
  {
    name: EDIT_PROPOSAL_FORM_TOOL,
    description:
      'Request an atomic change to one or more editable fields in the current Redwood Lakeside commercial proposal form. Include only fields the user asked to change.',
    schema: proposalFormPatchSchema,
  },
)

/**
 * Streams Willow responses from an OpenRouter model through the shared adapter contract.
 */
export class OpenRouterAssistantAdapter implements AssistantAdapter {
  readonly mode = 'openrouter' as const
  private readonly model: ChatOpenAI

  /**
   * Configures the server-only OpenRouter chat model.
   *
   * @param apiKey - OpenRouter credential read from the server environment.
   * @param modelName - OpenRouter model identifier read from the server environment.
   */
  constructor(apiKey: string, modelName: string) {
    this.model = new ChatOpenAI({
      apiKey,
      model: modelName,
      streaming: true,
      configuration: {
        baseURL: 'https://openrouter.ai/api/v1',
      },
    })
  }

  /**
   * Streams normalized text or form-tool output for one assistant request.
   *
   * @param context - Trusted assistant request and catalog context.
   * @param signal - Abort signal propagated from the API route.
   * @returns An asynchronous sequence of normalized assistant output chunks.
   * @throws {ServerAssistantCommunicationError} When OpenRouter communication fails.
   * @throws {ServerAssistantProtocolError} When the model returns unsupported output.
   */
  async *stream(
    context: AssistantContext,
    signal: AbortSignal,
  ): AsyncIterable<AssistantOutputChunk> {
    try {
      const runnable = this.model.bindTools([editProposalFormTool], {
        parallel_tool_calls: false,
      })
      const response = await runnable.stream(buildModelMessages(context), { signal })
      yield* normalizeOpenRouterStream(response)
    } catch (error) {
      if (
        error instanceof ServerAssistantProtocolError ||
        (error instanceof DOMException && error.name === 'AbortError')
      ) {
        throw error
      }
      throw new ServerAssistantCommunicationError(error)
    }
  }
}

/**
 * Converts LangChain message chunks into the adapter's single-output protocol.
 *
 * @param response - Streaming message chunks returned by the configured model.
 * @returns An asynchronous sequence of text deltas followed by at most one valid tool call.
 * @throws {ServerAssistantProtocolError} When tool calls are mixed, invalid, or unsupported.
 */
export async function* normalizeOpenRouterStream(
  response: AsyncIterable<AIMessageChunk>,
): AsyncIterable<AssistantOutputChunk> {
  let aggregate: AIMessageChunk | undefined
  let sawToolCall = false

  for await (const chunk of response) {
    aggregate = aggregate ? aggregate.concat(chunk) : chunk
    const delta = getTextContent(chunk.content)
    if (delta) {
      if (sawToolCall) throw new ServerAssistantProtocolError()
      yield { type: 'text_delta', delta }
    }

    if ((chunk.tool_call_chunks?.length ?? 0) > 0) {
      sawToolCall = true
    }
  }

  const toolCalls = aggregate?.tool_calls ?? []
  if (toolCalls.length > 1 || (aggregate?.invalid_tool_calls?.length ?? 0) > 0) {
    throw new ServerAssistantProtocolError()
  }
  if (toolCalls.length === 1) {
    if (toolCalls[0].name !== EDIT_PROPOSAL_FORM_TOOL) {
      throw new ServerAssistantProtocolError()
    }
    const parsed = proposalFormPatchSchema.safeParse(toolCalls[0].args)
    if (!parsed.success || !toolCalls[0].id) {
      throw new ServerAssistantProtocolError()
    }
    yield {
      type: 'tool_call',
      toolCallId: toolCalls[0].id,
      arguments: parsed.data,
    }
  } else if (sawToolCall) {
    throw new ServerAssistantProtocolError()
  }
}

/**
 * Extracts user-visible text from a LangChain message chunk.
 *
 * @param content - String or structured content from an AI message chunk.
 * @returns Concatenated text blocks, or an empty string when none are present.
 */
function getTextContent(content: AIMessageChunk['content']): string {
  if (typeof content === 'string') return content
  return content
    .filter(
      (block): block is Extract<(typeof content)[number], { type: 'text'; text: string }> =>
        block.type === 'text' && 'text' in block,
    )
    .map((block) => block.text)
    .join('')
}
