---
id: "202608051044-BADHB7"
title: "Align proposal badge row"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 13
origin:
  system: "manual"
depends_on: []
tags:
  - "frontend"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-08-05T10:45:09.706Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-05T10:46:42.022Z"
  updated_by: "CODER"
  note: "Bold badge typography and compensated left alignment verified by component tests, lint, typecheck, local Playwright inspection, Agentplane doctor, and routing validation."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: adjust proposal badge weight and optical alignment in the current checkout."
events:
  -
    type: "status"
    at: "2026-08-05T10:45:14.648Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: adjust proposal badge weight and optical alignment in the current checkout."
  -
    type: "verify"
    at: "2026-08-05T10:46:42.022Z"
    author: "CODER"
    state: "ok"
    note: "Bold badge typography and compensated left alignment verified by component tests, lint, typecheck, local Playwright inspection, Agentplane doctor, and routing validation."
doc_version: 3
doc_updated_at: "2026-08-05T10:46:42.196Z"
doc_updated_by: "CODER"
description: "Make the proposal ID and Draft badge labels bold and offset their shared row left by the first badge horizontal padding so badge text aligns with the villa title."
sections:
  Summary: "Align and strengthen the proposal metadata badges on /proposals."
  Scope: "Modify only components/proposals-list.tsx and directly associated regression assertions if needed. Preserve all proposal behavior and responsive sizing."
  Plan: "1. Add font-bold to both proposal ID and Draft badge labels. 2. Add -ml-2 to their shared row to compensate for the first badge px-2 padding. 3. Run the proposal component test, lint, typecheck, and a local visual alignment check."
  Verify Steps: "1. Run npm test -- --run tests/components/proposals.test.tsx; expected: proposal card behaviors remain green. 2. Run npm run lint; expected: no lint errors. 3. Run npm run typecheck; expected: no TypeScript errors. 4. Inspect /proposals locally at a wide viewport; expected: ID and Draft are bold, and the ID text aligns with the villa title text while the layout remains intact."
  Verification: |-
    - Command: npm test -- --run tests/components/proposals.test.tsx
    - Result: pass
    - Evidence: 1 file and 8 tests passed, including badge class assertions.
    - Scope: proposal list behavior and badge styling regression.

    - Command: npm run lint
    - Result: pass
    - Evidence: ESLint completed with no errors.
    - Scope: repository lint rules.

    - Command: npm run typecheck
    - Result: pass
    - Evidence: tsc --noEmit completed with no errors.
    - Scope: repository TypeScript correctness.

    - Command: local Playwright check at 1440x1000
    - Result: pass
    - Evidence: both badge labels compute to font-weight 700; the ID badge edge is 8 px left of the villa title, exactly compensating its 8 px left padding; no horizontal overflow or console errors.
    - Scope: visual badge weight and optical alignment on /proposals.

    - Command: ap doctor && node .agentplane/policy/check-routing.mjs
    - Result: pass
    - Evidence: doctor OK and policy routing OK.
    - Scope: Agentplane workflow and policy integrity.

    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-05T10:46:42.022Z — VERIFY — ok

    By: CODER

    Note: Bold badge typography and compensated left alignment verified by component tests, lint, typecheck, local Playwright inspection, Agentplane doctor, and routing validation.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-05T10:46:40.832Z, excerpt_hash=sha256:d7da883dbd0fb9122b05f5194cdb65da04f810754087b427a2dc9012b08530a6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608051044-BADHB7/blueprint/resolved-snapshot.json
    - old_digest: dc857f4385ba5d5b07223d122b2efb231b81877c7e88c99712bed469efda7cde
    - current_digest: dc857f4385ba5d5b07223d122b2efb231b81877c7e88c99712bed469efda7cde
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608051044-BADHB7

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane task verify-show 202608051044-BADHB7
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert the three scoped Tailwind class changes in components/proposals-list.tsx."
  Findings: "No scope drift, skipped checks, or residual issues identified."
id_source: "generated"
---
## Summary

Align and strengthen the proposal metadata badges on /proposals.

## Scope

Modify only components/proposals-list.tsx and directly associated regression assertions if needed. Preserve all proposal behavior and responsive sizing.

## Plan

1. Add font-bold to both proposal ID and Draft badge labels. 2. Add -ml-2 to their shared row to compensate for the first badge px-2 padding. 3. Run the proposal component test, lint, typecheck, and a local visual alignment check.

## Verify Steps

1. Run npm test -- --run tests/components/proposals.test.tsx; expected: proposal card behaviors remain green. 2. Run npm run lint; expected: no lint errors. 3. Run npm run typecheck; expected: no TypeScript errors. 4. Inspect /proposals locally at a wide viewport; expected: ID and Draft are bold, and the ID text aligns with the villa title text while the layout remains intact.

## Verification

- Command: npm test -- --run tests/components/proposals.test.tsx
- Result: pass
- Evidence: 1 file and 8 tests passed, including badge class assertions.
- Scope: proposal list behavior and badge styling regression.

- Command: npm run lint
- Result: pass
- Evidence: ESLint completed with no errors.
- Scope: repository lint rules.

- Command: npm run typecheck
- Result: pass
- Evidence: tsc --noEmit completed with no errors.
- Scope: repository TypeScript correctness.

- Command: local Playwright check at 1440x1000
- Result: pass
- Evidence: both badge labels compute to font-weight 700; the ID badge edge is 8 px left of the villa title, exactly compensating its 8 px left padding; no horizontal overflow or console errors.
- Scope: visual badge weight and optical alignment on /proposals.

- Command: ap doctor && node .agentplane/policy/check-routing.mjs
- Result: pass
- Evidence: doctor OK and policy routing OK.
- Scope: Agentplane workflow and policy integrity.

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-05T10:46:42.022Z — VERIFY — ok

By: CODER

Note: Bold badge typography and compensated left alignment verified by component tests, lint, typecheck, local Playwright inspection, Agentplane doctor, and routing validation.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-05T10:46:40.832Z, excerpt_hash=sha256:d7da883dbd0fb9122b05f5194cdb65da04f810754087b427a2dc9012b08530a6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608051044-BADHB7/blueprint/resolved-snapshot.json
- old_digest: dc857f4385ba5d5b07223d122b2efb231b81877c7e88c99712bed469efda7cde
- current_digest: dc857f4385ba5d5b07223d122b2efb231b81877c7e88c99712bed469efda7cde
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608051044-BADHB7

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane task verify-show 202608051044-BADHB7
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the three scoped Tailwind class changes in components/proposals-list.tsx.

## Findings

No scope drift, skipped checks, or residual issues identified.
