/**
 * @file Exposes the route used to create a new villa proposal.
 */

import { Suspense } from 'react'
import { ProposalForm } from '@/components/proposal-form'
import { ProposalLoading } from '@/components/proposal-loading'

/**
 * Renders the proposal builder for a new proposal and provides its Suspense fallback.
 *
 * @returns The new-proposal route content.
 */
export default function NewProposalPage() {
  return (
    <Suspense fallback={<ProposalLoading label="Loading proposal builder" />}>
      <ProposalForm />
    </Suspense>
  )
}
