import { fireEvent, render, screen, within } from '@testing-library/react'
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
  completed: true,
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

  it('eager-loads every proposal villa preview', () => {
    const secondProposal: Proposal = {
      ...proposal,
      id: 'PRO-SECOND',
    }
    window.localStorage.setItem(
      PROPOSALS_STORAGE_KEY,
      JSON.stringify([proposal, secondProposal]),
    )

    render(<ProposalsList />)

    const villaPreviews = screen.getAllByRole('img', {
      name: 'Lagoon Residence 6',
    })
    expect(villaPreviews).toHaveLength(2)
    villaPreviews.forEach((preview) => {
      expect(preview).toHaveAttribute('loading', 'eager')
    })
  })

  it('marks incomplete proposals as drafts and hides their View action', () => {
    const draftProposal: Proposal = {
      ...proposal,
      id: 'PRO-DRAFT',
      clientName: 'Draft Client',
      completed: false,
    }
    window.localStorage.setItem(
      PROPOSALS_STORAGE_KEY,
      JSON.stringify([proposal, draftProposal]),
    )

    render(<ProposalsList />)

    const completedItem = screen.getByText(proposal.id).closest('li')
    const draftItem = screen.getByText(draftProposal.id).closest('li')

    expect(completedItem).not.toBeNull()
    expect(draftItem).not.toBeNull()
    expect(within(completedItem!).getByRole('button', { name: 'View' })).toBeInTheDocument()
    expect(within(completedItem!).queryByText('Draft')).not.toBeInTheDocument()
    expect(within(draftItem!).getByText('Draft')).toBeInTheDocument()
    expect(within(draftItem!).queryByRole('button', { name: 'View' })).not.toBeInTheDocument()
  })

  it('does not render empty proposal fields or their icons and labels', () => {
    const emptyFieldsProposal: Proposal = {
      ...proposal,
      id: 'PRO-EMPTY-FIELDS',
      clientName: '   ',
      phone: '',
      email: '  ',
      manager: '\t',
      completed: false,
    }
    window.localStorage.setItem(
      PROPOSALS_STORAGE_KEY,
      JSON.stringify([emptyFieldsProposal]),
    )

    render(<ProposalsList />)

    const item = screen.getByText(emptyFieldsProposal.id).closest('li')

    expect(item).not.toBeNull()
    expect(within(item!).queryByRole('link')).not.toBeInTheDocument()
    expect(within(item!).queryByText(/Manager:/)).not.toBeInTheDocument()
    expect(item!.querySelector('.lucide-phone')).not.toBeInTheDocument()
    expect(item!.querySelector('.lucide-mail')).not.toBeInTheDocument()
    expect(item!.querySelector('.lucide-user')).not.toBeInTheDocument()
    expect(
      [...item!.querySelectorAll('span')].some(
        (element) => element.textContent === emptyFieldsProposal.clientName,
      ),
    ).toBe(false)
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
