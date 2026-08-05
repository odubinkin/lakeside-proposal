import AxeBuilder from '@axe-core/playwright'
import { expect, test, type Page } from '@playwright/test'

const storageKey = 'lakeside.proposals.v1'

const existingProposal = {
  id: 'PRO-E2E',
  villaId: 'lagoon-6',
  clientName: 'Existing Client',
  phone: '+66 81 234 5678',
  email: 'existing@example.com',
  manager: 'Existing Manager',
  comment: 'Existing note',
  proposalText: 'Existing commercial proposal.',
  addOnIds: ['furniture'],
  completed: true,
  createdAt: '2026-08-01',
}

async function seedProposals(page: Page, proposals: unknown) {
  await page.goto('/villas')
  await page.evaluate(
    ({ key, value }) => window.localStorage.setItem(key, JSON.stringify(value)),
    { key: storageKey, value: proposals },
  )
}

async function expectNoSeriousA11yViolations(page: Page) {
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa'])
    .analyze()
  expect(
    results.violations.filter(({ impact }) => impact === 'critical' || impact === 'serious'),
  ).toEqual([])
}

test('creates, persists, lists, and opens a printable proposal on mobile', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await seedProposals(page, [])
  await page.goto('/villas')
  await expectNoSeriousA11yViolations(page)

  await page.getByRole('button', { name: 'Create Proposal' }).first().click()
  await expect(page).toHaveURL(/\/proposals\/new\?villa=lagoon-6/)
  await page.getByLabel('Proposal text').fill('A tailored commercial proposal.')
  await page.getByLabel('Client name').fill('Mobile Buyer')
  await page.getByLabel('Manager name').fill('Sales Manager')
  await page.getByLabel('Email').fill('buyer@example.com')
  await page.getByRole('button', { name: /Furniture Package/ }).click()
  await expect(page.getByRole('button', { name: /save proposal/i })).toHaveCount(0)
  await expectNoSeriousA11yViolations(page)

  await expect
    .poll(() =>
      page.evaluate((key) => {
        return JSON.parse(window.localStorage.getItem(key) ?? '[]')
      }, storageKey),
    )
    .toMatchObject([{ completed: true }])

  await page.goto('/proposals')
  await expect(page.getByText('Mobile Buyer')).toBeVisible()
  const popupPromise = page.waitForEvent('popup')
  await page.getByRole('button', { name: 'View' }).click()
  const proposalPage = await popupPromise
  await proposalPage.waitForLoadState('domcontentloaded')
  await expect(proposalPage.getByText('Prepared for Mobile Buyer by Sales Manager')).toBeVisible()
  await proposalPage.emulateMedia({ media: 'print' })
  await expect(proposalPage.getByRole('button', { name: 'Print proposal' })).toBeHidden()

  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  )
  expect(hasHorizontalOverflow).toBe(false)
})

test('edits a proposal without duplicating it and recalculates pricing', async ({ page }) => {
  await seedProposals(page, [existingProposal])
  await page.goto('/proposals')
  await page.getByRole('button', { name: 'Edit' }).click()

  await page.getByLabel('Selected villa').selectOption('canopy-hill')
  await page.getByRole('button', { name: /Smart Home/ }).click()
  await expect(page.getByText(/63,345,000/)).toBeVisible()
  await page.getByLabel('Client name').fill('Edited Client')

  await expect
    .poll(() =>
      page.evaluate((key) => {
        return JSON.parse(window.localStorage.getItem(key) ?? '[]')
      }, storageKey),
    )
    .toMatchObject([{ clientName: 'Edited Client', completed: true }])
  const saved = await page.evaluate(
    (key) => JSON.parse(window.localStorage.getItem(key) ?? '[]'),
    storageKey,
  )
  expect(saved).toHaveLength(1)
  expect(saved[0]).toMatchObject({
    id: existingProposal.id,
    createdAt: existingProposal.createdAt,
    clientName: 'Edited Client',
    villaId: 'canopy-hill',
    addOnIds: ['furniture', 'smart-home'],
  })
})

