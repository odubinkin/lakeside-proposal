import { describe, expect, it, vi } from 'vitest'
import {
  CHAT_STORAGE_PREFIX,
  deleteChatTranscript,
  getChatStorageKey,
  migrateChatTranscript,
  readChatTranscript,
  writeChatTranscript,
  type ChatTranscriptEntry,
} from '@/lib/ai/chat-storage'
import { AssistantProtocolError, readChatEventStream } from '@/lib/ai/stream'

const runId = '123e4567-e89b-42d3-a456-426614174000'

function eventLines(sequenceOverrides: number[] = [0, 1, 2]) {
  return [
    {
      protocolVersion: 1,
      runId,
      sequence: sequenceOverrides[0],
      type: 'message_start',
      messageId: 'assistant-1',
    },
    {
      protocolVersion: 1,
      runId,
      sequence: sequenceOverrides[1],
      type: 'message_delta',
      messageId: 'assistant-1',
      delta: 'Hi 👋',
    },
    {
      protocolVersion: 1,
      runId,
      sequence: sequenceOverrides[2],
      type: 'message_end',
      messageId: 'assistant-1',
      finishReason: 'stop',
    },
  ].map((event) => `${JSON.stringify(event)}\n`)
}

function splitStream(text: string, splitAt: number[]): ReadableStream<Uint8Array> {
  const bytes = new TextEncoder().encode(text)
  return new ReadableStream({
    start(controller) {
      let offset = 0
      for (const length of splitAt) {
        controller.enqueue(bytes.slice(offset, offset + length))
        offset += length
      }
      if (offset < bytes.length) controller.enqueue(bytes.slice(offset))
      controller.close()
    },
  })
}

describe('NDJSON stream parsing', () => {
  it('parses events across arbitrary byte boundaries and multiple lines per chunk', async () => {
    const events: string[] = []
    await readChatEventStream(
      splitStream(eventLines().join(''), [3, 17, 51]),
      runId,
      (event) => {
        events.push(event.type)
      },
    )
    expect(events).toEqual(['message_start', 'message_delta', 'message_end'])
  })

  it('dispatches form-tool progress before complete arguments', async () => {
    const lines = [
      {
        protocolVersion: 1,
        runId,
        sequence: 0,
        type: 'message_start',
        messageId: 'assistant-tool',
      },
      {
        protocolVersion: 1,
        runId,
        sequence: 1,
        type: 'tool_call_start',
        messageId: 'assistant-tool',
      },
      {
        protocolVersion: 1,
        runId,
        sequence: 2,
        type: 'tool_call',
        messageId: 'assistant-tool',
        toolCallId: 'tool-1',
        name: 'edit_proposal_form',
        arguments: { clientName: 'Vasya Pupkin' },
      },
      {
        protocolVersion: 1,
        runId,
        sequence: 3,
        type: 'message_end',
        messageId: 'assistant-tool',
        finishReason: 'tool_call',
      },
    ]
      .map((event) => `${JSON.stringify(event)}\n`)
      .join('')
    const received: string[] = []
    await readChatEventStream(splitStream(lines, [31, 173]), runId, (event) => {
      received.push(event.type)
    })
    expect(received).toEqual([
      'message_start',
      'tool_call_start',
      'tool_call',
      'message_end',
    ])
  })

  it.each([
    ['wrong run ID', eventLines().join('').replace(runId, crypto.randomUUID()), []],
    ['missing sequence', eventLines([0, 2, 3]).join(''), ['message_start']],
    ['duplicate sequence', eventLines([0, 0, 1]).join(''), ['message_start']],
    ['out-of-order sequence', eventLines([0, 2, 1]).join(''), ['message_start']],
  ])('rejects %s before dispatching the mismatched event', async (_label, body, expected) => {
    const events: string[] = []
    await expect(
      readChatEventStream(splitStream(body, [19]), runId, (event) => {
        events.push(event.type)
      }),
    ).rejects.toBeInstanceOf(AssistantProtocolError)
    expect(events).toEqual(expected)
  })

  it('ignores an unknown event after validating its envelope sequence', async () => {
    const lines = eventLines()
    lines.splice(
      1,
      0,
      `${JSON.stringify({ protocolVersion: 1, runId, sequence: 1, type: 'future' })}\n`,
    )
    const body = lines
      .join('')
      .replace('"sequence":1,"type":"message_delta"', '"sequence":2,"type":"message_delta"')
      .replace('"sequence":2,"type":"message_end"', '"sequence":3,"type":"message_end"')
    const events: string[] = []
    await readChatEventStream(splitStream(body, [100]), runId, (event) => {
      events.push(event.type)
    })
    expect(events).toEqual(['message_start', 'message_delta', 'message_end'])
  })

  it.each([
    ['malformed JSON', '{bad}\n'],
    ['non-object JSON', 'null\n'],
    [
      'mismatched message ID',
      [
        JSON.stringify({
          protocolVersion: 1,
          runId,
          sequence: 0,
          type: 'message_start',
          messageId: 'one',
        }),
        JSON.stringify({
          protocolVersion: 1,
          runId,
          sequence: 1,
          type: 'message_delta',
          messageId: 'two',
          delta: 'bad',
        }),
      ].join('\n') + '\n',
    ],
    [
      'unterminated response',
      JSON.stringify({
        protocolVersion: 1,
        runId,
        sequence: 0,
        type: 'message_start',
        messageId: 'one',
      }),
    ],
  ])('rejects a %s safely', async (_label, body) => {
    await expect(
      readChatEventStream(splitStream(body, [2]), runId, () => undefined),
    ).rejects.toBeInstanceOf(AssistantProtocolError)
  })

  it('accepts a terminal error event and rejects events after it', async () => {
    const errorEvent = [
      {
        protocolVersion: 1,
        runId,
        sequence: 0,
        type: 'message_start',
        messageId: 'one',
      },
      {
        protocolVersion: 1,
        runId,
        sequence: 1,
        type: 'error',
        messageId: 'one',
        code: 'INTERNAL_ERROR',
        message: 'Safe error',
        retryable: true,
      },
    ]
      .map((event) => JSON.stringify(event))
      .join('\n') + '\n'
    const received: string[] = []
    await readChatEventStream(splitStream(errorEvent, [5]), runId, (event) => {
      received.push(event.type)
    })
    expect(received).toEqual(['message_start', 'error'])

    const afterTerminal = `${errorEvent}${JSON.stringify({
      protocolVersion: 1,
      runId,
      sequence: 2,
      type: 'message_end',
      messageId: 'one',
      finishReason: 'stop',
    })}\n`
    await expect(
      readChatEventStream(splitStream(afterTerminal, [9]), runId, () => undefined),
    ).rejects.toBeInstanceOf(AssistantProtocolError)
  })
})

