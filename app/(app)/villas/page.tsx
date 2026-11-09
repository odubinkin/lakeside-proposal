/**
 * @file Defines the villa-catalog route where managers begin a proposal.
 */

import { VillasCatalog } from '@/components/villas-catalog'

/**
 * Renders the villa catalog introduction and searchable residence collection.
 *
 * @returns The villa-selection page.
 */
export default function VillasPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <section className="mb-10 flex flex-col gap-4">
        <h1 className="max-w-2xl font-serif text-4xl font-semibold tracking-tight text-balance text-foreground sm:text-5xl">
          Sustainable luxury villas, ready for your proposal
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-pretty text-muted-foreground">
          Browse the Avelora Lakeside portfolio and build a tailored commercial
          proposal for your client in minutes. Select a residence to begin.
        </p>
      </section>

      <VillasCatalog />
    </div>
  )
}
