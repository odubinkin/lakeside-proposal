/**
 * @file Selects Willow's mock or OpenRouter adapter and resolves trusted request context.
 */

import 'server-only'

import { addOns, getVilla } from '@/lib/data'
import type { ChatRequest } from '@/lib/ai/contracts'
import type { AssistantAdapter, AssistantContext } from '@/lib/ai/server/assistant'
import { MockAssistantAdapter } from '@/lib/ai/server/mock-adapter'
import { OpenRouterAssistantAdapter } from '@/lib/ai/server/openrouter-adapter'

export type ProviderSelection =
  | { mode: 'mock' }
  | { mode: 'openrouter'; apiKey: string; model: string }

/**
 * Chooses real-model mode only when both OpenRouter settings are present.
 *
 * @param environment - Server environment values used for provider selection.
 * @param environment.OPENROUTER_API_KEY - Optional OpenRouter credential.
 * @param environment.OPENROUTER_MODEL - Optional OpenRouter model identifier.
 * @returns OpenRouter configuration when complete, otherwise deterministic mock mode.
 */
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

/**
 * Creates the assistant adapter configured by the current server environment.
 *
 * @returns A deterministic mock adapter or configured OpenRouter adapter.
 */
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

/**
 * Resolves trusted catalog records for a validated public chat request.
 *
 * @param request - Validated assistant request containing the current form snapshot.
 * @returns Assistant context with the selected villa and complete add-on catalog.
 * @throws When the validated villa ID cannot be resolved from the current catalog.
 */
export function createAssistantContext(request: ChatRequest): AssistantContext {
  const selectedVilla = getVilla(request.form.villaId)
  if (!selectedVilla) throw new Error('Validated villa was not found in the catalog.')
  return { request, selectedVilla, addOns }
}
