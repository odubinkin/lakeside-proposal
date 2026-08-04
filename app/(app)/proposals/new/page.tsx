import { Suspense } from 'react'
import { ProposalForm } from '@/components/proposal-form'

export default function NewProposalPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-6xl px-4 py-20 text-sm text-muted-foreground sm:px-6">
          Loading proposal builder…
        </div>
      }
    >
      <ProposalForm />
    </Suspense>
  )
}
