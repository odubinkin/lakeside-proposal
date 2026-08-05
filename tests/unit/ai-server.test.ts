import { describe, expect, it } from 'vitest'
import { AIMessageChunk } from '@langchain/core/messages'
import { addOns, getVilla } from '@/lib/data'
import {
  buildModelMessages,
  buildTrustedContext,
  WILLOW_SYSTEM_PROMPT,
} from '@/lib/ai/server/prompt'
import {
  COMPLETION_REPLY,
  MOCK_AUTOFILL_PATCH,
  MockAssistantAdapter,
} from '@/lib/ai/server/mock-adapter'
import { createAssistantContext, selectProvider } from '@/lib/ai/server/provider'
import { normalizeOpenRouterStream } from '@/lib/ai/server/openrouter-adapter'
import type { AssistantOutputChunk } from '@/lib/ai/server/assistant'
import { baseForm, validRequest } from '@/tests/helpers/ai'

async function collect(message: string) {
  const adapter = new MockAssistantAdapter()
  const context = createAssistantContext(
    validRequest({
      messages: [
        {
          id: 'user-1',
          role: 'user',
          content: message,
          createdAt: '2026-08-05T00:00:00.000Z',
        },
      ],
    }),
  )
  const chunks: AssistantOutputChunk[] = []
  for await (const chunk of adapter.stream(context, new AbortController().signal)) {
    chunks.push(chunk)
  }
  return chunks
}

describe('provider selection', () => {
  it('selects OpenRouter only when both trimmed variables are present', () => {
    expect(selectProvider({ OPENROUTER_API_KEY: ' key ', OPENROUTER_MODEL: ' model ' })).toEqual({
      mode: 'openrouter',
      apiKey: 'key',
      model: 'model',
    })
    expect(selectProvider({ OPENROUTER_API_KEY: 'key' })).toEqual({ mode: 'mock' })
    expect(selectProvider({ OPENROUTER_MODEL: 'model' })).toEqual({ mode: 'mock' })
    expect(selectProvider({ OPENROUTER_API_KEY: ' ', OPENROUTER_MODEL: '' })).toEqual({
      mode: 'mock',
    })
  })
})

describe('prompt construction', () => {
  it('orders system, trusted context, last 50 history messages, and tool protocol', () => {
    const oldForm = baseForm
    const newForm = { ...oldForm, comment: 'Updated' }
    const messages = Array.from({ length: 55 }, (_, index) => ({
      id: `message-${index}`,
      role: (index % 2 ? 'user' : 'assistant') as 'user' | 'assistant',
      content: `content-${index}`,
      createdAt: '2026-08-05T00:00:00.000Z',
    }))
    const request = validRequest({
      form: newForm,
      messages,
      continuation: {
        assistantMessageId: 'assistant-tool',
        toolCallId: 'tool-1',
        toolName: 'edit_proposal_form',
        arguments: { comment: 'Updated' },
        result: {
          ok: true,
          oldForm,
          newForm,
          changedFields: ['comment'],
        },
      },
    })
    const context = {
      request,
      selectedVilla: getVilla(baseForm.villaId)!,
      addOns,
    }
    const prompt = buildModelMessages(context)
    expect(prompt).toHaveLength(54)
    expect(prompt[0].content).toBe(WILLOW_SYSTEM_PROMPT)
    expect(prompt[1].content).toContain('SERVER_AUTHORED_TRUSTED_CONTEXT')
    expect(prompt[2].content).toBe('content-5')
    expect(prompt.at(-2)?._getType()).toBe('ai')
    expect(prompt.at(-1)?._getType()).toBe('tool')
  })

  it('uses complete trusted catalogs and excludes client storage IDs', () => {
    const context = createAssistantContext(validRequest())
    const trusted = buildTrustedContext(context)
    expect(trusted).toContain(JSON.stringify(context.selectedVilla))
    expect(trusted).toContain(JSON.stringify(addOns))
    expect(trusted).not.toContain('draft:')
    expect(trusted).not.toContain('PRO-')
  })

  it('reconstructs a mixed preamble and tool call as one assistant message', () => {
    const oldForm = baseForm
    const newForm = { ...oldForm, clientName: 'Vasya Pupkin' }
    const context = createAssistantContext(
      validRequest({
        form: newForm,
        messages: [
          {
            id: 'user-edit',
            role: 'user',
            content: 'Update the client name',
            createdAt: '2026-08-05T00:00:00.000Z',
          },
          {
            id: 'assistant-mixed',
            role: 'assistant',
            content: 'I will update the client name.',
            createdAt: '2026-08-05T00:00:01.000Z',
          },
        ],
        continuation: {
          assistantMessageId: 'assistant-mixed',
          toolCallId: 'tool-mixed',
          toolName: 'edit_proposal_form',
          arguments: { clientName: 'Vasya Pupkin' },
          result: {
            ok: true,
            oldForm,
            newForm,
            changedFields: ['clientName'],
          },
        },
      }),
    )

    const prompt = buildModelMessages(context)
    const mixedMessage = prompt.at(-2)
    expect(mixedMessage?._getType()).toBe('ai')
    expect(mixedMessage?.content).toBe('I will update the client name.')
    expect('tool_calls' in mixedMessage! ? mixedMessage.tool_calls : undefined).toEqual([
      expect.objectContaining({
        id: 'tool-mixed',
        name: 'edit_proposal_form',
        args: { clientName: 'Vasya Pupkin' },
      }),
    ])
    expect(
      prompt.filter((message) => message.content === 'I will update the client name.'),
    ).toHaveLength(1)
  })

  it('contains the canonical safety and catalog-grounding rules', () => {
    expect(WILLOW_SYSTEM_PROMPT).toContain('Stay strictly within this scope')
    expect(WILLOW_SYSTEM_PROMPT).toContain(
      "Always reply in the same language as the user's current message",
    )
    expect(WILLOW_SYSTEM_PROMPT).toContain('always populate the proposal form in English')
    expect(WILLOW_SYSTEM_PROMPT).toContain(
      'do not enumerate what is included in the selected package',
    )
    expect(WILLOW_SYSTEM_PROMPT).toContain(
      'prices of individual components or the final proposal total',
    )
    expect(WILLOW_SYSTEM_PROMPT).toContain(
      'added automatically to the generated proposal document',
    )
    expect(WILLOW_SYSTEM_PROMPT).toContain('Do not invent or infer availability')
    expect(WILLOW_SYSTEM_PROMPT).toContain('return on investment')
    expect(WILLOW_SYSTEM_PROMPT).toContain('legal or tax advice')
    expect(WILLOW_SYSTEM_PROMPT).toContain('explain every reported field error')
    expect(WILLOW_SYSTEM_PROMPT).toContain('Do not claim that any part')
  })
})

