import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ProposalForm } from '@/components/proposal-form'
import {
  PROPOSALS_STORAGE_KEY,
} from '@/lib/proposal-storage'
import type { Proposal } from '@/lib/data'

let params = new URLSearchParams()

vi.mock('next/navigation', () => ({
  useSearchParams: () => params,
}))

const existing: Proposal = {
  id: 'PRO-EDIT',
  villaId: 'lagoon-6',
  clientName: 'Existing Client',
  phone: '+66 81 234 5678',
  email: '',
  manager: 'Existing Manager',
  comment: 'Existing note',
  proposalText: 'Existing offer',
  addOnIds: ['furniture'],
  createdAt: '2026-08-01',
}

async function completeRequiredFields(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText('Proposal text'), 'A tailored proposal')
  await user.type(screen.getByLabelText('Client name'), 'New Client')
  await user.type(screen.getByLabelText('Manager name'), 'Sales Manager')
  await user.type(screen.getByLabelText('Email'), 'client@example.com')
}

describe('ProposalForm', () => {
  beforeEach(() => {
    params = new URLSearchParams('villa=lagoon-6')
    vi.spyOn(window.crypto, 'randomUUID').mockReturnValue(
      'abcdef12-1234-4234-8234-123456789abc',
    )
  })

  it('shows validation errors without persisting an invalid form', async () => {
    const user = userEvent.setup()
    render(<ProposalForm />)

    await user.click(screen.getByRole('button', { name: 'Save proposal' }))

    expect(screen.getByText('Enter the proposal text.')).toBeInTheDocument()
    expect(screen.getByText('Enter the client name.')).toBeInTheDocument()
    expect(screen.getByText('Enter the manager name.')).toBeInTheDocument()
    expect(screen.getAllByText('Enter a phone number or email address.')).toHaveLength(2)
    expect(JSON.parse(window.localStorage.getItem(PROPOSALS_STORAGE_KEY) ?? '[]')).toEqual([])
  })

  it('creates once and updates the same proposal on repeated saves', async () => {
    const user = userEvent.setup()
    render(<ProposalForm />)
    await completeRequiredFields(user)

    await user.click(screen.getByRole('button', { name: 'Save proposal' }))
    expect(screen.getByRole('button', { name: 'Proposal saved' })).toBeInTheDocument()
    await user.clear(screen.getByLabelText('Client name'))
    await user.type(screen.getByLabelText('Client name'), 'Updated Client')
    await user.click(screen.getByRole('button', { name: 'Proposal saved' }))

    const stored = JSON.parse(
      window.localStorage.getItem(PROPOSALS_STORAGE_KEY) ?? '[]',
    ) as Proposal[]
    expect(stored).toHaveLength(1)
    expect(stored[0]).toMatchObject({ id: 'PRO-ABCDEF12', clientName: 'Updated Client' })
  })

  it('saves and opens the generated proposal in a protected new tab', async () => {
    const user = userEvent.setup()
    const open = vi.spyOn(window, 'open').mockImplementation(() => null)
    render(<ProposalForm />)
    await completeRequiredFields(user)

    await user.click(screen.getByRole('button', { name: 'Generate Proposal' }))

    expect(open).toHaveBeenCalledWith(
      '/proposals/view?id=PRO-ABCDEF12',
      '_blank',
      'noopener,noreferrer',
    )
  })

  it('loads an existing proposal for editing and preserves identity', async () => {
    const user = userEvent.setup()
    params = new URLSearchParams(`id=${existing.id}`)
    window.localStorage.setItem(PROPOSALS_STORAGE_KEY, JSON.stringify([existing]))
    render(<ProposalForm />)

    expect(screen.getByRole('heading', { name: 'Edit proposal' })).toBeInTheDocument()
    expect(screen.getByLabelText('Client name')).toHaveValue('Existing Client')
    await user.clear(screen.getByLabelText('Client name'))
    await user.type(screen.getByLabelText('Client name'), 'Edited Client')
    await user.click(screen.getByRole('button', { name: 'Save proposal' }))

    const [stored] = JSON.parse(
      window.localStorage.getItem(PROPOSALS_STORAGE_KEY) ?? '[]',
    ) as Proposal[]
    expect(stored).toMatchObject({
      id: existing.id,
      createdAt: existing.createdAt,
      clientName: 'Edited Client',
    })
  })

  it('shows a missing state for an unknown edit identifier', () => {
    params = new URLSearchParams('id=PRO-MISSING')
    render(<ProposalForm />)
    expect(screen.getByRole('heading', { name: 'Proposal not found' })).toBeInTheDocument()
  })

  it('surfaces browser storage failures', async () => {
    const user = userEvent.setup()
    render(<ProposalForm />)
    await completeRequiredFields(user)
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new DOMException('Quota exceeded', 'QuotaExceededError')
    })

    fireEvent.click(screen.getByRole('button', { name: 'Save proposal' }))
    expect(screen.getByRole('alert')).toHaveTextContent('Unable to save proposal.')
  })
})
