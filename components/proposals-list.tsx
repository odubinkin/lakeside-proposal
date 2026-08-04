'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Eye, Pencil, Trash2, Phone, Mail, User, TriangleAlert } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal'
import { getVilla, formatTHB, type Proposal } from '@/lib/data'

export function ProposalsList({ initial }: { initial: Proposal[] }) {
  const [items, setItems] = React.useState(initial)
  const [pendingDelete, setPendingDelete] = React.useState<Proposal | null>(null)

  function confirmDelete() {
    if (!pendingDelete) return
    setItems((prev) => prev.filter((p) => p.id !== pendingDelete.id))
    setPendingDelete(null)
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
      <ul className="flex flex-col gap-4">
        {items.map((proposal) => {
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

                <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5 font-medium text-foreground">
                    {proposal.clientName}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Phone className="size-3.5" />
                    {proposal.phone}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Mail className="size-3.5" />
                    {proposal.email}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <User className="size-3.5" />
                    Manager: {proposal.manager}
                  </span>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-2 sm:flex-col sm:items-stretch lg:flex-row">
                <Button
                  variant="outline"
                  size="lg"
                  nativeButton={false}
                  className="h-10 flex-1 px-3"
                  render={
                    <a
                      href={`/proposal/view?id=${proposal.id}`}
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
                  className="h-10 flex-1 px-3"
                  render={
                    <Link href={`/proposals/new?edit=${proposal.id}`}>
                      <Pencil />
                      Edit
                    </Link>
                  }
                />
                <Button
                  variant="destructive"
                  size="lg"
                  className="h-10 flex-1 px-3"
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
