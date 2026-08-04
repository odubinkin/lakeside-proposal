import Link from 'next/link'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProposalsList } from '@/components/proposals-list'
import { proposals } from '@/lib/data'

export default function ProposalsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <section className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="font-serif text-4xl font-semibold tracking-tight text-foreground">
            Proposals
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
            Review, edit and manage the commercial proposals your team has created.
          </p>
        </div>
        <Button
          size="lg"
          nativeButton={false}
          className="h-11 shrink-0 px-4"
          render={
            <Link href="/villas">
              <Plus />
              New proposal
            </Link>
          }
        />
      </section>

      <ProposalsList initial={proposals} />
    </div>
  )
}
