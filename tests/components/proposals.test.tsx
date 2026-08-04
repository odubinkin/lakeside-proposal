import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ProposalView } from '@/components/proposal-view'
import { ProposalsList } from '@/components/proposals-list'
import type { Proposal } from '@/lib/data'
import { PROPOSALS_STORAGE_KEY } from '@/lib/proposal-storage'

let params = new URLSearchParams()

vi.mock('next/navigation', () => ({
  useSearchParams: () => params,
}))

const proposal: Proposal = {
  id: 'PRO-TEST',
  villaId: 'lagoon-6',
  clientName: 'Alice Buyer',
  phone: '+66 81 234 5678',
  email: 'alice@example.com',
  manager: 'Morgan Seller',
  comment: 'Ready to proceed',
  proposalText: 'A tailored lakeside offer.',
  addOnIds: ['furniture', 'smart-home'],
  createdAt: '2026-08-01',
}

describe('proposal management and view', () => {
  beforeEach(() => {
    params = new URLSearchParams()
    window.localStorage.setItem(PROPOSALS_STORAGE_KEY, JSON.stringify([proposal]))
  })

  it('searches proposal fields and clears the query', async () => {
    const user = userEvent.setup()
    render(<ProposalsList />)
    expect(screen.getByText('Alice Buyer')).toBeInTheDocument()
    expect(screen.getByText(/46,125,000/)).toBeInTheDocument()

    await user.type(screen.getByLabelText('Search proposals'), 'no match')
    expect(screen.getByText('No proposals found')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Clear search' }))
    expect(screen.getByText('Alice Buyer')).toBeInTheDocument()

    await user.type(screen.getByLabelText('Search proposals'), 'morgan')
    expect(screen.getByText('Alice Buyer')).toBeInTheDocument()
  })

  it('traps focus, restores the trigger, and supports every deletion outcome', async () => {
    const user = userEvent.setup()
    render(<ProposalsList />)

    const deleteTrigger = screen.getByRole('button', { name: 'Delete' })
    await user.click(deleteTrigger)
    expect(screen.getByRole('dialog', { name: 'Delete proposal?' })).toBeInTheDocument()
    const cancelButton = screen.getByRole('button', { name: 'Cancel' })
    const confirmButton = screen.getByRole('button', { name: 'Delete proposal' })

    expect(cancelButton).toHaveFocus()
    await user.tab({ shift: true })
    expect(confirmButton).toHaveFocus()
    await user.tab()
    expect(cancelButton).toHaveFocus()

    fireEvent.keyDown(document, { key: 'Escape' })
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(deleteTrigger).toHaveFocus()

    await user.click(deleteTrigger)
    await user.click(screen.getByRole('button', { name: 'Cancel' }))
    expect(screen.getByText('Alice Buyer')).toBeInTheDocument()
    expect(deleteTrigger).toHaveFocus()

    await user.click(deleteTrigger)
    await user.click(screen.getByRole('button', { name: 'Delete proposal' }))
    expect(screen.getByText('No proposals yet')).toBeInTheDocument()
  })

  it('renders a complete printable proposal and invokes print', async () => {
    const user = userEvent.setup()
    const print = vi.spyOn(window, 'print').mockImplementation(() => undefined)
    params = new URLSearchParams(`id=${proposal.id}`)
    render(<ProposalView />)

    expect(screen.getByText('Prepared for Alice Buyer by Morgan Seller')).toBeInTheDocument()
    expect(screen.getByText('Furniture Package')).toBeInTheDocument()
    expect(screen.getByText('Smart Home')).toBeInTheDocument()
    expect(screen.getByText(/46,125,000/)).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Print proposal' }))
    expect(print).toHaveBeenCalledOnce()
  })

  it('renders a missing state for absent proposal identifiers', () => {
    params = new URLSearchParams('id=PRO-MISSING')
    render(<ProposalView />)
    expect(screen.getByRole('heading', { name: 'Proposal not found' })).toBeInTheDocument()
  })
})
