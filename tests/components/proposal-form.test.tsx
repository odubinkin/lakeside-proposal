import { act, fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ProposalForm } from '@/components/proposal-form'
import { PROPOSALS_STORAGE_KEY } from '@/lib/proposal-storage'
import type { Proposal } from '@/lib/data'
import type { ProposalFormPatch } from '@/lib/ai/contracts'
import type { ChatPromptRequest } from '@/components/chat-bot'

let params = new URLSearchParams()

vi.mock('next/navigation', () => ({
  useSearchParams: () => params,
}))

vi.mock('@/components/chat-bot', () => ({
  ChatBot: ({
    onApplyPatch,
    promptRequest,
  }: {
    onApplyPatch: (patch: ProposalFormPatch) => unknown
    promptRequest?: ChatPromptRequest
  }) => (
    <>
      <button
        type="button"
        onClick={() => onApplyPatch({ clientName: 'AI Client' })}
      >
        Apply assistant patch
      </button>
      {promptRequest && (
        <div data-testid="chat-prompt-request">
          {promptRequest.id}:{promptRequest.message}
        </div>
      )}
    </>
  ),
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
  completed: true,
  createdAt: '2026-08-01',
}

async function completeRequiredFields(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText('Proposal text'), 'A tailored proposal')
  await user.type(screen.getByLabelText('Client name'), 'New Client')
  await user.type(screen.getByLabelText('Manager name'), 'Sales Manager')
  await user.type(screen.getByLabelText('Email'), 'client@example.com')
}

function readStored(): Proposal[] {
  return JSON.parse(
    window.localStorage.getItem(PROPOSALS_STORAGE_KEY) ?? '[]',
  ) as Proposal[]
}

describe('ProposalForm', () => {
  let replaceState: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    params = new URLSearchParams('villa=lagoon-6')
    replaceState = vi.spyOn(window.history, 'replaceState')
    vi.spyOn(window.crypto, 'randomUUID').mockReturnValue(
      'abcdef12-1234-4234-8234-123456789abc',
    )
  })

  it('shows client and manager details before the proposal text', () => {
    render(<ProposalForm />)

    const clientDetailsHeading = screen.getByRole('heading', {
      name: 'Client & manager details',
    })
    const proposalTextHeading = screen.getByRole('heading', {
      name: 'Proposal text',
    })

    expect(
      clientDetailsHeading.compareDocumentPosition(proposalTextHeading),
    ).toBe(Node.DOCUMENT_POSITION_FOLLOWING)
  })

  it('removes the manual save control and validates only on generate', async () => {
    const user = userEvent.setup()
    render(<ProposalForm />)

    expect(screen.queryByRole('button', { name: /save proposal/i })).not.toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Generate Proposal' }))

    expect(screen.getByText('Enter the proposal text.')).toBeInTheDocument()
    expect(screen.getByText('Enter the client name.')).toBeInTheDocument()
    expect(screen.getByText('Enter the manager name.')).toBeInTheDocument()
    expect(screen.getAllByText('Enter a phone number or email address.')).toHaveLength(2)
    expect(readStored()).toEqual([])
  })

  it('debounces human text input and saves a partial draft as incomplete', () => {
    vi.useFakeTimers()
    render(<ProposalForm />)

    fireEvent.change(screen.getByLabelText('Client name'), {
      target: { value: 'Draft Client' },
    })
    act(() => vi.advanceTimersByTime(499))
    expect(readStored()).toEqual([])

    act(() => vi.advanceTimersByTime(1))
    expect(readStored()).toHaveLength(1)
    expect(readStored()[0]).toMatchObject({
      id: 'PRO-ABCDEF12',
      clientName: 'Draft Client',
      completed: false,
    })
  })

  it('creates once, updates the same proposal, and marks a valid form complete', () => {
    vi.useFakeTimers()
    render(<ProposalForm />)

    expect(screen.queryByText('PRO-ABCDEF12')).not.toBeInTheDocument()

    fireEvent.change(screen.getByLabelText('Proposal text'), {
      target: { value: 'A tailored proposal' },
    })
    fireEvent.change(screen.getByLabelText('Client name'), {
      target: { value: 'New Client' },
    })
    fireEvent.change(screen.getByLabelText('Manager name'), {
      target: { value: 'Sales Manager' },
    })
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'client@example.com' },
    })
    act(() => vi.advanceTimersByTime(500))

    expect(readStored()).toHaveLength(1)
    expect(readStored()[0]).toMatchObject({
      id: 'PRO-ABCDEF12',
      clientName: 'New Client',
      completed: true,
    })
    expect(replaceState).toHaveBeenCalledOnce()
    expect(replaceState.mock.calls[0]?.[2]).toBe(
      '/proposals/edit?id=PRO-ABCDEF12',
    )
    expect(screen.getByText('PRO-ABCDEF12')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Edit proposal' })).toBeInTheDocument()

    fireEvent.change(screen.getByLabelText('Client name'), {
      target: { value: 'Updated Client' },
    })
    act(() => vi.advanceTimersByTime(500))
    expect(readStored()).toHaveLength(1)
    expect(readStored()[0]).toMatchObject({
      id: 'PRO-ABCDEF12',
      clientName: 'Updated Client',
      completed: true,
    })
    expect(replaceState).toHaveBeenCalledOnce()
  })

  it('saves assistant changes immediately without waiting for the debounce', () => {
    vi.useFakeTimers()
    render(<ProposalForm />)

    fireEvent.click(screen.getByRole('button', { name: 'Apply assistant patch' }))

    expect(readStored()).toHaveLength(1)
    expect(readStored()[0]).toMatchObject({
      clientName: 'AI Client',
      completed: false,
    })
  })

  it('requests the proposal text prompt from the assistant', async () => {
    const user = userEvent.setup()
    render(<ProposalForm />)

    await user.click(screen.getByRole('button', { name: 'Fill with AI' }))
    expect(screen.getByTestId('chat-prompt-request')).toHaveTextContent(
      '1:Fill in the commercial proposal text.',
    )

    await user.click(screen.getByRole('button', { name: 'Fill with AI' }))
    expect(screen.getByTestId('chat-prompt-request')).toHaveTextContent(
      '2:Fill in the commercial proposal text.',
    )
  })

  it('saves and opens a fully valid generated proposal in a protected new tab', async () => {
    const user = userEvent.setup()
    const open = vi.spyOn(window, 'open').mockImplementation(() => null)
    render(<ProposalForm />)
    await completeRequiredFields(user)

    await user.click(screen.getByRole('button', { name: 'Generate Proposal' }))

    expect(readStored()[0]).toMatchObject({ completed: true })
    expect(open).toHaveBeenCalledWith(
      '/proposals/view?id=PRO-ABCDEF12',
      '_blank',
      'noopener,noreferrer',
    )
  })

  it('autosaves an existing proposal without changing its identity', () => {
    vi.useFakeTimers()
    params = new URLSearchParams(`id=${existing.id}`)
    window.localStorage.setItem(PROPOSALS_STORAGE_KEY, JSON.stringify([existing]))
    render(<ProposalForm />)

    expect(screen.getByRole('heading', { name: 'Edit proposal' })).toBeInTheDocument()
    expect(screen.getByText(existing.id)).toBeInTheDocument()
    expect(screen.getByLabelText('Client name')).toHaveValue('Existing Client')
    fireEvent.change(screen.getByLabelText('Client name'), {
      target: { value: 'Edited Client' },
    })
    act(() => vi.advanceTimersByTime(500))

    expect(readStored()[0]).toMatchObject({
      id: existing.id,
      createdAt: existing.createdAt,
      clientName: 'Edited Client',
      completed: true,
    })
    expect(replaceState).not.toHaveBeenCalled()
  })

  it('shows a missing state for an unknown edit identifier', () => {
    params = new URLSearchParams('id=PRO-MISSING')
    render(<ProposalForm />)
    expect(screen.getByRole('heading', { name: 'Proposal not found' })).toBeInTheDocument()
  })

  it('surfaces browser storage failures from autosave', () => {
    vi.useFakeTimers()
    render(<ProposalForm />)
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new DOMException('Quota exceeded', 'QuotaExceededError')
    })

    fireEvent.change(screen.getByLabelText('Comment'), {
      target: { value: 'Save this draft' },
    })
    act(() => vi.advanceTimersByTime(500))

    expect(screen.getByRole('alert')).toHaveTextContent('Unable to save proposal.')
  })
})
