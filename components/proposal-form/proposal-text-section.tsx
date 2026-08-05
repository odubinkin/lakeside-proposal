import { Bot } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { FieldError } from './field-error'

type ProposalTextSectionProps = {
  value: string
  error?: string
  onChange: (value: string) => void
  onFillWithAI: () => void
}

/** Edits the introductory copy shown in the printable proposal. */
export function ProposalTextSection({
  value,
  error,
  onChange,
  onFillWithAI,
}: ProposalTextSectionProps) {
  return (
    <section className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold tracking-tight text-foreground">
            Proposal text
          </h2>
          <p className="text-sm text-muted-foreground">
            Write the introductory offer text. It appears at the top of the
            printable proposal.
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="shrink-0"
          onClick={onFillWithAI}
        >
          <Bot aria-hidden="true" />
          Fill with AI
        </Button>
      </div>
      <Textarea
        id="proposalText"
        aria-label="Proposal text"
        value={value}
        required
        aria-invalid={Boolean(error)}
        aria-describedby={error ? 'proposal-text-error' : undefined}
        onChange={(event) => onChange(event.target.value)}
        rows={6}
        className="min-h-36 aria-invalid:border-destructive aria-invalid:ring-destructive/20"
        placeholder="Dear client, we are delighted to present this residence as an exceptional opportunity…"
      />
      <FieldError id="proposal-text-error">{error}</FieldError>
    </section>
  )
}
