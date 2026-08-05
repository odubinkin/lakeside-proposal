---
id: "202608050918-NEMWWZ"
title: "Implement proposal form autosave"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 13
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "frontend"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-08-05T09:22:01.695Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-05T09:30:59.769Z"
  updated_by: "CODER"
  note: "Focused autosave suite passed 40/40; full Vitest suite passed 100/100; lint, typecheck, production build, routing policy, and AgentPlane doctor passed; Playwright proposal flows passed 5/5 with the deterministic mock provider after the user-approved shutdown of the pre-existing dev server."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue direct-mode task in current checkout."
events:
  -
    type: "status"
    at: "2026-08-05T09:18:31.966Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue direct-mode task in current checkout."
  -
    type: "verify"
    at: "2026-08-05T09:30:59.769Z"
    author: "CODER"
    state: "ok"
    note: "Focused autosave suite passed 40/40; full Vitest suite passed 100/100; lint, typecheck, production build, routing policy, and AgentPlane doctor passed; Playwright proposal flows passed 5/5 with the deterministic mock provider after the user-approved shutdown of the pre-existing dev server."
doc_version: 3
doc_updated_at: "2026-08-05T09:30:59.855Z"
doc_updated_by: "CODER"
description: "Remove the manual save button, autosave partial valid proposal drafts after human or assistant edits, persist a completed boolean, and keep full validation as the Generate Proposal gate."
sections:
  Summary: "Automatically persist proposal drafts without a dedicated save button and mark each stored proposal as complete or incomplete."
  Scope: "Modify the proposal form, persistence model, development seed data, styles, and focused unit/component/e2e tests. Human text changes save after 500 ms of inactivity; non-text user changes and successful AI patches save immediately. Generate Proposal remains gated by complete validation. Persisted records must contain completed; compatibility with old records without it is intentionally out of scope."
  Plan: "1. Extend persisted proposal records with a required completed boolean and update development seed proposals to completed: true. 2. Replace the manual save action with autosave orchestration: 500 ms debounce for human text input and immediate persistence for non-text and assistant patches. 3. Keep full validation, error display, and navigation exclusively on Generate Proposal. 4. Update automated tests for partial drafts, completed state, debounce, assistant saves, identity preservation, and storage failures."
  Verify Steps: "1. Run npm run test -- --run tests/unit/proposal-storage.test.ts tests/unit/proposal-form-utils.test.ts tests/components/proposal-form.test.tsx tests/components/proposal-form-sections.test.tsx tests/components/catalog-modal-chat.test.tsx. 2. Run npm run lint. 3. Run npm run typecheck. 4. Run npm run build. 5. Run npm run test:e2e -- e2e/proposal-flows.spec.ts. Acceptance: no manual Save control remains; partial human input persists once after 500 ms; successful AI edits persist automatically; saved JSON always contains completed; completed reflects full validation; Generate Proposal still rejects incomplete data and opens only complete proposals; records without completed are rejected; every development seed proposal has completed: true."
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-05T09:30:59.769Z — VERIFY — ok

    By: CODER

    Note: Focused autosave suite passed 40/40; full Vitest suite passed 100/100; lint, typecheck, production build, routing policy, and AgentPlane doctor passed; Playwright proposal flows passed 5/5 with the deterministic mock provider after the user-approved shutdown of the pre-existing dev server.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-05T09:21:57.608Z, excerpt_hash=sha256:decb82d4cbfa79b04ae4b9c8d5c4a883cbc0b0f037af7af929a81e097711219c

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608050918-NEMWWZ/blueprint/resolved-snapshot.json
    - old_digest: cc4fa288662b05c1b2056d1f9e21adb25341379e65ffca010398f74c2ce36b0f
    - current_digest: cc4fa288662b05c1b2056d1f9e21adb25341379e65ffca010398f74c2ce36b0f
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608050918-NEMWWZ

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane task verify-show 202608050918-NEMWWZ
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert the implementation commit for this task; storage parsing remains compatible with pre-change records, so no destructive data migration is required."
  Findings: ""
id_source: "generated"
---
## Summary

Automatically persist proposal drafts without a dedicated save button and mark each stored proposal as complete or incomplete.

## Scope

Modify the proposal form, persistence model, development seed data, styles, and focused unit/component/e2e tests. Human text changes save after 500 ms of inactivity; non-text user changes and successful AI patches save immediately. Generate Proposal remains gated by complete validation. Persisted records must contain completed; compatibility with old records without it is intentionally out of scope.

## Plan

1. Extend persisted proposal records with a required completed boolean and update development seed proposals to completed: true. 2. Replace the manual save action with autosave orchestration: 500 ms debounce for human text input and immediate persistence for non-text and assistant patches. 3. Keep full validation, error display, and navigation exclusively on Generate Proposal. 4. Update automated tests for partial drafts, completed state, debounce, assistant saves, identity preservation, and storage failures.

## Verify Steps

1. Run npm run test -- --run tests/unit/proposal-storage.test.ts tests/unit/proposal-form-utils.test.ts tests/components/proposal-form.test.tsx tests/components/proposal-form-sections.test.tsx tests/components/catalog-modal-chat.test.tsx. 2. Run npm run lint. 3. Run npm run typecheck. 4. Run npm run build. 5. Run npm run test:e2e -- e2e/proposal-flows.spec.ts. Acceptance: no manual Save control remains; partial human input persists once after 500 ms; successful AI edits persist automatically; saved JSON always contains completed; completed reflects full validation; Generate Proposal still rejects incomplete data and opens only complete proposals; records without completed are rejected; every development seed proposal has completed: true.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-05T09:30:59.769Z — VERIFY — ok

By: CODER

Note: Focused autosave suite passed 40/40; full Vitest suite passed 100/100; lint, typecheck, production build, routing policy, and AgentPlane doctor passed; Playwright proposal flows passed 5/5 with the deterministic mock provider after the user-approved shutdown of the pre-existing dev server.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-05T09:21:57.608Z, excerpt_hash=sha256:decb82d4cbfa79b04ae4b9c8d5c4a883cbc0b0f037af7af929a81e097711219c

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608050918-NEMWWZ/blueprint/resolved-snapshot.json
- old_digest: cc4fa288662b05c1b2056d1f9e21adb25341379e65ffca010398f74c2ce36b0f
- current_digest: cc4fa288662b05c1b2056d1f9e21adb25341379e65ffca010398f74c2ce36b0f
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608050918-NEMWWZ

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane task verify-show 202608050918-NEMWWZ
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the implementation commit for this task; storage parsing remains compatible with pre-change records, so no destructive data migration is required.

## Findings
