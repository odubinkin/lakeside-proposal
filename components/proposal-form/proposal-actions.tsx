import { Check, FileText, Save as SaveIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

type ProposalActionsProps = {
  isSaving: boolean
  isSaved: boolean
  saveError: string
  onSave: () => void
}

/** Renders proposal generation and save controls with their current status text. */
export function ProposalActions({
  isSaving,
  isSaved,
  saveError,
  onSave,
}: ProposalActionsProps) {
  const saveLabel = isSaved ? 'Proposal saved' : 'Save proposal'

  return (
    <>
      <div
        role="group"
        aria-label="Proposal actions"
        data-slot="button-group"
        className="mt-2 flex w-full"
      >
        <Button
          type="submit"
          size="lg"
          disabled={isSaving}
          className="h-12 min-w-0 flex-1 rounded-r-none border-r border-r-primary-foreground/20 text-sm"
        >
          <FileText />
          Generate Proposal
        </Button>
        <Button
          type="button"
          size="lg"
          disabled={isSaving}
          aria-label={saveLabel}
          title={saveLabel}
          data-save-button
          onClick={onSave}
          className={`h-12 overflow-hidden rounded-l-none border-l border-l-primary-foreground/20 px-0 transition-[width] duration-300 ease-out motion-reduce:transition-none ${
            isSaved ? 'w-24 gap-1.5' : 'w-12 gap-0'
          }`}
        >
          {isSaved ? (
            <>
              <Check className="size-4" />
              <span>Saved</span>
            </>
          ) : (
            <SaveIcon className="size-4" />
          )}
        </Button>
      </div>

      {saveError && (
        <p className="text-center text-sm text-destructive" role="alert">
          {saveError}
        </p>
      )}
      <p className="text-center text-xs text-muted-foreground">
        <span className="proposal-generate-hint">
          Opens a printable proposal in a new tab.
        </span>
        <span className="proposal-save-hint">Saves form changes.</span>
      </p>
    </>
  )
}