describe('proposal-scoped chat storage', () => {
  const entries: ChatTranscriptEntry[] = [
    {
      id: 'one',
      kind: 'text',
      role: 'user',
      content: 'Hello',
      createdAt: '2026-08-05T00:00:00.000Z',
      delivery: 'complete',
    },
    {
      id: 'status',
      kind: 'status',
      state: 'done',
      text: 'Form completed, no fields changed.',
      createdAt: '2026-08-05T00:00:01.000Z',
    },
  ]

  it('writes and restores separate versioned proposal transcripts', () => {
    writeChatTranscript('PRO-1', entries)
    writeChatTranscript('PRO-2', [entries[0]])
    expect(readChatTranscript('PRO-1')).toEqual(entries)
    expect(readChatTranscript('PRO-2')).toEqual([entries[0]])
    expect(getChatStorageKey('PRO-1')).toBe(`${CHAT_STORAGE_PREFIX}PRO-1`)
  })

  it('ignores malformed storage and recovers interrupted statuses', () => {
    window.localStorage.setItem(getChatStorageKey('broken'), '{bad')
    expect(readChatTranscript('broken')).toEqual([])

    window.localStorage.setItem(
      getChatStorageKey('draft'),
      JSON.stringify({
        version: 1,
        entries: [
          {
            id: 'status',
            kind: 'status',
            state: 'filling',
            text: 'Filling in the form…',
            createdAt: '2026-08-05T00:00:00.000Z',
          },
        ],
      }),
    )
    expect(readChatTranscript('draft')).toMatchObject([
      { state: 'interrupted', text: 'Form update was interrupted. Please try again.' },
    ])
  })

  it('migrates only after the destination write succeeds and supports deletion', () => {
    writeChatTranscript('draft:1', entries)
    migrateChatTranscript('draft:1', 'PRO-1')
    expect(readChatTranscript('PRO-1')).toEqual(entries)
    expect(window.localStorage.getItem(getChatStorageKey('draft:1'))).toBeNull()
    deleteChatTranscript('PRO-1')
    expect(readChatTranscript('PRO-1')).toEqual([])
  })

  it('retains the draft key when migration write fails', () => {
    writeChatTranscript('draft:1', entries)
    const setItem = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new DOMException('Quota exceeded', 'QuotaExceededError')
    })
    expect(() => migrateChatTranscript('draft:1', 'PRO-1')).toThrow()
    setItem.mockRestore()
    expect(readChatTranscript('draft:1')).toEqual(entries)
  })
})
