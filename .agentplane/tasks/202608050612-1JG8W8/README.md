---
id: "202608050612-1JG8W8"
title: "Implement Willow AI assistant"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 9
origin:
  system: "manual"
depends_on: []
tags:
  - "backend"
  - "code"
  - "frontend"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-08-05T06:13:24.765Z"
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
    body: "Start: continue direct-mode task in current checkout."
events:
  -
    type: "status"
    at: "2026-08-05T06:13:30.453Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue direct-mode task in current checkout."
doc_version: 3
doc_updated_at: "2026-08-05T06:36:59.066Z"
doc_updated_by: "CODER"
description: "Implement docs/AI_BOT_SPEC.md end to end: server-side LangChain/OpenRouter and deterministic mock, NDJSON streaming, client-executed form tool, scoped chat persistence, tests, and implementation documentation."
sections:
  Summary: "Implement the approved Willow assistant specification end to end in the existing Next.js application while preserving the deterministic mock UX and keeping provider secrets server-only."
  Scope: "Add pinned LangChain and runtime-schema dependencies; shared AI contracts and validation; server prompt, provider factory, OpenRouter and mock adapters; POST /api/ai/chat NDJSON streaming; atomic client-side form tool execution; proposal-scoped chat persistence and cleanup; unit, route, component, and E2E coverage; docs/AI_BOT_IMPL.md. Preserve unrelated existing worktree changes."
  Plan: "1. Add pinned runtime dependencies and shared validated contracts. 2. Implement prompt construction, provider selection, OpenRouter adapter, deterministic mock, streaming route, and safe errors. 3. Refactor proposal form state for complete snapshots and atomic validated patches. 4. Replace local chat routing with NDJSON transport, continuation, cancellation, retry, and persisted proposal-scoped transcript. 5. Add deletion cleanup and draft-to-saved migration. 6. Add unit, integration, component, and E2E coverage with forced mock/fakes. 7. Write verified implementation documentation. 8. Run all declared checks and Agentplane verification."
  Verify Steps: |-
    1. npm run lint
    2. npm run typecheck
    3. npm run test:coverage
    4. npm run build
    5. npm run test:e2e
    6. Verify automated tests explicitly clear OpenRouter environment variables and never call a real provider.
    7. Verify client bundles and tracked files contain no OpenRouter credential values.
    8. node .agentplane/policy/check-routing.mjs
    9. ap doctor
  Verification: |-
    Command: npm run check. Result: pass. Evidence: ESLint and TypeScript passed; 13 Vitest files and 91 tests passed; coverage 95.33% statements, 93.08% branches, 95.91% functions, and 97.08% lines; Next.js production build compiled /api/ai/chat; all 5 Playwright tests passed. Scope: complete application, AI protocol, mock/tool flow, persistence, build, and browser behavior.

    Command: client bundle secret guard. Result: pass. Evidence: no OPENROUTER_API_KEY, OPENROUTER_MODEL, OpenRouter base URL, or canonical system prompt found under .next/static. Scope: production client output.

    Command: test provider guard. Result: pass. Evidence: tests/setup.tsx explicitly deletes both OpenRouter variables and all AI tests use mock or in-process fake adapters. Scope: automated test isolation from external AI services.

    Command: node .agentplane/policy/check-routing.mjs. Result: pass. Evidence: policy routing OK. Scope: repository policy integrity.

    Command: ap doctor. Result: pass. Evidence: doctor OK with zero errors and zero warnings; two informational fallback/compatibility notices. Scope: Agentplane workspace health.

    Command: git diff --check. Result: pass. Evidence: no whitespace errors. Scope: complete task diff.
  Rollback Plan: "Revert only the implementation commit and generated task-close commit for this task; restore the prior client-only ChatBot, proposal form state, proposal deletion behavior, dependency manifests/locks, tests, and remove docs/AI_BOT_IMPL.md. Do not modify the pre-existing dirty task README."
  Findings: ""
id_source: "generated"
---
## Summary

Implement the approved Willow assistant specification end to end in the existing Next.js application while preserving the deterministic mock UX and keeping provider secrets server-only.

## Scope

Add pinned LangChain and runtime-schema dependencies; shared AI contracts and validation; server prompt, provider factory, OpenRouter and mock adapters; POST /api/ai/chat NDJSON streaming; atomic client-side form tool execution; proposal-scoped chat persistence and cleanup; unit, route, component, and E2E coverage; docs/AI_BOT_IMPL.md. Preserve unrelated existing worktree changes.

## Plan

1. Add pinned runtime dependencies and shared validated contracts. 2. Implement prompt construction, provider selection, OpenRouter adapter, deterministic mock, streaming route, and safe errors. 3. Refactor proposal form state for complete snapshots and atomic validated patches. 4. Replace local chat routing with NDJSON transport, continuation, cancellation, retry, and persisted proposal-scoped transcript. 5. Add deletion cleanup and draft-to-saved migration. 6. Add unit, integration, component, and E2E coverage with forced mock/fakes. 7. Write verified implementation documentation. 8. Run all declared checks and Agentplane verification.

## Verify Steps

1. npm run lint
2. npm run typecheck
3. npm run test:coverage
4. npm run build
5. npm run test:e2e
6. Verify automated tests explicitly clear OpenRouter environment variables and never call a real provider.
7. Verify client bundles and tracked files contain no OpenRouter credential values.
8. node .agentplane/policy/check-routing.mjs
9. ap doctor

## Verification

Command: npm run check. Result: pass. Evidence: ESLint and TypeScript passed; 13 Vitest files and 91 tests passed; coverage 95.33% statements, 93.08% branches, 95.91% functions, and 97.08% lines; Next.js production build compiled /api/ai/chat; all 5 Playwright tests passed. Scope: complete application, AI protocol, mock/tool flow, persistence, build, and browser behavior.

Command: client bundle secret guard. Result: pass. Evidence: no OPENROUTER_API_KEY, OPENROUTER_MODEL, OpenRouter base URL, or canonical system prompt found under .next/static. Scope: production client output.

Command: test provider guard. Result: pass. Evidence: tests/setup.tsx explicitly deletes both OpenRouter variables and all AI tests use mock or in-process fake adapters. Scope: automated test isolation from external AI services.

Command: node .agentplane/policy/check-routing.mjs. Result: pass. Evidence: policy routing OK. Scope: repository policy integrity.

Command: ap doctor. Result: pass. Evidence: doctor OK with zero errors and zero warnings; two informational fallback/compatibility notices. Scope: Agentplane workspace health.

Command: git diff --check. Result: pass. Evidence: no whitespace errors. Scope: complete task diff.

## Rollback Plan

Revert only the implementation commit and generated task-close commit for this task; restore the prior client-only ChatBot, proposal form state, proposal deletion behavior, dependency manifests/locks, tests, and remove docs/AI_BOT_IMPL.md. Do not modify the pre-existing dirty task README.

## Findings
