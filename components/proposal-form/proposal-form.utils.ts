import { getVilla } from '@/lib/data'

export type ProposalFormErrors = Partial<
  Record<
    'villaId' | 'clientName' | 'phone' | 'email' | 'manager' | 'proposalText',
    string
  >
>

export type ProposalFormValues = {
  villaId: string
  clientName: string
  phone: string
  email: string
  manager: string
  proposalText: string
}

export type AutosaveProposalFormValues = ProposalFormValues & {
  addOnIds: string[]
  comment: string
}

const errorFieldsInPageOrder: Array<
  [keyof ProposalFormErrors, string]
> = [
  ['villaId', 'villa-select'],
  ['proposalText', 'proposalText'],
  ['clientName', 'clientName'],
  ['manager', 'manager'],
  ['phone', 'phone'],
  ['email', 'email'],
]

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phonePattern = /^\+?[0-9()\s.-]+$/

/** Validates the required proposal fields and contact formats. */
export function validateProposalForm({
  villaId,
  clientName,
  phone,
  email,
  manager,
  proposalText,
}: ProposalFormValues): ProposalFormErrors {
  const errors: ProposalFormErrors = {}
  const trimmedPhone = phone.trim()
  const trimmedEmail = email.trim()

  if (!getVilla(villaId)) errors.villaId = 'Select a villa.'
  if (!clientName.trim()) errors.clientName = 'Enter the client name.'
  if (!manager.trim()) errors.manager = 'Enter the manager name.'
  if (!proposalText.trim()) errors.proposalText = 'Enter the proposal text.'

  if (!trimmedPhone && !trimmedEmail) {
    const contactError = 'Enter a phone number or email address.'
    errors.phone = contactError
    errors.email = contactError
  } else {
    if (trimmedPhone) {
      const digitCount = trimmedPhone.replace(/\D/g, '').length
      if (!phonePattern.test(trimmedPhone) || digitCount < 7 || digitCount > 15) {
        errors.phone = 'Enter a valid phone number.'
      }
    }

    if (trimmedEmail && !emailPattern.test(trimmedEmail)) {
      errors.email = 'Enter a valid email address.'
    }
  }

  return errors
}

/** Returns whether the form contains at least one meaningful, valid draft field. */
export function canAutosaveProposalForm(
  values: AutosaveProposalFormValues,
): boolean {
  const errors = validateProposalForm(values)
  const validatedTextFields: Array<
    [keyof ProposalFormErrors, string]
  > = [
    ['proposalText', values.proposalText],
    ['clientName', values.clientName],
    ['manager', values.manager],
    ['phone', values.phone],
    ['email', values.email],
  ]

  return (
    values.addOnIds.length > 0 ||
    Boolean(values.comment.trim()) ||
    validatedTextFields.some(
      ([field, value]) => Boolean(value.trim()) && !errors[field],
    )
  )
}

/** Scrolls the first invalid proposal field into view when needed. */
export function scrollToFirstInvalidField(errors: ProposalFormErrors) {
  const firstInvalidField = errorFieldsInPageOrder.find(
    ([fieldName]) => errors[fieldName],
  )
  if (!firstInvalidField) return

  const field = document.getElementById(firstInvalidField[1])
  if (!field) return

  const { top, bottom } = field.getBoundingClientRect()
  const isFullyVisible = top >= 0 && bottom <= window.innerHeight

  if (!isFullyVisible) {
    field.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
}
