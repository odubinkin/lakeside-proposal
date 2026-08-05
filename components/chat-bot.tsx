/**
 * @file Renders Willow chat and coordinates streaming, client-side tools, and transcript storage.
 */

'use client'

import * as React from 'react'
import {
  Bot,
  CheckCircle2,
  CircleAlert,
  Loader2,
  Maximize2,
  Minimize2,
  RotateCcw,
  Send,
  Sparkles,
  Square,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal'
import {
  AI_PROTOCOL_VERSION,
  proposalFormFieldLabels,
  type ChatHistoryMessage,
  type ChatRequest,
  type ProposalFormPatch,
  type ProposalFormState,
  type ToolContinuation,
} from '@/lib/ai/contracts'
import { AssistantClientError, sendChatRequest } from '@/lib/ai/client'
import type { FormToolResult } from '@/lib/ai/form-tool'
import {
  migrateChatTranscript,
  readChatTranscript,
  writeChatTranscript,
  type ChatTranscriptEntry,
} from '@/lib/ai/chat-storage'
import { AssistantProtocolError } from '@/lib/ai/stream'
import { cn } from '@/lib/utils'

const suggestions = [
  'Fill the form with a sample client',
  'Recommend add-ons for a family buyer',
  'What is included in the Smart Home package?',
]

const welcomeText =
  "Hi, I'm Willow, your Redwood Lakeside assistant. I can help you complete this proposal, suggest add-ons, or answer questions about the villa."

type ChatBotProps = {
  form: ProposalFormState
  proposalId: string | null
  onApplyPatch: (patch: ProposalFormPatch) => FormToolResult
}

type PendingToolCall = {
  assistantMessageId: string
  toolCallId: string
  arguments: ProposalFormPatch
}

export function ChatBot({ form, proposalId, onApplyPatch }: ChatBotProps) {
  const [open, setOpen] = React.useState(false)
  const [maximized, setMaximized] = React.useState(false)
  const [input, setInput] = React.useState('')
  const [draftConversationId] = React.useState(() => `draft:${crypto.randomUUID()}`)
  const conversationId = proposalId ?? draftConversationId
  const [initialTranscript] = React.useState(() =>
    loadInitialTranscript(conversationId),
  )
  const [entries, setEntries] = React.useState<ChatTranscriptEntry[]>(
    initialTranscript.entries,
  )
  const [storageWarning, setStorageWarning] = React.useState(initialTranscript.warning)
  const [active, setActive] = React.useState(false)
  const [retryableUserId, setRetryableUserId] = React.useState<string | null>(null)
  const entriesRef = React.useRef(entries)
  const formRef = React.useRef(form)
  const previousConversationIdRef = React.useRef(conversationId)
  const controllerRef = React.useRef<AbortController | null>(null)
  const scrollRef = React.useRef<HTMLDivElement>(null)
  const hasUserMessage = entries.some(
    (entry) => entry.kind === 'text' && entry.role === 'user',
  )

  React.useEffect(() => {
    formRef.current = form
  }, [form])

  const replaceEntries = React.useCallback(
    (updater: (current: ChatTranscriptEntry[]) => ChatTranscriptEntry[]) => {
      const next = updater(entriesRef.current)
      entriesRef.current = next
      setEntries(next)
      return next
    },
    [],
  )

  React.useEffect(() => {
    const previousId = previousConversationIdRef.current
    if (previousId !== conversationId) {
      try {
        migrateChatTranscript(previousId, conversationId)
      } catch {
        queueMicrotask(() =>
          setStorageWarning(
            'Chat history could not be migrated, but this chat remains usable.',
          ),
        )
      }
      previousConversationIdRef.current = conversationId
    }
  }, [conversationId])

  React.useEffect(() => {
    try {
      writeChatTranscript(conversationId, entries)
      queueMicrotask(() => setStorageWarning(''))
    } catch {
      queueMicrotask(() =>
        setStorageWarning('Chat history could not be saved, but this chat remains usable.'),
      )
    }
  }, [conversationId, entries])

  React.useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [entries, open, storageWarning])

  React.useEffect(() => {
    return () => controllerRef.current?.abort()
  }, [])

  const runTurn = React.useCallback(
    async (userMessageId: string) => {
      setActive(true)
      setRetryableUserId(null)
      const controller = new AbortController()
      controllerRef.current = controller

      try {
        let continuation: ToolContinuation | undefined
        let currentForm = formRef.current
        do {
          const result = await runExchange({
            currentForm,
            continuation,
            signal: controller.signal,
            replaceEntries,
          })
          if (!result) break

          const statusId = `tool-status:${result.toolCallId}`
          replaceEntries((current) => [
            ...current,
            {
              id: statusId,
              kind: 'status',
              state: 'filling',
              text: 'Filling in the form…',
              createdAt: new Date().toISOString(),
            },
          ])

          await waitForProgressPresentation(controller.signal)
          let toolResult: FormToolResult
          try {
            toolResult = onApplyPatch(result.arguments)
          } catch {
            toolResult = {
              ok: false,
              oldForm: currentForm,
              newForm: currentForm,
              changedFields: [],
              error: {
                code: 'FORM_UPDATE_FAILED',
                message: 'The requested form changes could not be applied.',
              },
            }
          }
          currentForm = toolResult.newForm
          formRef.current = currentForm
          replaceEntries((current) =>
            current.map((entry) =>
              entry.id === statusId && entry.kind === 'status'
                ? getCompletedStatus(entry, toolResult)
                : entry,
            ),
          )

          continuation = {
            assistantMessageId: result.assistantMessageId,
            toolCallId: result.toolCallId,
            toolName: 'edit_proposal_form',
            arguments: result.arguments,
            result: toolResult,
          }
        } while (!controller.signal.aborted)
      } catch (error) {
        if (controller.signal.aborted) {
          markActiveEntriesInterrupted(replaceEntries, 'Request cancelled.')
        } else {
          markActiveEntriesInterrupted(replaceEntries)
          const clientError = normalizeClientError(error)
          replaceEntries((current) => [
            ...current,
            {
              id: crypto.randomUUID(),
              kind: 'status',
              state: 'failed',
              text: clientError.message,
              createdAt: new Date().toISOString(),
            },
          ])
          if (clientError.retryable) setRetryableUserId(userMessageId)
        }
      } finally {
        if (controllerRef.current === controller) controllerRef.current = null
        setActive(false)
      }
    },
    [onApplyPatch, replaceEntries],
  )

  function handleSend(raw?: string) {
    const value = (raw ?? input).trim()
    if (!value || active) return
    setInput('')
    const userEntry: ChatTranscriptEntry = {
      id: crypto.randomUUID(),
      kind: 'text',
      role: 'user',
      content: value,
      createdAt: new Date().toISOString(),
      delivery: 'complete',
    }
    replaceEntries((current) => [...current, userEntry])
    void runTurn(userEntry.id)
  }

  function handleRetry() {
    if (!retryableUserId || active) return
    replaceEntries((current) =>
      current.filter((entry) => entry.kind !== 'status' || entry.state !== 'failed'),
    )
    void runTurn(retryableUserId)
  }

  return (
    <>
      <Button
        size="lg"
        onClick={() => setOpen(true)}
        aria-label="Chat with assistant"
        className="fixed bottom-6 right-6 z-40 h-16 w-16 gap-0 overflow-hidden rounded-full p-0 text-sm shadow-lg shadow-primary/25 transition-[width,padding,gap] duration-300 ease-out hover:w-[216px] hover:gap-3 hover:px-6 focus-visible:w-[216px] focus-visible:gap-3 focus-visible:px-6"
      >
        <Bot className="size-6" />
        <span className="max-w-0 overflow-hidden opacity-0 transition-[max-width,opacity] duration-300 ease-out group-hover/button:max-w-40 group-hover/button:opacity-100 group-focus-visible/button:max-w-40 group-focus-visible/button:opacity-100">
          Chat with assistant
        </span>
      </Button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        className={cn(
          'flex min-h-[min(24rem,calc(100vh-2rem))] min-w-[min(20rem,calc(100vw-2rem))] flex-col overflow-hidden p-0',
          maximized
            ? 'h-[calc(100vh-2rem)]! w-[calc(100vw-2rem)]! max-h-none max-w-none resize-none'
            : 'h-[600px] w-[28rem] max-h-[85vh] max-w-[calc(100vw-2rem)] resize',
        )}
        labelledBy="chat-title"
        showClose={false}
      >
        <header className="flex items-center gap-3 border-b border-border bg-secondary/60 px-5 py-4">
          <div className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Bot className="size-5" />
          </div>
          <div className="flex flex-col">
            <h2 id="chat-title" className="text-sm font-semibold text-foreground">
              Willow · AI Assistant
            </h2>
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="size-2 rounded-full bg-primary" />
              {active ? 'Working…' : 'Online'}
            </span>
          </div>
          <div className="ml-auto flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMaximized((current) => !current)}
              aria-label={maximized ? 'Restore chat window' : 'Maximize chat window'}
              aria-pressed={maximized}
            >
              {maximized ? <Minimize2 /> : <Maximize2 />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
            >
              <X />
            </Button>
          </div>
        </header>

        <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
          {entries.map((entry) =>
            entry.kind === 'status' ? (
              <StatusBubble key={entry.id} entry={entry} />
            ) : (
              <TextBubble key={entry.id} entry={entry} />
            ),
          )}
          {storageWarning && (
            <p role="alert" className="text-xs text-amber-700">
              {storageWarning}
            </p>
          )}
          {retryableUserId && !active && (
            <Button variant="outline" size="sm" onClick={handleRetry}>
              <RotateCcw />
              Retry
            </Button>
          )}
        </div>

        <div className="border-t border-border px-4 pb-4 pt-3">
          {!hasUserMessage && (
            <div className="mb-2.5 flex flex-wrap gap-2">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => handleSend(suggestion)}
                  disabled={active}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:bg-accent hover:text-accent-foreground disabled:opacity-50"
                >
                  <Sparkles className="size-3 text-primary" />
                  {suggestion}
                </button>
              ))}
            </div>
          )}
          <form
            className="flex items-center gap-2"
            onSubmit={(event) => {
              event.preventDefault()
              handleSend()
            }}
          >
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask Willow anything…"
              className="h-11 flex-1 rounded-full border border-border bg-background px-4 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30"
              aria-label="Message"
            />
            {active ? (
              <Button
                type="button"
                size="icon-lg"
                className="size-11 shrink-0 rounded-full"
                aria-label="Cancel request"
                onClick={() => controllerRef.current?.abort()}
              >
                <Square className="size-4" />
              </Button>
            ) : (
              <Button
                type="submit"
                size="icon-lg"
                className="size-11 shrink-0 rounded-full"
                aria-label="Send message"
                disabled={!input.trim()}
              >
                <Send className="size-4" />
              </Button>
            )}
          </form>
        </div>
      </Modal>
    </>
  )
}

