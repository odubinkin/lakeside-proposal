import devProposals from '@/data/proposals.dev.json'
import type { Proposal } from '@/lib/data'

export const PROPOSALS_STORAGE_KEY = 'lakeside.proposals.v1'
export const PROPOSALS_SERVER_SNAPSHOT = '__server__'
const PROPOSALS_CHANGED_EVENT = 'lakeside-proposals-changed'

export type ProposalInput = Omit<Proposal, 'id' | 'createdAt'>

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

function getInitialProposals(): Proposal[] {
  return process.env.NODE_ENV === 'development'
    ? (devProposals as Proposal[])
    : []
}

function writeProposals(proposals: Proposal[]): void {
  window.localStorage.setItem(PROPOSALS_STORAGE_KEY, JSON.stringify(proposals))
  window.dispatchEvent(new Event(PROPOSALS_CHANGED_EVENT))
}

export function getProposalsSnapshot(): string {
  if (typeof window === 'undefined') return PROPOSALS_SERVER_SNAPSHOT
  const stored = window.localStorage.getItem(PROPOSALS_STORAGE_KEY)
  return stored ?? JSON.stringify(getInitialProposals())
}

export function getProposalsServerSnapshot(): string {
  return PROPOSALS_SERVER_SNAPSHOT
}

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

export function parseProposals(serialized: string): Proposal[] {
  if (serialized === PROPOSALS_SERVER_SNAPSHOT) return []
  try {
    const parsed: unknown = JSON.parse(serialized)
    return Array.isArray(parsed) ? parsed.filter(isProposal) : []
  } catch {
    return []
  }
}

export function getProposals(): Proposal[] {
  return parseProposals(getProposalsSnapshot())
}

export function getProposal(id: string): Proposal | undefined {
  return getProposals().find((proposal) => proposal.id === id)
}

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

export function deleteProposal(id: string): void {
  writeProposals(getProposals().filter((proposal) => proposal.id !== id))
}
