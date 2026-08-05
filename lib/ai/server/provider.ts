import 'server-only'

import { addOns, getVilla } from '@/lib/data'
import type { ChatRequest } from '@/lib/ai/contracts'
import type { AssistantAdapter, AssistantContext } from '@/lib/ai/server/assistant'
import { MockAssistantAdapter } from '@/lib/ai/server/mock-adapter'
import { OpenRouterAssistantAdapter } from '@/lib/ai/server/openrouter-adapter'

export type ProviderSelection =
  | { mode: 'mock' }
  | { mode: 'openrouter'; apiKey: string; model: string }

export function selectProvider(
  environment: {
    OPENROUTER_API_KEY?: string
    OPENROUTER_MODEL?: string
  },
): ProviderSelection {
  const apiKey = environment.OPENROUTER_API_KEY?.trim() ?? ''
  const model = environment.OPENROUTER_MODEL?.trim() ?? ''
  if (apiKey && model) return { mode: 'openrouter', apiKey, model }
  return { mode: 'mock' }
}

export function createAssistantAdapter(): AssistantAdapter {
  const selection = selectProvider({
    OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY,
    OPENROUTER_MODEL: process.env.OPENROUTER_MODEL,
  })
  if (selection.mode === 'mock') {
    const partiallyConfigured = Boolean(
      process.env.OPENROUTER_API_KEY?.trim() || process.env.OPENROUTER_MODEL?.trim(),
    )
    if (partiallyConfigured) {
      console.warn('Willow is using mock mode because OpenRouter configuration is incomplete.')
    }
    return new MockAssistantAdapter()
  }
  return new OpenRouterAssistantAdapter(selection.apiKey, selection.model)
}

export function createAssistantContext(request: ChatRequest): AssistantContext {
  const selectedVilla = getVilla(request.form.villaId)
  if (!selectedVilla) throw new Error('Validated villa was not found in the catalog.')
  return { request, selectedVilla, addOns }
}