async function runExchange({
  currentForm,
  continuation,
  signal,
  replaceEntries,
}: {
  currentForm: ProposalFormState
  continuation?: ToolContinuation
  signal: AbortSignal
  replaceEntries: (
    updater: (current: ChatTranscriptEntry[]) => ChatTranscriptEntry[],
  ) => ChatTranscriptEntry[]
}): Promise<PendingToolCall | undefined> {
  const runId = crypto.randomUUID()
  const request: ChatRequest = {
    protocolVersion: AI_PROTOCOL_VERSION,
    runId,
    form: currentForm,
    messages: getModelHistory(
      entriesForHistory(replaceEntries),
      continuation ? `tool-status:${continuation.toolCallId}` : undefined,
    ),
    ...(continuation ? { continuation } : {}),
  }
  let activeMessageId: string | undefined
  let pendingToolCall: PendingToolCall | undefined

  await sendChatRequest(
    request,
    (event) => {
      switch (event.type) {
        case 'message_start':
          activeMessageId = event.messageId
          replaceEntries((current) => [
            ...current,
            {
              id: event.messageId,
              kind: 'text',
              role: 'assistant',
              content: '',
              createdAt: new Date().toISOString(),
              delivery: 'streaming',
            },
          ])
          break
        case 'message_delta':
          replaceEntries((current) =>
            current.map((entry) =>
              entry.id === event.messageId && entry.kind === 'text'
                ? { ...entry, content: `${entry.content}${event.delta}` }
                : entry,
            ),
          )
          break
        case 'tool_call':
          pendingToolCall = {
            assistantMessageId: event.messageId,
            toolCallId: event.toolCallId,
            arguments: event.arguments,
          }
          replaceEntries((current) =>
            current.flatMap((entry) => {
              if (entry.id !== event.messageId || entry.kind !== 'text') return [entry]
              if (!entry.content.trim()) return []
              return [{ ...entry, delivery: 'complete' }]
            }),
          )
          break
        case 'message_end':
          if (event.finishReason === 'stop') {
            replaceEntries((current) =>
              current.map((entry) =>
                entry.id === event.messageId && entry.kind === 'text'
                  ? { ...entry, delivery: 'complete' }
                  : entry,
              ),
            )
          }
          break
      }
    },
    signal,
  )

  if (pendingToolCall && activeMessageId !== pendingToolCall.assistantMessageId) {
    throw new AssistantProtocolError()
  }
  return pendingToolCall
}

