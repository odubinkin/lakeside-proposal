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
import { Modal } from '@/components/ui/modal'
import { getVilla, formatTHB, type Proposal } from '@/lib/data'
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

export function ProposalsList() {
  const snapshot = React.useSyncExternalStore(
    subscribeProposals,
    getProposalsSnapshot,
    getProposalsServerSnapshot,
  )
  const items = React.useMemo(() => parseProposals(snapshot), [snapshot])
  const [query, setQuery] = React.useState('')
  const [pendingDelete, setPendingDelete] = React.useState<Proposal | null>(null)

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

  function confirmDelete() {
    if (!pendingDelete) return
    deleteProposal(pendingDelete.id)
    setPendingDelete(null)
  }

  if (snapshot === PROPOSALS_SERVER_SNAPSHOT) {
    return (
      <div className="rounded-2xl border border-dashed border-border py-20 text-center text-sm text-muted-foreground">
        Loading proposals…
      </div>
    )
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
            placeholder="Search by villa, client, manager…"
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
            return (
              <li
                key={proposal.id}
                className="flex flex-col gap-5 rounded-2xl border border-border bg-card p-4 shadow-sm sm:flex-row sm:items-center sm:p-5"
              >
              <div className="relative h-28 w-full shrink-0 overflow-hidden rounded-xl sm:h-24 sm:w-36">
                <Image
                  src={villa?.image || '/placeholder.svg'}
                  alt={villa?.name ?? 'Villa'}
                  fill
                  sizes="160px"
                  className="object-cover"
                />
              </div>

              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="rounded-md bg-secondary px-2 py-0.5 font-mono text-xs font-medium text-secondary-foreground">
                    {proposal.id}
                  </span>
                  <h3 className="font-serif text-lg font-semibold tracking-tight text-foreground">
                    {villa?.name ?? 'Villa'}
                  </h3>
                  {villa && (
                    <span className="text-sm text-muted-foreground">
                      {formatTHB(villa.price)}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
                    <span className="inline-flex items-center gap-1.5 font-medium text-foreground">
                      {proposal.clientName}
                    </span>
                    <a
                      href={`tel:${proposal.phone.replace(/\s+/g, '')}`}
                      className="inline-flex items-center gap-1.5 underline-offset-4 transition-colors hover:text-foreground hover:underline"
                    >
                      <Phone className="size-3.5" />
                      {proposal.phone}
                    </a>
                    <a
                      href={`mailto:${proposal.email}`}
                      className="inline-flex items-center gap-1.5 underline-offset-4 transition-colors hover:text-foreground hover:underline"
                    >
                      <Mail className="size-3.5" />
                      {proposal.email}
                    </a>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
                    <span className="inline-flex items-center gap-1.5">
                      <User className="size-3.5" />
                      Manager: {proposal.manager}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays className="size-3.5" />
                      Created: {proposalDateFormatter.format(new Date(`${proposal.createdAt}T00:00:00`))}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-2 sm:flex-col sm:items-stretch lg:flex-row">
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
        className="max-w-md"
        labelledBy="delete-title"
        showClose={false}
      >
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-destructive">
              <TriangleAlert className="size-5" />
            </div>
            <div className="flex flex-col gap-1.5">
              <h2 id="delete-title" className="text-lg font-semibold text-foreground">
                Delete this proposal?
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {pendingDelete
                  ? `Proposal ${pendingDelete.id} for ${pendingDelete.clientName} will be permanently removed. This action cannot be undone.`
                  : ''}
              </p>
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <Button
              variant="outline"
              size="lg"
              className="h-10 px-4"
              onClick={() => setPendingDelete(null)}
            >
              Cancel
            </Button>
            <Button
              size="lg"
              className="h-10 bg-destructive px-4 text-white hover:bg-destructive/90"
              onClick={confirmDelete}
            >
              Confirm
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}
