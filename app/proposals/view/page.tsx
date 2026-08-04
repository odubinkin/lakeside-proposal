/**
 * @file Exposes the standalone, print-friendly proposal preview route.
 */

import { Suspense } from 'react'
import { ProposalView } from '@/components/proposal-view'
import { ProposalLoading } from '@/components/proposal-loading'

/**
 * Renders the proposal preview with a loading fallback while query parameters resolve.
 *
 * @returns The proposal-view route content.
 */
export default function ProposalViewPage() {
  return (
    <Suspense fallback={<ProposalLoading />}>
      <ProposalView />
    </Suspense>
  )
}
