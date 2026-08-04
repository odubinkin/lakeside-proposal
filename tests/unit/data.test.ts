import { describe, expect, it } from 'vitest'
import {
  addOns,
  formatTHB,
  getAddOnPrice,
  getAddOns,
  getVilla,
  villas,
} from '@/lib/data'

describe('catalog helpers', () => {
  it('finds known villas and rejects missing identifiers', () => {
    expect(getVilla('lagoon-6')).toEqual(villas[0])
    expect(getVilla('missing')).toBeUndefined()
    expect(getVilla(null)).toBeUndefined()
    expect(getVilla(undefined)).toBeUndefined()
  })

  it('returns known add-ons in catalog order and ignores unknown identifiers', () => {
    expect(getAddOns(['kitchen', 'missing', 'furniture']).map(({ id }) => id)).toEqual([
      'furniture',
      'kitchen',
    ])
  })

  it('calculates fixed and rounded percentage prices', () => {
    const fixed = addOns.find(({ id }) => id === 'smart-home')!
    const percentage = addOns.find(({ id }) => id === 'furniture')!

    expect(getAddOnPrice(fixed, 42_500_000)).toBe(1_500_000)
    expect(getAddOnPrice(percentage, 101)).toBe(5)
  })

  it('formats whole Thai baht values', () => {
    expect(formatTHB(42_500_000)).toMatch(/THB|฿/)
    expect(formatTHB(42_500_000)).toContain('42,500,000')
  })
})
