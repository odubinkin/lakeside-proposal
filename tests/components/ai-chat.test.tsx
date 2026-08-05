import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { ChatBot } from '@/components/chat-bot'
import {
  CHAT_STORAGE_PREFIX,
  getChatStorageKey,
  writeChatTranscript,
  type ChatTranscriptEntry,
} from '@/lib/ai/chat-storage'
import { executeFormPatch } from '@/lib/ai/form-tool'
import { baseForm } from '@/tests/helpers/ai'

const runEvent = (runId: string, sequence: number, event: Record<string, unknown>) => ({
  protocolVersion: 1,
  runId,
  sequence,
  ...event,
})

function responseFor(
  request: { runId: string },
  events: Array<Record<string, unknown>>,
  status = 200,
) {
  return new Response(
    events
      .map((event, sequence) => JSON.stringify(runEvent(request.runId, sequence, event)))
      .join('\n') + '\n',
    {
      status,
      headers: { 'Content-Type': 'application/x-ndjson; charset=utf-8' },
    },
  )
}

function textResponse(request: { runId: string }, text: string) {
  return responseFor(request, [
    { type: 'message_start', messageId: 'assistant-response' },
    { type: 'message_delta', messageId: 'assistant-response', delta: text },
    {
      type: 'message_end',
      messageId: 'assistant-response',
      finishReason: 'stop',
    },
  ])
}

function renderChat(proposalId: string | null = 'PRO-CHAT') {
  return render(
    <ChatBot
      form={baseForm}
      proposalId={proposalId}
      onApplyPatch={(patch) => executeFormPatch(baseForm, patch)}
    />,
  )
}

