'use client'

import * as React from 'react'
import { Search, X } from 'lucide-react'
import { VillaCard } from '@/components/villa-card'
import { villas } from '@/lib/data'

export function VillasCatalog() {
  const [query, setQuery] = React.useState('')

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return villas
    return villas.filter((villa) =>
      [villa.name, villa.description, villa.location].some((field) =>
        field.toLowerCase().includes(q),
      ),
    )
  }, [query])

  return (
    <>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
          {filtered.length} of {villas.length} residences
        </h2>

        <div className="relative w-full sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, location…"
            aria-label="Search villas"
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
          <p className="font-serif text-xl text-foreground">No villas found</p>
          <p className="max-w-sm text-sm text-muted-foreground">
            No residences match &ldquo;{query}&rdquo;. Try a different search term.
          </p>
        </div>
      ) : (
        <section
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          aria-label="Villa catalog"
        >
          {filtered.map((villa) => (
            <VillaCard key={villa.id} villa={villa} />
          ))}
        </section>
      )}
    </>
  )
}
