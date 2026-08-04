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
  createdAt: string
}

export const villas: Villa[] = villaCatalog

export const addOns: AddOn[] = addOnCatalog as AddOn[]

export function getVilla(id: string | null | undefined): Villa | undefined {
  if (!id) return undefined
  return villas.find((v) => v.id === id)
}

export function getAddOns(ids: string[]): AddOn[] {
  return addOns.filter((a) => ids.includes(a.id))
}

export function getAddOnPrice(addOn: AddOn, basePrice: number): number {
  if (addOn.price.mode === 'fixed') return addOn.price.value
  return Math.round((basePrice * addOn.price.value) / 100)
}

export const THB = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'THB',
  maximumFractionDigits: 0,
})

export function formatTHB(value: number): string {
  return THB.format(value)
}
