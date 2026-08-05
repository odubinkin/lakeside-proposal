/**
 * @file Persists proposal-scoped Willow transcripts and recovers interrupted entries.
 */

import { z } from 'zod'

export const CHAT_STORAGE_PREFIX = 'lakeside.ai-chat.v1:'

const textEntrySchema = z
  .object({
    id: z.string().min(1),
    kind: z.literal('text'),
    role: z.enum(['user', 'assistant']),
    content: z.string(),
    createdAt: z.string().datetime(),
    delivery: z.enum(['complete', 'streaming', 'interrupted']),
  })
  .strict()

const statusEntrySchema = z
  .object({
    id: z.string().min(1),
    kind: z.literal('status'),
    state: z.enum(['filling', 'done', 'failed', 'interrupted']),
    text: z.string(),
    createdAt: z.string().datetime(),
  })
  .strict()

export const chatTranscriptEntrySchema = z.discriminatedUnion('kind', [
  textEntrySchema,
  statusEntrySchema,
])

export type ChatTranscriptEntry = z.infer<typeof chatTranscriptEntrySchema>

const transcriptEnvelopeSchema = z
  .object({
    version: z.literal(1),
    entries: z.array(chatTranscriptEntrySchema),
  })
  .strict()

/**
 * Builds the versioned localStorage key for a chat conversation.
 *
 * @param conversationId - Proposal ID or temporary draft conversation ID.
 * @returns Namespaced browser-storage key for the transcript.
 */
export function getChatStorageKey(conversationId: string): string {
  return `${CHAT_STORAGE_PREFIX}${conversationId}`
}

/**
 * Loads, validates, and recovers a stored chat transcript.
 *
 * @param conversationId - Proposal ID or draft ID whose transcript should be read.
 * @returns Restorable transcript entries, or an empty list for missing or malformed data.
 */
export function readChatTranscript(conversationId: string): ChatTranscriptEntry[] {
  const stored = window.localStorage.getItem(getChatStorageKey(conversationId))
  if (!stored) return []

  try {
    const parsed = transcriptEnvelopeSchema.safeParse(JSON.parse(stored))
    if (!parsed.success) return []
    return parsed.data.entries.map(recoverEntry).filter(shouldRestoreEntry)
  } catch {
    return []
  }
}

/**
 * Writes the complete versioned transcript envelope to browser storage.
 *
 * @param conversationId - Proposal ID or draft ID that owns the transcript.
 * @param entries - Complete transcript entries to persist.
 * @returns Nothing.
 */
export function writeChatTranscript(
  conversationId: string,
  entries: ChatTranscriptEntry[],
): void {
  window.localStorage.setItem(
    getChatStorageKey(conversationId),
    JSON.stringify({ version: 1, entries }),
  )
}

/**
 * Moves a transcript from a draft namespace to a persisted proposal namespace.
 *
 * @param fromId - Existing conversation identifier.
 * @param toId - Destination conversation identifier.
 * @returns Nothing.
 */
export function migrateChatTranscript(fromId: string, toId: string): void {
  if (fromId === toId) return
  const oldKey = getChatStorageKey(fromId)
  const stored = window.localStorage.getItem(oldKey)
  if (!stored) return
  window.localStorage.setItem(getChatStorageKey(toId), stored)
  window.localStorage.removeItem(oldKey)
}

/**
 * Removes a proposal-scoped or draft chat transcript from browser storage.
 *
 * @param conversationId - Conversation identifier whose transcript should be deleted.
 * @returns Nothing.
 */
export function deleteChatTranscript(conversationId: string): void {
  window.localStorage.removeItem(getChatStorageKey(conversationId))
}

/**
 * Converts entries left active by a reload into recoverable interrupted states.
 *
 * @param entry - Validated stored transcript entry.
 * @returns The original entry or an interrupted replacement.
 */
function recoverEntry(entry: ChatTranscriptEntry): ChatTranscriptEntry {
  if (entry.kind === 'status' && entry.state === 'filling') {
    return {
      ...entry,
      state: 'interrupted',
      text: 'Form update was interrupted. Please try again.',
    }
  }
  if (entry.kind === 'text' && entry.delivery === 'streaming') {
    return { ...entry, delivery: 'interrupted' }
  }
  return entry
}

/**
 * Determines whether a recovered entry should be restored to the visible transcript.
 *
 * @param entry - Recovered transcript entry to evaluate.
 * @returns `true` when the entry is meaningful after restoration.
 */
function shouldRestoreEntry(entry: ChatTranscriptEntry): boolean {
  return (
    entry.kind === 'text' ||
    entry.state === 'done' ||
    entry.state === 'interrupted' ||
    (entry.state === 'failed' && entry.id.startsWith('tool-status:'))
  )
}
