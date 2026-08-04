import { existsSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import proposals from '@/data/proposals.dev.json'
import { addOns, villas } from '@/lib/data'

describe('catalog data contract', () => {
  it('keeps villa and add-on identifiers unique', () => {
    expect(new Set(villas.map(({ id }) => id)).size).toBe(villas.length)
    expect(new Set(addOns.map(({ id }) => id)).size).toBe(addOns.length)
  })

  it('provides positive villa values and existing public images', () => {
    for (const villa of villas) {
      expect(villa.price).toBeGreaterThan(0)
      expect(villa.area).toBeGreaterThan(0)
      expect(villa.bedrooms).toBeGreaterThan(0)
      expect(villa.bathrooms).toBeGreaterThan(0)
      expect(existsSync(path.join(process.cwd(), 'public', villa.image))).toBe(true)
    }
  })

  it('provides supported positive add-on prices', () => {
    for (const addOn of addOns) {
      expect(['fixed', 'percentage']).toContain(addOn.price.mode)
      expect(addOn.price.value).toBeGreaterThan(0)
    }
  })

  it('keeps development proposals referentially valid', () => {
    const villaIds = new Set(villas.map(({ id }) => id))
    const addOnIds = new Set(addOns.map(({ id }) => id))

    for (const proposal of proposals) {
      expect(villaIds.has(proposal.villaId)).toBe(true)
      expect(proposal.addOnIds.every((id) => addOnIds.has(id))).toBe(true)
      expect(Number.isNaN(Date.parse(`${proposal.createdAt}T00:00:00Z`))).toBe(false)
    }
  })
})
