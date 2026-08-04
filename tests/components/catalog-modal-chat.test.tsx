import * as React from 'react'
import { act, fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { ChatBot } from '@/components/chat-bot'
import { Modal } from '@/components/ui/modal'
import { VillasCatalog } from '@/components/villas-catalog'

describe('VillasCatalog', () => {
  it('filters by name and location, shows an empty state, and clears search', async () => {
    const user = userEvent.setup()
    render(<VillasCatalog />)

    expect(screen.getByText('6 of 6 residences')).toBeInTheDocument()
    await user.type(screen.getByLabelText('Search villas'), 'Kamala')
    expect(screen.getByText('Canopy Hill Villa')).toBeInTheDocument()
    expect(screen.queryByText('Lagoon Residence 6')).not.toBeInTheDocument()

    await user.clear(screen.getByLabelText('Search villas'))
    await user.type(screen.getByLabelText('Search villas'), 'does not exist')
    expect(screen.getByText('No villas found')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Clear search' }))
    expect(screen.getByText('6 of 6 residences')).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: /Create Proposal/ })[0]).toHaveAttribute(
      'href',
      '/proposals/new?villa=lagoon-6',
    )
  })
})

describe('Modal', () => {
  it('locks scrolling and closes from Escape, backdrop, and close control', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    const { rerender } = render(
      <Modal open onClose={onClose} labelledBy="dialog-title">
        <h2 id="dialog-title">Example dialog</h2>
      </Modal>,
    )

    expect(screen.getByRole('dialog', { name: 'Example dialog' })).toBeInTheDocument()
    expect(document.body.style.overflow).toBe('hidden')
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(onClose).toHaveBeenCalledOnce()
    await user.click(screen.getByRole('button', { name: 'Close' }))
    expect(onClose).toHaveBeenCalledTimes(2)
    fireEvent.click(screen.getByRole('dialog').previousElementSibling!)
    expect(onClose).toHaveBeenCalledTimes(3)

    rerender(
      <Modal open={false} onClose={onClose} labelledBy="dialog-title">
        <h2 id="dialog-title">Example dialog</h2>
      </Modal>,
    )
    expect(document.body.style.overflow).toBe('')
  })
})

describe('ChatBot', () => {
  it('handles recommendation, package, fallback, and autofill branches', () => {
    vi.useFakeTimers()
    const onAutofill = vi.fn()
    render(<ChatBot onAutofill={onAutofill} />)
    fireEvent.click(screen.getByRole('button', { name: 'Chat with assistant' }))

    fireEvent.click(
      screen.getByRole('button', { name: 'Recommend add-ons for a family buyer' }),
    )
    act(() => vi.advanceTimersByTime(700))
    expect(screen.getByText(/Furniture Package, Smart Home and Kitchen Upgrade/)).toBeInTheDocument()

    fireEvent.click(
      screen.getByRole('button', { name: 'What is included in the Smart Home package?' }),
    )
    act(() => vi.advanceTimersByTime(700))
    expect(screen.getByText(/integrated lighting, climate control/)).toBeInTheDocument()

    fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'Hello' } })
    fireEvent.submit(screen.getByLabelText('Message').closest('form')!)
    act(() => vi.advanceTimersByTime(700))
    expect(screen.getByText(/Happy to help with that/)).toBeInTheDocument()

    fireEvent.click(
      screen.getByRole('button', { name: 'Fill the form with a sample client' }),
    )
    act(() => vi.advanceTimersByTime(500))
    expect(screen.getByText('Filling in the form…')).toBeInTheDocument()
    act(() => vi.advanceTimersByTime(1400))
    expect(onAutofill).toHaveBeenCalledOnce()
    expect(screen.getByText('Form completed')).toBeInTheDocument()
  })
})
