'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import {
  Check,
  MapPin,
  Maximize,
  FileText,
  ArrowLeft,
  Sofa,
  Home,
  Waves,
  Sun,
  Plug,
  ChefHat,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ChatBot } from '@/components/chat-bot'
import {
  villas,
  addOns,
  getVilla,
  formatTHB,
  proposals,
  type AddOn,
} from '@/lib/data'

const addOnIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  furniture: Sofa,
  'smart-home': Home,
  'smart-pool': Waves,
  solar: Sun,
  'ev-charger': Plug,
  kitchen: ChefHat,
}

export function ProposalForm() {
  const params = useSearchParams()
  const editId = params.get('edit')
  const editing = editId ? proposals.find((p) => p.id === editId) : undefined
  const villaParam = params.get('villa') ?? editing?.villaId ?? villas[0].id

  const [villaId, setVillaId] = React.useState(villaParam)
  const villa = getVilla(villaId) ?? villas[0]

  const [selected, setSelected] = React.useState<Set<string>>(
    new Set(editing?.addOnIds ?? []),
  )
  const [clientName, setClientName] = React.useState(editing?.clientName ?? '')
  const [phone, setPhone] = React.useState(editing?.phone ?? '')
  const [email, setEmail] = React.useState(editing?.email ?? '')
  const [manager, setManager] = React.useState(editing?.manager ?? '')
  const [comment, setComment] = React.useState(editing?.comment ?? '')
  const [proposalText, setProposalText] = React.useState(
    editing?.proposalText ?? '',
  )

  function toggleAddOn(id: string) {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const selectedAddOns: AddOn[] = addOns.filter((a) => selected.has(a.id))
  const addOnsTotal = selectedAddOns.reduce((sum, a) => sum + a.price, 0)
  const total = villa.price + addOnsTotal

  function handleAutofill() {
    setClientName('Oliver Bennett')
    setPhone('+44 7911 123456')
    setEmail('oliver.bennett@example.com')
    setManager('Anna Petrova')
    setComment(
      'Client is relocating with family and prefers a fully turnkey, energy-efficient residence.',
    )
    setProposalText(
      'We are delighted to present this residence as a fully turnkey, energy-efficient home tailored to your family’s relocation. This offer includes a curated furniture package, an integrated smart-home system and a premium kitchen upgrade, ensuring the villa is ready to enjoy from the moment you arrive. Our team will guide you through every step of the purchase to make the transition effortless.',
    )
    setSelected(new Set(['furniture', 'smart-home', 'kitchen']))
  }

  function buildViewUrl() {
    const sp = new URLSearchParams()
    sp.set('villa', villaId)
    if (selected.size) sp.set('addons', Array.from(selected).join(','))
    sp.set('client', clientName)
    sp.set('phone', phone)
    sp.set('email', email)
    sp.set('manager', manager)
    if (comment) sp.set('comment', comment)
    if (proposalText) sp.set('proposalText', proposalText)
    return `/proposal/view?${sp.toString()}`
  }

  function handleGenerate(e: React.FormEvent) {
    e.preventDefault()
    window.open(buildViewUrl(), '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <Link
        href={editing ? '/proposals' : '/villas'}
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        {editing ? 'Back to proposals' : 'Back to villas'}
      </Link>

      <div className="mb-8 flex flex-col gap-2">
        <h1 className="font-serif text-4xl font-semibold tracking-tight text-foreground">
          {editing ? 'Edit proposal' : 'Create proposal'}
        </h1>
        <p className="text-base leading-relaxed text-muted-foreground">
          Configure the residence, add-ons and client details, then generate a
          shareable proposal.
        </p>
      </div>

      <form onSubmit={handleGenerate} className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_380px]">
        {/* Left column */}
        <div className="flex flex-col gap-6">
          {/* Villa preview */}
          <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <div className="relative aspect-[21/9]">
              <Image
                src={villa.image || '/placeholder.svg'}
                alt={villa.name}
                fill
                loading="eager"
                sizes="(max-width: 1024px) 100vw, 720px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
              <div className="absolute bottom-0 left-0 flex w-full flex-col gap-1 p-5 text-primary-foreground">
                <span className="inline-flex w-fit items-center gap-1 rounded-full bg-background/20 px-2.5 py-1 text-xs font-medium backdrop-blur">
                  <MapPin className="size-3.5" />
                  {villa.location}
                </span>
                <h2 className="font-serif text-2xl font-semibold">{villa.name}</h2>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-4 p-5">
              <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <Maximize className="size-4 text-primary/70" />
                  {villa.area} m²
                </span>
                <span>{villa.bedrooms} bedrooms</span>
                <span>{villa.bathrooms} bathrooms</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  Base price
                </span>
                <span className="font-serif text-xl font-semibold text-foreground">
                  {formatTHB(villa.price)}
                </span>
              </div>
            </div>
            <div className="border-t border-border px-5 py-4">
              <Label htmlFor="villa-select">Selected villa</Label>
              <select
                id="villa-select"
                value={villaId}
                onChange={(e) => setVillaId(e.target.value)}
                className="h-11 w-full rounded-lg border border-border bg-background px-3.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30"
              >
                {villas.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.name} — {formatTHB(v.price)}
                  </option>
                ))}
              </select>
            </div>
          </section>

          {/* Add-ons */}
          <section className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
            <div className="mb-4 flex flex-col gap-1">
              <h2 className="text-lg font-semibold tracking-tight text-foreground">
                Additional options
              </h2>
              <p className="text-sm text-muted-foreground">
                Select any upgrades to include. The total updates automatically.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {addOns.map((addOn) => {
                const Icon = addOnIcons[addOn.id] ?? Home
                const active = selected.has(addOn.id)
                return (
                  <button
                    key={addOn.id}
                    type="button"
                    onClick={() => toggleAddOn(addOn.id)}
                    aria-pressed={active}
                    className={
                      'flex items-start gap-3 rounded-xl border p-4 text-left transition-all ' +
                      (active
                        ? 'border-primary bg-accent/60 ring-1 ring-primary'
                        : 'border-border bg-background hover:border-primary/40 hover:bg-muted/50')
                    }
                  >
                    <span
                      className={
                        'flex size-9 shrink-0 items-center justify-center rounded-lg ' +
                        (active
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary text-primary')
                      }
                    >
                      {active ? <Check className="size-4" /> : <Icon className="size-4" />}
                    </span>
                    <span className="flex flex-1 flex-col gap-0.5">
                      <span className="flex items-center justify-between gap-2">
                        <span className="text-sm font-medium text-foreground">
                          {addOn.name}
                        </span>
                      </span>
                      <span className="text-xs leading-relaxed text-muted-foreground">
                        {addOn.description}
                      </span>
                      <span className="mt-1 text-sm font-semibold text-primary">
                        + {formatTHB(addOn.price)}
                      </span>
                    </span>
                  </button>
                )
              })}
            </div>
          </section>

          {/* Proposal text */}
          <section className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
            <div className="mb-4 flex flex-col gap-1">
              <h2 className="text-lg font-semibold tracking-tight text-foreground">
                Proposal text
              </h2>
              <p className="text-sm text-muted-foreground">
                Write the introductory offer text. It appears at the top of the
                printable proposal.
              </p>
            </div>
            <Textarea
              id="proposalText"
              value={proposalText}
              onChange={(e) => setProposalText(e.target.value)}
              rows={6}
              className="min-h-36"
              placeholder="Dear client, we are delighted to present this residence as an exceptional opportunity…"
            />
          </section>

          {/* Client details */}
          <section className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
            <h2 className="mb-4 text-lg font-semibold tracking-tight text-foreground">
              Client & manager details
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="clientName">Client name</Label>
                <Input
                  id="clientName"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="e.g. Oliver Bennett"
                />
              </div>
              <div>
                <Label htmlFor="manager">Manager name</Label>
                <Input
                  id="manager"
                  value={manager}
                  onChange={(e) => setManager(e.target.value)}
                  placeholder="e.g. Anna Petrova"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+66 ..."
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="client@example.com"
                />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="comment">Comment</Label>
                <Textarea
                  id="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Notes, special requests or payment preferences…"
                />
              </div>
            </div>
          </section>
        </div>

        {/* Right column — summary */}
        <aside className="lg:sticky lg:top-24 lg:h-fit">
          <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h2 className="text-lg font-semibold tracking-tight text-foreground">
              Price summary
            </h2>

            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Base villa price</span>
              <span className="font-medium text-foreground">{formatTHB(villa.price)}</span>
            </div>

            <div className="flex flex-col gap-2 border-t border-border pt-3">
              <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                Add-ons ({selectedAddOns.length})
              </span>
              {selectedAddOns.length === 0 ? (
                <p className="text-sm text-muted-foreground">No add-ons selected.</p>
              ) : (
                selectedAddOns.map((a) => (
                  <div key={a.id} className="flex items-center justify-between text-sm">
                    <span className="text-foreground">{a.name}</span>
                    <span className="text-muted-foreground">+ {formatTHB(a.price)}</span>
                  </div>
                ))
              )}
            </div>

            <div className="flex items-center justify-between border-t border-border pt-4">
              <span className="text-sm font-medium text-foreground">Total price</span>
              <span className="font-serif text-2xl font-semibold text-primary">
                {formatTHB(total)}
              </span>
            </div>

            <Button type="submit" size="lg" className="mt-2 h-12 w-full text-sm">
              <FileText />
              Generate Proposal
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              Opens a printable proposal in a new tab.
            </p>
          </div>
        </aside>
      </form>

      <ChatBot onAutofill={handleAutofill} />
    </div>
  )
}
