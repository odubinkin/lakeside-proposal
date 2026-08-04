import { VillasCatalog } from '@/components/villas-catalog'

export default function VillasPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <section className="mb-10 flex flex-col gap-4">
        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-medium tracking-wide text-accent-foreground uppercase">
          Phuket Collection · 2026
        </span>
        <h1 className="max-w-2xl font-serif text-4xl font-semibold tracking-tight text-balance text-foreground sm:text-5xl">
          Sustainable luxury villas, ready for your proposal
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-pretty text-muted-foreground">
          Browse the Redwood Lakeside portfolio and build a tailored commercial
          proposal for your client in minutes. Select a residence to begin.
        </p>
      </section>

      <VillasCatalog />
    </div>
  )
}
