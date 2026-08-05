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

export function getChatStorageKey(conversationId: string): string {
  return `${CHAT_STORAGE_PREFIX}${conversationId}`
}

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

export function writeChatTranscript(
  conversationId: string,
  entries: ChatTranscriptEntry[],
): void {
  window.localStorage.setItem(
    getChatStorageKey(conversationId),
    JSON.stringify({ version: 1, entries }),
  )
}

export function migrateChatTranscript(fromId: string, toId: string): void {
  if (fromId === toId) return
  const oldKey = getChatStorageKey(fromId)
  const stored = window.localStorage.getItem(oldKey)
  if (!stored) return
  window.localStorage.setItem(getChatStorageKey(toId), stored)
  window.localStorage.removeItem(oldKey)
}

export function deleteChatTranscript(conversationId: string): void {
  window.localStorage.removeItem(getChatStorageKey(conversationId))
}

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

function shouldRestoreEntry(entry: ChatTranscriptEntry): boolean {
  return (
    entry.kind === 'text' ||
    entry.state === 'done' ||
    entry.state === 'interrupted' ||
    (entry.state === 'failed' && entry.id.startsWith('tool-status:'))
  )
}
