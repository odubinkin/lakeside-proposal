import type * as React from 'react'
import {
  Check,
  ChefHat,
  Home,
  Plug,
  Sofa,
  Sun,
  Waves,
} from 'lucide-react'
import { addOns, formatTHB, getAddOnPrice } from '@/lib/data'

const addOnIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  furniture: Sofa,
  'smart-home': Home,
  'smart-pool': Waves,
  solar: Sun,
  'ev-charger': Plug,
  kitchen: ChefHat,
}

type AddOnsSelectorProps = {
  selected: ReadonlySet<string>
  villaPrice: number
  onToggle: (addOnId: string) => void
}

/** Displays the available villa upgrades and their calculated prices. */
export function AddOnsSelector({
  selected,
  villaPrice,
  onToggle,
}: AddOnsSelectorProps) {
  return (
    <section className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
      <div className="mb-4 flex flex-col gap-1">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Additional options
        </h2>
        <p className="text-sm text-muted-foreground">
          Select any upgrades to include. The total updates automatically.
        </p>
      </div>
      <fieldset className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <legend className="sr-only">Additional options (optional)</legend>
        {addOns.map((addOn) => {
          const Icon = addOnIcons[addOn.id] ?? Home
          const active = selected.has(addOn.id)
          const priceMode =
            addOn.price.mode === 'fixed' ? 'fixed' : `${addOn.price.value}%`

          return (
            <button
              key={addOn.id}
              type="button"
              onClick={() => onToggle(addOn.id)}
              aria-pressed={active}
              className={
                'flex items-start gap-3 rounded-xl border p-4 text-left transition-all ' +
                (active
                  ? 'border-primary bg-accent/60 ring-1 ring-primary'
                  : 'border-border bg-background hover:border-primary/40 hover:bg-muted/50')
              }
            >
              <span
                className={
                  'flex size-9 shrink-0 items-center justify-center rounded-lg ' +
                  (active
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-primary')
                }
              >
                {active ? (
                  <Check className="size-4" />
                ) : (
                  <Icon className="size-4" />
                )}
              </span>
              <span className="flex flex-1 flex-col gap-0.5">
                <span className="flex items-center justify-between gap-2">
                  <span className="text-sm font-medium text-foreground">
                    {addOn.name}
                  </span>
                </span>
                <span className="text-xs leading-relaxed text-muted-foreground">
                  {addOn.description}
                </span>
                <span className="mt-1 text-sm font-semibold text-primary">
                  + {formatTHB(getAddOnPrice(addOn, villaPrice))} ({priceMode})
                </span>
              </span>
            </button>
          )
        })}
      </fieldset>
    </section>
  )
}
