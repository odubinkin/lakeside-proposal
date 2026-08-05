/**
 * @file Loads JSON catalogs, defines domain records, and exposes pricing and lookup helpers.
 */

import villaCatalog from '@/data/villas.json'
import addOnCatalog from '@/data/add-ons.json'

export type Villa = {
  id: string
  name: string
  description: string
  price: number // THB
  area: number // sqm
  bedrooms: number
  bathrooms: number
  location: string
  image: string
}

export type AddOn = {
  id: string
  name: string
  description: string
  price:
    | { mode: 'fixed'; value: number }
    | { mode: 'percentage'; value: number }
}

export type Proposal = {
  id: string
  villaId: string
  clientName: string
  phone: string
  email: string
  manager: string
  comment: string
  proposalText: string
  addOnIds: string[]
  completed: boolean
  createdAt: string
}

export const villas: Villa[] = villaCatalog

export const addOns: AddOn[] = addOnCatalog as AddOn[]

/**
 * Finds a villa in the local catalog by identifier.
 *
 * @param id - Villa identifier; nullable values represent no selection.
 * @returns The matching villa, or `undefined` when the identifier is absent or unknown.
 */
export function getVilla(id: string | null | undefined): Villa | undefined {
  if (!id) return undefined
  return villas.find((v) => v.id === id)
}

/**
 * Resolves a list of add-on identifiers to catalog records in catalog order.
 *
 * @param ids - Identifiers of the selected add-ons.
 * @returns Add-ons whose identifiers appear in the supplied list.
 */
export function getAddOns(ids: string[]): AddOn[] {
  return addOns.filter((a) => ids.includes(a.id))
}

/**
 * Calculates an add-on price against a villa's base price.
 *
 * @param addOn - Add-on containing either a fixed or percentage pricing rule.
 * @param basePrice - Villa base price in Thai Baht used for percentage calculations.
 * @returns The rounded add-on price in Thai Baht.
 */
export function getAddOnPrice(addOn: AddOn, basePrice: number): number {
  if (addOn.price.mode === 'fixed') return addOn.price.value
  return Math.round((basePrice * addOn.price.value) / 100)
}

export const THB = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'THB',
  maximumFractionDigits: 0,
})

/**
 * Formats a numeric Thai Baht amount for user-facing price displays.
 *
 * @param value - Amount in Thai Baht.
 * @returns A localized currency string without fractional digits.
 */
export function formatTHB(value: number): string {
  return THB.format(value)
}
