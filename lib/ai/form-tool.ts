/**
 * @file Validates and atomically applies Willow form-tool patches in the browser.
 */

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

/**
 * Validates a model-supplied patch and applies it atomically to a form snapshot.
 *
 * @param oldForm - Current trusted proposal form snapshot.
 * @param input - Untrusted form-tool arguments received from the assistant.
 * @returns A complete success or failure result with old/new snapshots and changed fields.
 */
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

/**
 * Applies a validated partial patch without retaining mutable array references.
 *
 * @param form - Form snapshot to update.
 * @param patch - Validated non-empty editable-field patch.
 * @returns A new complete proposal form snapshot.
 */
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

/**
 * Builds an atomic failure result that leaves the form unchanged.
 *
 * @param form - Original form snapshot retained by the failed update.
 * @param message - Summary of why the patch failed.
 * @param fieldErrors - Optional validation errors keyed by editable field.
 * @returns A failed form-tool result with identical old and new snapshots.
 */
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

/**
 * Converts Zod issues into editable-field validation messages.
 *
 * @param issues - Schema issues produced while parsing tool arguments.
 * @returns Validation messages for recognized proposal form fields.
 */
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
