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

- Next.js 16.4.5 with the App Router
- React 19 and TypeScript 7.0.2
- Tailwind CSS 4
- Base UI and reusable local UI components
- Lucide React icons
- LangChain with OpenRouter-compatible chat models
- Zod runtime validation for the assistant protocol and form tool
- ESLint with the Next.js configuration
- Vitest, jsdom, and Testing Library for unit and component tests
- Playwright and axe-core for browser and accessibility checks

Type checking uses the stable TypeScript 7 compiler (`tsc`), installed as
`@typescript/native`. The `typescript` alias supplies Microsoft's TypeScript 6
compatibility API for ESLint and Next.js tooling, following the
[official side-by-side setup](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/#running-side-by-side-with-typescript-6.0).

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

- Current Node.js LTS (26 or newer); `.nvmrc` uses `lts/*` and Docker uses `node:lts-alpine`
- npm, included with Node.js

## Installation

Clone the repository, open its directory, and install dependencies:

```bash
nvm install --lts
nvm use
npm ci
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

## Docker

The Docker image builds and runs the optimized standalone Next.js production
server. The main Compose configuration exposes the application to an existing
Traefik instance without publishing port 3000 on the host.

Before starting the production stack, make sure that Traefik is connected to the
same external Docker network as the application, has an entrypoint named
`websecure`, and has a certificate resolver named `letsencrypt`. The network
name comes from `TRAEFIK_NETWORK` and defaults to `dokploy-network`. Set the
public domain and, optionally, the network name and server-only OpenRouter
credentials:

```bash
export APP_DOMAIN=proposal.example.com
export TRAEFIK_NETWORK=dokploy-network
export OPENROUTER_API_KEY=<your OpenRouter API key>
export OPENROUTER_MODEL=<OpenRouter model identifier>
```

If the external network does not exist yet, create it once and connect the
Traefik container to it:

```bash
docker network create "${TRAEFIK_NETWORK:-dokploy-network}"
```

Build and start the application in the background:

```bash
docker compose up -d --build
```

Traefik routes `https://${APP_DOMAIN}` to port 3000 inside the application
container and requests its TLS certificate through the `letsencrypt` resolver.
If either OpenRouter variable is empty or omitted, Willow uses its deterministic
mock provider.

For local access, apply the local override together with the main Compose file.
It preserves the production configuration and also publishes the application on
[http://localhost:3000](http://localhost:3000):

```bash
APP_DOMAIN=localhost docker compose \
  -f docker-compose.yml \
  -f docker-compose.local.yml \
  up --build
```

Stop either stack with the same Compose file arguments used to start it, adding
`down` in place of `up --build`.

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
