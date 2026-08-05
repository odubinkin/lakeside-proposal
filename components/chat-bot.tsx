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
import ReactMarkdown, { type Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'
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

const markdownComponents: Components = {
  h1: ({ children }) => <h1 className="mb-2 mt-3 text-lg font-semibold first:mt-0">{children}</h1>,
  h2: ({ children }) => <h2 className="mb-2 mt-3 text-base font-semibold first:mt-0">{children}</h2>,
  h3: ({ children }) => <h3 className="mb-1.5 mt-3 text-sm font-semibold first:mt-0">{children}</h3>,
  p: ({ children }) => <p className="my-2 first:mt-0 last:mb-0">{children}</p>,
  ul: ({ children }) => <ul className="my-2 list-disc space-y-1 pl-5">{children}</ul>,
  ol: ({ children, start }) => (
    <ol start={start} className="my-2 list-decimal space-y-1 pl-5">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="pl-0.5">{children}</li>,
  a: ({ children, href }) => (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className="font-medium underline decoration-current/50 underline-offset-2 hover:decoration-current"
    >
      {children}
    </a>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-2 border-l-2 border-current/25 pl-3 italic opacity-80">
      {children}
    </blockquote>
  ),
  pre: ({ children }) => (
    <pre className="my-2 max-w-full overflow-x-auto rounded-lg bg-foreground/10 p-3 text-xs leading-relaxed [&_code]:bg-transparent [&_code]:p-0">
      {children}
    </pre>
  ),
  code: ({ children, className }) => (
    <code
      className={cn(
        'rounded bg-foreground/10 px-1 py-0.5 font-mono text-[0.85em]',
        className,
      )}
    >
      {children}
    </code>
  ),
  table: ({ children }) => (
    <div className="my-2 max-w-full overflow-x-auto">
      <table className="w-full border-collapse text-left text-xs">{children}</table>
    </div>
  ),
  th: ({ children }) => <th className="border border-current/20 px-2 py-1 font-semibold">{children}</th>,
  td: ({ children }) => <td className="border border-current/20 px-2 py-1">{children}</td>,
  hr: () => <hr className="my-3 border-current/20" />,
}

type ChatBotProps = {
  form: ProposalFormState
  proposalId: string | null
  onApplyPatch: (patch: ProposalFormPatch) => FormToolResult
  promptRequest?: ChatPromptRequest
}

export type ChatPromptRequest = {
  id: number
  message: string
}

type PendingToolCall = {
  assistantMessageId: string
  toolCallId: string
  arguments: ProposalFormPatch
}

/**
 * Renders Willow and coordinates chat turns, form tools, retries, and transcript storage.
 *
 * @param props - Assistant state and proposal-form integration callbacks.
 * @param props.form - Latest complete proposal form snapshot.
 * @param props.proposalId - Persisted proposal ID, or `null` while editing a draft.
 * @param props.onApplyPatch - Client-side callback that validates and applies a tool patch.
 * @param props.promptRequest - Optional externally triggered message to send once.
 * @returns The floating assistant launcher and chat modal.
 */
export function ChatBot({
  form,
  proposalId,
  onApplyPatch,
  promptRequest,
}: ChatBotProps) {
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
  const handledPromptRequestIdRef = React.useRef<number | null>(null)
  const scrollRef = React.useRef<HTMLDivElement>(null)
  const hasUserMessage = entries.some(
    (entry) => entry.kind === 'text' && entry.role === 'user',
  )

  React.useEffect(() => {
    formRef.current = form
  }, [form])

  /**
   * Applies a transcript update synchronously to both the ref and React state.
   *
   * @param updater - Function that derives the next transcript from the current entries.
   * @returns The updated transcript entries.
   */
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

  /**
   * Runs an assistant turn, including any client-side form tool and continuation exchange.
   *
   * @param userMessageId - Existing user entry used as the retry anchor for this turn.
   * @returns A promise that resolves after the full assistant turn stops, fails, or is cancelled.
   */
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
          replaceEntries((current) =>
            current.some((entry) => entry.id === statusId)
              ? current
              : [
                  ...current,
                  {
                    id: statusId,
                    kind: 'status',
                    state: 'filling',
                    text: 'Filling in the form…',
                    createdAt: new Date().toISOString(),
                  },
                ],
          )

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

  /**
   * Adds a user message and starts its assistant turn when the chat is idle.
   *
   * @param raw - Optional suggested or externally supplied message; defaults to the input value.
   * @returns `true` when a message was accepted and sent, otherwise `false`.
   */
  const handleSend = React.useCallback(
    (raw?: string) => {
      const value = (raw ?? input).trim()
      if (!value || active) return false
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
      return true
    },
    [active, input, replaceEntries, runTurn],
  )

  React.useEffect(() => {
    if (
      !promptRequest ||
      handledPromptRequestIdRef.current === promptRequest.id
    ) {
      return
    }

    setOpen(true)
    if (handleSend(promptRequest.message)) {
      handledPromptRequestIdRef.current = promptRequest.id
    }
  }, [handleSend, promptRequest])

  /**
   * Repeats the most recent retryable assistant turn without duplicating its user entry.
   *
   * @returns Nothing.
   */
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

/**
 * Runs one HTTP exchange and applies its incremental events to the visible transcript.
 *
 * @param options - Exchange state and transcript update function.
 * @param options.currentForm - Form snapshot sent with this exchange.
 * @param options.continuation - Optional result of the preceding client-executed tool call.
 * @param options.signal - Abort signal for the request and stream.
 * @param options.replaceEntries - Synchronous transcript state updater.
 * @returns The pending form-tool call, or `undefined` after a text-only response.
 */
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
        case 'tool_call_start':
          replaceEntries((current) => startToolProgress(current, event.messageId))
          break
        case 'tool_call':
          pendingToolCall = {
            assistantMessageId: event.messageId,
            toolCallId: event.toolCallId,
            arguments: event.arguments,
          }
          replaceEntries((current) =>
            completeToolProgress(current, event.messageId, event.toolCallId),
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

/**
 * Shows form-tool progress and removes an empty assistant placeholder.
 *
 * @param entries - Current visible transcript.
 * @param messageId - Assistant message that started the tool call.
 * @returns Transcript with one provisional filling status.
 */
function startToolProgress(
  entries: ChatTranscriptEntry[],
  messageId: string,
): ChatTranscriptEntry[] {
  const provisionalStatusId = `tool-status-pending:${messageId}`
  const next = entries.flatMap((entry): ChatTranscriptEntry[] => {
    if (entry.id !== messageId || entry.kind !== 'text') return [entry]
    if (!entry.content.trim()) return []
    return [{ ...entry, delivery: 'complete' }]
  })
  if (next.some((entry) => entry.id === provisionalStatusId)) return next
  return [
    ...next,
    {
      id: provisionalStatusId,
      kind: 'status',
      state: 'filling',
      text: 'Filling in the form…',
      createdAt: new Date().toISOString(),
    },
  ]
}

/**
 * Correlates provisional progress with the complete validated tool call.
 *
 * @param entries - Current visible transcript.
 * @param messageId - Assistant message that owns the tool call.
 * @param toolCallId - Provider tool-call identifier used for continuation history.
 * @returns Transcript containing one final tool status ID.
 */
function completeToolProgress(
  entries: ChatTranscriptEntry[],
  messageId: string,
  toolCallId: string,
): ChatTranscriptEntry[] {
  const provisionalStatusId = `tool-status-pending:${messageId}`
  const statusId = `tool-status:${toolCallId}`
  const started = startToolProgress(entries, messageId)
  return started.map((entry) =>
    entry.id === provisionalStatusId ? { ...entry, id: statusId } : entry,
  )
}

/**
 * Reads the latest transcript snapshot through the component's synchronous updater.
 *
 * @param replaceEntries - Transcript updater that returns the resulting entry list.
 * @returns The current transcript entries without modifying them.
 */
function entriesForHistory(
  replaceEntries: (
    updater: (current: ChatTranscriptEntry[]) => ChatTranscriptEntry[],
  ) => ChatTranscriptEntry[],
): ChatTranscriptEntry[] {
  return replaceEntries((current) => current)
}

/**
 * Converts visible completed entries into bounded model-visible conversation history.
 *
 * @param entries - Complete local transcript, including UI-only statuses.
 * @param excludedStatusId - Current tool status to omit from its own continuation.
 * @returns Up to 50 chronological text and completed tool-status messages.
 */
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

/**
 * Creates the default Willow greeting for an empty conversation.
 *
 * @returns A completed assistant transcript entry.
 */
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

/**
 * Restores a proposal-scoped transcript or creates a new welcome conversation.
 *
 * @param conversationId - Proposal ID or temporary draft conversation ID.
 * @returns Initial entries and an optional non-blocking storage warning.
 */
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

/**
 * Replaces an in-progress tool status with its success or failure summary.
 *
 * @param entry - Existing `filling` status entry.
 * @param result - Complete client-side form-tool result.
 * @returns Updated terminal status entry for the transcript.
 */
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

/**
 * Marks streaming text and in-progress tool entries as interrupted.
 *
 * @param replaceEntries - Synchronous transcript state updater.
 * @param statusText - Message used for an interrupted form-tool status.
 * @returns Nothing.
 */
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

/**
 * Converts unknown stream failures into the chat UI's normalized client error.
 *
 * @param error - Unknown error raised by transport, parsing, or event handling.
 * @returns Existing or newly normalized assistant client error.
 */
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

/**
 * Keeps form-tool progress visible briefly while remaining abortable.
 *
 * @param signal - Abort signal that cancels the presentation delay.
 * @returns A promise that resolves after the minimum progress interval.
 */
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

/**
 * Renders one user or assistant text entry with delivery-state feedback.
 *
 * @param props - Text bubble properties.
 * @param props.entry - User or assistant transcript entry to display.
 * @returns A role-aligned text bubble.
 */
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
          'max-w-[78%] overflow-hidden rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed',
          isUser
            ? 'rounded-br-sm bg-primary text-primary-foreground'
            : 'rounded-bl-sm bg-muted text-foreground',
          entry.delivery === 'interrupted' && 'border border-amber-500/40 opacity-80',
        )}
      >
        {entry.content ? (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={markdownComponents}
            skipHtml
          >
            {entry.content}
          </ReactMarkdown>
        ) : (
          <Loader2 className="size-4 animate-spin" />
        )}
        {entry.delivery === 'interrupted' && (
          <span className="mt-1 block text-xs">Response interrupted</span>
        )}
      </div>
    </div>
  )
}

/**
 * Renders form-tool progress, success, failure, or interruption feedback.
 *
 * @param props - Status bubble properties.
 * @param props.entry - Tool-status transcript entry to display.
 * @returns A status bubble with the appropriate icon and color treatment.
 */
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
