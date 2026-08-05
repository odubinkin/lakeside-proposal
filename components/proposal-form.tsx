/**
 * @file Implements proposal creation and editing, validation, pricing, persistence, and generation actions.
 */

'use client'

import * as React from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ChatBot, type ChatPromptRequest } from '@/components/chat-bot'
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
  canAutosaveProposalForm,
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

const PROPOSAL_TEXT_AI_PROMPT = 'Fill in the commercial proposal text.'

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
  const [chatPromptRequest, setChatPromptRequest] =
    React.useState<ChatPromptRequest>()
  const savedProposalId = React.useRef(editId)
  const [proposalId, setProposalId] = React.useState(editId)
  const isEditing = Boolean(proposalId)
  const isSavingRef = React.useRef(false)
  const autosaveTimeout = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  const lastSavedFingerprint = React.useRef(JSON.stringify(formState))

  React.useEffect(() => {
    return () => {
      if (autosaveTimeout.current) {
        clearTimeout(autosaveTimeout.current)
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
    const current = formStateRef.current.addOnIds
    const addOnIds = current.includes(id)
      ? current.filter((addOnId) => addOnId !== id)
      : [...current, id]
    updateForm({ addOnIds }, 'immediate')
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
   * @param snapshot - Complete proposal form snapshot to save.
   * @param options - Persistence controls.
   * @param options.force - Whether to bypass autosave completeness and deduplication guards.
   * @returns The saved proposal on success, otherwise `undefined`.
   */
  function persistProposal(
    snapshot: ProposalFormState,
    options: { force?: boolean } = {},
  ) {
    if (isSavingRef.current) return
    if (!options.force && !canAutosaveProposalForm(snapshot)) return

    const fingerprint = JSON.stringify(snapshot)
    if (!options.force && fingerprint === lastSavedFingerprint.current) return

    setSaveError('')
    const completed = Object.keys(validateProposalForm(snapshot)).length === 0

    isSavingRef.current = true
    setIsSaving(true)
    try {
      const isFirstSave = savedProposalId.current === null
      const saved = saveProposal(
        {
          ...snapshot,
          completed,
        },
        savedProposalId.current ?? undefined,
      )
      savedProposalId.current = saved.id
      lastSavedFingerprint.current = fingerprint
      setProposalId(saved.id)
      if (isFirstSave) {
        replaceProposalUrl(saved.id)
      }
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
   * Cancels the pending debounced autosave, if one exists.
   *
   * @returns Nothing.
   */
  function cancelScheduledAutosave() {
    if (!autosaveTimeout.current) return
    clearTimeout(autosaveTimeout.current)
    autosaveTimeout.current = null
  }

  /**
   * Replaces the pending autosave with a debounce for the latest form snapshot.
   *
   * @param snapshot - Complete form state to persist after the debounce interval.
   * @returns Nothing.
   */
  function scheduleAutosave(snapshot: ProposalFormState) {
    cancelScheduledAutosave()
    autosaveTimeout.current = setTimeout(() => {
      autosaveTimeout.current = null
      persistProposal(snapshot)
    }, 500)
  }

  /**
   * Applies a local form patch and schedules the requested persistence behavior.
   *
   * @param patch - Partial trusted form update from the editor UI.
   * @param autosave - Whether to debounce or immediately persist the new snapshot.
   * @returns Nothing.
   */
  function updateForm(
    patch: Partial<ProposalFormState>,
    autosave: 'debounced' | 'immediate',
  ) {
    const next = {
      ...formStateRef.current,
      ...patch,
      addOnIds: patch.addOnIds
        ? [...patch.addOnIds]
        : [...formStateRef.current.addOnIds],
    }
    formStateRef.current = next
    dispatchForm({ type: 'replace', form: next })

    if (autosave === 'debounced') {
      scheduleAutosave(next)
    } else {
      cancelScheduledAutosave()
      persistProposal(next)
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
    cancelScheduledAutosave()
    setSaveError('')

    const snapshot = formStateRef.current
    const validationErrors = validateProposalForm(snapshot)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) {
      scrollToFirstInvalidField(validationErrors)
      return
    }

    const saved = persistProposal(snapshot, { force: true })
    if (!saved) return

    window.open(
      `/proposals/view?id=${encodeURIComponent(saved.id)}`,
      '_blank',
      'noopener,noreferrer',
    )
  }

  /**
   * Updates one client-details field and clears its relevant validation errors.
   *
   * @param field - Client-details field changed by the user.
   * @param value - New field value from the editor.
   * @returns Nothing.
   */
  function handleClientDetailsChange(field: ClientDetailsField, value: string) {
    switch (field) {
      case 'clientName':
        updateForm({ clientName: value }, 'debounced')
        setErrors((current) => ({ ...current, clientName: undefined }))
        break
      case 'manager':
        updateForm({ manager: value }, 'debounced')
        setErrors((current) => ({ ...current, manager: undefined }))
        break
      case 'phone':
        updateForm({ phone: value }, 'debounced')
        setErrors((current) => ({
          ...current,
          phone: undefined,
          email: undefined,
        }))
        break
      case 'email':
        updateForm({ email: value }, 'debounced')
        setErrors((current) => ({
          ...current,
          phone: undefined,
          email: undefined,
        }))
        break
      case 'comment':
        updateForm({ comment: value }, 'debounced')
        break
    }
  }

  /**
   * Validates and atomically applies a Willow form-tool patch to the editor state.
   *
   * @param patch - Model-requested editable-field patch.
   * @returns Complete tool result sent back to the assistant continuation.
   */
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
    cancelScheduledAutosave()
    persistProposal(result.newForm)
    return result
  }

  /**
   * Updates the editor URL after a draft receives its first persisted proposal ID.
   *
   * @param id - Newly persisted proposal identifier.
   * @returns Nothing.
   */
  function replaceProposalUrl(id: string) {
    window.history.replaceState(
      window.history.state,
      '',
      `/proposals/edit?id=${encodeURIComponent(id)}`,
    )
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
        <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <h1 className="font-serif text-4xl font-semibold tracking-tight text-foreground">
            {isEditing ? 'Edit proposal' : 'Create proposal'}
          </h1>
          {proposalId && (
            <Badge className="shrink-0 font-mono">{proposalId}</Badge>
          )}
        </div>
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
              updateForm({ villaId: nextVillaId }, 'immediate')
              setErrors((current) => ({ ...current, villaId: undefined }))
            }}
          />

          <AddOnsSelector
            selected={selected}
            villaPrice={villa.price}
            onToggle={toggleAddOn}
          />

          <ClientDetailsSection
            values={{ clientName, manager, phone, email, comment }}
            errors={errors}
            onChange={handleClientDetailsChange}
          />

          <ProposalTextSection
            value={proposalText}
            error={errors.proposalText}
            onFillWithAI={() =>
              setChatPromptRequest((current) => ({
                id: (current?.id ?? 0) + 1,
                message: PROPOSAL_TEXT_AI_PROMPT,
              }))
            }
            onChange={(value) => {
              updateForm({ proposalText: value }, 'debounced')
              setErrors((current) => ({
                ...current,
                proposalText: undefined,
              }))
            }}
          />
        </div>

        <PriceSummary
          villaPrice={villa.price}
          selectedAddOns={selectedAddOns}
          total={total}
        >
          <ProposalActions
            isSaving={isSaving}
            saveError={saveError}
          />
        </PriceSummary>
      </form>

      <ChatBot
        form={formState}
        proposalId={proposalId}
        onApplyPatch={handleAssistantPatch}
        promptRequest={chatPromptRequest}
      />
    </div>
  )
}

type ProposalFormAction =
  | { type: 'patch'; patch: Partial<ProposalFormState> }
  | { type: 'replace'; form: ProposalFormState }

/**
 * Applies patch or replacement actions to the reducer-backed proposal form state.
 *
 * @param state - Current complete proposal form state.
 * @param action - Partial patch or complete replacement action.
 * @returns The next proposal form state with an isolated add-on array on replacement.
 */
function proposalFormReducer(
  state: ProposalFormState,
  action: ProposalFormAction,
): ProposalFormState {
  switch (action.type) {
    case 'replace':
      return { ...action.form, addOnIds: [...action.form.addOnIds] }
    case 'patch':
      return { ...state, ...action.patch }
  }
}
