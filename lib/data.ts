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
  price: number // THB
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

export const villas: Villa[] = [
  {
    id: 'lagoon-6',
    name: 'Lagoon Residence 6',
    description:
      'A serene four-bedroom sanctuary wrapped in floor-to-ceiling glass, opening onto a mirror-still infinity pool and mature palm gardens.',
    price: 42500000,
    area: 520,
    bedrooms: 4,
    bathrooms: 5,
    location: 'Bang Tao, Phuket',
    image: '/villas/villa-lagoon.png',
  },
  {
    id: 'canopy-hill',
    name: 'Canopy Hill Villa',
    description:
      'Perched on the hillside with a cantilevered terrace, this residence frames uninterrupted Andaman Sea views from every room.',
    price: 58900000,
    area: 610,
    bedrooms: 5,
    bathrooms: 6,
    location: 'Kamala, Phuket',
    image: '/villas/villa-canopy.png',
  },
  {
    id: 'palm-shore',
    name: 'Palm Shore Pavilion',
    description:
      'A beachfront pavilion where open-plan living dissolves into a turquoise horizon, complete with a private sea-facing pool.',
    price: 74200000,
    area: 680,
    bedrooms: 5,
    bathrooms: 6,
    location: 'Layan Beach, Phuket',
    image: '/villas/villa-palm.png',
  },
  {
    id: 'orchid-court',
    name: 'Orchid Courtyard',
    description:
      'A tranquil courtyard home built around a reflecting pool and lush tropical garden, blending minimalist stone with warm light.',
    price: 36800000,
    area: 445,
    bedrooms: 3,
    bathrooms: 4,
    location: 'Cherng Talay, Phuket',
    image: '/villas/villa-orchid.png',
  },
  {
    id: 'horizon-cliff',
    name: 'Horizon Cliff Estate',
    description:
      'A dramatic clifftop estate with a panoramic infinity pool that appears to spill straight into the sea below.',
    price: 89500000,
    area: 740,
    bedrooms: 6,
    bathrooms: 7,
    location: 'Kata Noi, Phuket',
    image: '/villas/villa-horizon.png',
  },
  {
    id: 'teak-canopy',
    name: 'Teak Rainforest Villa',
    description:
      'Nestled within private rainforest, this warm teak-clad retreat offers a plunge pool and complete seclusion in the canopy.',
    price: 31200000,
    area: 380,
    bedrooms: 3,
    bathrooms: 3,
    location: 'Rawai, Phuket',
    image: '/villas/villa-teak.png',
  },
]

export const addOns: AddOn[] = [
  {
    id: 'furniture',
    name: 'Furniture Package',
    description: 'Curated designer furnishings, styling and soft goods throughout.',
    price: 2800000,
  },
  {
    id: 'smart-home',
    name: 'Smart Home',
    description: 'Integrated lighting, climate, security and voice control system.',
    price: 1500000,
  },
  {
    id: 'smart-pool',
    name: 'Smart Pool',
    description: 'Automated chemistry, heating and app-controlled pool management.',
    price: 950000,
  },
  {
    id: 'solar',
    name: 'Solar Panels',
    description: 'Rooftop solar array with battery storage for energy independence.',
    price: 1750000,
  },
  {
    id: 'ev-charger',
    name: 'EV Charger',
    description: 'High-speed dual electric vehicle charging station in the garage.',
    price: 320000,
  },
  {
    id: 'kitchen',
    name: 'Kitchen Upgrade',
    description: 'Premium European appliances, stone island and custom cabinetry.',
    price: 1900000,
  },
]

export const proposals: Proposal[] = [
  {
    id: 'PRO-2041',
    villaId: 'canopy-hill',
    clientName: 'James Whitfield',
    phone: '+44 7700 900321',
    email: 'j.whitfield@example.com',
    manager: 'Anna Petrova',
    comment: 'Client is interested in a full smart-home package and flexible payment terms.',
    proposalText:
      'We are delighted to present Canopy Hill Villa as an exceptional opportunity to own a signature hillside residence overlooking the Andaman Sea. This offer includes a curated furniture package, an integrated smart-home system and a rooftop solar array, delivering a fully turnkey, energy-efficient home. Our team will accompany you through every stage of the purchase, from contract to handover, ensuring a seamless and transparent experience.',
    addOnIds: ['furniture', 'smart-home', 'solar'],
    createdAt: '2026-07-28',
  },
  {
    id: 'PRO-2038',
    villaId: 'palm-shore',
    clientName: 'Mei Lin Chua',
    phone: '+65 8123 4567',
    email: 'meilin.chua@example.com',
    manager: 'Daniel Ross',
    comment: 'Prefers a turnkey, fully furnished residence before Q1 handover.',
    proposalText:
      'It is our pleasure to offer Palm Shore Pavilion, a beachfront residence where open-plan living meets an uninterrupted turquoise horizon. This proposal includes a designer furniture package, a premium kitchen upgrade, an automated smart pool and dual EV charging, so the home is ready to enjoy from day one. We are committed to delivering a fully furnished, move-in-ready residence ahead of your Q1 handover timeline.',
    addOnIds: ['furniture', 'kitchen', 'smart-pool', 'ev-charger'],
    createdAt: '2026-07-22',
  },
  {
    id: 'PRO-2035',
    villaId: 'orchid-court',
    clientName: 'Alexander Novak',
    phone: '+49 151 23456789',
    email: 'a.novak@example.com',
    manager: 'Anna Petrova',
    comment: 'Requested a sustainability-focused build with solar and EV charging.',
    proposalText:
      'We are pleased to propose Orchid Courtyard, a tranquil home designed around a reflecting pool and lush tropical garden. In line with your sustainability priorities, this offer includes a rooftop solar array with battery storage and a high-speed EV charging station, minimising running costs and environmental impact. We would be glad to tailor the specification further to suit your long-term vision for the residence.',
    addOnIds: ['solar', 'ev-charger'],
    createdAt: '2026-07-15',
  },
  {
    id: 'PRO-2030',
    villaId: 'teak-canopy',
    clientName: 'Sofia Marchetti',
    phone: '+39 333 1234567',
    email: 'sofia.marchetti@example.com',
    manager: 'Daniel Ross',
    comment: 'Holiday home for the family; keen on the kitchen upgrade.',
    proposalText:
      'We are excited to present Teak Rainforest Villa as the perfect family holiday retreat, secluded within private rainforest and finished in warm teak. This offer pairs a premium kitchen upgrade with a fully integrated smart-home system, making the home effortless to manage whether in residence or away. Our team is on hand to assist with furnishing, rental management and any bespoke requests to make this a truly carefree second home.',
    addOnIds: ['kitchen', 'smart-home'],
    createdAt: '2026-07-09',
  },
]

export function getVilla(id: string | null | undefined): Villa | undefined {
  if (!id) return undefined
  return villas.find((v) => v.id === id)
}

export function getAddOns(ids: string[]): AddOn[] {
  return addOns.filter((a) => ids.includes(a.id))
}

export const THB = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'THB',
  maximumFractionDigits: 0,
})

export function formatTHB(value: number): string {
  return THB.format(value)
}
