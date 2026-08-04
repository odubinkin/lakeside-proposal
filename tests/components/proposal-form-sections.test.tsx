import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { AddOnsSelector } from '@/components/proposal-form/add-ons-selector'
import { ClientDetailsSection } from '@/components/proposal-form/client-details-section'
import { PriceSummary } from '@/components/proposal-form/price-summary'
import { ProposalActions } from '@/components/proposal-form/proposal-actions'
import { ProposalTextSection } from '@/components/proposal-form/proposal-text-section'
import { VillaSelector } from '@/components/proposal-form/villa-selector'
import { addOns, villas } from '@/lib/data'

describe('decomposed proposal form sections', () => {
  it('renders and toggles add-ons with calculated prices', async () => {
    const user = userEvent.setup()
    const onToggle = vi.fn()
    render(
      <AddOnsSelector
        selected={new Set(['furniture'])}
        villaPrice={42_500_000}
        onToggle={onToggle}
      />,
    )

    expect(screen.getByRole('button', { name: /Furniture Package/ })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
    expect(screen.getByText(/2,125,000/)).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /Smart Home/ }))
    expect(onToggle).toHaveBeenCalledWith('smart-home')
  })

  it('connects villa, proposal text, and client fields to callbacks', async () => {
    const user = userEvent.setup()
    const onVillaChange = vi.fn()
    const onProposalTextChange = vi.fn()
    const onClientChange = vi.fn()

    const { rerender } = render(
      <VillaSelector
        villa={villas[0]}
        villaId={villas[0].id}
        error="Select a villa."
        onVillaChange={onVillaChange}
      />,
    )
    await user.selectOptions(screen.getByLabelText('Selected villa'), 'canopy-hill')
    expect(onVillaChange).toHaveBeenCalledWith('canopy-hill')
    expect(screen.getByRole('alert')).toHaveTextContent('Select a villa.')

    rerender(
      <ProposalTextSection
        value=""
        error="Enter the proposal text."
        onChange={onProposalTextChange}
      />,
    )
    await user.type(screen.getByLabelText('Proposal text'), 'Offer')
    expect(onProposalTextChange).toHaveBeenLastCalledWith('r')
    expect(screen.getByRole('alert')).toHaveTextContent('Enter the proposal text.')

    rerender(
      <ClientDetailsSection
        values={{
          clientName: '',
          manager: '',
          phone: '',
          email: '',
          comment: '',
        }}
        errors={{ clientName: 'Enter the client name.' }}
        onChange={onClientChange}
      />,
    )
    fireEvent.change(screen.getByLabelText('Client name'), {
      target: { value: 'Alex' },
    })
    expect(onClientChange).toHaveBeenCalledWith('clientName', 'Alex')
    expect(screen.getByRole('alert')).toHaveTextContent('Enter the client name.')
  })

  it('summarizes prices and renders proposal action states', async () => {
    const user = userEvent.setup()
    const onSave = vi.fn()
    const furniture = addOns.find(({ id }) => id === 'furniture')!

    const { rerender } = render(
      <PriceSummary
        villaPrice={42_500_000}
        selectedAddOns={[furniture]}
        total={44_625_000}
      >
        <ProposalActions
          isSaving={false}
          isSaved={false}
          saveError=""
          onSave={onSave}
        />
      </PriceSummary>,
    )

    expect(screen.getByText('Add-ons (1)')).toBeInTheDocument()
    expect(screen.getByText(/44,625,000/)).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Save proposal' }))
    expect(onSave).toHaveBeenCalledOnce()

    rerender(
      <PriceSummary villaPrice={42_500_000} selectedAddOns={[]} total={42_500_000}>
        <ProposalActions
          isSaving={true}
          isSaved={true}
          saveError="Storage unavailable"
          onSave={onSave}
        />
      </PriceSummary>,
    )
    expect(screen.getByText('No add-ons selected.')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Proposal saved' })).toBeDisabled()
    expect(screen.getByRole('alert')).toHaveTextContent('Storage unavailable')
  })
})