test('requires confirmation before deleting a proposal', async ({ page }) => {
  await seedProposals(page, [existingProposal])
  await page.goto('/proposals')

  await page.getByRole('button', { name: 'Delete' }).click()
  await expect(page.getByRole('dialog', { name: 'Delete proposal?' })).toBeVisible()
  await page.getByRole('button', { name: 'Cancel' }).click()
  await expect(page.getByText('Existing Client')).toBeVisible()

  await page.getByRole('button', { name: 'Delete' }).click()
  await page.getByRole('button', { name: 'Delete proposal' }).click()
  await expect(page.getByText('No proposals yet')).toBeVisible()
  expect(
    await page.evaluate((key) => JSON.parse(window.localStorage.getItem(key) ?? '[]'), storageKey),
  ).toEqual([])
})

test('handles validation, corrupt storage, and missing deep links safely', async ({ page }) => {
  await seedProposals(page, [])
  await page.goto('/proposals/new?villa=lagoon-6')
  await page.getByRole('button', { name: 'Generate Proposal' }).click()
  await expect(page.getByText('Enter the proposal text.')).toBeVisible()
  await expect(page.getByText('Enter the client name.')).toBeVisible()
  await expect(page.getByText('Enter the manager name.')).toBeVisible()

  await page.evaluate((key) => window.localStorage.setItem(key, '{broken'), storageKey)
  await page.goto('/proposals')
  await expect(page.getByText('No proposals yet')).toBeVisible()

  await page.goto('/proposals/edit?id=PRO-MISSING')
  await expect(page.getByRole('heading', { name: 'Proposal not found' })).toBeVisible()
  await page.goto('/proposals/view?id=PRO-MISSING')
  await expect(page.getByRole('heading', { name: 'Proposal not found' })).toBeVisible()
})

test('uses Willow mock tool flow and keeps transcripts proposal-scoped', async ({ page }) => {
  await seedProposals(page, [])
  await page.goto('/proposals/new?villa=lagoon-6')
  await page.getByRole('button', { name: 'Chat with assistant' }).click()
  await page.getByRole('button', { name: 'Fill the form with a sample client' }).click()

  await expect(page.getByText('Filling in the form…')).toBeVisible()
  await expect(
    page.getByText(
      'Form completed, fields changed: Add-ons, Proposal text, Client name, Manager, Phone, Email, Comment',
    ),
  ).toBeVisible()
  await expect(page.getByText('Filling in the form…')).toHaveCount(0)
  await expect(page.getByLabel('Client name')).toHaveValue('Oliver Bennett')
  await expect(page.getByLabel('Email')).toHaveValue('oliver.bennett@example.com')
  await expect(page.getByRole('button', { name: /Furniture Package/ })).toHaveAttribute(
    'aria-pressed',
    'true',
  )
  await expect(page.getByRole('button', { name: /Smart Home Integrated/ })).toHaveAttribute(
    'aria-pressed',
    'true',
  )
  await expect(page.getByRole('button', { name: /Kitchen Upgrade/ })).toHaveAttribute(
    'aria-pressed',
    'true',
  )
  await expect(page.getByText(/I've filled in the client details/)).toBeVisible()

  await page.getByRole('button', { name: 'Close' }).click()
  const savedProposal = await page.evaluate((key) => {
    const proposals = JSON.parse(window.localStorage.getItem(key) ?? '[]')
    return proposals[0] as { id: string; completed: boolean }
  }, storageKey)
  expect(savedProposal.completed).toBe(true)
  const savedId = savedProposal.id
  await page.goto(`/proposals/edit?id=${encodeURIComponent(savedId)}`)
  await page.getByRole('button', { name: 'Chat with assistant' }).click()
  await expect(page.getByText(/I've filled in the client details/)).toBeVisible()

  await page.evaluate(
    ({ key, proposal }) => {
      const current = JSON.parse(window.localStorage.getItem(key) ?? '[]')
      window.localStorage.setItem(key, JSON.stringify([...current, proposal]))
    },
    { key: storageKey, proposal: existingProposal },
  )
  await page.goto(`/proposals/edit?id=${existingProposal.id}`)
  await page.getByRole('button', { name: 'Chat with assistant' }).click()
  await expect(page.getByText(/I've filled in the client details/)).toHaveCount(0)
  await expect(page.getByText(/Hi, I'm Willow/)).toBeVisible()
})
