import Image from 'next/image'
import Link from 'next/link'
import { BedDouble, Bath, Maximize, MapPin, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { formatTHB, type Villa } from '@/lib/data'

export function VillaCard({ villa }: { villa: Villa }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={villa.image || '/placeholder.svg'}
          alt={`${villa.name} in ${villa.location}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-background/90 px-2.5 py-1 text-xs font-medium text-foreground shadow-sm backdrop-blur">
          <MapPin className="size-3.5 text-primary" />
          {villa.location}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex flex-col gap-1.5">
          <h3 className="font-serif text-xl font-semibold tracking-tight text-foreground">
            {villa.name}
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3">
            {villa.description}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <BedDouble className="size-4 text-primary/70" />
            {villa.bedrooms} beds
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Bath className="size-4 text-primary/70" />
            {villa.bathrooms} baths
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Maximize className="size-4 text-primary/70" />
            {villa.area} m²
          </span>
        </div>

        <div className="villa-card-actions mt-auto flex flex-wrap items-end justify-between gap-3 border-t border-border pt-4">
          <div className="flex flex-col">
            <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              From
            </span>
            <span className="font-serif text-xl font-semibold text-foreground">
              {formatTHB(villa.price)}
            </span>
          </div>
          <Button
            size="lg"
            nativeButton={false}
            className="villa-card-action h-11 px-4"
            render={
              <Link href={`/proposals/new?villa=${villa.id}`}>
                <FileText />
                Create Proposal
              </Link>
            }
          />
        </div>
      </div>
    </article>
  )
}
