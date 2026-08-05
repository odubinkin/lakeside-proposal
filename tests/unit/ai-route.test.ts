import { describe, expect, it, vi } from 'vitest'
import { handleChatRequest } from '@/app/api/ai/chat/route'
import {
  ServerAssistantCommunicationError,
  type AssistantAdapter,
  type AssistantOutputChunk,
} from '@/lib/ai/server/assistant'
import { MockAssistantAdapter } from '@/lib/ai/server/mock-adapter'
import { validRequest } from '@/tests/helpers/ai'

function request(body: unknown) {
  return new Request('http://localhost/api/ai/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

function events(body: string) {
  return body
    .trim()
    .split('\n')
    .map((line) => JSON.parse(line) as Record<string, unknown>)
}

describe('POST /api/ai/chat', () => {
  it('returns ordered mock events with streaming and no-cache headers', async () => {
    const response = await handleChatRequest(request(validRequest()), () => new MockAssistantAdapter())
    expect(response.status).toBe(200)
    expect(response.headers.get('content-type')).toBe('application/x-ndjson; charset=utf-8')
    expect(response.headers.get('cache-control')).toContain('no-store')
    const output = events(await response.text())
    expect(output.map(({ sequence }) => sequence)).toEqual([0, 1, 2])
    expect(output.map(({ type }) => type)).toEqual([
      'message_start',
      'message_delta',
      'message_end',
    ])
    expect(output.every(({ runId }) => runId === validRequest().runId)).toBe(true)
  })

  it('rejects malformed input before creating an adapter', async () => {
    const factory = vi.fn(() => new MockAssistantAdapter())
    for (const body of [
      { ...validRequest(), runId: 'bad' },
      { ...validRequest(), protocolVersion: 2 },
      {
        ...validRequest(),
        messages: Array.from({ length: 51 }, (_, index) => ({
          id: `m-${index}`,
          role: index === 50 ? 'user' : 'assistant',
          content: 'text',
          createdAt: '2026-08-05T00:00:00.000Z',
        })),
      },
    ]) {
      const response = await handleChatRequest(request(body), factory)
      expect(response.status).toBe(400)
    }
    expect(factory).not.toHaveBeenCalled()
  })

  it('emits one correlated form tool call and completes a valid continuation', async () => {
    const fillResponse = await handleChatRequest(
      request({
        ...validRequest(),
        messages: [
          {
            id: 'user-fill',
            role: 'user',
            content: 'Fill a sample',
            createdAt: '2026-08-05T00:00:00.000Z',
          },
        ],
      }),
      () => new MockAssistantAdapter(),
    )
    const fillEvents = events(await fillResponse.text())
    expect(fillEvents.map(({ type }) => type)).toEqual([
      'message_start',
      'tool_call',
      'message_end',
    ])
    expect(fillEvents[1]).toMatchObject({ name: 'edit_proposal_form' })

    const tool = fillEvents[1] as {
      messageId: string
      toolCallId: string
      arguments: Record<string, unknown>
    }
    const oldForm = validRequest().form
    const newForm = { ...oldForm, ...tool.arguments }
    const continuation = {
      assistantMessageId: tool.messageId,
      toolCallId: tool.toolCallId,
      toolName: 'edit_proposal_form',
      arguments: tool.arguments,
      result: {
        ok: true,
        oldForm,
        newForm,
        changedFields: [
          'addOnIds',
          'proposalText',
          'clientName',
          'manager',
          'phone',
          'email',
          'comment',
        ],
      },
    }
    const finalResponse = await handleChatRequest(
      request({ ...validRequest(), runId: crypto.randomUUID(), form: newForm, continuation }),
      () => new MockAssistantAdapter(),
    )
    expect(events(await finalResponse.text())[1].delta).toContain("I've filled in")
  })

  it('streams an assistant preamble before one form tool call', async () => {
    const adapter: AssistantAdapter = {
      mode: 'openrouter',
      async *stream(): AsyncIterable<AssistantOutputChunk> {
        yield { type: 'text_delta', delta: 'I will update the client name.' }
        yield {
          type: 'tool_call',
          toolCallId: 'tool-mixed',
          arguments: { clientName: 'Vasya Pupkin' },
        }
      },
    }
    const response = await handleChatRequest(request(validRequest()), () => adapter)
    const output = events(await response.text())
    expect(output.map(({ type }) => type)).toEqual([
      'message_start',
      'message_delta',
      'tool_call',
      'message_end',
    ])
    expect(output[1]).toMatchObject({ delta: 'I will update the client name.' })
    expect(output[2]).toMatchObject({
      toolCallId: 'tool-mixed',
      arguments: { clientName: 'Vasya Pupkin' },
    })
    expect(output[3]).toMatchObject({ finishReason: 'tool_call' })
  })

  it('maps provider failures to the generic message without invoking mock fallback', async () => {
    const adapter: AssistantAdapter = {
      mode: 'openrouter',
      async *stream(): AsyncIterable<AssistantOutputChunk> {
        throw new ServerAssistantCommunicationError(new Error('secret provider body'))
      },
    }
    const response = await handleChatRequest(request(validRequest()), () => adapter)
    const output = events(await response.text())
    expect(output.at(-1)).toMatchObject({
      type: 'error',
      code: 'ASSISTANT_COMMUNICATION_ERROR',
      message: 'Communication error with the assistant. Please try again later.',
      retryable: true,
    })
    expect(JSON.stringify(output)).not.toContain('secret provider body')
  })
})
