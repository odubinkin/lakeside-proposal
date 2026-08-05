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
import type {
  ProposalFormPatch,
  ProposalFormState,
} from '@/lib/ai/contracts'
import { executeFormPatch, type FormToolResult } from '@/lib/ai/form-tool'
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
  const [formState, dispatchForm] = React.useReducer(proposalFormReducer, {
    villaId: editing?.villaId ?? villaParam,
    addOnIds: editing?.addOnIds ?? [],
    proposalText: editing?.proposalText ?? '',
    clientName: editing?.clientName ?? '',
    manager: editing?.manager ?? '',
    phone: editing?.phone ?? '',
    email: editing?.email ?? '',
    comment: editing?.comment ?? '',
  })
  const formStateRef = React.useRef(formState)
  React.useEffect(() => {
    formStateRef.current = formState
  }, [formState])
  const {
    villaId,
    addOnIds,
    clientName,
    phone,
    email,
    manager,
    comment,
    proposalText,
  } = formState
  const villa = getVilla(villaId) ?? villas[0]
  const [errors, setErrors] = React.useState<ProposalFormErrors>({})
  const [saveError, setSaveError] = React.useState('')
  const [isSaving, setIsSaving] = React.useState(false)
  const [isSaved, setIsSaved] = React.useState(false)
  const savedProposalId = React.useRef(editId)
  const [conversationProposalId, setConversationProposalId] = React.useState(editId)
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
    dispatchForm({ type: 'toggleAddOn', id })
  }

  const selected = new Set(addOnIds)
  const selectedAddOns = addOns.filter((addOn) => selected.has(addOn.id))
  const addOnsTotal = selectedAddOns.reduce(
    (sum, addOn) => sum + getAddOnPrice(addOn, villa.price),
    0,
  )
  const total = villa.price + addOnsTotal

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
      setConversationProposalId(saved.id)
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
        dispatchForm({ type: 'patch', patch: { clientName: value } })
        setErrors((current) => ({ ...current, clientName: undefined }))
        break
      case 'manager':
        dispatchForm({ type: 'patch', patch: { manager: value } })
        setErrors((current) => ({ ...current, manager: undefined }))
        break
      case 'phone':
        dispatchForm({ type: 'patch', patch: { phone: value } })
        setErrors((current) => ({
          ...current,
          phone: undefined,
          email: undefined,
        }))
        break
      case 'email':
        dispatchForm({ type: 'patch', patch: { email: value } })
        setErrors((current) => ({
          ...current,
          phone: undefined,
          email: undefined,
        }))
        break
      case 'comment':
        dispatchForm({ type: 'patch', patch: { comment: value } })
        break
    }
  }

  function handleAssistantPatch(patch: ProposalFormPatch): FormToolResult {
    const result = executeFormPatch(formStateRef.current, patch)
    if (!result.ok) return result

    formStateRef.current = result.newForm
    dispatchForm({ type: 'replace', form: result.newForm })
    setErrors((current) => {
      const next = { ...current }
      for (const field of result.changedFields) {
        if (field in next) delete next[field as keyof ProposalFormErrors]
      }
      return next
    })
    return result
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
              dispatchForm({ type: 'patch', patch: { villaId: nextVillaId } })
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
              dispatchForm({ type: 'patch', patch: { proposalText: value } })
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

      <ChatBot
        form={formState}
        proposalId={conversationProposalId}
        onApplyPatch={handleAssistantPatch}
      />
    </div>
  )
}

type ProposalFormAction =
  | { type: 'patch'; patch: Partial<ProposalFormState> }
  | { type: 'replace'; form: ProposalFormState }
  | { type: 'toggleAddOn'; id: string }

function proposalFormReducer(
  state: ProposalFormState,
  action: ProposalFormAction,
): ProposalFormState {
  switch (action.type) {
    case 'replace':
      return { ...action.form, addOnIds: [...action.form.addOnIds] }
    case 'patch':
      return { ...state, ...action.patch }
    case 'toggleAddOn':
      return {
        ...state,
        addOnIds: state.addOnIds.includes(action.id)
          ? state.addOnIds.filter((id) => id !== action.id)
          : [...state.addOnIds, action.id],
      }
  }
}