describe('chat persistence and transport behavior', () => {
  it('restores proposal-scoped history without duplicating the welcome message', () => {
    const stored: ChatTranscriptEntry[] = [
      {
        id: 'stored-welcome',
        kind: 'text',
        role: 'assistant',
        content: "Hi, I'm Willow, your restored assistant.",
        createdAt: '2026-08-05T00:00:00.000Z',
        delivery: 'complete',
      },
      {
        id: 'stored-user',
        kind: 'text',
        role: 'user',
        content: 'Stored question',
        createdAt: '2026-08-05T00:00:01.000Z',
        delivery: 'complete',
      },
    ]
    writeChatTranscript('PRO-ONE', stored)
    renderChat('PRO-ONE')
    fireEvent.click(screen.getByRole('button', { name: 'Chat with assistant' }))
    expect(screen.getByText('Stored question')).toBeInTheDocument()
    expect(screen.getByText(/restored assistant/)).toBeInTheDocument()
    expect(screen.queryByText(/complete this proposal/)).not.toBeInTheDocument()
  })

  it('migrates a draft transcript when the proposal receives its first ID', async () => {
    const { rerender } = renderChat(null)
    await waitFor(() => {
      expect(
        Object.keys(window.localStorage).some((key) =>
          key.startsWith(`${CHAT_STORAGE_PREFIX}draft:`),
        ),
      ).toBe(true)
    })
    const draftKey = Object.keys(window.localStorage).find((key) =>
      key.startsWith(`${CHAT_STORAGE_PREFIX}draft:`),
    )!

    rerender(
      <ChatBot
        form={baseForm}
        proposalId="PRO-SAVED"
        onApplyPatch={(patch) => executeFormPatch(baseForm, patch)}
      />,
    )
    await waitFor(() => {
      expect(window.localStorage.getItem(getChatStorageKey('PRO-SAVED'))).not.toBeNull()
      expect(window.localStorage.getItem(draftKey)).toBeNull()
    })
  })

  it('sends only the latest 50 complete text messages including the new user message', async () => {
    const entries: ChatTranscriptEntry[] = Array.from({ length: 55 }, (_, index) => ({
      id: `stored-${index}`,
      kind: 'text' as const,
      role: (index % 2 ? 'user' : 'assistant') as 'user' | 'assistant',
      content: `Stored ${index}`,
      createdAt: new Date(Date.UTC(2026, 7, 5, 0, 0, index)).toISOString(),
      delivery: 'complete' as const,
    }))
    writeChatTranscript('PRO-FIFTY', entries)
    const fetchMock = vi.fn(async (_input: RequestInfo | URL, init?: RequestInit) => {
      const body = JSON.parse(String(init?.body)) as { runId: string; messages: unknown[] }
      return textResponse(body, 'Done')
    })
    vi.stubGlobal('fetch', fetchMock)
    renderChat('PRO-FIFTY')
    fireEvent.click(screen.getByRole('button', { name: 'Chat with assistant' }))
    const user = userEvent.setup()
    await user.type(screen.getByLabelText('Message'), 'Newest message')
    await user.click(screen.getByRole('button', { name: 'Send message' }))
    expect(await screen.findByText('Done')).toBeInTheDocument()
    const request = JSON.parse(String(fetchMock.mock.calls[0][1]?.body)) as {
      messages: Array<{ content: string }>
    }
    expect(request.messages).toHaveLength(50)
    expect(request.messages[0].content).toBe('Stored 6')
    expect(request.messages.at(-1)?.content).toBe('Newest message')
  })

  it('updates one assistant message across multiple deltas', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async (_input: RequestInfo | URL, init?: RequestInit) => {
        const body = JSON.parse(String(init?.body)) as { runId: string }
        return responseFor(body, [
          { type: 'message_start', messageId: 'streamed-message' },
          { type: 'message_delta', messageId: 'streamed-message', delta: 'Streamed ' },
          { type: 'message_delta', messageId: 'streamed-message', delta: 'answer' },
          {
            type: 'message_end',
            messageId: 'streamed-message',
            finishReason: 'stop',
          },
        ])
      }),
    )
    renderChat()
    fireEvent.click(screen.getByRole('button', { name: 'Chat with assistant' }))
    fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'Stream' } })
    fireEvent.click(screen.getByRole('button', { name: 'Send message' }))
    expect(await screen.findByText('Streamed answer')).toBeInTheDocument()
    expect(screen.queryByText('Streamed ')).not.toBeInTheDocument()
  })

  it('retries a failed whole turn with a new run ID and no duplicate user message', async () => {
    const runIds: string[] = []
    const fetchMock = vi.fn(async (_input: RequestInfo | URL, init?: RequestInit) => {
      const body = JSON.parse(String(init?.body)) as { runId: string }
      runIds.push(body.runId)
      if (runIds.length === 1) {
        return responseFor(body, [
          { type: 'message_start', messageId: 'failed-message' },
          {
            type: 'error',
            messageId: 'failed-message',
            code: 'ASSISTANT_COMMUNICATION_ERROR',
            message: 'Communication error with the assistant. Please try again later.',
            retryable: true,
          },
        ])
      }
      return textResponse(body, 'Recovered')
    })
    vi.stubGlobal('fetch', fetchMock)
    renderChat()
    fireEvent.click(screen.getByRole('button', { name: 'Chat with assistant' }))
    fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'Retry me' } })
    fireEvent.click(screen.getByRole('button', { name: 'Send message' }))
    expect(await screen.findByText('Communication error with the assistant. Please try again later.')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Retry' }))
    expect(await screen.findByText('Recovered')).toBeInTheDocument()
    expect(screen.getAllByText('Retry me')).toHaveLength(1)
    expect(runIds).toHaveLength(2)
    expect(runIds[0]).not.toBe(runIds[1])
  })

  it('keeps chat usable and shows a warning after a storage write failure', async () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new DOMException('Quota exceeded', 'QuotaExceededError')
    })
    vi.stubGlobal(
      'fetch',
      vi.fn(async (_input: RequestInfo | URL, init?: RequestInit) => {
        const body = JSON.parse(String(init?.body)) as { runId: string }
        return textResponse(body, 'Still works')
      }),
    )
    renderChat()
    fireEvent.click(screen.getByRole('button', { name: 'Chat with assistant' }))
    expect(
      await screen.findByText('Chat history could not be saved, but this chat remains usable.'),
    ).toBeInTheDocument()
    fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'Hello' } })
    fireEvent.click(screen.getByRole('button', { name: 'Send message' }))
    expect(await screen.findByText('Still works')).toBeInTheDocument()
  })
})
