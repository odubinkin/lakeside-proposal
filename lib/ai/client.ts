import {
  GENERIC_COMMUNICATION_ERROR,
  type ChatErrorCode,
  type ChatRequest,
  type ChatStreamEvent,
} from '@/lib/ai/contracts'
import { readChatEventStream } from '@/lib/ai/stream'

export class AssistantClientError extends Error {
  constructor(
    message: string,
    readonly code: ChatErrorCode | 'NETWORK_ERROR',
    readonly retryable: boolean,
  ) {
    super(message)
    this.name = 'AssistantClientError'
  }
}

export async function sendChatRequest(
  request: ChatRequest,
  onEvent: (event: ChatStreamEvent) => void | Promise<void>,
  signal: AbortSignal,
): Promise<void> {
  let response: Response
  try {
    response = await fetch('/api/ai/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
      signal,
    })
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') throw error
    throw new AssistantClientError(GENERIC_COMMUNICATION_ERROR, 'NETWORK_ERROR', true)
  }

  if (!response.ok) {
    const fallback = {
      code: 'INTERNAL_ERROR' as ChatErrorCode,
      message: 'The assistant could not complete the request.',
      retryable: response.status >= 500,
    }
    try {
      const body = (await response.json()) as { error?: typeof fallback }
      const error = body.error ?? fallback
      throw new AssistantClientError(error.message, error.code, error.retryable)
    } catch (error) {
      if (error instanceof AssistantClientError) throw error
      throw new AssistantClientError(fallback.message, fallback.code, fallback.retryable)
    }
  }

  if (!response.body) {
    throw new AssistantClientError(GENERIC_COMMUNICATION_ERROR, 'NETWORK_ERROR', true)
  }

  await readChatEventStream(response.body, request.runId, async (event) => {
    if (event.type === 'error') {
      throw new AssistantClientError(event.message, event.code, event.retryable)
    }
    await onEvent(event)
  })
}
