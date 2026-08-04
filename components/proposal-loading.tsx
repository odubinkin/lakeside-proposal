import { Loader2 } from 'lucide-react'

type ProposalLoadingProps = {
  label?: string
  variant?: 'page' | 'section'
}

export function ProposalLoading({
  label = 'Loading proposal',
  variant = 'page',
}: ProposalLoadingProps) {
  return (
    <div
      className={
        variant === 'section'
          ? 'flex min-h-80 items-center justify-center rounded-2xl border border-dashed border-border bg-muted/20'
          : 'flex min-h-screen items-center justify-center bg-muted/40'
      }
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
      <span className="sr-only">{label}</span>
    </div>
  )
}
