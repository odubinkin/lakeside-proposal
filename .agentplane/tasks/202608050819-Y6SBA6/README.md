---
id: "202608050819-Y6SBA6"
title: "Keep replies in the user's language"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-08-05T08:20:05.688Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-05T08:21:11.763Z"
  updated_by: "CODER"
  note: "All declared checks passed: focused AI server tests (9/9), ESLint, TypeScript, routing validation, Agentplane doctor, git diff check, and final scoped diff review. The prompt and canonical specification contain matching reply-language and English-form rules."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: update Willow language behavior, canonical documentation, and prompt tests in the approved direct-mode scope."
events:
  -
    type: "status"
    at: "2026-08-05T08:20:14.402Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: update Willow language behavior, canonical documentation, and prompt tests in the approved direct-mode scope."
  -
    type: "verify"
    at: "2026-08-05T08:21:11.763Z"
    author: "CODER"
    state: "ok"
    note: "All declared checks passed: focused AI server tests (9/9), ESLint, TypeScript, routing validation, Agentplane doctor, git diff check, and final scoped diff review. The prompt and canonical specification contain matching reply-language and English-form rules."
doc_version: 3
doc_updated_at: "2026-08-05T08:21:11.849Z"
doc_updated_by: "CODER"
description: "Update Willow's system prompt so conversational replies follow the language of the user's current message while all values written to the proposal form remain in English; synchronize canonical documentation and prompt tests."
sections:
  Summary: |-
    Keep replies in the user's language

    Update Willow's system prompt so conversational replies follow the language of the user's current message while all values written to the proposal form remain in English; synchronize canonical documentation and prompt tests.
  Scope: |-
    - In scope: Update Willow's system prompt so conversational replies follow the language of the user's current message while all values written to the proposal form remain in English; synchronize canonical documentation and prompt tests.
    - Out of scope: unrelated refactors not required for "Keep replies in the user's language".
  Plan: "1. Add explicit system-prompt rules requiring conversational replies to use the language of the user's current message while keeping every value written to the proposal form in English. 2. Synchronize the canonical prompt specification and implementation documentation. 3. Extend prompt unit coverage for both language constraints. 4. Run targeted tests, lint, typecheck, policy validation, health checks, and diff review; record verification evidence."
  Verify Steps: |-
    1. Run `npm test -- --run tests/unit/ai-server.test.ts`. Expected: prompt construction tests pass and explicitly assert both reply-language matching and English-only form values.
    2. Run `npm run lint`. Expected: ESLint completes without errors.
    3. Run `npm run typecheck`. Expected: TypeScript completes without errors.
    4. Run `node .agentplane/policy/check-routing.mjs`. Expected: Agentplane routing policy validation passes.
    5. Run `ap doctor`. Expected: repository health checks pass without task-scoped errors.
    6. Review `git diff --check` and the final diff. Expected: no whitespace errors, unrelated changes, duplicate prompt rules, or divergence between implementation and canonical documentation.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-05T08:21:11.763Z — VERIFY — ok

    By: CODER

    Note: All declared checks passed: focused AI server tests (9/9), ESLint, TypeScript, routing validation, Agentplane doctor, git diff check, and final scoped diff review. The prompt and canonical specification contain matching reply-language and English-form rules.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-05T08:20:14.402Z, excerpt_hash=sha256:62d87f85d0311ac477b4ea6c803c39e6f8bb6ff5419e83300abf0b175c58f8ab

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608050819-Y6SBA6/blueprint/resolved-snapshot.json
    - old_digest: 16beec5c0949e2cd4c887e26af836591a03ec80435ac9413369ef23d6a5f2217
    - current_digest: 16beec5c0949e2cd4c887e26af836591a03ec80435ac9413369ef23d6a5f2217
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608050819-Y6SBA6

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane task verify-show 202608050819-Y6SBA6
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Keep replies in the user's language

Update Willow's system prompt so conversational replies follow the language of the user's current message while all values written to the proposal form remain in English; synchronize canonical documentation and prompt tests.

## Scope

- In scope: Update Willow's system prompt so conversational replies follow the language of the user's current message while all values written to the proposal form remain in English; synchronize canonical documentation and prompt tests.
- Out of scope: unrelated refactors not required for "Keep replies in the user's language".

## Plan

1. Add explicit system-prompt rules requiring conversational replies to use the language of the user's current message while keeping every value written to the proposal form in English. 2. Synchronize the canonical prompt specification and implementation documentation. 3. Extend prompt unit coverage for both language constraints. 4. Run targeted tests, lint, typecheck, policy validation, health checks, and diff review; record verification evidence.

## Verify Steps

1. Run `npm test -- --run tests/unit/ai-server.test.ts`. Expected: prompt construction tests pass and explicitly assert both reply-language matching and English-only form values.
2. Run `npm run lint`. Expected: ESLint completes without errors.
3. Run `npm run typecheck`. Expected: TypeScript completes without errors.
4. Run `node .agentplane/policy/check-routing.mjs`. Expected: Agentplane routing policy validation passes.
5. Run `ap doctor`. Expected: repository health checks pass without task-scoped errors.
6. Review `git diff --check` and the final diff. Expected: no whitespace errors, unrelated changes, duplicate prompt rules, or divergence between implementation and canonical documentation.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-05T08:21:11.763Z — VERIFY — ok

By: CODER

Note: All declared checks passed: focused AI server tests (9/9), ESLint, TypeScript, routing validation, Agentplane doctor, git diff check, and final scoped diff review. The prompt and canonical specification contain matching reply-language and English-form rules.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-05T08:20:14.402Z, excerpt_hash=sha256:62d87f85d0311ac477b4ea6c803c39e6f8bb6ff5419e83300abf0b175c58f8ab

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608050819-Y6SBA6/blueprint/resolved-snapshot.json
- old_digest: 16beec5c0949e2cd4c887e26af836591a03ec80435ac9413369ef23d6a5f2217
- current_digest: 16beec5c0949e2cd4c887e26af836591a03ec80435ac9413369ef23d6a5f2217
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608050819-Y6SBA6

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane task verify-show 202608050819-Y6SBA6
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
