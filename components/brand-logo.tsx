/**
 * @file Provides the reusable Avelora Lakeside logo and optional wordmark component.
 */

import Image from 'next/image'
import { cn } from '@/lib/utils'

/**
 * Renders the brand mark with an optional two-line wordmark.
 *
 * @param props - Brand presentation options.
 * @param props.className - Additional classes for the outer inline container.
 * @param props.wordmarkClassName - Additional classes for the primary wordmark text.
 * @param props.showWordmark - Whether to render the text wordmark beside the image.
 * @param props.size - Width and height of the square logo image in pixels.
 * @returns The configured Avelora Lakeside brand element.
 */
export function BrandLogo({
  className,
  wordmarkClassName,
  showWordmark = true,
  size = 36,
}: {
  className?: string
  wordmarkClassName?: string
  showWordmark?: boolean
  size?: number
}) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <Image
        src="/avelora-lakeside-logo.svg"
        alt="Avelora Lakeside"
        width={size}
        height={size}
        className="h-auto w-auto"
        style={{ width: size, height: size, objectFit: 'contain' }}
        priority
      />
      {showWordmark && (
        <span className="flex flex-col leading-none">
          <span
            className={cn(
              'font-serif text-base font-semibold tracking-tight text-foreground',
              wordmarkClassName,
            )}
          >
            Avelora Lakeside
          </span>
          <span className="text-[11px] font-medium tracking-[0.14em] text-muted-foreground uppercase">
            Phuket
          </span>
        </span>
      )}
    </span>
  )
}
