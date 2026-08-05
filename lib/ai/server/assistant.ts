/**
 * @file Declares the server-side adapter contract and normalized Willow output/errors.
 */

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

  /**
   * Streams normalized assistant output for one validated request context.
   *
   * @param context - Trusted form, catalog, and conversation context.
   * @param signal - Abort signal propagated from the HTTP request.
   * @returns An asynchronous sequence of text deltas or one form-tool call.
   */
  stream(
    context: AssistantContext,
    signal: AbortSignal,
  ): AsyncIterable<AssistantOutputChunk>
}

/**
 * Signals invalid output or sequencing from an assistant adapter.
 */
export class ServerAssistantProtocolError extends Error {
  /**
   * Creates a server-side assistant protocol error.
   *
   * @param message - Internal description of the protocol violation.
   */
  constructor(message = 'Assistant protocol error.') {
    super(message)
    this.name = 'ServerAssistantProtocolError'
  }
}

/**
 * Wraps provider connectivity, authentication, quota, and execution failures.
 */
export class ServerAssistantCommunicationError extends Error {
  /**
   * Creates a sanitized provider communication error.
   *
   * @param cause - Original provider failure retained for server-side diagnostics.
   */
  constructor(cause?: unknown) {
    super('Assistant provider communication failed.', { cause })
    this.name = 'ServerAssistantCommunicationError'
  }
}
