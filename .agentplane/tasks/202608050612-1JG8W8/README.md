---
id: "202608050612-1JG8W8"
title: "Implement Willow AI assistant"
result_summary: "verified-202608050612-1JG8W8"
status: "DONE"
priority: "med"
owner: "CODER"
revision: 15
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
  state: "ok"
  updated_at: "2026-08-05T06:38:31.051Z"
  updated_by: "CODER"
  note: "verified-202608050612-1JG8W8"
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-08-05T06:38:05.628Z"
  updated_by: "EVALUATOR"
  note: "Willow implementation matches the approved specification and all declared automated, build, browser, secret-isolation, and policy checks pass."
  evaluated_sha: "a74c36d40d3e65b47dc8948a397d62383737f9dd"
  blueprint_digest: "5c1440686317d6fe6befa06afa8b521fb9532790be835d0c9aeb3858ff9b5c36"
  evidence_refs:
    - ".agentplane/tasks/202608050612-1JG8W8/README.md"
    - ".agentplane/tasks/202608050612-1JG8W8/quality/20260805-063805628-recovery-context/quality-report.json"
    - ".agentplane/tasks/202608050612-1JG8W8/quality/20260805-063805628-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202608050612-1JG8W8/quality/20260805-063805628-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202608050612-1JG8W8/blueprint/resolved-snapshot.json"
    - "npm run check"
  findings:
    - "Server-only provider selection, correlated NDJSON streaming, client-executed atomic form tools, scoped persistence, retry/cancellation, and deterministic mock compatibility are implemented and covered."
commit:
  hash: "a74c36d40d3e65b47dc8948a397d62383737f9dd"
  message: "🚧 1JG8W8 task: implement Willow AI assistant"
comments:
  -
    author: "CODER"
    body: "Start: continue direct-mode task in current checkout."
  -
    author: "CODER"
    body: "Verified: verified-202608050612-1JG8W8. Guided shortcut recorded verification and is closing the direct task with traceable commit metadata."
events:
  -
    type: "status"
    at: "2026-08-05T06:13:30.453Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue direct-mode task in current checkout."
  -
    type: "verify"
    at: "2026-08-05T06:37:48.275Z"
    author: "CODER"
    state: "ok"
    note: "Verified: full npm check, client-secret guard, policy routing, and Agentplane doctor all pass for the Willow implementation."
  -
    type: "verify"
    at: "2026-08-05T06:37:55.588Z"
    author: "CODER"
    state: "ok"
    note: "verified-202608050612-1JG8W8"
  -
    type: "verify"
    at: "2026-08-05T06:38:11.086Z"
    author: "CODER"
    state: "ok"
    note: "verified-202608050612-1JG8W8"
  -
    type: "verify"
    at: "2026-08-05T06:38:31.051Z"
    author: "CODER"
    state: "ok"
    note: "verified-202608050612-1JG8W8"
  -
    type: "status"
    at: "2026-08-05T06:38:31.187Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: verified-202608050612-1JG8W8. Guided shortcut recorded verification and is closing the direct task with traceable commit metadata."
doc_version: 3
doc_updated_at: "2026-08-05T06:38:31.188Z"
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

    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-05T06:37:48.275Z — VERIFY — ok

    By: CODER

    Note: Verified: full npm check, client-secret guard, policy routing, and Agentplane doctor all pass for the Willow implementation.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-05T06:36:59.066Z, excerpt_hash=sha256:26f1b3962990cbf27cbab81a92dab6510c26920aa11dcad2e516dea72aafbe7a

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608050612-1JG8W8/blueprint/resolved-snapshot.json
    - old_digest: 5c1440686317d6fe6befa06afa8b521fb9532790be835d0c9aeb3858ff9b5c36
    - current_digest: 5c1440686317d6fe6befa06afa8b521fb9532790be835d0c9aeb3858ff9b5c36
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608050612-1JG8W8

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane task verify-show 202608050612-1JG8W8
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-05T06:37:55.588Z — VERIFY — ok

    By: CODER

    Note: verified-202608050612-1JG8W8
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-05T06:37:48.370Z, excerpt_hash=sha256:26f1b3962990cbf27cbab81a92dab6510c26920aa11dcad2e516dea72aafbe7a

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608050612-1JG8W8/blueprint/resolved-snapshot.json
    - old_digest: 5c1440686317d6fe6befa06afa8b521fb9532790be835d0c9aeb3858ff9b5c36
    - current_digest: 5c1440686317d6fe6befa06afa8b521fb9532790be835d0c9aeb3858ff9b5c36
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608050612-1JG8W8

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane task complete 202608050612-1JG8W8 --result verified-202608050612-1JG8W8 --commit a74c36d40d3e65b47dc8948a397d62383737f9dd
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-05T06:38:11.086Z — VERIFY — ok

    By: CODER

    Note: verified-202608050612-1JG8W8
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-05T06:37:55.670Z, excerpt_hash=sha256:26f1b3962990cbf27cbab81a92dab6510c26920aa11dcad2e516dea72aafbe7a

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608050612-1JG8W8/blueprint/resolved-snapshot.json
    - old_digest: 5c1440686317d6fe6befa06afa8b521fb9532790be835d0c9aeb3858ff9b5c36
    - current_digest: 5c1440686317d6fe6befa06afa8b521fb9532790be835d0c9aeb3858ff9b5c36
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608050612-1JG8W8

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane task complete 202608050612-1JG8W8 --result verified-202608050612-1JG8W8 --commit a74c36d40d3e65b47dc8948a397d62383737f9dd
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-05T06:38:31.051Z — VERIFY — ok

    By: CODER

    Note: verified-202608050612-1JG8W8
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-05T06:38:11.169Z, excerpt_hash=sha256:26f1b3962990cbf27cbab81a92dab6510c26920aa11dcad2e516dea72aafbe7a

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608050612-1JG8W8/blueprint/resolved-snapshot.json
    - old_digest: 5c1440686317d6fe6befa06afa8b521fb9532790be835d0c9aeb3858ff9b5c36
    - current_digest: 5c1440686317d6fe6befa06afa8b521fb9532790be835d0c9aeb3858ff9b5c36
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608050612-1JG8W8

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane task complete 202608050612-1JG8W8 --result verified-202608050612-1JG8W8 --commit 97dfad20b89daf416eb3ae14445959d1a6d4dae6
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
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

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-05T06:37:48.275Z — VERIFY — ok

