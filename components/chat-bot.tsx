'use client'

import * as React from 'react'
import { Bot, Send, Sparkles, Loader2, CheckCircle2, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal'
import { cn } from '@/lib/utils'

type Message =
  | { id: number; role: 'bot' | 'user'; kind: 'text'; text: string }
  | { id: number; role: 'bot'; kind: 'status'; status: 'filling' | 'done' }

const suggestions = [
  'Fill the form with a sample client',
  'Recommend add-ons for a family buyer',
  'What is included in the Smart Home package?',
]

let idCounter = 100

export function ChatBot({ onAutofill }: { onAutofill: () => void }) {
  const [open, setOpen] = React.useState(false)
  const [input, setInput] = React.useState('')
  const [messages, setMessages] = React.useState<Message[]>([
    {
      id: 1,
      role: 'bot',
      kind: 'text',
      text: "Hi, I'm Willow, your Redwood Lakeside assistant. I can help you complete this proposal, suggest add-ons, or answer questions about the villa.",
    },
  ])
  const scrollRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, open])

  function pushBotReply(text: string) {
    setMessages((prev) => [
      ...prev,
      { id: idCounter++, role: 'bot', kind: 'text', text },
    ])
  }

  function handleSend(raw?: string) {
    const value = (raw ?? input).trim()
    if (!value) return
    setInput('')
    setMessages((prev) => [
      ...prev,
      { id: idCounter++, role: 'user', kind: 'text', text: value },
    ])

    const lower = value.toLowerCase()
    const wantsFill = lower.includes('fill') || lower.includes('sample') || lower.includes('complete')

    if (wantsFill) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { id: idCounter++, role: 'bot', kind: 'status', status: 'filling' },
        ])
      }, 500)
      setTimeout(() => {
        onAutofill()
        setMessages((prev) => [
          ...prev,
          { id: idCounter++, role: 'bot', kind: 'status', status: 'done' },
          {
            id: idCounter++,
            role: 'bot',
            kind: 'text',
            text: "I've filled in the client details and selected a recommended add-on package. Review the form and press Generate Proposal when you're ready.",
          },
        ])
      }, 1900)
    } else if (lower.includes('add-on') || lower.includes('recommend')) {
      setTimeout(
        () =>
          pushBotReply(
            'For a family buyer I usually recommend the Furniture Package, Smart Home and Kitchen Upgrade. They add comfort and resale value while keeping the villa turnkey.',
          ),
        700,
      )
    } else if (lower.includes('smart home')) {
      setTimeout(
        () =>
          pushBotReply(
            'The Smart Home package includes integrated lighting, climate control, security and voice control, all managed from a single app.',
          ),
        700,
      )
    } else {
      setTimeout(
        () =>
          pushBotReply(
            "Happy to help with that. You can ask me to fill in the form, suggest add-ons, or explain any package. What would you like to do?",
          ),
        700,
      )
    }
  }

  return (
    <>
      <Button
        size="lg"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 h-14 gap-2.5 rounded-full px-5 text-sm shadow-lg shadow-primary/25"
      >
        <MessageSquare className="size-5" />
        Chat with assistant
      </Button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        className="flex h-[600px] max-h-[85vh] max-w-md flex-col overflow-hidden p-0"
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
              Online
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="ml-auto"
            onClick={() => setOpen(false)}
          >
            Close
          </Button>
        </header>

        <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
          {messages.map((m) => {
            if (m.kind === 'status') {
              return <StatusBubble key={m.id} status={m.status} />
            }
            const isUser = m.role === 'user'
            return (
              <div
                key={m.id}
                className={cn('flex gap-2.5', isUser ? 'justify-end' : 'justify-start')}
              >
                {!isUser && (
                  <div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
                    <Bot className="size-4" />
                  </div>
                )}
                <div
                  className={cn(
                    'max-w-[78%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed',
                    isUser
                      ? 'rounded-br-sm bg-primary text-primary-foreground'
                      : 'rounded-bl-sm bg-muted text-foreground',
                  )}
                >
                  {m.text}
                </div>
              </div>
            )
          })}
        </div>

        <div className="border-t border-border px-4 pb-4 pt-3">
          <div className="mb-2.5 flex flex-wrap gap-2">
            {suggestions.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => handleSend(s)}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:bg-accent hover:text-accent-foreground"
              >
                <Sparkles className="size-3 text-primary" />
                {s}
              </button>
            ))}
          </div>
          <form
            className="flex items-center gap-2"
            onSubmit={(e) => {
              e.preventDefault()
              handleSend()
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (
                  e.key === 'Enter' &&
                  !e.shiftKey &&
                  !e.nativeEvent.isComposing &&
                  e.keyCode !== 229
                ) {
                  e.preventDefault()
                  handleSend()
                }
              }}
              placeholder="Ask Willow anything…"
              className="h-11 flex-1 rounded-full border border-border bg-background px-4 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30"
              aria-label="Message"
            />
            <Button
              type="submit"
              size="icon-lg"
              className="size-11 shrink-0 rounded-full"
              aria-label="Send message"
              disabled={!input.trim()}
            >
              <Send className="size-4" />
            </Button>
          </form>
        </div>
      </Modal>
    </>
  )
}

function StatusBubble({ status }: { status: 'filling' | 'done' }) {
  return (
    <div className="flex justify-start gap-2.5">
      <div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
        <Bot className="size-4" />
      </div>
      <div
        className={cn(
          'inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-medium',
          status === 'filling'
            ? 'bg-accent text-accent-foreground'
            : 'bg-primary/10 text-primary',
        )}
      >
        {status === 'filling' ? (
          <>
            <Loader2 className="size-3.5 animate-spin" />
            Filling in the form…
          </>
        ) : (
          <>
            <CheckCircle2 className="size-3.5" />
            Form completed
          </>
        )}
      </div>
    </div>
  )
}
