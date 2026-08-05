---
id: "202608050937-0VQTK3"
title: "Hide empty proposal fields"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "frontend"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-08-05T09:38:03.781Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-05T09:39:14.884Z"
  updated_by: "CODER"
  note: |-
    Command: pnpm vitest run tests/components/proposals.test.tsx | Result: pass | Evidence: 1 file, 6 tests passed | Scope: proposal list rendering regression.
    Command: pnpm eslint components/proposals-list.tsx tests/components/proposals.test.tsx | Result: pass | Evidence: exit 0, no findings | Scope: touched implementation and test.
    Command: pnpm typecheck | Result: pass | Evidence: tsc --noEmit exit 0 | Scope: repository TypeScript contracts.
    Command: node .agentplane/policy/check-routing.mjs | Result: pass | Evidence: policy routing OK | Scope: AgentPlane routing policy.
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: hide every empty or whitespace-only user-entered field on proposal cards and add focused regression coverage."
events:
  -
    type: "status"
    at: "2026-08-05T09:38:10.801Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: hide every empty or whitespace-only user-entered field on proposal cards and add focused regression coverage."
  -
    type: "verify"
    at: "2026-08-05T09:39:14.884Z"
    author: "CODER"
    state: "ok"
    note: |-
      Command: pnpm vitest run tests/components/proposals.test.tsx | Result: pass | Evidence: 1 file, 6 tests passed | Scope: proposal list rendering regression.
      Command: pnpm eslint components/proposals-list.tsx tests/components/proposals.test.tsx | Result: pass | Evidence: exit 0, no findings | Scope: touched implementation and test.
      Command: pnpm typecheck | Result: pass | Evidence: tsc --noEmit exit 0 | Scope: repository TypeScript contracts.
      Command: node .agentplane/policy/check-routing.mjs | Result: pass | Evidence: policy routing OK | Scope: AgentPlane routing policy.
doc_version: 3
doc_updated_at: "2026-08-05T09:39:14.971Z"
doc_updated_by: "CODER"
description: "On /proposals, do not render any proposal card field whose value is empty or whitespace-only; add regression coverage."
sections:
  Summary: |-
    Hide empty proposal fields

    On /proposals, do not render any proposal card field whose value is empty or whitespace-only; add regression coverage.
  Scope: |-
    - In scope: proposal cards on /proposals; client name, phone, email, and manager fields; whitespace-only values; regression test.
    - Out of scope: proposal view/form behavior, storage schema, system-generated proposal metadata, and unrelated refactors.
  Plan: |-
    1. Add whitespace-aware visibility checks for user-entered proposal card fields.
    2. Render each field, including its label/icon/link, only when populated; omit empty contact rows.
    3. Add focused component regression coverage and run the declared checks.
  Verify Steps: |-
    1. Run `pnpm vitest run tests/components/proposals.test.tsx`. Expected: proposal-list regression tests pass, including absence of blank client, phone, email, and manager UI.
    2. Run `pnpm eslint components/proposals-list.tsx tests/components/proposals.test.tsx`. Expected: no lint errors in touched files.
    3. Run `pnpm typecheck`. Expected: TypeScript completes without errors.
    4. Run `node .agentplane/policy/check-routing.mjs`. Expected: routing policy validation passes.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-05T09:39:14.884Z — VERIFY — ok

    By: CODER

    Note: Command: pnpm vitest run tests/components/proposals.test.tsx | Result: pass | Evidence: 1 file, 6 tests passed | Scope: proposal list rendering regression.
    Command: pnpm eslint components/proposals-list.tsx tests/components/proposals.test.tsx | Result: pass | Evidence: exit 0, no findings | Scope: touched implementation and test.
    Command: pnpm typecheck | Result: pass | Evidence: tsc --noEmit exit 0 | Scope: repository TypeScript contracts.
    Command: node .agentplane/policy/check-routing.mjs | Result: pass | Evidence: policy routing OK | Scope: AgentPlane routing policy.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-05T09:38:10.801Z, excerpt_hash=sha256:a3a60868de9cf6b5838fc33c2385ca8d291bf0748f13925ba71ccf24ee3b600c

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608050937-0VQTK3/blueprint/resolved-snapshot.json
    - old_digest: 2d119e1a282bdd35d889d4ca9d929fd7f590e5097bbb0d43fe1ae83f42abdb05
    - current_digest: 2d119e1a282bdd35d889d4ca9d929fd7f590e5097bbb0d43fe1ae83f42abdb05
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608050937-0VQTK3

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane task verify-show 202608050937-0VQTK3
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

Hide empty proposal fields

On /proposals, do not render any proposal card field whose value is empty or whitespace-only; add regression coverage.

## Scope

- In scope: proposal cards on /proposals; client name, phone, email, and manager fields; whitespace-only values; regression test.
- Out of scope: proposal view/form behavior, storage schema, system-generated proposal metadata, and unrelated refactors.

## Plan

1. Add whitespace-aware visibility checks for user-entered proposal card fields.
2. Render each field, including its label/icon/link, only when populated; omit empty contact rows.
3. Add focused component regression coverage and run the declared checks.

## Verify Steps

1. Run `pnpm vitest run tests/components/proposals.test.tsx`. Expected: proposal-list regression tests pass, including absence of blank client, phone, email, and manager UI.
2. Run `pnpm eslint components/proposals-list.tsx tests/components/proposals.test.tsx`. Expected: no lint errors in touched files.
3. Run `pnpm typecheck`. Expected: TypeScript completes without errors.
4. Run `node .agentplane/policy/check-routing.mjs`. Expected: routing policy validation passes.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-05T09:39:14.884Z — VERIFY — ok

By: CODER

Note: Command: pnpm vitest run tests/components/proposals.test.tsx | Result: pass | Evidence: 1 file, 6 tests passed | Scope: proposal list rendering regression.
Command: pnpm eslint components/proposals-list.tsx tests/components/proposals.test.tsx | Result: pass | Evidence: exit 0, no findings | Scope: touched implementation and test.
Command: pnpm typecheck | Result: pass | Evidence: tsc --noEmit exit 0 | Scope: repository TypeScript contracts.
Command: node .agentplane/policy/check-routing.mjs | Result: pass | Evidence: policy routing OK | Scope: AgentPlane routing policy.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-05T09:38:10.801Z, excerpt_hash=sha256:a3a60868de9cf6b5838fc33c2385ca8d291bf0748f13925ba71ccf24ee3b600c

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608050937-0VQTK3/blueprint/resolved-snapshot.json
- old_digest: 2d119e1a282bdd35d889d4ca9d929fd7f590e5097bbb0d43fe1ae83f42abdb05
- current_digest: 2d119e1a282bdd35d889d4ca9d929fd7f590e5097bbb0d43fe1ae83f42abdb05
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608050937-0VQTK3

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane task verify-show 202608050937-0VQTK3
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
