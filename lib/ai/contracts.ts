import { z } from 'zod'
import { addOns, villas } from '@/lib/data'

export const AI_PROTOCOL_VERSION = 1 as const
export const EDIT_PROPOSAL_FORM_TOOL = 'edit_proposal_form' as const
export const GENERIC_COMMUNICATION_ERROR =
  'Communication error with the assistant. Please try again later.'

export const proposalFormFieldNames = [
  'villaId',
  'addOnIds',
  'proposalText',
  'clientName',
  'manager',
  'phone',
  'email',
  'comment',
] as const

export type ProposalFormField = (typeof proposalFormFieldNames)[number]

export const proposalFormFieldLabels: Record<ProposalFormField, string> = {
  villaId: 'Villa',
  addOnIds: 'Add-ons',
  proposalText: 'Proposal text',
  clientName: 'Client name',
  manager: 'Manager',
  phone: 'Phone',
  email: 'Email',
  comment: 'Comment',
}

const villaIds = new Set(villas.map(({ id }) => id))
const addOnIds = new Set(addOns.map(({ id }) => id))

const knownVillaIdSchema = z
  .string()
  .refine((id) => villaIds.has(id), 'Unknown villa ID.')

const knownAddOnIdsSchema = z
  .array(z.string())
  .refine((ids) => new Set(ids).size === ids.length, 'Add-on IDs must be unique.')
  .refine((ids) => ids.every((id) => addOnIds.has(id)), 'Unknown add-on ID.')

export const proposalFormStateSchema = z
  .object({
    villaId: knownVillaIdSchema,
    addOnIds: knownAddOnIdsSchema,
    proposalText: z.string(),
    clientName: z.string(),
    manager: z.string(),
    phone: z.string(),
    email: z.string(),
    comment: z.string(),
  })
  .strict()

export type ProposalFormState = z.infer<typeof proposalFormStateSchema>

export const proposalFormPatchSchema = z
  .object({
    villaId: knownVillaIdSchema.optional(),
    addOnIds: knownAddOnIdsSchema.optional(),
    proposalText: z.string().optional(),
    clientName: z.string().optional(),
    manager: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().optional(),
    comment: z.string().optional(),
  })
  .strict()
  .refine((patch) => Object.keys(patch).length > 0, 'At least one field is required.')

export type ProposalFormPatch = z.infer<typeof proposalFormPatchSchema>

export const chatHistoryMessageSchema = z
  .object({
    id: z.string().min(1),
    role: z.enum(['user', 'assistant']),
    content: z.string(),
    createdAt: z.string().datetime(),
  })
  .strict()

export type ChatHistoryMessage = z.infer<typeof chatHistoryMessageSchema>

const formFieldSchema = z.enum(proposalFormFieldNames)

const toolResultErrorSchema = z
  .object({
    code: z.enum(['INVALID_TOOL_ARGUMENTS', 'FORM_UPDATE_FAILED']),
    message: z.string().min(1),
    fieldErrors: z.partialRecord(formFieldSchema, z.string()).optional(),
  })
  .strict()

export const toolContinuationSchema = z
  .object({
    assistantMessageId: z.string().min(1),
    toolCallId: z.string().min(1),
    toolName: z.literal(EDIT_PROPOSAL_FORM_TOOL),
    arguments: proposalFormPatchSchema,
    result: z
      .object({
        ok: z.boolean(),
        oldForm: proposalFormStateSchema,
        newForm: proposalFormStateSchema,
        changedFields: z.array(formFieldSchema),
        error: toolResultErrorSchema.optional(),
      })
      .strict(),
  })
  .strict()

export type ToolContinuation = z.infer<typeof toolContinuationSchema>

