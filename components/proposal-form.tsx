/**
 * @file Implements proposal creation and editing, validation, pricing, persistence, and generation actions.
 */

'use client'

import * as React from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ChatBot } from '@/components/chat-bot'
import { ProposalLoading } from '@/components/proposal-loading'
import { AddOnsSelector } from '@/components/proposal-form/add-ons-selector'
import {
  ClientDetailsSection,
  type ClientDetailsField,
} from '@/components/proposal-form/client-details-section'
import { PriceSummary } from '@/components/proposal-form/price-summary'
import { ProposalActions } from '@/components/proposal-form/proposal-actions'
import {
  scrollToFirstInvalidField,
  validateProposalForm,
  type ProposalFormErrors,
} from '@/components/proposal-form/proposal-form.utils'
import { ProposalTextSection } from '@/components/proposal-form/proposal-text-section'
import { VillaSelector } from '@/components/proposal-form/villa-selector'
import { addOns, getAddOnPrice, getVilla, villas, type Proposal } from '@/lib/data'
import {
  getProposalsServerSnapshot,
  getProposalsSnapshot,
  parseProposals,
  PROPOSALS_SERVER_SNAPSHOT,
  saveProposal,
  subscribeProposals,
} from '@/lib/proposal-storage'

/**
 * Resolves URL parameters and browser storage before mounting the proposal editor.
 *
 * @returns A loading state, a missing-proposal message, or the initialized proposal editor.
 */
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

/**
 * Renders and manages the complete proposal editor for create and edit workflows.
 *
 * @param props - Editor initialization properties.
 * @param props.editId - Proposal identifier from the URL, or `null` for a new proposal.
 * @param props.editing - Existing proposal data resolved from browser storage.
 * @param props.villaParam - Villa identifier requested by the URL or catalog default.
 * @returns The interactive villa, add-on, proposal-copy, client, and pricing form.
 */
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

  /**
   * Adds or removes an add-on identifier from the current selection.
   *
   * @param id - Add-on identifier to toggle.
   * @returns Nothing.
   */
  function toggleAddOn(id: string) {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const selectedAddOns = addOns.filter((addOn) => selected.has(addOn.id))
  const addOnsTotal = selectedAddOns.reduce(
    (sum, addOn) => sum + getAddOnPrice(addOn, villa.price),
    0,
  )
  const total = villa.price + addOnsTotal

  /**
   * Populates the editor with the predefined demo client, copy, and add-on package.
   *
   * @returns Nothing.
   */
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

  /**
   * Validates and persists the current proposal while preventing concurrent saves.
   *
   * @returns The saved proposal on success, otherwise `undefined`.
   */
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

  /**
   * Saves the proposal and opens its print-friendly view in a new browser tab.
   *
   * @param e - Form submission event to prevent from navigating normally.
   * @returns Nothing.
   */
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

  /**
   * Saves the proposal in place and temporarily displays save confirmation.
   *
   * @returns Nothing.
   */
  function handleSave() {
    const saved = persistProposal()
    if (!saved) return

    setIsSaved(true)
    savedStateTimeout.current = setTimeout(() => {
      setIsSaved(false)
      savedStateTimeout.current = null
    }, 2200)
  }

  function handleClientDetailsChange(field: ClientDetailsField, value: string) {
    switch (field) {
      case 'clientName':
        setClientName(value)
        setErrors((current) => ({ ...current, clientName: undefined }))
        break
      case 'manager':
        setManager(value)
        setErrors((current) => ({ ...current, manager: undefined }))
        break
      case 'phone':
        setPhone(value)
        setErrors((current) => ({
          ...current,
          phone: undefined,
          email: undefined,
        }))
        break
      case 'email':
        setEmail(value)
        setErrors((current) => ({
          ...current,
          phone: undefined,
          email: undefined,
        }))
        break
      case 'comment':
        setComment(value)
        break
    }
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
        <div className="flex flex-col gap-6">
          <VillaSelector
            villa={villa}
            villaId={villaId}
            error={errors.villaId}
            onVillaChange={(nextVillaId) => {
              setVillaId(nextVillaId)
              setErrors((current) => ({ ...current, villaId: undefined }))
            }}
          />

          <AddOnsSelector
            selected={selected}
            villaPrice={villa.price}
            onToggle={toggleAddOn}
          />

          <ProposalTextSection
            value={proposalText}
            error={errors.proposalText}
            onChange={(value) => {
              setProposalText(value)
              setErrors((current) => ({
                ...current,
                proposalText: undefined,
              }))
            }}
          />

          <ClientDetailsSection
            values={{ clientName, manager, phone, email, comment }}
            errors={errors}
            onChange={handleClientDetailsChange}
          />
        </div>

        <PriceSummary
          villaPrice={villa.price}
          selectedAddOns={selectedAddOns}
          total={total}
        >
          <ProposalActions
            isSaving={isSaving}
            isSaved={isSaved}
            saveError={saveError}
            onSave={handleSave}
          />
        </PriceSummary>
      </form>

      <ChatBot onAutofill={handleAutofill} />
    </div>
  )
}
