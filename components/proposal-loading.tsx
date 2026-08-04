import { Loader2 } from 'lucide-react'

export function ProposalLoading() {
  return (
    <div
      className="flex min-h-screen items-center justify-center bg-muted/40"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="relative flex size-16 items-center justify-center rounded-full border border-border bg-card shadow-sm">
        <span
          className="absolute inset-2 animate-ping rounded-full bg-primary/10 motion-reduce:animate-none"
          aria-hidden="true"
        />
        <Loader2
          className="relative size-7 animate-spin text-primary motion-reduce:animate-none"
          aria-hidden="true"
        />
      </div>
      <span className="sr-only">Loading proposal</span>
    </div>
  )
}