describe('OpenRouter stream normalization', () => {
  it('preserves streamed text before a valid tool call', async () => {
    async function* response() {
      yield new AIMessageChunk({ content: 'I will update the client name.' })
      yield new AIMessageChunk({
        content: '',
        tool_call_chunks: [
          {
            id: 'tool-mixed',
            name: 'edit_proposal_form',
            args: '{"clientName":"Vasya Pupkin"}',
            index: 0,
          },
        ],
      })
    }

    const chunks: AssistantOutputChunk[] = []
    for await (const chunk of normalizeOpenRouterStream(response())) chunks.push(chunk)
    expect(chunks).toEqual([
      { type: 'text_delta', delta: 'I will update the client name.' },
      {
        type: 'tool_call',
        toolCallId: 'tool-mixed',
        arguments: { clientName: 'Vasya Pupkin' },
      },
    ])
  })
})

describe('deterministic server mock', () => {
  it('matches fill before other branches and emits the form tool', async () => {
    await expect(collect('Recommend and fill a sample')).resolves.toEqual([
      expect.objectContaining({ type: 'tool_call', arguments: MOCK_AUTOFILL_PATCH }),
    ])
  })

  it.each([
    ['Recommend add-ons', 'For a family buyer I usually recommend'],
    ['What is included in smart home?', 'integrated lighting, climate control'],
    ['Hello', 'Happy to help with that'],
  ])('returns the expected text for %s', async (message, expected) => {
    const chunks = await collect(message)
    expect(chunks).toEqual([{ type: 'text_delta', delta: expect.stringContaining(expected) }])
  })

  it('returns the completion reply only after a successful continuation', async () => {
    const newForm = { ...baseForm, ...MOCK_AUTOFILL_PATCH }
    const adapter = new MockAssistantAdapter()
    const context = createAssistantContext(
      validRequest({
        form: newForm,
        continuation: {
          assistantMessageId: 'assistant-1',
          toolCallId: 'tool-1',
          toolName: 'edit_proposal_form',
          arguments: MOCK_AUTOFILL_PATCH,
          result: {
            ok: true,
            oldForm: baseForm,
            newForm,
            changedFields: [
              'addOnIds',
              'proposalText',
              'clientName',
              'manager',
              'phone',
              'email',
              'comment',
            ],
          },
        },
      }),
    )
    const chunks: AssistantOutputChunk[] = []
    for await (const chunk of adapter.stream(context, new AbortController().signal)) {
      chunks.push(chunk)
    }
    expect(chunks).toEqual([{ type: 'text_delta', delta: COMPLETION_REPLY }])
  })
})
