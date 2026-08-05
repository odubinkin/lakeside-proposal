---
id: "202608050932-2VFW54"
title: "Show draft status for incomplete proposals"
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
  updated_at: "2026-08-05T09:33:00.009Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-05T09:35:26.678Z"
  updated_by: "CODER"
  note: |-
    Command: npm test -- --run tests/components/proposals.test.tsx | Result: pass | Evidence: 1 file, 5 tests passed | Scope: completed and draft proposal actions and badge behavior.
    Command: npm run typecheck | Result: pass | Evidence: tsc --noEmit exited 0 | Scope: repository TypeScript.
    Command: npm run lint -- --quiet | Result: pass | Evidence: ESLint exited 0 | Scope: repository lint rules.
    Command: node .agentplane/policy/check-routing.mjs | Result: pass | Evidence: policy routing OK | Scope: Agentplane routing policy.
    Command: ap doctor | Result: pass | Evidence: errors=0 warnings=0, informational fallback notes only | Scope: Agentplane workspace health.
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue direct-mode task in current checkout."
events:
  -
    type: "status"
    at: "2026-08-05T09:33:11.057Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue direct-mode task in current checkout."
  -
    type: "verify"
    at: "2026-08-05T09:35:26.678Z"
    author: "CODER"
    state: "ok"
    note: |-
      Command: npm test -- --run tests/components/proposals.test.tsx | Result: pass | Evidence: 1 file, 5 tests passed | Scope: completed and draft proposal actions and badge behavior.
      Command: npm run typecheck | Result: pass | Evidence: tsc --noEmit exited 0 | Scope: repository TypeScript.
      Command: npm run lint -- --quiet | Result: pass | Evidence: ESLint exited 0 | Scope: repository lint rules.
      Command: node .agentplane/policy/check-routing.mjs | Result: pass | Evidence: policy routing OK | Scope: Agentplane routing policy.
      Command: ap doctor | Result: pass | Evidence: errors=0 warnings=0, informational fallback notes only | Scope: Agentplane workspace health.
doc_version: 3
doc_updated_at: "2026-08-05T09:35:26.766Z"
doc_updated_by: "CODER"
description: "On /proposals, hide the View action for proposals where completed is false and show a yellow Draft badge while preserving actions for completed proposals."
sections:
  Summary: |-
    Show draft status for incomplete proposals

    On /proposals, hide the View action for proposals where completed is false and show a yellow Draft badge while preserving actions for completed proposals.
  Scope: |-
    - In scope: On /proposals, hide the View action for proposals where completed is false and show a yellow Draft badge while preserving actions for completed proposals.
    - Out of scope: unrelated refactors not required for "Show draft status for incomplete proposals".
  Plan: |-
    1. Update the proposals list so incomplete proposals render a yellow Draft badge and omit View, while completed proposals retain View.
    2. Add component-test coverage for both completed and incomplete proposal states.
    3. Run the declared targeted and repository validation checks and record evidence.
  Verify Steps: |-
    1. Run `npm test -- --run tests/components/proposals.test.tsx`. Expected: the proposal list test proves completed proposals retain View and no Draft badge, while incomplete proposals hide View and show Draft.
    2. Run `npm run typecheck`. Expected: TypeScript exits successfully.
    3. Run `npm run lint -- --quiet`. Expected: ESLint exits successfully for the repository.
    4. Run `node .agentplane/policy/check-routing.mjs`. Expected: routing policy validation passes.
    5. Run `ap doctor`. Expected: Agentplane repository checks pass.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-05T09:35:26.678Z — VERIFY — ok

    By: CODER

    Note: Command: npm test -- --run tests/components/proposals.test.tsx | Result: pass | Evidence: 1 file, 5 tests passed | Scope: completed and draft proposal actions and badge behavior.
    Command: npm run typecheck | Result: pass | Evidence: tsc --noEmit exited 0 | Scope: repository TypeScript.
    Command: npm run lint -- --quiet | Result: pass | Evidence: ESLint exited 0 | Scope: repository lint rules.
    Command: node .agentplane/policy/check-routing.mjs | Result: pass | Evidence: policy routing OK | Scope: Agentplane routing policy.
    Command: ap doctor | Result: pass | Evidence: errors=0 warnings=0, informational fallback notes only | Scope: Agentplane workspace health.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-05T09:33:11.057Z, excerpt_hash=sha256:89cddbe4dd6f0ccf92b450525b0d4b61035d45e6887bb27bc2e7d78fb04afdf1

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608050932-2VFW54/blueprint/resolved-snapshot.json
    - old_digest: 32fb325276dbdd929e4861507b6e5db0e720fb38bd1313afa5cd74e7295fdd77
    - current_digest: 32fb325276dbdd929e4861507b6e5db0e720fb38bd1313afa5cd74e7295fdd77
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608050932-2VFW54

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane task verify-show 202608050932-2VFW54
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert the scoped component and test changes, then rerun the targeted proposal tests and typecheck."
  Findings: "No findings before implementation."
id_source: "generated"
---
## Summary

Show draft status for incomplete proposals

On /proposals, hide the View action for proposals where completed is false and show a yellow Draft badge while preserving actions for completed proposals.

## Scope

- In scope: On /proposals, hide the View action for proposals where completed is false and show a yellow Draft badge while preserving actions for completed proposals.
- Out of scope: unrelated refactors not required for "Show draft status for incomplete proposals".

## Plan

1. Update the proposals list so incomplete proposals render a yellow Draft badge and omit View, while completed proposals retain View.
2. Add component-test coverage for both completed and incomplete proposal states.
3. Run the declared targeted and repository validation checks and record evidence.

## Verify Steps

1. Run `npm test -- --run tests/components/proposals.test.tsx`. Expected: the proposal list test proves completed proposals retain View and no Draft badge, while incomplete proposals hide View and show Draft.
2. Run `npm run typecheck`. Expected: TypeScript exits successfully.
3. Run `npm run lint -- --quiet`. Expected: ESLint exits successfully for the repository.
4. Run `node .agentplane/policy/check-routing.mjs`. Expected: routing policy validation passes.
5. Run `ap doctor`. Expected: Agentplane repository checks pass.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-05T09:35:26.678Z — VERIFY — ok

By: CODER

Note: Command: npm test -- --run tests/components/proposals.test.tsx | Result: pass | Evidence: 1 file, 5 tests passed | Scope: completed and draft proposal actions and badge behavior.
Command: npm run typecheck | Result: pass | Evidence: tsc --noEmit exited 0 | Scope: repository TypeScript.
Command: npm run lint -- --quiet | Result: pass | Evidence: ESLint exited 0 | Scope: repository lint rules.
Command: node .agentplane/policy/check-routing.mjs | Result: pass | Evidence: policy routing OK | Scope: Agentplane routing policy.
Command: ap doctor | Result: pass | Evidence: errors=0 warnings=0, informational fallback notes only | Scope: Agentplane workspace health.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-05T09:33:11.057Z, excerpt_hash=sha256:89cddbe4dd6f0ccf92b450525b0d4b61035d45e6887bb27bc2e7d78fb04afdf1

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608050932-2VFW54/blueprint/resolved-snapshot.json
- old_digest: 32fb325276dbdd929e4861507b6e5db0e720fb38bd1313afa5cd74e7295fdd77
- current_digest: 32fb325276dbdd929e4861507b6e5db0e720fb38bd1313afa5cd74e7295fdd77
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608050932-2VFW54

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane task verify-show 202608050932-2VFW54
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the scoped component and test changes, then rerun the targeted proposal tests and typecheck.

## Findings

No findings before implementation.
