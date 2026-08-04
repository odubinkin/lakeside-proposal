---
id: "202608041001-ZR3T4A"
title: "Show add-on pricing mode in proposal editor"
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
  updated_at: "2026-08-04T10:01:14.797Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-04T10:04:59.849Z"
  updated_by: "CODER"
  note: "Add-on prices in the proposal editor now show (fixed) or (XX%), while the proposal view remains unchanged."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-08-04T10:04:51.405Z"
  updated_by: "EVALUATOR"
  note: "Edit-only pricing mode labels verified"
  evaluated_sha: "3f041a0c59b8c39a8395b8d382c490413775484b"
  blueprint_digest: "81ae321e4d04cd1fe4b7b185d83aa27517a668c1b4ff7dae8e5d40699361599d"
  evidence_refs:
    - ".agentplane/tasks/202608041001-ZR3T4A/README.md"
    - ".agentplane/tasks/202608041001-ZR3T4A/quality/20260804-100451405-recovery-context/quality-report.json"
    - ".agentplane/tasks/202608041001-ZR3T4A/quality/20260804-100451405-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202608041001-ZR3T4A/quality/20260804-100451405-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202608041001-ZR3T4A/blueprint/resolved-snapshot.json"
    - "npm run lint; npm run build; node .agentplane/policy/check-routing.mjs; ap doctor; git diff --check"
  findings:
    - "components/proposal-form.tsx appends fixed or percentage mode labels; components/proposal-view.tsx is unchanged."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implement approved add-on pricing mode labels in the proposal editor."
events:
  -
    type: "status"
    at: "2026-08-04T10:01:25.100Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement approved add-on pricing mode labels in the proposal editor."
  -
    type: "verify"
    at: "2026-08-04T10:03:23.693Z"
    author: "CODER"
    state: "ok"
    note: "Passed: npm run lint; npm run build; node .agentplane/policy/check-routing.mjs; ap doctor; git diff --check. Evidence: build compiled successfully and included /proposals/edit and /proposals/view; diff changes only components/proposal-form.tsx for this task, while proposal-view.tsx remains unchanged. Scope: edit-only add-on labels render (fixed) or (XX%)."
  -
    type: "verify"
    at: "2026-08-04T10:04:16.919Z"
    author: "CODER"
    state: "ok"
    note: "Add-on prices in the proposal editor now show (fixed) or (XX%), while the proposal view remains unchanged."
  -
    type: "verify"
    at: "2026-08-04T10:04:59.849Z"
    author: "CODER"
    state: "ok"
    note: "Add-on prices in the proposal editor now show (fixed) or (XX%), while the proposal view remains unchanged."
doc_version: 3
doc_updated_at: "2026-08-04T10:04:59.932Z"
doc_updated_by: "CODER"
description: |-
  Summary
  Add fixed or percentage mode labels after add-on prices in the Additional options block on /proposals/edit only.

  Scope
  Modify components/proposal-form.tsx only. Do not change proposal view rendering.

  Plan
  Render (fixed) for fixed-price add-ons and (XX%) using the catalog percentage value for percentage-based add-ons, immediately after the calculated price.

  Verify Steps
  Run npm run lint; run node .agentplane/policy/check-routing.mjs.

  Verification
  Pending implementation.

  Rollback Plan
  Revert the proposal-form.tsx change.

  Findings
  None.
sections:
  Summary: |-
    Show add-on pricing mode in proposal editor

    Summary
    Add fixed or percentage mode labels after add-on prices in the Additional options block on /proposals/edit only.

    Scope
    Modify components/proposal-form.tsx only. Do not change proposal view rendering.

    Plan
    Render (fixed) for fixed-price add-ons and (XX%) using the catalog percentage value for percentage-based add-ons, immediately after the calculated price.

    Verify Steps
    Run npm run lint; run node .agentplane/policy/check-routing.mjs.

    Verification
    Pending implementation.

    Rollback Plan
    Revert the proposal-form.tsx change.

    Findings
    None.
  Scope: |-
    - In scope: Summary Add fixed or percentage mode labels after add-on prices in the Additional options block on /proposals/edit only. Scope Modify components/proposal-form.tsx only. Do not change proposal view rendering. Plan Render (fixed) for fixed-price add-ons and (XX%) using the catalog percentage value for percentage-based add-ons, immediately after the calculated price. Verify Steps Run npm run lint; run node .agentplane/policy/check-routing.mjs. Verification Pending implementation. Rollback Plan Revert the proposal-form.tsx change. Findings None.
    - Out of scope: unrelated refactors not required for "Show add-on pricing mode in proposal editor".
  Plan: "1. Update the Additional options price label in components/proposal-form.tsx to append the source pricing mode: (fixed) for fixed add-ons and (XX%) for percentage add-ons. 2. Keep components/proposal-view.tsx unchanged so view output remains price-only. 3. Run lint and policy routing checks, then record task verification."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-04T10:03:23.693Z — VERIFY — ok

    By: CODER

    Note: Passed: npm run lint; npm run build; node .agentplane/policy/check-routing.mjs; ap doctor; git diff --check. Evidence: build compiled successfully and included /proposals/edit and /proposals/view; diff changes only components/proposal-form.tsx for this task, while proposal-view.tsx remains unchanged. Scope: edit-only add-on labels render (fixed) or (XX%).
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-04T10:01:25.100Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608041001-ZR3T4A/blueprint/resolved-snapshot.json
    - old_digest: 81ae321e4d04cd1fe4b7b185d83aa27517a668c1b4ff7dae8e5d40699361599d
    - current_digest: 81ae321e4d04cd1fe4b7b185d83aa27517a668c1b4ff7dae8e5d40699361599d
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608041001-ZR3T4A

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane task verify-show 202608041001-ZR3T4A
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-04T10:04:16.919Z — VERIFY — ok

    By: CODER

    Note: Add-on prices in the proposal editor now show (fixed) or (XX%), while the proposal view remains unchanged.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-04T10:03:23.778Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608041001-ZR3T4A/blueprint/resolved-snapshot.json
    - old_digest: 81ae321e4d04cd1fe4b7b185d83aa27517a668c1b4ff7dae8e5d40699361599d
    - current_digest: 81ae321e4d04cd1fe4b7b185d83aa27517a668c1b4ff7dae8e5d40699361599d
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608041001-ZR3T4A

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane task complete 202608041001-ZR3T4A --result verified-202608041001-ZR3T4A --commit 3f041a0c59b8c39a8395b8d382c490413775484b
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-04T10:04:59.849Z — VERIFY — ok

    By: CODER

    Note: Add-on prices in the proposal editor now show (fixed) or (XX%), while the proposal view remains unchanged.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-04T10:04:17.004Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608041001-ZR3T4A/blueprint/resolved-snapshot.json
    - old_digest: 81ae321e4d04cd1fe4b7b185d83aa27517a668c1b4ff7dae8e5d40699361599d
    - current_digest: 81ae321e4d04cd1fe4b7b185d83aa27517a668c1b4ff7dae8e5d40699361599d
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608041001-ZR3T4A

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane task complete 202608041001-ZR3T4A --result verified-202608041001-ZR3T4A --commit 3f041a0c59b8c39a8395b8d382c490413775484b
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