function entriesForHistory(
  replaceEntries: (
    updater: (current: ChatTranscriptEntry[]) => ChatTranscriptEntry[],
  ) => ChatTranscriptEntry[],
): ChatTranscriptEntry[] {
  return replaceEntries((current) => current)
}

function getModelHistory(
  entries: ChatTranscriptEntry[],
  excludedStatusId?: string,
): ChatHistoryMessage[] {
  return entries
    .flatMap((entry): ChatHistoryMessage[] => {
      if (entry.kind === 'text' && entry.delivery === 'complete') {
        const { id, role, content, createdAt } = entry
        return [{ id, role, content, createdAt }]
      }
      if (
        entry.kind === 'status' &&
        entry.id.startsWith('tool-status:') &&
        entry.id !== excludedStatusId &&
        (entry.state === 'done' || entry.state === 'failed')
      ) {
        return [{
          id: entry.id,
          role: 'assistant',
          content: entry.text,
          createdAt: entry.createdAt,
        }]
      }
      return []
    })
    .slice(-50)
}

function createWelcomeEntry(): ChatTranscriptEntry {
  return {
    id: crypto.randomUUID(),
    kind: 'text',
    role: 'assistant',
    content: welcomeText,
    createdAt: new Date().toISOString(),
    delivery: 'complete',
  }
}