By: CODER

Note: Verified: full npm check, client-secret guard, policy routing, and Agentplane doctor all pass for the Willow implementation.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-05T06:36:59.066Z, excerpt_hash=sha256:26f1b3962990cbf27cbab81a92dab6510c26920aa11dcad2e516dea72aafbe7a

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608050612-1JG8W8/blueprint/resolved-snapshot.json
- old_digest: 5c1440686317d6fe6befa06afa8b521fb9532790be835d0c9aeb3858ff9b5c36
- current_digest: 5c1440686317d6fe6befa06afa8b521fb9532790be835d0c9aeb3858ff9b5c36
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608050612-1JG8W8

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane task verify-show 202608050612-1JG8W8
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-05T06:37:55.588Z — VERIFY — ok

By: CODER

Note: verified-202608050612-1JG8W8
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-05T06:37:48.370Z, excerpt_hash=sha256:26f1b3962990cbf27cbab81a92dab6510c26920aa11dcad2e516dea72aafbe7a

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608050612-1JG8W8/blueprint/resolved-snapshot.json
- old_digest: 5c1440686317d6fe6befa06afa8b521fb9532790be835d0c9aeb3858ff9b5c36
- current_digest: 5c1440686317d6fe6befa06afa8b521fb9532790be835d0c9aeb3858ff9b5c36
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608050612-1JG8W8

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane task complete 202608050612-1JG8W8 --result verified-202608050612-1JG8W8 --commit a74c36d40d3e65b47dc8948a397d62383737f9dd
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-05T06:38:11.086Z — VERIFY — ok

By: CODER

Note: verified-202608050612-1JG8W8
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-05T06:37:55.670Z, excerpt_hash=sha256:26f1b3962990cbf27cbab81a92dab6510c26920aa11dcad2e516dea72aafbe7a

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608050612-1JG8W8/blueprint/resolved-snapshot.json
- old_digest: 5c1440686317d6fe6befa06afa8b521fb9532790be835d0c9aeb3858ff9b5c36
- current_digest: 5c1440686317d6fe6befa06afa8b521fb9532790be835d0c9aeb3858ff9b5c36
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608050612-1JG8W8

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane task complete 202608050612-1JG8W8 --result verified-202608050612-1JG8W8 --commit a74c36d40d3e65b47dc8948a397d62383737f9dd
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-05T06:38:31.051Z — VERIFY — ok

By: CODER

Note: verified-202608050612-1JG8W8
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-05T06:38:11.169Z, excerpt_hash=sha256:26f1b3962990cbf27cbab81a92dab6510c26920aa11dcad2e516dea72aafbe7a

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608050612-1JG8W8/blueprint/resolved-snapshot.json
- old_digest: 5c1440686317d6fe6befa06afa8b521fb9532790be835d0c9aeb3858ff9b5c36
- current_digest: 5c1440686317d6fe6befa06afa8b521fb9532790be835d0c9aeb3858ff9b5c36
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608050612-1JG8W8

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane task complete 202608050612-1JG8W8 --result verified-202608050612-1JG8W8 --commit 97dfad20b89daf416eb3ae14445959d1a6d4dae6
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert only the implementation commit and generated task-close commit for this task; restore the prior client-only ChatBot, proposal form state, proposal deletion behavior, dependency manifests/locks, tests, and remove docs/AI_BOT_IMPL.md. Do not modify the pre-existing dirty task README.

## Findings
