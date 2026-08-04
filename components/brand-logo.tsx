import Image from 'next/image'
import { cn } from '@/lib/utils'

export function BrandLogo({
  className,
  showWordmark = true,
  size = 36,
}: {
  className?: string
  showWordmark?: boolean
  size?: number
}) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <Image
        src="/redwood-lakeside-logo.png"
        alt="Redwood Lakeside"
        width={size}
        height={size}
        className="h-auto w-auto"
        style={{ width: size, height: size, objectFit: 'contain' }}
        priority
      />
      {showWordmark && (
        <span className="flex flex-col leading-none">
          <span className="font-serif text-base font-semibold tracking-tight text-foreground">
            Redwood Lakeside
          </span>
          <span className="text-[11px] font-medium tracking-[0.14em] text-muted-foreground uppercase">
            Phuket
          </span>
        </span>
      )}
    </span>
  )
}
