/**
 * @file Defines the shared form label primitive.
 */

import * as React from 'react'

import { cn } from '@/lib/utils'

/**
 * Renders a native label with consistent project typography and spacing.
 *
 * @param props - Native label properties.
 * @param props.className - Additional classes merged with the label defaults.
 * @returns The styled label element.
 */
function Label({ className, ...props }: React.ComponentProps<'label'>) {
  return (
    <label
      data-slot="label"
      className={cn(
        'mb-1.5 block text-sm font-medium text-foreground select-none',
        className,
      )}
      {...props}
    />
  )
}

export { Label }
