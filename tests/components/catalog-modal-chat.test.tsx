import * as React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { ChatBot } from '@/components/chat-bot'
import { Modal } from '@/components/ui/modal'
import { VillasCatalog } from '@/components/villas-catalog'
import { handleChatRequest } from '@/app/api/ai/chat/route'
import { executeFormPatch } from '@/lib/ai/form-tool'
import { MockAssistantAdapter } from '@/lib/ai/server/mock-adapter'
import { baseForm } from '@/tests/helpers/ai'

describe('VillasCatalog', () => {
  it('filters by name and location, shows an empty state, and clears search', async () => {
    const user = userEvent.setup()
    render(<VillasCatalog />)

    expect(screen.getByText('6 of 6 residences')).toBeInTheDocument()
    await user.type(screen.getByLabelText('Search villas'), 'Kamala')
    expect(screen.getByText('Canopy Hill Villa')).toBeInTheDocument()
    expect(screen.queryByText('Lagoon Residence 6')).not.toBeInTheDocument()

    await user.clear(screen.getByLabelText('Search villas'))
    await user.type(screen.getByLabelText('Search villas'), 'does not exist')
    expect(screen.getByText('No villas found')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Clear search' }))
    expect(screen.getByText('6 of 6 residences')).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: /Create Proposal/ })[0]).toHaveAttribute(
      'href',
      '/proposals/new?villa=lagoon-6',
    )
  })
})

describe('Modal', () => {
  it('locks scrolling and closes from Escape, backdrop, and close control', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    const { rerender } = render(
      <Modal open onClose={onClose} labelledBy="dialog-title">
        <h2 id="dialog-title">Example dialog</h2>
      </Modal>,
    )

    expect(screen.getByRole('dialog', { name: 'Example dialog' })).toBeInTheDocument()
    expect(document.body.style.overflow).toBe('hidden')
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(onClose).toHaveBeenCalledOnce()
    await user.click(screen.getByRole('button', { name: 'Close' }))
    expect(onClose).toHaveBeenCalledTimes(2)
    fireEvent.click(screen.getByRole('dialog').previousElementSibling!)
    expect(onClose).toHaveBeenCalledTimes(3)

    rerender(
      <Modal open={false} onClose={onClose} labelledBy="dialog-title">
        <h2 id="dialog-title">Example dialog</h2>
      </Modal>,
    )
    expect(document.body.style.overflow).toBe('')
  })
})

describe('ChatBot', () => {
  it('provides icon controls plus resize and maximize behavior', async () => {
    const user = userEvent.setup()
    render(
      <ChatBot
        form={baseForm}
        proposalId="PRO-CONTROLS"
        onApplyPatch={(patch) => executeFormPatch(baseForm, patch)}
      />,
    )
    await user.click(screen.getByRole('button', { name: 'Chat with assistant' }))

    const dialog = screen.getByRole('dialog', { name: 'Willow · AI Assistant' })
    expect(dialog).toHaveClass('resize')
    expect(screen.getByRole('button', { name: 'Close chat' })).toBeInTheDocument()
    expect(screen.queryByText('Close')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Maximize chat window' }))
    expect(dialog).toHaveClass('resize-none', 'max-w-none')
    expect(
      screen.getByRole('button', { name: 'Restore chat window' }),
    ).toHaveAttribute('aria-pressed', 'true')

    await user.click(screen.getByRole('button', { name: 'Restore chat window' }))
    expect(dialog).toHaveClass('resize')
    expect(
      screen.getByRole('button', { name: 'Maximize chat window' }),
    ).toHaveAttribute('aria-pressed', 'false')
  })

  it('sends a suggestion and typed prompt through the server endpoint', async () => {
    const fetchMock = mockAssistantFetch()
    render(
      <ChatBot
        form={baseForm}
        proposalId="PRO-CHAT"
        onApplyPatch={(patch) => executeFormPatch(baseForm, patch)}
      />,
    )
    fireEvent.click(screen.getByRole('button', { name: 'Chat with assistant' }))

    fireEvent.click(
      screen.getByRole('button', { name: 'Recommend add-ons for a family buyer' }),
    )
    expect(
      screen.queryByRole('button', { name: 'Recommend add-ons for a family buyer' }),
    ).not.toBeInTheDocument()
    expect(
      await screen.findByText(/Furniture Package, Smart Home and Kitchen Upgrade/),
    ).toBeInTheDocument()

    fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'Hello' } })
    fireEvent.submit(screen.getByLabelText('Message').closest('form')!)
    expect(await screen.findByText(/Happy to help with that/)).toBeInTheDocument()
    expect(fetchMock).toHaveBeenCalledTimes(2)
    for (const call of fetchMock.mock.calls) {
      expect(call[0]).toBe('/api/ai/chat')
      const request = JSON.parse(String(call[1]?.body)) as Record<string, unknown>
      expect(request).not.toHaveProperty('proposalId')
      expect(JSON.stringify(request)).not.toContain('PRO-CHAT')
    }
  })

  it('executes mock autofill through a correlated tool continuation', async () => {
    const fetchMock = mockAssistantFetch()
    const onApplyPatch = vi.fn((patch) => executeFormPatch(baseForm, patch))
    render(
      <ChatBot form={baseForm} proposalId="PRO-CHAT" onApplyPatch={onApplyPatch} />,
    )
    fireEvent.click(screen.getByRole('button', { name: 'Chat with assistant' }))

    fireEvent.click(
      screen.getByRole('button', { name: 'Fill the form with a sample client' }),
    )
    expect(await screen.findByText('Filling in the form…')).toBeInTheDocument()
    expect(
      await screen.findByText(
        'Form completed, fields changed: Add-ons, Proposal text, Client name, Manager, Phone, Email, Comment',
      ),
    ).toBeInTheDocument()
    expect(screen.queryByText('Filling in the form…')).not.toBeInTheDocument()
    expect(onApplyPatch).toHaveBeenCalledOnce()
    expect(await screen.findByText(/I've filled in the client details/)).toBeInTheDocument()
    expect(fetchMock).toHaveBeenCalledTimes(2)
    const continuationRequest = JSON.parse(String(fetchMock.mock.calls[1][1]?.body))
    expect(continuationRequest).toMatchObject({
      protocolVersion: 1,
      continuation: {
        toolName: 'edit_proposal_form',
        result: { ok: true },
      },
    })
    expect(continuationRequest.runId).not.toBe(
      JSON.parse(String(fetchMock.mock.calls[0][1]?.body)).runId,
    )
  })
})

function mockAssistantFetch() {
  const fetchMock = vi.fn(async (_input: RequestInfo | URL, init?: RequestInit) => {
    const request = new Request('http://localhost/api/ai/chat', {
      method: 'POST',
      headers: init?.headers,
      body: init?.body,
      signal: init?.signal ?? undefined,
    })
    return handleChatRequest(request, () => new MockAssistantAdapter())
  })
  vi.stubGlobal('fetch', fetchMock)
  return fetchMock
}
