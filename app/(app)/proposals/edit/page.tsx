/**
 * @file Exposes the proposal editor route for an existing browser-stored proposal.
 */

import { Suspense } from 'react'
import { ProposalForm } from '@/components/proposal-form'
import { ProposalLoading } from '@/components/proposal-loading'

/**
 * Renders the proposal form in edit mode, with a loading fallback while URL parameters resolve.
 *
 * @returns The edit-proposal route content.
 */
export default function EditProposalPage() {
  return (
    <Suspense fallback={<ProposalLoading label="Loading proposal builder" />}>
      <ProposalForm />
    </Suspense>
  )
}
