---
id: "202611090821-N8G0B3"
title: "Replace company identity with Avelora Lakeside"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify:
  - "ap doctor"
  - "node .agentplane/policy/check-routing.mjs"
  - "npm run lint"
  - "npm run typecheck"
  - "npm test"
plan_approval:
  state: "approved"
  updated_at: "2026-11-09T08:21:34.065Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implement the approved fictional Avelora Lakeside identity across application, assistant, documentation and logo assets with local verification."
events:
  -
    type: "status"
    at: "2026-11-09T08:21:39.812Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement the approved fictional Avelora Lakeside identity across application, assistant, documentation and logo assets with local verification."
doc_version: 3
doc_updated_at: "2026-11-09T08:21:39.812Z"
doc_updated_by: "CODER"
description: "Approved by user: replace all existing company name references, logo and favicon with fictional Avelora Lakeside branding while preserving typography, palette, layout and print presentation. Include assistant prompts and documentation. Local work only."
sections:
  Summary: "Replace the existing company identity with the user-approved fictional Avelora Lakeside brand."
  Scope: "Company names in app/components, assistant prompts and tool descriptions, docs/AI_BOT_SPEC.md and docs/AI_BOT_IMPL.md. Replace public brand image and app favicon with a minimal AL and leaf vector mark. Preserve layout, typography, palette and browser storage keys. No network or publishing."
  Plan: "CODER will replace all company references with Avelora Lakeside, create a minimal AL/leaf SVG logo and matching favicon, remove old image assets, preserve visual styling and storage compatibility, run the declared local checks, and commit the verified changes. User approved this scope in chat."
  Verify Steps: |-
    - Search tracked product source and documentation for the previous company name and logo path; expect zero references.
    - Inspect the new SVG logo and favicon for a clear AL monogram with leaf and transparent background; confirm both share the same paths.
    - npm run lint
    - npm run typecheck
    - npm test
    - node .agentplane/policy/check-routing.mjs
    - ap doctor
    - git diff --check and final git status --short --untracked-files=all.
  Verification: "Pending execution."
  Rollback Plan: "Revert the scoped implementation commit to restore the previous brand and image assets."
  Findings: "User explicitly approved this plan in chat. No external access required. Existing browser storage identifiers retain Lakeside and remain compatible."
id_source: "generated"
---
## Summary

Replace the existing company identity with the user-approved fictional Avelora Lakeside brand.

## Scope

Company names in app/components, assistant prompts and tool descriptions, docs/AI_BOT_SPEC.md and docs/AI_BOT_IMPL.md. Replace public brand image and app favicon with a minimal AL and leaf vector mark. Preserve layout, typography, palette and browser storage keys. No network or publishing.

## Plan

CODER will replace all company references with Avelora Lakeside, create a minimal AL/leaf SVG logo and matching favicon, remove old image assets, preserve visual styling and storage compatibility, run the declared local checks, and commit the verified changes. User approved this scope in chat.

## Verify Steps

- Search tracked product source and documentation for the previous company name and logo path; expect zero references.
- Inspect the new SVG logo and favicon for a clear AL monogram with leaf and transparent background; confirm both share the same paths.
- npm run lint
- npm run typecheck
- npm test
- node .agentplane/policy/check-routing.mjs
- ap doctor
- git diff --check and final git status --short --untracked-files=all.

## Verification

Pending execution.

## Rollback Plan

Revert the scoped implementation commit to restore the previous brand and image assets.

## Findings

User explicitly approved this plan in chat. No external access required. Existing browser storage identifiers retain Lakeside and remain compatible.
