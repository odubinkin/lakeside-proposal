/**
 * @file Provides searchable proposal management, calculated totals, and deletion confirmation.
 */

'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  CalendarDays,
  Eye,
  Mail,
  Pencil,
  Phone,
  Search,
  Trash2,
  TriangleAlert,
  User,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Modal } from '@/components/ui/modal'
import { ProposalLoading } from '@/components/proposal-loading'
import {
  getAddOnPrice,
  getAddOns,
  getVilla,
  formatTHB,
  type Proposal,
} from '@/lib/data'
import {
  deleteProposal,
  getProposalsServerSnapshot,
  getProposalsSnapshot,
  parseProposals,
  PROPOSALS_SERVER_SNAPSHOT,
  subscribeProposals,
} from '@/lib/proposal-storage'

const proposalDateFormatter = new Intl.DateTimeFormat('en-GB', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
})

/**
 * Renders browser-stored proposals with search, view, edit, and delete actions.
 *
 * @returns The synchronized proposal list, an empty/loading state, and deletion modal.
 */
export function ProposalsList() {
  const snapshot = React.useSyncExternalStore(
    subscribeProposals,
    getProposalsSnapshot,
    getProposalsServerSnapshot,
  )
  const items = React.useMemo(() => parseProposals(snapshot), [snapshot])
  const [query, setQuery] = React.useState('')
  const [pendingDelete, setPendingDelete] = React.useState<Proposal | null>(null)
  const cancelDeleteButtonRef = React.useRef<HTMLButtonElement>(null)

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return items

    return items.filter((proposal) => {
      const villa = getVilla(proposal.villaId)

      return [
        proposal.id,
        villa?.name,
        villa?.location,
        proposal.clientName,
        proposal.manager,
        proposal.phone,
        proposal.email,
      ].some((field) => field?.toLowerCase().includes(q))
    })
  }, [items, query])

  /**
   * Permanently removes the proposal currently selected in the confirmation modal.
   *
   * @returns Nothing.
   */
  function confirmDelete() {
    if (!pendingDelete) return
    deleteProposal(pendingDelete.id)
    setPendingDelete(null)
  }

  if (snapshot === PROPOSALS_SERVER_SNAPSHOT) {
    return <ProposalLoading label="Loading proposals" variant="section" />
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border py-20 text-center">
        <p className="font-serif text-xl text-foreground">No proposals yet</p>
        <p className="max-w-sm text-sm text-muted-foreground">
          Create your first commercial proposal from the villa catalog.
        </p>
        <Button
          size="lg"
          nativeButton={false}
          className="mt-2 h-11 px-4"
          render={<Link href="/villas">Browse villas</Link>}
        />
      </div>
    )
  }

  return (
    <>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
          {filtered.length} of {items.length} proposals
        </h2>

        <div className="relative w-full sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by ID, villa, client, manager…"
            aria-label="Search proposals"
            className="h-11 w-full rounded-xl border border-border bg-card pl-9 pr-9 text-sm text-foreground shadow-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label="Clear search"
              className="absolute right-2 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <X className="size-4" />
            </button>
          )}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-border py-20 text-center">
          <p className="font-serif text-xl text-foreground">No proposals found</p>
          <p className="max-w-sm text-sm text-muted-foreground">
            No proposals match &ldquo;{query}&rdquo;. Try a different search term.
          </p>
        </div>
      ) : (
        <ul className="flex flex-col gap-4">
          {filtered.map((proposal) => {
            const villa = getVilla(proposal.villaId)
            const clientName = proposal.clientName.trim()
            const phone = proposal.phone.trim()
            const email = proposal.email.trim()
            const manager = proposal.manager.trim()
            const total = villa
              ? villa.price +
                getAddOns(proposal.addOnIds).reduce(
                  (sum, addOn) => sum + getAddOnPrice(addOn, villa.price),
                  0,
                )
              : 0
            return (
              <li
                key={proposal.id}
                className="flex flex-col gap-5 rounded-2xl border border-border bg-card p-4 shadow-sm sm:flex-row sm:items-center sm:p-5"
              >
              <div className="relative h-28 w-full shrink-0 overflow-hidden rounded-xl sm:h-28 sm:w-40">
                <Image
                  src={villa?.image || '/placeholder.svg'}
                  alt={villa?.name ?? 'Villa'}
                  fill
                  loading="eager"
                  sizes="160px"
                  className="object-cover"
                />
              </div>

              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <div className="-ml-2 flex flex-wrap items-center gap-2">
                  <span className="rounded-md bg-secondary px-2 py-0.5 font-mono text-xs font-bold text-secondary-foreground">
                    {proposal.id}
                  </span>
                  {!proposal.completed && (
                    <Badge className="border-amber-300 bg-amber-100 font-bold text-amber-800">
                      Draft
                    </Badge>
                  )}
                </div>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="font-serif text-lg font-semibold tracking-tight text-foreground">
                    {villa?.name ?? 'Villa'}
                  </h3>
                  {villa && (
                    <span className="text-sm text-muted-foreground">
                      {formatTHB(total)}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                  {(clientName || phone || email) && (
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
                      {clientName && (
                        <span className="inline-flex items-center gap-1.5 font-medium text-foreground">
                          {clientName}
                        </span>
                      )}
                      {phone && (
                        <a
                          href={`tel:${phone.replace(/\s+/g, '')}`}
                          className="inline-flex items-center gap-1.5 underline-offset-4 transition-colors hover:text-foreground hover:underline"
                        >
                          <Phone className="size-3.5" />
                          {phone}
                        </a>
                      )}
                      {email && (
                        <a
                          href={`mailto:${email}`}
                          className="inline-flex items-center gap-1.5 underline-offset-4 transition-colors hover:text-foreground hover:underline"
                        >
                          <Mail className="size-3.5" />
                          {email}
                        </a>
                      )}
                    </div>
                  )}
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
                    {manager && (
                      <span className="inline-flex items-center gap-1.5">
                        <User className="size-3.5" />
                        Manager: {manager}
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays className="size-3.5" />
                      Created: {proposalDateFormatter.format(new Date(`${proposal.createdAt}T00:00:00`))}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-2 sm:flex-col sm:items-stretch lg:flex-row">
                {proposal.completed && (
                  <Button
                    variant="outline"
                    size="lg"
                    nativeButton={false}
                    className="h-10 flex-1 px-3 sm:h-auto sm:py-1.5 lg:h-10 lg:py-0"
                    render={
                      <a
                        href={`/proposals/view?id=${proposal.id}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Eye />
                        View
                      </a>
                    }
                  />
                )}
                <Button
                  variant="secondary"
                  size="lg"
                  nativeButton={false}
                  className="h-10 flex-1 px-3 sm:h-auto sm:py-1.5 lg:h-10 lg:py-0"
                  render={
                    <Link href={`/proposals/edit?id=${proposal.id}`}>
                      <Pencil />
                      Edit
                    </Link>
                  }
                />
                <Button
                  variant="destructive"
                  size="lg"
                  className="h-10 flex-1 px-3 sm:h-auto sm:py-1.5 lg:h-10 lg:py-0"
                  onClick={() => setPendingDelete(proposal)}
                >
                  <Trash2 />
                  Delete
                </Button>
              </div>
              </li>
            )
          })}
        </ul>
      )}

      <Modal
        open={pendingDelete !== null}
        onClose={() => setPendingDelete(null)}
        className="max-w-[460px] overflow-hidden"
        labelledBy="delete-title"
        describedBy="delete-description"
        initialFocusRef={cancelDeleteButtonRef}
        showClose={false}
      >
        <div>
          <div className="border-b border-border bg-gradient-to-br from-destructive/[0.08] via-card to-card px-6 py-5 sm:px-7 sm:py-6">
            <div className="flex items-start gap-4">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-destructive/20 bg-destructive/10 text-destructive shadow-sm">
                <Trash2 className="size-5" />
              </div>
              <div className="flex min-w-0 flex-col gap-1.5">
                <h2
                  id="delete-title"
                  className="font-serif text-xl font-semibold tracking-tight text-foreground"
                >
                  Delete proposal?
                </h2>
                <p
                  id="delete-description"
                  className="text-sm leading-relaxed text-muted-foreground"
                >
                  This proposal will be permanently removed from your saved proposals.
                </p>
              </div>
            </div>
          </div>

          <div className="px-6 py-5 sm:px-7">
            <div className="rounded-xl border border-border/80 bg-muted/40 px-4 py-3">
              <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                Proposal
              </p>
              <div className="mt-1 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <span className="font-mono text-sm font-semibold text-foreground">
                  {pendingDelete?.id}
                </span>
                <span className="text-sm text-muted-foreground">
                  {pendingDelete ? `for ${pendingDelete.clientName}` : ''}
                </span>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 text-sm font-medium text-destructive">
              <TriangleAlert className="size-4 shrink-0" />
              <p>This action cannot be undone.</p>
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t border-border bg-muted/20 px-6 py-4 sm:flex-row sm:justify-end sm:px-7">
            <Button
              ref={cancelDeleteButtonRef}
              variant="outline"
              size="lg"
              className="h-10 w-full px-4 sm:w-auto"
              onClick={() => setPendingDelete(null)}
            >
              Cancel
            </Button>
            <Button
              size="lg"
              variant="destructive"
              className="h-10 w-full bg-destructive px-4 text-white shadow-sm hover:bg-destructive/90 sm:w-auto"
              onClick={confirmDelete}
            >
              <Trash2 />
              Delete proposal
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}
