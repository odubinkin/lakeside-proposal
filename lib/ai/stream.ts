/**
 * @file Encodes and validates Willow's correlated newline-delimited JSON event stream.
 */

import {
  AI_PROTOCOL_VERSION,
  chatStreamEventSchema,
  type ChatStreamEvent,
} from '@/lib/ai/contracts'

/**
 * Signals that an assistant event stream violated the public protocol.
 */
export class AssistantProtocolError extends Error {
  /**
   * Creates a protocol error with a safe client-facing message.
   *
   * @param message - Description of the invalid or interrupted response.
   */
  constructor(message = 'The assistant returned an invalid response.') {
    super(message)
    this.name = 'AssistantProtocolError'
  }
}

/**
 * Reads an NDJSON assistant stream and validates event correlation and lifecycle order.
 *
 * @param stream - Byte stream returned by the assistant API route.
 * @param runId - Expected request identifier for every event envelope.
 * @param onEvent - Handler invoked for each validated supported event.
 * @returns A promise that resolves after a terminal event is received.
 * @throws {AssistantProtocolError} When envelopes, sequencing, or message lifecycle are invalid.
 */
export async function readChatEventStream(
  stream: ReadableStream<Uint8Array>,
  runId: string,
  onEvent: (event: ChatStreamEvent) => void | Promise<void>,
): Promise<void> {
  const reader = stream.getReader()
  const decoder = new TextDecoder()
  let buffer = ''
  let expectedSequence = 0
  let activeMessageId: string | undefined
  let terminal = false

  /**
   * Parses, validates, and dispatches one NDJSON record.
   *
   * @param line - One decoded event line without its newline delimiter.
   * @returns A promise that resolves after the validated event handler completes.
   */
  const processLine = async (line: string) => {
    if (!line.trim()) return

    let raw: unknown
    try {
      raw = JSON.parse(line)
    } catch {
      throw new AssistantProtocolError()
    }

    if (!raw || typeof raw !== 'object') throw new AssistantProtocolError()
    const envelope = raw as Record<string, unknown>
    if (
      envelope.protocolVersion !== AI_PROTOCOL_VERSION ||
      envelope.runId !== runId ||
      envelope.sequence !== expectedSequence
    ) {
      throw new AssistantProtocolError()
    }
    expectedSequence += 1

    const eventType = envelope.type
    if (
      typeof eventType !== 'string' ||
      ![
        'message_start',
        'message_delta',
        'tool_call_start',
        'tool_call',
        'message_end',
        'error',
      ].includes(
        eventType,
      )
    ) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('Willow ignored an unknown stream event type.')
      }
      return
    }

    const parsed = chatStreamEventSchema.safeParse(raw)
    if (!parsed.success || terminal) throw new AssistantProtocolError()
    const event = parsed.data

    if (event.type === 'message_start') {
      if (activeMessageId) throw new AssistantProtocolError()
      activeMessageId = event.messageId
    } else if (event.type === 'error') {
      if (event.messageId && event.messageId !== activeMessageId) {
        throw new AssistantProtocolError()
      }
      terminal = true
    } else {
      if (!activeMessageId || event.messageId !== activeMessageId) {
        throw new AssistantProtocolError()
      }
      if (event.type === 'message_end') {
        activeMessageId = undefined
        terminal = true
      }
    }

    await onEvent(event)
  }

  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      buffer += decoder.decode(value, { stream: true })
      const lines = buffer.split('\n')
      buffer = lines.pop() ?? ''
      for (const line of lines) await processLine(line)
    }

    buffer += decoder.decode()
    if (buffer.trim()) await processLine(buffer)
    if (!terminal) throw new AssistantProtocolError('The assistant response was interrupted.')
  } catch (error) {
    await reader.cancel().catch(() => undefined)
    throw error
  }
}

/**
 * Serializes one assistant event as an NDJSON record.
 *
 * @param event - Fully correlated event envelope to serialize.
 * @returns UTF-8 bytes containing the JSON event followed by a newline.
 */
export function encodeChatEvent(event: ChatStreamEvent): Uint8Array {
  return new TextEncoder().encode(`${JSON.stringify(event)}\n`)
}
