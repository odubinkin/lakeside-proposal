---
id: "202608051127-R84KX2"
title: "Restyle proposal identifier"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 12
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-08-05T11:27:29.490Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-05T11:28:25.300Z"
  updated_by: "TESTER"
  note: "Focused proposals component tests passed (8/8); lint and TypeScript checks passed. The ID is larger bold plain text without badge styling or negative container margin, and Draft retains its original classes and behavior."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue direct-mode task in current checkout."
events:
  -
    type: "status"
    at: "2026-08-05T11:27:36.496Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue direct-mode task in current checkout."
  -
    type: "verify"
    at: "2026-08-05T11:28:25.300Z"
    author: "TESTER"
    state: "ok"
    note: "Focused proposals component tests passed (8/8); lint and TypeScript checks passed. The ID is larger bold plain text without badge styling or negative container margin, and Draft retains its original classes and behavior."
doc_version: 3
doc_updated_at: "2026-08-05T11:28:25.378Z"
doc_updated_by: "CODER"
description: "Remove the negative left margin from the proposal status row, render the proposal ID as larger bold plain text, and keep the Draft badge unchanged."
sections:
  Summary: "Update the proposals list so the proposal identifier is presented as larger bold plain text without badge styling, while preserving the Draft badge."
  Scope: "Modify components/proposals-list.tsx and tests/components/proposals.test.tsx only. Remove the negative left margin from the identifier/status row, remove badge-like ID styling, increase ID text size, and leave Draft badge classes and behavior unchanged."
  Plan: "1. Update the proposal identifier/status row layout and ID typography. 2. Update the focused component test to assert the new styling and unchanged Draft badge. 3. Run the focused test, lint, and typecheck. 4. Record verification and finish the task."
  Verify Steps: |-
    - Run: npm test -- tests/components/proposals.test.tsx
    - Run: npm run lint
    - Run: npm run typecheck
    - Confirm the ID has bold, larger plain-text styling without background, padding, rounded corners, or monospaced badge styling.
    - Confirm the containing row has no negative left margin and the Draft badge classes/behavior remain unchanged.
  Verification: |-
    - Command: npm test -- tests/components/proposals.test.tsx
      Result: pass
      Evidence: 1 test file passed; 8 tests passed.
      Scope: proposals list rendering and interaction coverage, including proposal ID and Draft badge styling.
    - Command: npm run lint
      Result: pass
      Evidence: ESLint completed with exit code 0 and no findings.
      Scope: repository lint rules.
    - Command: npm run typecheck
      Result: pass
      Evidence: tsc --noEmit completed with exit code 0.
      Scope: repository TypeScript compilation.

    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-05T11:28:25.300Z — VERIFY — ok

    By: TESTER

    Note: Focused proposals component tests passed (8/8); lint and TypeScript checks passed. The ID is larger bold plain text without badge styling or negative container margin, and Draft retains its original classes and behavior.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-05T11:28:24.919Z, excerpt_hash=sha256:020db25412bd3b436fab61ace3cb77bbd283e54c270ece8e0ca141d9c5f13c49

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608051127-R84KX2/blueprint/resolved-snapshot.json
    - old_digest: fb994c23e1311b58a84d423eb6b9b358eb21436b70b034a0efa63036155bb08d
    - current_digest: fb994c23e1311b58a84d423eb6b9b358eb21436b70b034a0efa63036155bb08d
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608051127-R84KX2

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane task verify-show 202608051127-R84KX2
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert the scoped component and component-test changes for this task."
  Findings: "No findings at planning time."
id_source: "generated"
---
## Summary

Update the proposals list so the proposal identifier is presented as larger bold plain text without badge styling, while preserving the Draft badge.

## Scope

Modify components/proposals-list.tsx and tests/components/proposals.test.tsx only. Remove the negative left margin from the identifier/status row, remove badge-like ID styling, increase ID text size, and leave Draft badge classes and behavior unchanged.

## Plan

1. Update the proposal identifier/status row layout and ID typography. 2. Update the focused component test to assert the new styling and unchanged Draft badge. 3. Run the focused test, lint, and typecheck. 4. Record verification and finish the task.

## Verify Steps

- Run: npm test -- tests/components/proposals.test.tsx
- Run: npm run lint
- Run: npm run typecheck
- Confirm the ID has bold, larger plain-text styling without background, padding, rounded corners, or monospaced badge styling.
- Confirm the containing row has no negative left margin and the Draft badge classes/behavior remain unchanged.

## Verification

- Command: npm test -- tests/components/proposals.test.tsx
  Result: pass
  Evidence: 1 test file passed; 8 tests passed.
  Scope: proposals list rendering and interaction coverage, including proposal ID and Draft badge styling.
- Command: npm run lint
  Result: pass
  Evidence: ESLint completed with exit code 0 and no findings.
  Scope: repository lint rules.
- Command: npm run typecheck
  Result: pass
  Evidence: tsc --noEmit completed with exit code 0.
  Scope: repository TypeScript compilation.

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-05T11:28:25.300Z — VERIFY — ok

By: TESTER

Note: Focused proposals component tests passed (8/8); lint and TypeScript checks passed. The ID is larger bold plain text without badge styling or negative container margin, and Draft retains its original classes and behavior.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-05T11:28:24.919Z, excerpt_hash=sha256:020db25412bd3b436fab61ace3cb77bbd283e54c270ece8e0ca141d9c5f13c49

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608051127-R84KX2/blueprint/resolved-snapshot.json
- old_digest: fb994c23e1311b58a84d423eb6b9b358eb21436b70b034a0efa63036155bb08d
- current_digest: fb994c23e1311b58a84d423eb6b9b358eb21436b70b034a0efa63036155bb08d
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608051127-R84KX2

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane task verify-show 202608051127-R84KX2
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the scoped component and component-test changes for this task.

## Findings

No findings at planning time.
