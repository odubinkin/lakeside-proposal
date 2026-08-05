import {
  AI_PROTOCOL_VERSION,
  type ChatRequest,
  type ProposalFormState,
} from '@/lib/ai/contracts'

export const baseForm: ProposalFormState = {
  villaId: 'lagoon-6',
  addOnIds: [],
  proposalText: 'Existing proposal',
  clientName: 'Existing Client',
  manager: 'Existing Manager',
  phone: '',
  email: 'client@example.com',
  comment: '',
}

export function validRequest(overrides: Partial<ChatRequest> = {}): ChatRequest {
  return {
    protocolVersion: AI_PROTOCOL_VERSION,
    runId: '123e4567-e89b-42d3-a456-426614174000',
    form: baseForm,
    messages: [
      {
        id: 'message-1',
        role: 'user',
        content: 'Hello',
        createdAt: '2026-08-05T00:00:00.000Z',
      },
    ],
    ...overrides,
  }
}
