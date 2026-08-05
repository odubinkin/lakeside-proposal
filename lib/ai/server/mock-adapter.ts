/**
 * @file Provides deterministic Willow behavior for local development and automated tests.
 */

import 'server-only'

import {
  EDIT_PROPOSAL_FORM_TOOL,
  type ProposalFormPatch,
} from '@/lib/ai/contracts'
import type {
  AssistantAdapter,
  AssistantContext,
  AssistantOutputChunk,
} from '@/lib/ai/server/assistant'

export const MOCK_AUTOFILL_PATCH: ProposalFormPatch = {
  clientName: 'Oliver Bennett',
  phone: '+44 7911 123456',
  email: 'oliver.bennett@example.com',
  manager: 'Anna Petrova',
  comment:
    'Client is relocating with family and prefers a fully turnkey, energy-efficient residence.',
  proposalText:
    'We are delighted to present this residence as a fully turnkey, energy-efficient home tailored to your family’s relocation. This offer includes a curated furniture package, an integrated smart-home system and a premium kitchen upgrade, ensuring the villa is ready to enjoy from the moment you arrive. Our team will guide you through every step of the purchase to make the transition effortless.',
  addOnIds: ['furniture', 'smart-home', 'kitchen'],
}

const COMPLETION_REPLY =
  "I've filled in the client details and selected a recommended add-on package. Review the form and press Generate Proposal when you're ready."

/**
 * Produces deterministic text or form-tool output without contacting an AI provider.
 */
export class MockAssistantAdapter implements AssistantAdapter {
  readonly mode = 'mock' as const

  /**
   * Selects the mock compatibility response for a validated assistant request.
   *
   * @param context - Trusted assistant request and catalog context.
   * @param signal - Abort signal used to suppress output after cancellation.
   * @returns An asynchronous sequence containing one deterministic text delta or tool call.
   */
  async *stream(
    context: AssistantContext,
    signal: AbortSignal,
  ): AsyncIterable<AssistantOutputChunk> {
    if (signal.aborted) return
    const continuation = context.request.continuation
    if (continuation) {
      if (continuation.result.ok) {
        yield { type: 'text_delta', delta: COMPLETION_REPLY }
        return
      }

      const fieldErrors = continuation.result.error?.fieldErrors
      const details = fieldErrors
        ? Object.entries(fieldErrors)
            .map(([field, error]) => `${field}: ${error}`)
            .join('; ')
        : continuation.result.error?.message
      yield {
        type: 'text_delta',
        delta: `I couldn't update the form${details ? `: ${details}` : '.'}`,
      }
      return
    }

    const lower = context.request.messages.at(-1)?.content.toLowerCase() ?? ''
    if (lower.includes('fill') || lower.includes('sample') || lower.includes('complete')) {
      yield {
        type: 'tool_call',
        toolCallId: crypto.randomUUID(),
        arguments: MOCK_AUTOFILL_PATCH,
      }
      return
    }

    if (lower.includes('add-on') || lower.includes('recommend')) {
      yield {
        type: 'text_delta',
        delta:
          'For a family buyer I usually recommend the Furniture Package, Smart Home and Kitchen Upgrade. They add comfort and resale value while keeping the villa turnkey.',
      }
      return
    }

    if (lower.includes('smart home')) {
      yield {
        type: 'text_delta',
        delta:
          'The Smart Home package includes integrated lighting, climate control, security and voice control, all managed from a single app.',
      }
      return
    }

    yield {
      type: 'text_delta',
      delta:
        'Happy to help with that. You can ask me to fill in the form, suggest add-ons, or explain any package. What would you like to do?',
    }
  }
}

export { COMPLETION_REPLY, EDIT_PROPOSAL_FORM_TOOL }
