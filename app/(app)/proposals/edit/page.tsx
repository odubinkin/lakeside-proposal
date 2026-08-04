import { Suspense } from 'react'
import { ProposalForm } from '@/components/proposal-form'
import { ProposalLoading } from '@/components/proposal-loading'

export default function EditProposalPage() {
  return (
    <Suspense fallback={<ProposalLoading label="Loading proposal builder" />}>
      <ProposalForm />
    </Suspense>
  )
}