Show add-on pricing mode in proposal editor

Summary
Add fixed or percentage mode labels after add-on prices in the Additional options block on /proposals/edit only.

Scope
Modify components/proposal-form.tsx only. Do not change proposal view rendering.

Plan
Render (fixed) for fixed-price add-ons and (XX%) using the catalog percentage value for percentage-based add-ons, immediately after the calculated price.

Verify Steps
Run npm run lint; run node .agentplane/policy/check-routing.mjs.

Verification
Pending implementation.

Rollback Plan
Revert the proposal-form.tsx change.

Findings
None.

## Scope

- In scope: Summary Add fixed or percentage mode labels after add-on prices in the Additional options block on /proposals/edit only. Scope Modify components/proposal-form.tsx only. Do not change proposal view rendering. Plan Render (fixed) for fixed-price add-ons and (XX%) using the catalog percentage value for percentage-based add-ons, immediately after the calculated price. Verify Steps Run npm run lint; run node .agentplane/policy/check-routing.mjs. Verification Pending implementation. Rollback Plan Revert the proposal-form.tsx change. Findings None.
- Out of scope: unrelated refactors not required for "Show add-on pricing mode in proposal editor".

## Plan

1. Update the Additional options price label in components/proposal-form.tsx to append the source pricing mode: (fixed) for fixed add-ons and (XX%) for percentage add-ons. 2. Keep components/proposal-view.tsx unchanged so view output remains price-only. 3. Run lint and policy routing checks, then record task verification.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-04T10:03:23.693Z — VERIFY — ok

By: CODER

Note: Passed: npm run lint; npm run build; node .agentplane/policy/check-routing.mjs; ap doctor; git diff --check. Evidence: build compiled successfully and included /proposals/edit and /proposals/view; diff changes only components/proposal-form.tsx for this task, while proposal-view.tsx remains unchanged. Scope: edit-only add-on labels render (fixed) or (XX%).
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-04T10:01:25.100Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608041001-ZR3T4A/blueprint/resolved-snapshot.json
- old_digest: 81ae321e4d04cd1fe4b7b185d83aa27517a668c1b4ff7dae8e5d40699361599d
- current_digest: 81ae321e4d04cd1fe4b7b185d83aa27517a668c1b4ff7dae8e5d40699361599d
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608041001-ZR3T4A

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane task verify-show 202608041001-ZR3T4A
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-04T10:04:16.919Z — VERIFY — ok

By: CODER

Note: Add-on prices in the proposal editor now show (fixed) or (XX%), while the proposal view remains unchanged.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-04T10:03:23.778Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608041001-ZR3T4A/blueprint/resolved-snapshot.json
- old_digest: 81ae321e4d04cd1fe4b7b185d83aa27517a668c1b4ff7dae8e5d40699361599d
- current_digest: 81ae321e4d04cd1fe4b7b185d83aa27517a668c1b4ff7dae8e5d40699361599d
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608041001-ZR3T4A

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane task complete 202608041001-ZR3T4A --result verified-202608041001-ZR3T4A --commit 3f041a0c59b8c39a8395b8d382c490413775484b
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-04T10:04:59.849Z — VERIFY — ok

By: CODER

Note: Add-on prices in the proposal editor now show (fixed) or (XX%), while the proposal view remains unchanged.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-04T10:04:17.004Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608041001-ZR3T4A/blueprint/resolved-snapshot.json
- old_digest: 81ae321e4d04cd1fe4b7b185d83aa27517a668c1b4ff7dae8e5d40699361599d
- current_digest: 81ae321e4d04cd1fe4b7b185d83aa27517a668c1b4ff7dae8e5d40699361599d
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608041001-ZR3T4A

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane task complete 202608041001-ZR3T4A --result verified-202608041001-ZR3T4A --commit 3f041a0c59b8c39a8395b8d382c490413775484b
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