function loadInitialTranscript(conversationId: string): {
  entries: ChatTranscriptEntry[]
  warning: string
} {
  if (typeof window === 'undefined') {
    return { entries: [createWelcomeEntry()], warning: '' }
  }
  try {
    const restored = readChatTranscript(conversationId)
    return {
      entries: restored.length > 0 ? restored : [createWelcomeEntry()],
      warning: '',
    }
  } catch {
    return {
      entries: [createWelcomeEntry()],
      warning: 'Chat history could not be loaded, but this chat remains usable.',
    }
  }
}

function getCompletedStatus(
  entry: Extract<ChatTranscriptEntry, { kind: 'status' }>,
  result: FormToolResult,
): ChatTranscriptEntry {
  if (!result.ok) {
    const detail = result.error?.fieldErrors
      ? Object.values(result.error.fieldErrors).join(' ')
      : result.error?.message
    return {
      ...entry,
      state: 'failed',
      text: `Form update failed.${detail ? ` ${detail}` : ''}`,
    }
  }
  if (result.changedFields.length === 0) {
    return { ...entry, state: 'done', text: 'Form completed, no fields changed.' }
  }
  const labels = result.changedFields.map((field) => proposalFormFieldLabels[field])
  return {
    ...entry,
    state: 'done',
    text: `Form completed, fields changed: ${labels.join(', ')}`,
  }
}

