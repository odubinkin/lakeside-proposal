import Image from 'next/image'
import { MapPin, Maximize } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { formatTHB, villas, type Villa } from '@/lib/data'
import { FieldError } from './field-error'

type VillaSelectorProps = {
  villa: Villa
  villaId: string
  error?: string
  onVillaChange: (villaId: string) => void
}

/** Displays the selected villa and lets the user choose another residence. */
export function VillaSelector({
  villa,
  villaId,
  error,
  onVillaChange,
}: VillaSelectorProps) {
  return (
    <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="relative aspect-[21/9]">
        <Image
          src={villa.image || '/placeholder.svg'}
          alt={villa.name}
          fill
          loading="eager"
          sizes="(max-width: 1024px) 100vw, 720px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
        <div className="absolute bottom-0 left-0 flex w-full flex-col gap-1 p-5 text-primary-foreground">
          <span className="inline-flex w-fit items-center gap-1 rounded-full bg-background/20 px-2.5 py-1 text-xs font-medium backdrop-blur">
            <MapPin className="size-3.5" />
            {villa.location}
          </span>
          <h2 className="font-serif text-2xl font-semibold">{villa.name}</h2>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 p-5">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Maximize className="size-4 text-primary/70" />
            {villa.area} m²
          </span>
          <span>{villa.bedrooms} bedrooms</span>
          <span>{villa.bathrooms} bathrooms</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
            Base price
          </span>
          <span className="font-serif text-xl font-semibold text-foreground">
            {formatTHB(villa.price)}
          </span>
        </div>
      </div>

      <div className="border-t border-border px-5 py-4">
        <Label htmlFor="villa-select">Selected villa</Label>
        <select
          id="villa-select"
          value={villaId}
          required
          aria-invalid={Boolean(error)}
          aria-describedby={error ? 'villa-select-error' : undefined}
          onChange={(event) => onVillaChange(event.target.value)}
          className="h-11 w-full rounded-lg border border-border bg-background px-3.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30"
        >
          {villas.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name} — {formatTHB(option.price)}
            </option>
          ))}
        </select>
        <FieldError id="villa-select-error">{error}</FieldError>
      </div>
    </section>
  )
}
