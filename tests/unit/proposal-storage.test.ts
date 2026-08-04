import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { Proposal } from '@/lib/data'
import {
  deleteProposal,
  getProposal,
  getProposals,
  getProposalsServerSnapshot,
  getProposalsSnapshot,
  parseProposals,
  PROPOSALS_SERVER_SNAPSHOT,
  PROPOSALS_STORAGE_KEY,
  saveProposal,
  subscribeProposals,
} from '@/lib/proposal-storage'

const proposal: Proposal = {
  id: 'PRO-EXISTING',
  villaId: 'lagoon-6',
  clientName: 'Existing Client',
  phone: '+66 81 234 5678',
  email: '',
  manager: 'Manager',
  comment: 'Comment',
  proposalText: 'Proposal copy',
  addOnIds: ['furniture'],
  createdAt: '2026-08-01',
}

const input = {
  villaId: 'canopy-hill',
  clientName: 'New Client',
  phone: '',
  email: 'client@example.com',
  manager: 'New Manager',
  comment: '',
  proposalText: 'New proposal copy',
  addOnIds: ['smart-home'],
}

describe('proposal storage', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('returns stable server and empty client snapshots', () => {
    expect(getProposalsServerSnapshot()).toBe(PROPOSALS_SERVER_SNAPSHOT)
    expect(getProposalsSnapshot()).toBe('[]')
    expect(getProposals()).toEqual([])
  })

  it('parses valid records and filters malformed values', () => {
    expect(parseProposals(PROPOSALS_SERVER_SNAPSHOT)).toEqual([])
    expect(parseProposals('{broken')).toEqual([])
    expect(parseProposals('{}')).toEqual([])
    expect(parseProposals(JSON.stringify([proposal, { ...proposal, id: 123 }]))).toEqual([
      proposal,
    ])
  })

  it('reads one proposal by identifier', () => {
    window.localStorage.setItem(PROPOSALS_STORAGE_KEY, JSON.stringify([proposal]))
    expect(getProposal(proposal.id)).toEqual(proposal)
    expect(getProposal('missing')).toBeUndefined()
  })

  it('creates a dated proposal at the beginning and notifies subscribers', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-08-04T09:30:00Z'))
    vi.spyOn(window.crypto, 'randomUUID').mockReturnValue(
      '12345678-1234-4234-8234-123456789abc',
    )
    window.localStorage.setItem(PROPOSALS_STORAGE_KEY, JSON.stringify([proposal]))
    const subscriber = vi.fn()
    const unsubscribe = subscribeProposals(subscriber)

    const created = saveProposal(input)

    expect(created).toMatchObject({ id: 'PRO-12345678', createdAt: '2026-08-04' })
    expect(getProposals()).toEqual([created, proposal])
    expect(subscriber).toHaveBeenCalledTimes(1)
    unsubscribe()
  })

  it('updates an existing proposal while preserving its identity and date', () => {
    window.localStorage.setItem(PROPOSALS_STORAGE_KEY, JSON.stringify([proposal]))
    const updated = saveProposal(input, proposal.id)

    expect(updated).toEqual({ ...input, id: proposal.id, createdAt: proposal.createdAt })
    expect(getProposals()).toEqual([updated])
  })

  it('throws when an update target does not exist', () => {
    expect(() => saveProposal(input, 'PRO-MISSING')).toThrow(
      'Proposal PRO-MISSING does not exist.',
    )
  })

  it('deletes matching proposals and ignores unknown identifiers', () => {
    window.localStorage.setItem(PROPOSALS_STORAGE_KEY, JSON.stringify([proposal]))
    deleteProposal('missing')
    expect(getProposals()).toEqual([proposal])
    deleteProposal(proposal.id)
    expect(getProposals()).toEqual([])
  })

  it('initializes storage, responds to browser events, and unsubscribes', () => {
    const subscriber = vi.fn()
    const unsubscribe = subscribeProposals(subscriber)
    expect(window.localStorage.getItem(PROPOSALS_STORAGE_KEY)).toBe('[]')

    window.dispatchEvent(new StorageEvent('storage'))
    expect(subscriber).toHaveBeenCalledTimes(1)
    unsubscribe()
    window.dispatchEvent(new StorageEvent('storage'))
    expect(subscriber).toHaveBeenCalledTimes(1)
  })

  it('surfaces storage write failures', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new DOMException('Quota exceeded', 'QuotaExceededError')
    })

    expect(() => saveProposal(input)).toThrow('Quota exceeded')
  })
})
