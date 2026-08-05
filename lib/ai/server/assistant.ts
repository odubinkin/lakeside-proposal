import 'server-only'

import type { AddOn, Villa } from '@/lib/data'
import type {
  ChatRequest,
  ProposalFormPatch,
} from '@/lib/ai/contracts'

export type AssistantContext = {
  request: ChatRequest
  selectedVilla: Villa
  addOns: AddOn[]
}

export type AssistantOutputChunk =
  | { type: 'text_delta'; delta: string }
  | {
      type: 'tool_call'
      toolCallId: string
      arguments: ProposalFormPatch
    }

export interface AssistantAdapter {
  readonly mode: 'mock' | 'openrouter'
  stream(
    context: AssistantContext,
    signal: AbortSignal,
  ): AsyncIterable<AssistantOutputChunk>
}

export class ServerAssistantProtocolError extends Error {
  constructor(message = 'Assistant protocol error.') {
    super(message)
    this.name = 'ServerAssistantProtocolError'
  }
}

export class ServerAssistantCommunicationError extends Error {
  constructor(cause?: unknown) {
    super('Assistant provider communication failed.', { cause })
    this.name = 'ServerAssistantCommunicationError'
  }
}
