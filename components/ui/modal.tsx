/**
 * @file Provides an accessible client-side modal with dismissal and scroll locking.
 */

'use client'

import * as React from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

const focusableSelector = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[contenteditable="true"]',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

/**
 * Displays dialog content above a dismissible backdrop and manages Escape-key handling.
 *
 * @param props - Modal behavior and presentation properties.
 * @param props.open - Whether the modal is mounted and visible.
 * @param props.onClose - Callback invoked by backdrop, close button, or Escape dismissal.
 * @param props.children - Dialog content rendered inside the modal panel.
 * @param props.className - Additional classes applied to the dialog panel.
 * @param props.labelledBy - ID of the element that provides the dialog's accessible name.
 * @param props.describedBy - ID of the element that describes the dialog.
 * @param props.initialFocusRef - Preferred element to focus when the dialog opens.
 * @param props.showClose - Whether to render the top-right close button.
 * @returns The modal dialog when open, otherwise `null`.
 */
export function Modal({
  open,
  onClose,
  children,
  className,
  labelledBy,
  describedBy,
  initialFocusRef,
  showClose = true,
}: {
  open: boolean
  onClose: () => void
  children: React.ReactNode
  className?: string
  labelledBy?: string
  describedBy?: string
  initialFocusRef?: React.RefObject<HTMLElement | null>
  showClose?: boolean
}) {
  const dialogRef = React.useRef<HTMLDivElement>(null)
  const onCloseRef = React.useRef(onClose)

  React.useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  React.useEffect(() => {
    if (!open) return

    const dialog = dialogRef.current
    if (!dialog) return

    const previouslyFocusedElement =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null

    const getFocusableElements = () =>
      Array.from(dialog.querySelectorAll<HTMLElement>(focusableSelector))

    const focusTarget = initialFocusRef?.current ?? getFocusableElements()[0] ?? dialog
    focusTarget.focus()

    /**
     * Closes the modal with Escape and keeps Tab navigation inside the dialog.
     *
     * @param e - Keyboard event dispatched by the document.
     * @returns Nothing.
     */
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onCloseRef.current()
        return
      }

      if (event.key !== 'Tab') return

      const focusableElements = getFocusableElements()
      if (focusableElements.length === 0) {
        event.preventDefault()
        dialog.focus()
        return
      }

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]
      const activeElement = document.activeElement

      if (event.shiftKey) {
        if (activeElement === firstElement || !dialog.contains(activeElement)) {
          event.preventDefault()
          lastElement.focus()
        }
        return
      }

      if (activeElement === lastElement || !dialog.contains(activeElement)) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev

      if (previouslyFocusedElement?.isConnected) {
        previouslyFocusedElement.focus()
      }
    }
  }, [initialFocusRef, open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm animate-in fade-in"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        aria-describedby={describedBy}
        tabIndex={-1}
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
