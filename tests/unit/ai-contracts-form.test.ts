import { describe, expect, it } from 'vitest'
import {
  chatRequestSchema,
  chatStreamEventSchema,
  getChangedFormFields,
  proposalFormPatchSchema,
  proposalFormStateSchema,
  toolContinuationSchema,
} from '@/lib/ai/contracts'
import { executeFormPatch } from '@/lib/ai/form-tool'
import { baseForm, validRequest } from '@/tests/helpers/ai'

describe('AI runtime contracts', () => {
  it('accepts the complete known form and rejects unknown or extra fields', () => {
    expect(proposalFormStateSchema.safeParse(baseForm).success).toBe(true)
    expect(
      proposalFormStateSchema.safeParse({ ...baseForm, villaId: 'missing' }).success,
    ).toBe(false)
    expect(
      proposalFormStateSchema.safeParse({ ...baseForm, secret: 'value' }).success,
    ).toBe(false)
  })

  it('accepts only non-empty allowlisted patches with known unique catalog IDs', () => {
    expect(proposalFormPatchSchema.safeParse({ clientName: '' }).success).toBe(true)
    expect(proposalFormPatchSchema.safeParse({}).success).toBe(false)
    expect(proposalFormPatchSchema.safeParse({ id: 'PRO-1' }).success).toBe(false)
    expect(
      proposalFormPatchSchema.safeParse({ addOnIds: ['furniture', 'furniture'] }).success,
    ).toBe(false)
    expect(proposalFormPatchSchema.safeParse({ villaId: 'unknown' }).success).toBe(false)
  })

  it('rejects unsupported protocol versions, invalid run IDs, and oversized history', () => {
    expect(chatRequestSchema.safeParse(validRequest()).success).toBe(true)
    expect(
      chatRequestSchema.safeParse({ ...validRequest(), protocolVersion: 2 }).success,
    ).toBe(false)
    expect(chatRequestSchema.safeParse({ ...validRequest(), runId: 'bad' }).success).toBe(false)
    expect(
      chatRequestSchema.safeParse({
        ...validRequest(),
        messages: Array.from({ length: 51 }, (_, index) => ({
          id: `m-${index}`,
          role: index === 50 ? 'user' : 'assistant',
          content: 'message',
          createdAt: '2026-08-05T00:00:00.000Z',
        })),
      }).success,
    ).toBe(false)
  })

  it('validates correlated successful and failed continuation snapshots', () => {
    const newForm = { ...baseForm, clientName: 'Updated Client' }
    const continuation = {
      assistantMessageId: 'assistant-1',
      toolCallId: 'tool-1',
      toolName: 'edit_proposal_form' as const,
      arguments: { clientName: 'Updated Client' },
      result: {
        ok: true as const,
        oldForm: baseForm,
        newForm,
        changedFields: ['clientName' as const],
      },
    }
    expect(toolContinuationSchema.safeParse(continuation).success).toBe(true)
    expect(
      chatRequestSchema.safeParse(validRequest({ form: newForm, continuation })).success,
    ).toBe(true)
    expect(
      chatRequestSchema.safeParse(
        validRequest({ form: baseForm, continuation }),
      ).success,
    ).toBe(false)

    const failedContinuation = {
      ...continuation,
      arguments: { clientName: '' },
      result: {
        ok: false as const,
        oldForm: baseForm,
        newForm: baseForm,
        changedFields: [],
        error: {
          code: 'INVALID_TOOL_ARGUMENTS' as const,
          message: 'Invalid client name.',
          fieldErrors: { clientName: 'Enter the client name.' },
        },
      },
    }
    expect(
      chatRequestSchema.safeParse(
        validRequest({ form: baseForm, continuation: failedContinuation }),
      ).success,
    ).toBe(true)
    expect(
      chatRequestSchema.safeParse({
        ...validRequest(),
        continuation: {
          ...failedContinuation,
          result: { ...failedContinuation.result, error: undefined },
        },
      }).success,
    ).toBe(false)
  })

  it('validates stream sequence values and exact event fields', () => {
    const start = {
      protocolVersion: 1,
      runId: validRequest().runId,
      sequence: 0,
      type: 'message_start',
      messageId: 'assistant-1',
    }
    expect(chatStreamEventSchema.safeParse(start).success).toBe(true)
    expect(chatStreamEventSchema.safeParse({ ...start, sequence: -1 }).success).toBe(false)
    expect(chatStreamEventSchema.safeParse({ ...start, extra: true }).success).toBe(false)
  })
})

describe('client form tool execution', () => {
  it('applies only present valid fields and reports changes in canonical order', () => {
    const result = executeFormPatch(baseForm, {
      email: 'new@example.com',
      addOnIds: ['furniture'],
      clientName: 'New Client',
    })
    expect(result.ok).toBe(true)
    expect(result.newForm).toMatchObject({
      addOnIds: ['furniture'],
      clientName: 'New Client',
      email: 'new@example.com',
      manager: baseForm.manager,
    })
    expect(result.changedFields).toEqual(['addOnIds', 'clientName', 'email'])
  })

  it('rejects all fields atomically and reports every invalid changed field', () => {
    const result = executeFormPatch(baseForm, {
      clientName: '',
      manager: '',
      email: 'invalid',
    })
    expect(result.ok).toBe(false)
    expect(result.oldForm).toBe(baseForm)
    expect(result.newForm).toBe(baseForm)
    expect(result.changedFields).toEqual([])
    expect(result.error?.fieldErrors).toEqual({
      clientName: 'Enter the client name.',
      manager: 'Enter the manager name.',
      email: 'Enter a valid email address.',
    })
  })

  it('maps schema failures to changed field errors without mutating the form', () => {
    const result = executeFormPatch(baseForm, {
      villaId: 'missing',
      addOnIds: ['unknown'],
      clientName: 42,
    })
    expect(result.ok).toBe(false)
    expect(result.newForm).toBe(baseForm)
    expect(result.error?.fieldErrors).toEqual({
      villaId: 'Unknown villa ID.',
      addOnIds: 'Unknown add-on ID.',
      clientName: 'Invalid input: expected string, received number',
    })

    const emptyResult = executeFormPatch(baseForm, {})
    expect(emptyResult.ok).toBe(false)
    expect(emptyResult.error?.fieldErrors).toBeUndefined()
  })

  it('does not let invalid omitted fields block a valid changed field', () => {
    const invalidExisting = { ...baseForm, clientName: '' }
    const result = executeFormPatch(invalidExisting, { comment: 'New note' })
    expect(result.ok).toBe(true)
    expect(result.newForm.comment).toBe('New note')
    expect(result.newForm.clientName).toBe('')
  })

  it('detects arrays, unchanged values, and empty values consistently', () => {
    expect(getChangedFormFields(baseForm, { ...baseForm })).toEqual([])
    expect(
      getChangedFormFields(baseForm, { ...baseForm, addOnIds: ['smart-home'] }),
    ).toEqual(['addOnIds'])
    expect(
      getChangedFormFields(baseForm, { ...baseForm, comment: '' }),
    ).toEqual([])
  })
})
