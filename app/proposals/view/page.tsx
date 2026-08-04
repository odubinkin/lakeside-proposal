import { Suspense } from 'react'
import { ProposalView } from '@/components/proposal-view'
import { ProposalLoading } from '@/components/proposal-loading'

export default function ProposalViewPage() {
  return (
    <Suspense fallback={<ProposalLoading />}>
      <ProposalView />
    </Suspense>
  )
}
