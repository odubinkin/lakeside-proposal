/**
 * @file Provides an accessible client-side modal with dismissal and scroll locking.
 */

'use client'

import * as React from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Displays dialog content above a dismissible backdrop and manages Escape-key handling.
 *
 * @param props - Modal behavior and presentation properties.
 * @param props.open - Whether the modal is mounted and visible.
 * @param props.onClose - Callback invoked by backdrop, close button, or Escape dismissal.
 * @param props.children - Dialog content rendered inside the modal panel.
 * @param props.className - Additional classes applied to the dialog panel.
 * @param props.labelledBy - ID of the element that provides the dialog's accessible name.
 * @param props.showClose - Whether to render the top-right close button.
 * @returns The modal dialog when open, otherwise `null`.
 */
export function Modal({
  open,
  onClose,
  children,
  className,
  labelledBy,
  showClose = true,
}: {
  open: boolean
  onClose: () => void
  children: React.ReactNode
  className?: string
  labelledBy?: string
  showClose?: boolean
}) {
  React.useEffect(() => {
    if (!open) return
    /**
     * Closes the active modal when the user presses Escape.
     *
     * @param e - Keyboard event dispatched by the document.
     * @returns Nothing.
     */
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm animate-in fade-in"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        className={cn(
          'relative z-10 w-full max-w-lg rounded-2xl border border-border bg-card shadow-xl animate-in fade-in zoom-in-95',
          className,
        )}
      >
        {showClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 z-20 rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        )}
        {children}
      </div>
    </div>
  )
}