export const chatRequestSchema = z
  .object({
    protocolVersion: z.literal(AI_PROTOCOL_VERSION),
    runId: z.string().uuid(),
    form: proposalFormStateSchema,
    messages: z.array(chatHistoryMessageSchema).max(50),
    continuation: toolContinuationSchema.optional(),
  })
  .strict()
  .superRefine((request, context) => {
    if (!request.continuation) {
      if (request.messages.at(-1)?.role !== 'user') {
        context.addIssue({
          code: 'custom',
          path: ['messages'],
          message: 'The latest message must be from the user.',
        })
      }
      return
    }

    const { arguments: patch, result } = request.continuation
    const expectedNewForm = { ...result.oldForm, ...patch }
    const expectedChangedFields = getChangedFormFields(result.oldForm, expectedNewForm)

    if (!formsEqual(request.form, result.newForm)) {
      context.addIssue({
        code: 'custom',
        path: ['continuation', 'result', 'newForm'],
        message: 'Continuation form snapshots are inconsistent.',
      })
    }

    if (result.ok) {
      if (result.error || !formsEqual(expectedNewForm, result.newForm)) {
        context.addIssue({
          code: 'custom',
          path: ['continuation', 'result'],
          message: 'Successful tool result does not match its patch.',
        })
      }
      if (!fieldListsEqual(expectedChangedFields, result.changedFields)) {
        context.addIssue({
          code: 'custom',
          path: ['continuation', 'result', 'changedFields'],
          message: 'Changed fields do not match the form snapshots.',
        })
      }
    } else if (
      !result.error ||
      !formsEqual(result.oldForm, result.newForm) ||
      result.changedFields.length > 0
    ) {
      context.addIssue({
        code: 'custom',
        path: ['continuation', 'result'],
        message: 'Failed tool results must leave the form unchanged.',
      })
    }
  })

export type ChatRequest = z.infer<typeof chatRequestSchema>

export const chatErrorCodeSchema = z.enum([
  'INVALID_REQUEST',
  'ASSISTANT_COMMUNICATION_ERROR',
  'ASSISTANT_PROTOCOL_ERROR',
  'INTERNAL_ERROR',
])

export type ChatErrorCode = z.infer<typeof chatErrorCodeSchema>

const streamEnvelopeSchema = z
  .object({
    protocolVersion: z.literal(AI_PROTOCOL_VERSION),
    runId: z.string().uuid(),
    sequence: z.number().int().nonnegative(),
  })
  .passthrough()

export const chatStreamEventSchema = z.discriminatedUnion('type', [
  streamEnvelopeSchema.extend({
    type: z.literal('message_start'),
    messageId: z.string().min(1),
  }).strict(),
  streamEnvelopeSchema.extend({
    type: z.literal('message_delta'),
    messageId: z.string().min(1),
    delta: z.string(),
  }).strict(),
  streamEnvelopeSchema.extend({
    type: z.literal('tool_call'),
    messageId: z.string().min(1),
    toolCallId: z.string().min(1),
    name: z.literal(EDIT_PROPOSAL_FORM_TOOL),
    arguments: proposalFormPatchSchema,
  }).strict(),
  streamEnvelopeSchema.extend({
    type: z.literal('message_end'),
    messageId: z.string().min(1),
    finishReason: z.enum(['stop', 'tool_call']),
  }).strict(),
  streamEnvelopeSchema.extend({
    type: z.literal('error'),
    code: chatErrorCodeSchema,
    message: z.string(),
    retryable: z.boolean(),
    messageId: z.string().min(1).optional(),
  }).strict(),
])

export type ChatStreamEvent = z.infer<typeof chatStreamEventSchema>

export function formsEqual(left: ProposalFormState, right: ProposalFormState): boolean {
  return proposalFormFieldNames.every((field) => {
    if (field === 'addOnIds') {
      return (
        left.addOnIds.length === right.addOnIds.length &&
        left.addOnIds.every((id, index) => id === right.addOnIds[index])
      )
    }
    return left[field] === right[field]
  })
}

export function getChangedFormFields(
  oldForm: ProposalFormState,
  newForm: ProposalFormState,
): ProposalFormField[] {
  return proposalFormFieldNames.filter((field) => {
    if (field === 'addOnIds') {
      return (
        oldForm.addOnIds.length !== newForm.addOnIds.length ||
        oldForm.addOnIds.some((id, index) => id !== newForm.addOnIds[index])
      )
    }
    return oldForm[field] !== newForm[field]
  })
}

function fieldListsEqual(left: ProposalFormField[], right: ProposalFormField[]): boolean {
  return left.length === right.length && left.every((field, index) => field === right[index])
}
