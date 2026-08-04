'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import {
  Check,
  Save as SaveIcon,
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
import { ProposalLoading } from '@/components/proposal-loading'
import {
  villas,
  addOns,
  getVilla,
  getAddOnPrice,
  formatTHB,
  type AddOn,
  type Proposal,
} from '@/lib/data'
import {
  getProposalsServerSnapshot,
  getProposalsSnapshot,
  parseProposals,
  PROPOSALS_SERVER_SNAPSHOT,
  saveProposal,
  subscribeProposals,
} from '@/lib/proposal-storage'

const addOnIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  furniture: Sofa,
  'smart-home': Home,
  'smart-pool': Waves,
  solar: Sun,
  'ev-charger': Plug,
  kitchen: ChefHat,
}

type ProposalFormErrors = Partial<
  Record<
    'villaId' | 'clientName' | 'phone' | 'email' | 'manager' | 'proposalText',
    string
  >
>

const errorFieldsInPageOrder: Array<
  [keyof ProposalFormErrors, string]
> = [
  ['villaId', 'villa-select'],
  ['proposalText', 'proposalText'],
  ['clientName', 'clientName'],
  ['manager', 'manager'],
  ['phone', 'phone'],
  ['email', 'email'],
]

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phonePattern = /^\+?[0-9()\s.-]+$/

function validateProposalForm({
  villaId,
  clientName,
  phone,
  email,
  manager,
  proposalText,
}: {
  villaId: string
  clientName: string
  phone: string
  email: string
  manager: string
  proposalText: string
}): ProposalFormErrors {
  const errors: ProposalFormErrors = {}
  const trimmedPhone = phone.trim()
  const trimmedEmail = email.trim()

  if (!getVilla(villaId)) errors.villaId = 'Select a villa.'
  if (!clientName.trim()) errors.clientName = 'Enter the client name.'
  if (!manager.trim()) errors.manager = 'Enter the manager name.'
  if (!proposalText.trim()) errors.proposalText = 'Enter the proposal text.'

  if (!trimmedPhone && !trimmedEmail) {
    const contactError = 'Enter a phone number or email address.'
    errors.phone = contactError
    errors.email = contactError
  } else {
    if (trimmedPhone) {
      const digitCount = trimmedPhone.replace(/\D/g, '').length
      if (!phonePattern.test(trimmedPhone) || digitCount < 7 || digitCount > 15) {
        errors.phone = 'Enter a valid phone number.'
      }
    }
    if (trimmedEmail && !emailPattern.test(trimmedEmail)) {
      errors.email = 'Enter a valid email address.'
    }
  }

  return errors
}

function FieldError({ id, children }: { id: string; children?: string }) {
  if (!children) return null

  return (
    <p id={id} className="mt-1.5 text-sm text-destructive" role="alert">
      {children}
    </p>
  )
}

