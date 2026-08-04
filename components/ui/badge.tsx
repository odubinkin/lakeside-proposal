/**
 * @file Defines the shared inline badge primitive used for compact status labels.
 */

import * as React from 'react'

import { cn } from '@/lib/utils'

/**
 * Renders a styled span while preserving all native span properties.
 *
 * @param props - Native span properties plus an optional class override.
 * @param props.className - Additional classes merged with the badge defaults.
 * @returns The styled badge element.
 */
function Badge({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="badge"
      className={cn(
        'inline-flex items-center gap-1 rounded-full border border-transparent bg-accent px-2.5 py-0.5 text-xs font-medium text-accent-foreground',
        className,
      )}
      {...props}
    />
  )
}

export { Badge }
