import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  canAutosaveProposalForm,
  scrollToFirstInvalidField,
  validateProposalForm,
  type ProposalFormValues,
} from '@/components/proposal-form/proposal-form.utils'

const validValues: ProposalFormValues = {
  villaId: 'lagoon-6',
  clientName: 'Client Name',
  phone: '+66 81 234 5678',
  email: '',
  manager: 'Sales Manager',
  proposalText: 'A complete commercial proposal.',
}

describe('validateProposalForm', () => {
  it('accepts a valid phone-only or email-only contact', () => {
    expect(validateProposalForm(validValues)).toEqual({})
    expect(
      validateProposalForm({
        ...validValues,
        phone: '',
        email: 'client@example.com',
      }),
    ).toEqual({})
  })

  it('reports every missing required field and both missing contacts', () => {
    expect(
      validateProposalForm({
        villaId: 'missing',
        clientName: ' ',
        phone: ' ',
        email: '',
        manager: '',
        proposalText: '\n',
      }),
    ).toEqual({
      villaId: 'Select a villa.',
      clientName: 'Enter the client name.',
      manager: 'Enter the manager name.',
      proposalText: 'Enter the proposal text.',
      phone: 'Enter a phone number or email address.',
      email: 'Enter a phone number or email address.',
    })
  })

  it.each([
    ['1234567', true],
    ['+1 (234) 567-8901', true],
    ['123456', false],
    ['1234567890123456', false],
    ['+66 CALL-NOW', false],
  ])('validates phone %s', (phone, valid) => {
    const errors = validateProposalForm({ ...validValues, phone })
    expect(errors.phone === undefined).toBe(valid)
  })

  it.each([
    ['client@example.com', true],
    [' client@example.com ', true],
    ['client@example', false],
    ['client @example.com', false],
  ])('validates email %s', (email, valid) => {
    const errors = validateProposalForm({ ...validValues, phone: '', email })
    expect(errors.email === undefined).toBe(valid)
  })
})

describe('canAutosaveProposalForm', () => {
  const emptyDraft = {
    villaId: 'lagoon-6',
    clientName: '',
    phone: '',
    email: '',
    manager: '',
    proposalText: '',
    comment: '',
    addOnIds: [],
  }

  it('requires meaningful content beyond the preselected villa', () => {
    expect(canAutosaveProposalForm(emptyDraft)).toBe(false)
    expect(
      canAutosaveProposalForm({ ...emptyDraft, email: 'not-an-email' }),
    ).toBe(false)
  })

  it('accepts valid required values and optional draft fields', () => {
    expect(
      canAutosaveProposalForm({ ...emptyDraft, clientName: 'Draft Client' }),
    ).toBe(true)
    expect(
      canAutosaveProposalForm({ ...emptyDraft, comment: 'Internal note' }),
    ).toBe(true)
    expect(
      canAutosaveProposalForm({ ...emptyDraft, addOnIds: ['furniture'] }),
    ).toBe(true)
  })
})

describe('scrollToFirstInvalidField', () => {
  afterEach(() => {
    document.body.replaceChildren()
  })

  it('scrolls the first off-screen invalid field into view', () => {
    const proposalText = document.createElement('textarea')
    proposalText.id = 'proposalText'
    proposalText.getBoundingClientRect = vi.fn(() =>
      DOMRect.fromRect({
        y: window.innerHeight + 10,
        height: 40,
      }),
    )
    proposalText.scrollIntoView = vi.fn()
    document.body.append(proposalText)

    scrollToFirstInvalidField({ proposalText: 'Required', email: 'Invalid' })

    expect(proposalText.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'center',
    })
  })

  it('does nothing for missing or fully visible fields', () => {
    const email = document.createElement('input')
    email.id = 'email'
    email.getBoundingClientRect = vi.fn(() =>
      DOMRect.fromRect({ y: 10, height: 30 }),
    )
    email.scrollIntoView = vi.fn()
    document.body.append(email)

    scrollToFirstInvalidField({})
    scrollToFirstInvalidField({ clientName: 'Missing element' })
    scrollToFirstInvalidField({ email: 'Invalid' })

    expect(email.scrollIntoView).not.toHaveBeenCalled()
  })
})
