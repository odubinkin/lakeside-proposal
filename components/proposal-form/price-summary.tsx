import type { ReactNode } from 'react'
import { formatTHB, getAddOnPrice, type AddOn } from '@/lib/data'

type PriceSummaryProps = {
  villaPrice: number
  selectedAddOns: AddOn[]
  total: number
  children: ReactNode
}

/** Summarizes the villa, add-on, and total prices alongside form actions. */
export function PriceSummary({
  villaPrice,
  selectedAddOns,
  total,
  children,
}: PriceSummaryProps) {
  return (
    <aside className="lg:sticky lg:top-24 lg:h-fit">
      <div className="proposal-actions flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Price summary
        </h2>

        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Base villa price</span>
          <span className="font-medium text-foreground">
            {formatTHB(villaPrice)}
          </span>
        </div>

        <div className="flex flex-col gap-2 border-t border-border pt-3">
          <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
            Add-ons ({selectedAddOns.length})
          </span>
          {selectedAddOns.length === 0 ? (
            <p className="text-sm text-muted-foreground">No add-ons selected.</p>
          ) : (
            selectedAddOns.map((addOn) => (
              <div
                key={addOn.id}
                className="flex items-center justify-between text-sm"
              >
                <span className="text-foreground">{addOn.name}</span>
                <span className="text-muted-foreground">
                  + {formatTHB(getAddOnPrice(addOn, villaPrice))}
                </span>
              </div>
            ))
          )}
        </div>

        <div className="flex items-center justify-between border-t border-border pt-4">
          <span className="text-sm font-medium text-foreground">Total price</span>
          <span className="font-serif text-2xl font-semibold text-primary">
            {formatTHB(total)}
          </span>
        </div>

        {children}
      </div>
    </aside>
  )
}
