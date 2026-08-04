/**
 * @file Implements browser-local proposal persistence, validation, and external-store subscriptions.
 */

import devProposals from '@/data/proposals.dev.json'
import type { Proposal } from '@/lib/data'

export const PROPOSALS_STORAGE_KEY = 'lakeside.proposals.v1'
export const PROPOSALS_SERVER_SNAPSHOT = '__server__'
const PROPOSALS_CHANGED_EVENT = 'lakeside-proposals-changed'

export type ProposalInput = Omit<Proposal, 'id' | 'createdAt'>

/**
 * Checks whether an unknown value has the complete persisted proposal shape.
 *
 * @param value - Parsed value to validate.
 * @returns `true` when the value is a structurally valid proposal.
 */
function isProposal(value: unknown): value is Proposal {
  if (!value || typeof value !== 'object') return false

  const proposal = value as Record<string, unknown>
  return (
    typeof proposal.id === 'string' &&
    typeof proposal.villaId === 'string' &&
    typeof proposal.clientName === 'string' &&
    typeof proposal.phone === 'string' &&
    typeof proposal.email === 'string' &&
    typeof proposal.manager === 'string' &&
    typeof proposal.comment === 'string' &&
    typeof proposal.proposalText === 'string' &&
    Array.isArray(proposal.addOnIds) &&
    proposal.addOnIds.every((id) => typeof id === 'string') &&
    typeof proposal.createdAt === 'string'
  )
}

/**
 * Supplies development fixtures for an empty browser store.
 *
 * @returns Development proposals in development mode, otherwise an empty list.
 */
function getInitialProposals(): Proposal[] {
  return process.env.NODE_ENV === 'development'
    ? (devProposals as Proposal[])
    : []
}

/**
 * Serializes proposals to localStorage and notifies same-document subscribers.
 *
 * @param proposals - Complete proposal collection to persist.
 * @returns Nothing.
 */
function writeProposals(proposals: Proposal[]): void {
  window.localStorage.setItem(PROPOSALS_STORAGE_KEY, JSON.stringify(proposals))
  window.dispatchEvent(new Event(PROPOSALS_CHANGED_EVENT))
}

/**
 * Reads the serialized proposal snapshot used by React's external-store API.
 *
 * @returns Stored JSON, development fixture JSON, or the server sentinel during SSR.
 */
export function getProposalsSnapshot(): string {
  if (typeof window === 'undefined') return PROPOSALS_SERVER_SNAPSHOT
  const stored = window.localStorage.getItem(PROPOSALS_STORAGE_KEY)
  return stored ?? JSON.stringify(getInitialProposals())
}

/**
 * Provides the stable server-side snapshot required for hydration.
 *
 * @returns The proposal server-snapshot sentinel.
 */
export function getProposalsServerSnapshot(): string {
  return PROPOSALS_SERVER_SNAPSHOT
}

/**
 * Subscribes a React external store listener to proposal changes.
 *
 * @param onStoreChange - Callback invoked when another tab or this document changes proposals.
 * @returns A cleanup function that removes both storage listeners.
 */
export function subscribeProposals(onStoreChange: () => void): () => void {
  if (window.localStorage.getItem(PROPOSALS_STORAGE_KEY) === null) {
    window.localStorage.setItem(
      PROPOSALS_STORAGE_KEY,
      JSON.stringify(getInitialProposals()),
    )
  }

  window.addEventListener('storage', onStoreChange)
  window.addEventListener(PROPOSALS_CHANGED_EVENT, onStoreChange)

  return () => {
    window.removeEventListener('storage', onStoreChange)
    window.removeEventListener(PROPOSALS_CHANGED_EVENT, onStoreChange)
  }
}

/**
 * Parses serialized proposal data and discards malformed array entries.
 *
 * @param serialized - JSON snapshot or the server-side sentinel.
 * @returns Valid proposal records, or an empty list for invalid or server-side input.
 */
export function parseProposals(serialized: string): Proposal[] {
  if (serialized === PROPOSALS_SERVER_SNAPSHOT) return []
  try {
    const parsed: unknown = JSON.parse(serialized)
    return Array.isArray(parsed) ? parsed.filter(isProposal) : []
  } catch {
    return []
  }
}

/**
 * Reads and parses the current proposal collection from browser storage.
 *
 * @returns All valid proposals currently available to the browser.
 */
export function getProposals(): Proposal[] {
  return parseProposals(getProposalsSnapshot())
}

/**
 * Finds one persisted proposal by identifier.
 *
 * @param id - Proposal identifier to locate.
 * @returns The matching proposal, or `undefined` when it does not exist.
 */
export function getProposal(id: string): Proposal | undefined {
  return getProposals().find((proposal) => proposal.id === id)
}

/**
 * Creates a proposal or updates an existing proposal while preserving its creation date.
 *
 * @param input - Editable proposal fields collected by the proposal form.
 * @param id - Existing proposal identifier; omit to generate a new proposal.
 * @returns The newly created or updated proposal record.
 * @throws When an update identifier does not match a persisted proposal.
 */
export function saveProposal(input: ProposalInput, id?: string): Proposal {
  const proposals = getProposals()

  if (id) {
    const index = proposals.findIndex((proposal) => proposal.id === id)
    if (index === -1) {
      throw new Error(`Proposal ${id} does not exist.`)
    }

    const updated: Proposal = {
      ...input,
      id,
      createdAt: proposals[index].createdAt,
    }
    proposals[index] = updated
    writeProposals(proposals)
    return updated
  }

  const created: Proposal = {
    ...input,
    id: `PRO-${window.crypto.randomUUID().slice(0, 8).toUpperCase()}`,
    createdAt: new Date().toISOString().slice(0, 10),
  }
  writeProposals([created, ...proposals])
  return created
}

/**
 * Removes a proposal from browser storage by identifier.
 *
 * @param id - Identifier of the proposal to delete.
 * @returns Nothing.
 */
export function deleteProposal(id: string): void {
  writeProposals(getProposals().filter((proposal) => proposal.id !== id))
}
