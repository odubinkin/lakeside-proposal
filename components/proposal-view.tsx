/**
 * @file Renders a saved proposal as a polished, print-friendly commercial document.
 */

'use client'

import * as React from 'react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { Printer, MapPin, Maximize, BedDouble, Bath, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { BrandLogo } from '@/components/brand-logo'
import { ProposalLoading } from '@/components/proposal-loading'
import {
  villas,
  getVilla,
  getAddOns,
  getAddOnPrice,
  formatTHB,
} from '@/lib/data'
import {
  getProposalsServerSnapshot,
  getProposalsSnapshot,
  parseProposals,
  PROPOSALS_SERVER_SNAPSHOT,
  subscribeProposals,
} from '@/lib/proposal-storage'

/**
 * Resolves a proposal from the URL and browser store, then renders its printable offer.
 *
 * @returns A loading or missing state, or the complete commercial proposal document.
 */
export function ProposalView() {
  const params = useSearchParams()
  const proposalId = params.get('id')
  const snapshot = React.useSyncExternalStore(
    subscribeProposals,
    getProposalsSnapshot,
    getProposalsServerSnapshot,
  )
  const proposals = React.useMemo(() => parseProposals(snapshot), [snapshot])
  const proposal = proposalId
    ? proposals.find((item) => item.id === proposalId)
    : undefined

  if (snapshot === PROPOSALS_SERVER_SNAPSHOT) {
    return <ProposalLoading />
  }

  if (!proposal) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-start gap-4 p-10">
        <h1 className="font-serif text-3xl font-semibold text-foreground">
          Proposal not found
        </h1>
        <p className="text-sm text-muted-foreground">
          The requested proposal is not available in this browser.
        </p>
        <Button nativeButton={false} render={<a href="/proposals">Back to proposals</a>} />
      </div>
    )
  }

  const villa = getVilla(proposal.villaId) ?? villas[0]
  const selectedAddOns = getAddOns(proposal.addOnIds)
  const addOnsTotal = selectedAddOns.reduce(
    (sum, addOn) => sum + getAddOnPrice(addOn, villa.price),
    0,
  )
  const total = villa.price + addOnsTotal

  const client = {
    name: proposal.clientName,
    phone: proposal.phone,
    email: proposal.email,
    manager: proposal.manager,
  }

  const proposalText = proposal.proposalText

  const proposalRef = proposal.id
  const proposalDate = new Date(`${proposal.createdAt}T00:00:00`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <div className="min-h-screen bg-muted/40 py-0 print:bg-white print:py-0 sm:py-10">
      <Button
        onClick={() => window.print()}
        size="lg"
        className="no-print fixed bottom-6 right-6 z-40 h-14 gap-2.5 rounded-full px-5 shadow-lg shadow-primary/25"
      >
        <Printer className="size-5" />
        Print proposal
      </Button>

      <article className="proposal-document mx-auto max-w-3xl bg-card shadow-sm print:shadow-none sm:rounded-2xl sm:border sm:border-border">
        {/* Header */}
        <header className="flex flex-col gap-6 border-b border-border p-8 sm:p-10">
          <div className="flex items-start justify-between gap-4">
            <BrandLogo size={44} />
            <div className="text-right">
              <p className="font-mono text-sm font-medium text-foreground">{proposalRef}</p>
              <p className="text-xs text-muted-foreground">{proposalDate}</p>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase">
              Commercial Proposal
            </span>
            <h1 className="font-serif text-3xl font-semibold tracking-tight text-foreground">
              Villa Purchase Offer
            </h1>
            <p className="text-sm text-muted-foreground">
              Prepared for {client.name} by {client.manager}
            </p>
          </div>
        </header>

        {/* Proposal text */}
        {proposalText && (
          <section className="border-b border-border p-8 sm:p-10">
            <p className="whitespace-pre-line text-[15px] leading-relaxed text-foreground">
              {proposalText}
            </p>
          </section>
        )}

        {/* Villa */}
        <section className="p-8 sm:p-10">
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="relative aspect-[21/9]">
              <Image
                src={villa.image || '/placeholder.svg'}
                alt={villa.name}
                fill
                loading="eager"
                sizes="768px"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-3 p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="font-serif text-2xl font-semibold text-foreground">
                  {villa.name}
                </h2>
                <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="size-4 text-primary" />
                  {villa.location}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {villa.description}
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-2 pt-1 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <BedDouble className="size-4 text-primary/70" />
                  {villa.bedrooms} bedrooms
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Bath className="size-4 text-primary/70" />
                  {villa.bathrooms} bathrooms
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Maximize className="size-4 text-primary/70" />
                  {villa.area} m²
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="px-8 pb-8 sm:px-10 sm:pb-10">
          <h3 className="mb-4 text-sm font-medium tracking-wide text-muted-foreground uppercase">
            Price breakdown
          </h3>
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="flex items-center justify-between px-5 py-4">
              <span className="text-sm text-foreground">Base villa price</span>
              <span className="text-sm font-medium text-foreground">
                {formatTHB(villa.price)}
              </span>
            </div>
            {selectedAddOns.length > 0 && (
              <div className="border-t border-border bg-muted/40 px-5 py-3">
                <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  Selected options
                </span>
              </div>
            )}
            {selectedAddOns.map((a) => (
              <div
                key={a.id}
                className="flex items-center justify-between border-t border-border px-5 py-3"
              >
                <span className="inline-flex items-center gap-2 text-sm text-foreground">
                  <Check className="size-4 text-primary" />
                  {a.name}
                </span>
                <span className="text-sm text-muted-foreground">
                  {formatTHB(getAddOnPrice(a, villa.price))}
                </span>
              </div>
            ))}
            {selectedAddOns.length > 0 && (
              <div className="flex items-center justify-between border-t border-border px-5 py-3">
                <span className="text-sm text-muted-foreground">Options subtotal</span>
                <span className="text-sm font-medium text-foreground">
                  {formatTHB(addOnsTotal)}
                </span>
              </div>
            )}
            <div className="flex items-center justify-between border-t border-border bg-primary/5 px-5 py-5">
              <span className="text-base font-semibold text-foreground">Total price</span>
              <span className="font-serif text-2xl font-semibold text-primary">
                {formatTHB(total)}
              </span>
            </div>
          </div>
        </section>

        {/* Client details */}
        <section className="px-8 pb-8 sm:px-10 sm:pb-10">
          <h3 className="mb-4 text-sm font-medium tracking-wide text-muted-foreground uppercase">
            Client details
          </h3>
          <dl className="grid grid-cols-1 gap-x-6 gap-y-4 rounded-xl border border-border p-5 sm:grid-cols-2">
            <Detail label="Client name" value={client.name} />
            <Detail label="Sales manager" value={client.manager} />
            <Detail label="Phone" value={client.phone} />
            <Detail label="Email" value={client.email} />
          </dl>
        </section>

        {/* Footer */}
        <footer className="border-t border-border px-8 py-6 text-center text-xs leading-relaxed text-muted-foreground sm:px-10">
          <p>
            This proposal is an indicative commercial offer and is not a binding
            contract. Prices are quoted in Thai Baht (THB) and are valid for 30 days
            from the date of issue.
          </p>
          <p className="mt-2 font-medium text-foreground">
            Redwood Lakeside Development Co., Ltd. · Phuket, Thailand
          </p>
        </footer>
      </article>
    </div>
  )
}

/**
 * Renders one labelled value in the proposal's client-details definition list.
 *
 * @param props - Detail row properties.
 * @param props.label - Human-readable field label.
 * @param props.value - Client or manager value displayed for the field.
 * @returns A definition-list group containing the label and value.
 */
function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <dt className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
        {label}
      </dt>
      <dd className="text-sm text-foreground">{value}</dd>
    </div>
  )
}