function markActiveEntriesInterrupted(
  replaceEntries: (
    updater: (current: ChatTranscriptEntry[]) => ChatTranscriptEntry[],
  ) => ChatTranscriptEntry[],
  statusText = 'The response was interrupted.',
) {
  replaceEntries((current) =>
    current.map((entry) => {
      if (entry.kind === 'text' && entry.delivery === 'streaming') {
        return { ...entry, delivery: 'interrupted' }
      }
      if (entry.kind === 'status' && entry.state === 'filling') {
        return { ...entry, state: 'interrupted', text: statusText }
      }
      return entry
    }),
  )
}

function normalizeClientError(error: unknown): AssistantClientError {
  if (error instanceof AssistantClientError) return error
  if (error instanceof AssistantProtocolError) {
    return new AssistantClientError(error.message, 'ASSISTANT_PROTOCOL_ERROR', false)
  }
  return new AssistantClientError(
    'Communication error with the assistant. Please try again later.',
    'NETWORK_ERROR',
    true,
  )
}

async function waitForProgressPresentation(signal: AbortSignal): Promise<void> {
  await new Promise<void>((resolve, reject) => {
    const timeout = window.setTimeout(resolve, 350)
    signal.addEventListener(
      'abort',
      () => {
        window.clearTimeout(timeout)
        reject(new DOMException('Aborted', 'AbortError'))
      },
      { once: true },
    )
  })
}

function TextBubble({
  entry,
}: {
  entry: Extract<ChatTranscriptEntry, { kind: 'text' }>
}) {
  const isUser = entry.role === 'user'
  return (
    <div className={cn('flex gap-2.5', isUser ? 'justify-end' : 'justify-start')}>
      {!isUser && (
        <div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
          <Bot className="size-4" />
        </div>
      )}
      <div
        className={cn(
          'max-w-[78%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap',
          isUser
            ? 'rounded-br-sm bg-primary text-primary-foreground'
            : 'rounded-bl-sm bg-muted text-foreground',
          entry.delivery === 'interrupted' && 'border border-amber-500/40 opacity-80',
        )}
      >
        {entry.content || <Loader2 className="size-4 animate-spin" />}
        {entry.delivery === 'interrupted' && (
          <span className="mt-1 block text-xs">Response interrupted</span>
        )}
      </div>
    </div>
  )
}

function StatusBubble({
  entry,
}: {
  entry: Extract<ChatTranscriptEntry, { kind: 'status' }>
}) {
  const isFilling = entry.state === 'filling'
  const isDone = entry.state === 'done'
  return (
    <div className="flex justify-start gap-2.5">
      <div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
        <Bot className="size-4" />
      </div>
      <div
        className={cn(
          'inline-flex items-center gap-2 rounded-2xl px-3.5 py-2 text-xs font-medium',
          isFilling
            ? 'bg-accent text-accent-foreground'
            : isDone
              ? 'bg-primary/10 text-primary'
              : 'bg-amber-500/10 text-amber-800',
        )}
      >
        {isFilling ? (
          <Loader2 className="size-3.5 shrink-0 animate-spin" />
        ) : isDone ? (
          <CheckCircle2 className="size-3.5 shrink-0" />
        ) : (
          <CircleAlert className="size-3.5 shrink-0" />
        )}
        {entry.text}
      </div>
    </div>
  )
}
