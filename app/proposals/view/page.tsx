import { Suspense } from 'react'
import { ProposalView } from '@/components/proposal-view'

export default function ProposalViewPage() {
  return (
    <Suspense
      fallback={
        <div className="p-10 text-sm text-muted-foreground">Loading proposal…</div>
      }
    >
      <ProposalView />
    </Suspense>
  )
}
