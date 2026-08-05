# Villa Sales Configurator

Villa Sales Configurator is a browser-based prototype for sales managers at a villa development. It supports the core meeting workflow: browse available villas, configure optional upgrades, capture client details, save proposals, and open a print-friendly commercial offer.

Villa and add-on catalogs are stored as local JSON files, while saved proposals and Willow chat transcripts are persisted in the current browser with `localStorage`. The application includes a server-side chat route for its AI assistant but does not require a database, authentication, payment integration, or external AI service when running in mock mode.

## Features

- Browse a catalog of villas with images, descriptions, specifications, and prices.
- Start a proposal from a selected villa.
- Select multiple add-ons with fixed or percentage-based pricing.
- See option subtotals and the proposal total update automatically.
- Capture client and sales-manager details with form validation.
- Create, edit, view, and delete proposals stored in the browser.
- Open a polished proposal view suitable for browser printing.
- Ask Willow to explain catalog options, recommend add-ons, and update proposal fields.
- Use deterministic mock assistant responses locally or connect an OpenRouter model.

## Willow AI assistant

Willow is available from the proposal editor. Chat messages are sent to `POST /api/ai/chat`, which streams assistant text and validated form-tool requests back to the browser. Form changes are validated and applied atomically by the client, and each proposal keeps a separate browser-local transcript.

The assistant uses deterministic mock responses by default, so no credentials are needed for local development. To enable a real model, create `.env.local` and set both server-only OpenRouter variables:

```text
OPENROUTER_API_KEY=<your OpenRouter API key>
OPENROUTER_MODEL=<OpenRouter model identifier>
```

Restart the development server after changing these values. Willow selects OpenRouter only when both values are non-empty; otherwise it remains in mock mode. Do not expose the API key through a `NEXT_PUBLIC_` variable. See [Willow AI Assistant Implementation](docs/AI_BOT_IMPL.md) for the protocol, prompt, tool execution, persistence, verification, and operational caveats.

## Technology stack

- Next.js 16 with the App Router
- React 19 and TypeScript
- Tailwind CSS 4
- Base UI and reusable local UI components
- Lucide React icons
- LangChain with OpenRouter-compatible chat models
- Zod runtime validation for the assistant protocol and form tool
- ESLint with the Next.js configuration
- Vitest, jsdom, and Testing Library for unit and component tests
- Playwright and axe-core for browser and accessibility checks

## Project structure

```text
app/          Next.js routes, layouts, and global styles
components/   Feature and reusable UI components
data/         JSON catalogs and development proposal fixtures
e2e/          Playwright browser scenarios
lib/          Catalog helpers, pricing, and browser persistence
public/       Static brand and villa images
tests/        Vitest unit, component, and shared setup files
```

## Prerequisites

- Node.js compatible with Next.js 16 (a current LTS release is recommended)
- npm, included with Node.js

## Installation

Clone the repository, open its directory, and install dependencies:

```bash
npm install
```

## Development

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The root route redirects to the villa catalog.

## Production build and start

Create an optimized production build:

```bash
npm run build
```

Start the built application:

```bash
npm run start
```

By default, the production server is available at [http://localhost:3000](http://localhost:3000).

## Testing and code quality

Run ESLint across the project:

```bash
npm run lint
```

Run the TypeScript compiler without emitting files:

```bash
npm run typecheck
```

Run all unit and component tests once:

```bash
npm test
```

Run the same tests in watch mode while developing:

```bash
npm run test:watch
```

Run the core business-logic coverage gate:

```bash
npm run test:coverage
```

The configured gate requires at least 90% line, function, and statement coverage,
and 85% branch coverage across catalog pricing, proposal persistence, and form
validation.

Install the Playwright Chromium browser once after installing dependencies:

```bash
npx playwright install chromium
```

Then run the browser scenarios:

```bash
npm run test:e2e
```

The Playwright suite covers the four critical user journeys: creating and
persisting a proposal, editing without duplication, confirmed deletion, and
validation/corrupt-storage/missing-link handling. It also includes mobile,
print-media, and serious accessibility-violation checks.

Run the full CI-ready sequence locally:

```bash
npm run check
```

This executes linting, type checking, coverage, the production build, and the
Chromium E2E suite in that order. Browser tests start the application on
`http://localhost:3000` automatically, or reuse an existing local server.

### Test layout

```text
tests/unit/        Pricing, catalog contracts, storage, and validation
tests/components/  Decomposed form sections and critical UI interactions
e2e/               End-to-end proposal workflows in Chromium
```

## Data and persistence

The villa and add-on catalogs live in `data/villas.json` and `data/add-ons.json`. In development, `data/proposals.dev.json` supplies initial example proposals when the browser has no saved data.

Created proposals are stored under the versioned `lakeside.proposals.v1` key in browser `localStorage`. Data is local to the browser profile and origin: clearing site storage removes saved proposals, and proposals are not synchronized between browsers or devices.
