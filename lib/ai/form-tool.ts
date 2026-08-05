import {
  getChangedFormFields,
  proposalFormFieldNames,
  proposalFormPatchSchema,
  type ProposalFormField,
  type ProposalFormPatch,
  type ProposalFormState,
  type ToolContinuation,
} from '@/lib/ai/contracts'
import { validateProposalForm } from '@/components/proposal-form/proposal-form.utils'

export type FormToolResult = ToolContinuation['result']

export function executeFormPatch(
  oldForm: ProposalFormState,
  input: unknown,
): FormToolResult {
  const parsed = proposalFormPatchSchema.safeParse(input)
  if (!parsed.success) {
    const fieldErrors = collectSchemaFieldErrors(parsed.error.issues)
    return failedResult(oldForm, 'The requested form changes are invalid.', fieldErrors)
  }

  const patch = parsed.data
  const candidate = applyPatch(oldForm, patch)
  const changedPatchFields = new Set(Object.keys(patch) as ProposalFormField[])
  const validationErrors = validateProposalForm(candidate)
  const fieldErrors: Partial<Record<ProposalFormField, string>> = {}

  for (const field of proposalFormFieldNames) {
    const error = validationErrors[field as keyof typeof validationErrors]
    if (changedPatchFields.has(field) && error) fieldErrors[field] = error
  }

  if (Object.keys(fieldErrors).length > 0) {
    return failedResult(oldForm, 'One or more requested fields are invalid.', fieldErrors)
  }

  return {
    ok: true,
    oldForm,
    newForm: candidate,
    changedFields: getChangedFormFields(oldForm, candidate),
  }
}

function applyPatch(
  form: ProposalFormState,
  patch: ProposalFormPatch,
): ProposalFormState {
  return {
    ...form,
    ...patch,
    addOnIds: patch.addOnIds ? [...patch.addOnIds] : [...form.addOnIds],
  }
}

function failedResult(
  form: ProposalFormState,
  message: string,
  fieldErrors?: Partial<Record<ProposalFormField, string>>,
): FormToolResult {
  return {
    ok: false,
    oldForm: form,
    newForm: form,
    changedFields: [],
    error: {
      code: 'INVALID_TOOL_ARGUMENTS',
      message,
      ...(fieldErrors && Object.keys(fieldErrors).length > 0 ? { fieldErrors } : {}),
    },
  }
}

function collectSchemaFieldErrors(
  issues: Array<{ path: PropertyKey[]; message: string }>,
): Partial<Record<ProposalFormField, string>> {
  const fieldErrors: Partial<Record<ProposalFormField, string>> = {}
  for (const issue of issues) {
    const field = issue.path[0]
    if (
      typeof field === 'string' &&
      proposalFormFieldNames.includes(field as ProposalFormField)
    ) {
      fieldErrors[field as ProposalFormField] = issue.message
    }
  }
  return fieldErrors
}
