import { FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'

type ProposalActionsProps = {
  isSaving: boolean
  saveError: string
}

/** Renders proposal generation and autosave status. */
export function ProposalActions({
  isSaving,
  saveError,
}: ProposalActionsProps) {
  return (
    <>
      <Button
        type="submit"
        size="lg"
        disabled={isSaving}
        className="mt-2 h-12 w-full text-sm"
      >
        <FileText />
        Generate Proposal
      </Button>

      {saveError && (
        <p className="text-center text-sm text-destructive" role="alert">
          {saveError}
        </p>
      )}
      <p className="text-center text-xs text-muted-foreground">
        Changes are saved automatically. Generate opens a printable proposal.
      </p>
    </>
  )
}