function scrollToFirstInvalidField(errors: ProposalFormErrors) {
  const firstInvalidField = errorFieldsInPageOrder.find(
    ([fieldName]) => errors[fieldName],
  )
  if (!firstInvalidField) return

  const field = document.getElementById(firstInvalidField[1])
  if (!field) return

  const { top, bottom } = field.getBoundingClientRect()
  const isFullyVisible = top >= 0 && bottom <= window.innerHeight

  if (!isFullyVisible) {
    field.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
}

export function ProposalForm() {
  const params = useSearchParams()
  const editId = params.get('id')
  const snapshot = React.useSyncExternalStore(
    subscribeProposals,
    getProposalsSnapshot,
    getProposalsServerSnapshot,
  )
  const proposals = React.useMemo(() => parseProposals(snapshot), [snapshot])
  const editing = editId
    ? proposals.find((proposal) => proposal.id === editId)
    : undefined

  if (snapshot === PROPOSALS_SERVER_SNAPSHOT) {
    return <ProposalLoading />
  }

  if (editId && !editing) {
    return (
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-4 px-4 py-20 sm:px-6">
        <h1 className="font-serif text-3xl font-semibold text-foreground">
          Proposal not found
        </h1>
        <p className="text-sm text-muted-foreground">
          The requested proposal is not available in this browser.
        </p>
        <Button nativeButton={false} render={<Link href="/proposals">Back to proposals</Link>} />
      </div>
    )
  }

  return (
    <ProposalEditor
      key={editing?.id ?? 'new'}
      editId={editId}
      editing={editing}
      villaParam={params.get('villa') ?? villas[0].id}
    />
  )
}

function ProposalEditor({
  editId,
  editing,
  villaParam,
}: {
  editId: string | null
  editing: Proposal | undefined
  villaParam: string
}) {
  const isEditing = Boolean(editId)

  const [villaId, setVillaId] = React.useState(editing?.villaId ?? villaParam)
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
  const [errors, setErrors] = React.useState<ProposalFormErrors>({})
  const [saveError, setSaveError] = React.useState('')
  const [isSaving, setIsSaving] = React.useState(false)
  const [isSaved, setIsSaved] = React.useState(false)
  const savedProposalId = React.useRef(editId)
  const isSavingRef = React.useRef(false)
  const savedStateTimeout = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  React.useEffect(() => {
    return () => {
      if (savedStateTimeout.current) {
        clearTimeout(savedStateTimeout.current)
      }
    }
  }, [])

  function toggleAddOn(id: string) {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const selectedAddOns: AddOn[] = addOns.filter((a) => selected.has(a.id))
  const addOnsTotal = selectedAddOns.reduce(
    (sum, addOn) => sum + getAddOnPrice(addOn, villa.price),
    0,
  )
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
    setErrors({})
  }

  function persistProposal() {
    if (isSavingRef.current) return

    if (savedStateTimeout.current) {
      clearTimeout(savedStateTimeout.current)
      savedStateTimeout.current = null
    }
    setIsSaved(false)
    setSaveError('')

    const addOnIds = Array.from(selected)
    const validationErrors = validateProposalForm({
      villaId,
      clientName,
      phone,
      email,
      manager,
      proposalText,
    })
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) {
      scrollToFirstInvalidField(validationErrors)
      return
    }

    isSavingRef.current = true
    setIsSaving(true)
    try {
      const saved = saveProposal(
        {
          villaId,
          clientName,
          phone,
          email,
          manager,
          comment,
          proposalText,
          addOnIds,
        },
        savedProposalId.current ?? undefined,
      )
      savedProposalId.current = saved.id
      return saved
    } catch (error) {
      setSaveError(
        error instanceof Error ? error.message : 'Unable to save proposal.',
      )
    } finally {
      isSavingRef.current = false
      setIsSaving(false)
    }
  }

  function handleGenerate(e: React.FormEvent) {
    e.preventDefault()
    const saved = persistProposal()
    if (!saved) return

    window.open(
      `/proposals/view?id=${encodeURIComponent(saved.id)}`,
      '_blank',
      'noopener,noreferrer',
    )
  }

  function handleSave() {
    const saved = persistProposal()
    if (!saved) return

    setIsSaved(true)
    savedStateTimeout.current = setTimeout(() => {
      setIsSaved(false)
      savedStateTimeout.current = null
    }, 2200)
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <Link
        href={isEditing ? '/proposals' : '/villas'}
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        {isEditing ? 'Back to proposals' : 'Back to villas'}
      </Link>

      <div className="mb-8 flex flex-col gap-2">
        <h1 className="font-serif text-4xl font-semibold tracking-tight text-foreground">
          {isEditing ? 'Edit proposal' : 'Create proposal'}
        </h1>
        <p className="text-base leading-relaxed text-muted-foreground">
          Configure the residence, add-ons and client details, then generate a
          shareable proposal.
        </p>
      </div>

      <form
        noValidate
        onSubmit={handleGenerate}
        className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_380px]"
      >
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
                required
                aria-invalid={Boolean(errors.villaId)}
                aria-describedby={errors.villaId ? 'villa-select-error' : undefined}
                onChange={(e) => {
                  setVillaId(e.target.value)
                  setErrors((current) => ({ ...current, villaId: undefined }))
                }}
                className="h-11 w-full rounded-lg border border-border bg-background px-3.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30"
              >
                {villas.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.name} — {formatTHB(v.price)}
                  </option>
                ))}
              </select>
              <FieldError id="villa-select-error">{errors.villaId}</FieldError>
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
            <fieldset className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <legend className="sr-only">Additional options (optional)</legend>
              {addOns.map((addOn) => {
                const Icon = addOnIcons[addOn.id] ?? Home
                const active = selected.has(addOn.id)
                const priceMode =
                  addOn.price.mode === 'fixed' ? 'fixed' : `${addOn.price.value}%`
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
                        + {formatTHB(getAddOnPrice(addOn, villa.price))} ({priceMode})
                      </span>
                    </span>
                  </button>
                )
              })}
            </fieldset>
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
              required
              aria-invalid={Boolean(errors.proposalText)}
              aria-describedby={errors.proposalText ? 'proposal-text-error' : undefined}
              onChange={(e) => {
                setProposalText(e.target.value)
                setErrors((current) => ({ ...current, proposalText: undefined }))
              }}
              rows={6}
              className="min-h-36 aria-invalid:border-destructive aria-invalid:ring-destructive/20"
              placeholder="Dear client, we are delighted to present this residence as an exceptional opportunity…"
            />
            <FieldError id="proposal-text-error">{errors.proposalText}</FieldError>
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
                  required
                  aria-invalid={Boolean(errors.clientName)}
                  aria-describedby={errors.clientName ? 'client-name-error' : undefined}
                  onChange={(e) => {
                    setClientName(e.target.value)
                    setErrors((current) => ({ ...current, clientName: undefined }))
                  }}
                  className="aria-invalid:border-destructive aria-invalid:ring-destructive/20"
                  placeholder="e.g. Oliver Bennett"
                />
                <FieldError id="client-name-error">{errors.clientName}</FieldError>
              </div>
              <div>
                <Label htmlFor="manager">Manager name</Label>
                <Input
                  id="manager"
                  value={manager}
                  required
                  aria-invalid={Boolean(errors.manager)}
                  aria-describedby={errors.manager ? 'manager-error' : undefined}
                  onChange={(e) => {
                    setManager(e.target.value)
                    setErrors((current) => ({ ...current, manager: undefined }))
                  }}
                  className="aria-invalid:border-destructive aria-invalid:ring-destructive/20"
                  placeholder="e.g. Anna Petrova"
                />
                <FieldError id="manager-error">{errors.manager}</FieldError>
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? 'phone-error' : 'contact-requirement'}
                  onChange={(e) => {
                    setPhone(e.target.value)
                    setErrors((current) => ({
                      ...current,
                      phone: undefined,
                      email: undefined,
                    }))
                  }}
                  className="aria-invalid:border-destructive aria-invalid:ring-destructive/20"
                  placeholder="+66 ..."
                />
                <FieldError id="phone-error">{errors.phone}</FieldError>
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'email-error' : 'contact-requirement'}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setErrors((current) => ({
                      ...current,
                      phone: undefined,
                      email: undefined,
                    }))
                  }}
                  className="aria-invalid:border-destructive aria-invalid:ring-destructive/20"
                  placeholder="client@example.com"
                />
                <FieldError id="email-error">{errors.email}</FieldError>
              </div>
              <p
                id="contact-requirement"
                className="text-xs text-muted-foreground sm:col-span-2"
              >
                Provide at least one contact method: phone or email.
              </p>
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
          <div className="proposal-actions flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm">
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
                    <span className="text-muted-foreground">
                      + {formatTHB(getAddOnPrice(a, villa.price))}
                    </span>
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

            <div
              role="group"
              aria-label="Proposal actions"
              data-slot="button-group"
              className="mt-2 flex w-full"
            >
              <Button
                type="submit"
                size="lg"
                disabled={isSaving}
                className="h-12 min-w-0 flex-1 rounded-r-none border-r border-r-primary-foreground/20 text-sm"
              >
                <FileText />
                Generate Proposal
              </Button>
              <Button
                type="button"
                size="lg"
                disabled={isSaving}
                aria-label={isSaved ? 'Proposal saved' : 'Save proposal'}
                title={isSaved ? 'Proposal saved' : 'Save proposal'}
                data-save-button
                onClick={handleSave}
                className={`h-12 overflow-hidden rounded-l-none border-l border-l-primary-foreground/20 px-0 transition-[width] duration-300 ease-out motion-reduce:transition-none ${
                  isSaved ? 'w-24 gap-1.5' : 'w-12 gap-0'
                }`}
              >
                {isSaved ? (
                  <>
                    <Check className="size-4" />
                    <span>Saved</span>
                  </>
                ) : (
                  <SaveIcon className="size-4" />
                )}
              </Button>
            </div>
            {saveError && (
              <p className="text-center text-sm text-destructive" role="alert">
                {saveError}
              </p>
            )}
            <p className="text-center text-xs text-muted-foreground">
              <span className="proposal-generate-hint">
                Opens a printable proposal in a new tab.
              </span>
              <span className="proposal-save-hint">Saves form changes.</span>
            </p>
          </div>
        </aside>
      </form>

      <ChatBot onAutofill={handleAutofill} />
    </div>
  )
}
