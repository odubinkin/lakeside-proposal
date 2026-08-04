# Villa Sales Configurator

Villa Sales Configurator is a browser-based prototype for sales managers at a villa development. It supports the core meeting workflow: browse available villas, configure optional upgrades, capture client details, save proposals, and open a print-friendly commercial offer.

The project is intentionally frontend-only. Villa and add-on catalogs are stored as local JSON files, while saved proposals are persisted in the current browser with `localStorage`. No backend, database, authentication, payment integration, or external AI service is required.

## Features

- Browse a catalog of villas with images, descriptions, specifications, and prices.
- Start a proposal from a selected villa.
- Select multiple add-ons with fixed or percentage-based pricing.
- See option subtotals and the proposal total update automatically.
- Capture client and sales-manager details with form validation.
- Create, edit, view, and delete proposals stored in the browser.
- Open a polished proposal view suitable for browser printing.
- Use development mock proposals and a demo autofill flow.

The proposal copy is currently entered or filled with predefined demo text. A real AI-powered copy-generation or recommendation feature has not been implemented.

## Technology stack

- Next.js 16 with the App Router
- React 19 and TypeScript
- Tailwind CSS 4
- Base UI and reusable local UI components
- Lucide React icons
- ESLint with the Next.js configuration

## Project structure

```text
app/          Next.js routes, layouts, and global styles
components/   Feature and reusable UI components
data/         JSON catalogs and development proposal fixtures
lib/          Catalog helpers, pricing, and browser persistence
public/       Static brand and villa images
docs/         Project documentation
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

## Code quality

Run ESLint across the project:

```bash
npm run lint
```

## Data and persistence

The villa and add-on catalogs live in `data/villas.json` and `data/add-ons.json`. In development, `data/proposals.dev.json` supplies initial example proposals when the browser has no saved data.

Created proposals are stored under the versioned `lakeside.proposals.v1` key in browser `localStorage`. Data is local to the browser profile and origin: clearing site storage removes saved proposals, and proposals are not synchronized between browsers or devices.
