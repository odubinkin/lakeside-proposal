/**
 * @file Defines composable card primitives for bordered content surfaces.
 */

import * as React from 'react'

import { cn } from '@/lib/utils'

/**
 * Renders the outer card surface.
 *
 * @param props - Native div properties for the card container.
 * @param props.className - Additional classes merged with the card surface styles.
 * @returns The styled card container.
 */
function Card({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card"
      className={cn(
        'rounded-2xl border border-border bg-card text-card-foreground shadow-sm',
        className,
      )}
      {...props}
    />
  )
}

/**
 * Renders the vertically stacked header region of a card.
 *
 * @param props - Native div properties for the header.
 * @param props.className - Additional classes merged with the header spacing.
 * @returns The card header container.
 */
function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('flex flex-col gap-1 p-6', className)} {...props} />
}

/**
 * Renders the semantic heading used as a card title.
 *
 * @param props - Native heading properties for the title.
 * @param props.className - Additional classes merged with the title typography.
 * @returns The card title heading.
 */
function CardTitle({ className, ...props }: React.ComponentProps<'h3'>) {
  return (
    <h3 className={cn('text-lg font-semibold tracking-tight', className)} {...props} />
  )
}

/**
 * Renders the primary content region of a card.
 *
 * @param props - Native div properties for the content region.
 * @param props.className - Additional classes merged with the content spacing.
 * @returns The card content container.
 */
function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('p-6 pt-0', className)} {...props} />
}

/**
 * Renders the action or metadata footer region of a card.
 *
 * @param props - Native div properties for the footer.
 * @param props.className - Additional classes merged with the footer layout.
 * @returns The card footer container.
 */
function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('flex items-center p-6 pt-0', className)} {...props} />
}

export { Card, CardHeader, CardTitle, CardContent, CardFooter }
