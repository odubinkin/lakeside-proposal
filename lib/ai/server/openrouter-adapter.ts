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

const editProposalFormTool = tool(
  async () => 'The client executes this tool and returns its result in a continuation.',
  {
    name: EDIT_PROPOSAL_FORM_TOOL,
    description:
      'Request an atomic change to one or more editable fields in the current Redwood Lakeside commercial proposal form. Include only fields the user asked to change.',
    schema: proposalFormPatchSchema,
  },
)

export class OpenRouterAssistantAdapter implements AssistantAdapter {
  readonly mode = 'openrouter' as const
  private readonly model: ChatOpenAI

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

  async *stream(
    context: AssistantContext,
    signal: AbortSignal,
  ): AsyncIterable<AssistantOutputChunk> {
    try {
      const runnable = this.model.bindTools([editProposalFormTool])
      const response = await runnable.stream(buildModelMessages(context), { signal })
      let aggregate: AIMessageChunk | undefined
      let emittedText = false
      let sawToolCall = false

      for await (const chunk of response) {
        aggregate = aggregate ? aggregate.concat(chunk) : chunk
        const hasToolChunk = (chunk.tool_call_chunks?.length ?? 0) > 0
        if (hasToolChunk) {
          if (emittedText) throw new ServerAssistantProtocolError()
          sawToolCall = true
          continue
        }

        const delta = getTextContent(chunk.content)
        if (delta) {
          if (sawToolCall) throw new ServerAssistantProtocolError()
          emittedText = true
          yield { type: 'text_delta', delta }
        }
      }

      const toolCalls = aggregate?.tool_calls ?? []
      if (toolCalls.length > 1) throw new ServerAssistantProtocolError()
      if (toolCalls.length === 1) {
        if (emittedText || toolCalls[0].name !== EDIT_PROPOSAL_FORM_TOOL) {
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
