---
id: "202608041059-7G8D8N"
title: "Fix proposal preview total price"
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
  updated_at: "2026-08-04T10:59:34.714Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-04T11:01:30.353Z"
  updated_by: "CODER"
  note: "verified-202608041059-7G8D8N"
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-08-04T11:01:25.950Z"
  updated_by: "EVALUATOR"
  note: "Proposal preview total price fix is implemented and validated."
  evaluated_sha: "2a733690fb1c96d9fb2cd08b6db766bcd152eb99"
  blueprint_digest: "43030eb45b764b898dc30082ee2414c5214319250afb673380a7b0e3f0149d8d"
  evidence_refs:
    - ".agentplane/tasks/202608041059-7G8D8N/README.md"
    - ".agentplane/tasks/202608041059-7G8D8N/quality/20260804-110125950-recovery-context/quality-report.json"
    - ".agentplane/tasks/202608041059-7G8D8N/quality/20260804-110125950-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202608041059-7G8D8N/quality/20260804-110125950-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202608041059-7G8D8N/blueprint/resolved-snapshot.json"
    - "npm run lint; npm run build; git diff --check"
  findings:
    - "components/proposals-list.tsx now adds selected add-on prices to the villa base price; npm run lint, npm run build, and git diff --check pass."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: update the Proposals preview to calculate and display each proposal's final total, including selected add-ons, then run lint and build verification."
events:
  -
    type: "status"
    at: "2026-08-04T10:59:39.383Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: update the Proposals preview to calculate and display each proposal's final total, including selected add-ons, then run lint and build verification."
  -
    type: "verify"
    at: "2026-08-04T11:00:37.033Z"
    author: "CODER"
    state: "ok"
    note: "Verified proposal previews now render the villa base price plus all selected add-on prices using the existing THB formatter. npm run lint and npm run build both pass; git diff --check is clean."
  -
    type: "verify"
    at: "2026-08-04T11:01:17.578Z"
    author: "CODER"
    state: "ok"
    note: "verified-202608041059-7G8D8N"
  -
    type: "verify"
    at: "2026-08-04T11:01:30.353Z"
    author: "CODER"
    state: "ok"
    note: "verified-202608041059-7G8D8N"
doc_version: 3
doc_updated_at: "2026-08-04T11:01:30.535Z"
doc_updated_by: "CODER"
description: "On the Proposals page, proposal previews display the villa base price instead of the proposal's final total price. Identify the preview price source, render the final proposal price, and add or update focused verification."
sections:
  Summary: |-
    Fix proposal preview total price

    On the Proposals page, proposal previews display the villa base price instead of the proposal's final total price. Identify the preview price source, render the final proposal price, and add or update focused verification.
  Scope: |-
    - In scope: On the Proposals page, proposal previews display the villa base price instead of the proposal's final total price. Identify the preview price source, render the final proposal price, and add or update focused verification.
    - Out of scope: unrelated refactors not required for "Fix proposal preview total price".
  Plan: |-
    Summary
    Fix the Proposals list preview so each card shows the proposal's final total price, including selected add-ons, instead of only the villa catalog base price.

    Scope
    - Modify components/proposals-list.tsx only.
    - Reuse existing villa/add-on pricing helpers and THB formatting.
    - Keep proposal storage, editing, and the full proposal view behavior unchanged.

    Plan
    1. Derive the selected add-ons for each proposal and sum their prices against the villa base price.
    2. Render the resulting total in the proposal preview.
    3. Run the repository validation checks and inspect the final diff.

    Verify Steps
    1. npm run lint
    2. npm run build
    3. Confirm the preview uses villa base price plus each selected add-on price and retains the existing THB formatting.

    Rollback Plan
    Revert the single component change in components/proposals-list.tsx.
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-04T11:00:37.033Z — VERIFY — ok

    By: CODER

    Note: Verified proposal previews now render the villa base price plus all selected add-on prices using the existing THB formatter. npm run lint and npm run build both pass; git diff --check is clean.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-04T10:59:39.383Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608041059-7G8D8N/blueprint/resolved-snapshot.json
    - old_digest: 43030eb45b764b898dc30082ee2414c5214319250afb673380a7b0e3f0149d8d
    - current_digest: 43030eb45b764b898dc30082ee2414c5214319250afb673380a7b0e3f0149d8d
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608041059-7G8D8N

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane task verify-show 202608041059-7G8D8N
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-04T11:01:17.578Z — VERIFY — ok

    By: CODER

    Note: verified-202608041059-7G8D8N
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-04T11:00:37.123Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608041059-7G8D8N/blueprint/resolved-snapshot.json
    - old_digest: 43030eb45b764b898dc30082ee2414c5214319250afb673380a7b0e3f0149d8d
    - current_digest: 43030eb45b764b898dc30082ee2414c5214319250afb673380a7b0e3f0149d8d
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608041059-7G8D8N

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane task complete 202608041059-7G8D8N --result verified-202608041059-7G8D8N --commit 2a733690fb1c96d9fb2cd08b6db766bcd152eb99
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-04T11:01:30.353Z — VERIFY — ok

    By: CODER

    Note: verified-202608041059-7G8D8N
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-04T11:01:17.664Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608041059-7G8D8N/blueprint/resolved-snapshot.json
    - old_digest: 43030eb45b764b898dc30082ee2414c5214319250afb673380a7b0e3f0149d8d
    - current_digest: 43030eb45b764b898dc30082ee2414c5214319250afb673380a7b0e3f0149d8d
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608041059-7G8D8N

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane task complete 202608041059-7G8D8N --result verified-202608041059-7G8D8N --commit 2a733690fb1c96d9fb2cd08b6db766bcd152eb99
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
  Findings: |-
    - Observation: Command: npm run lint; Result: pass; Evidence: ESLint exited 0. Scope: repository lint, including components/proposals-list.tsx.
      Impact: Command: npm run build; Result: pass; Evidence: Next.js compiled successfully and generated all 9 static pages, including /proposals. Scope: production build.
      Resolution: Command: git diff --check; Result: pass; Evidence: no whitespace errors. Scope: focused one-file implementation diff.
id_source: "generated"
---
## Summary

Fix proposal preview total price

On the Proposals page, proposal previews display the villa base price instead of the proposal's final total price. Identify the preview price source, render the final proposal price, and add or update focused verification.

## Scope

- In scope: On the Proposals page, proposal previews display the villa base price instead of the proposal's final total price. Identify the preview price source, render the final proposal price, and add or update focused verification.
- Out of scope: unrelated refactors not required for "Fix proposal preview total price".

## Plan

Summary
Fix the Proposals list preview so each card shows the proposal's final total price, including selected add-ons, instead of only the villa catalog base price.

Scope
- Modify components/proposals-list.tsx only.
- Reuse existing villa/add-on pricing helpers and THB formatting.
- Keep proposal storage, editing, and the full proposal view behavior unchanged.

Plan
1. Derive the selected add-ons for each proposal and sum their prices against the villa base price.
2. Render the resulting total in the proposal preview.
3. Run the repository validation checks and inspect the final diff.

Verify Steps
1. npm run lint
2. npm run build
3. Confirm the preview uses villa base price plus each selected add-on price and retains the existing THB formatting.

Rollback Plan
Revert the single component change in components/proposals-list.tsx.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-04T11:00:37.033Z — VERIFY — ok

By: CODER

Note: Verified proposal previews now render the villa base price plus all selected add-on prices using the existing THB formatter. npm run lint and npm run build both pass; git diff --check is clean.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-04T10:59:39.383Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608041059-7G8D8N/blueprint/resolved-snapshot.json
- old_digest: 43030eb45b764b898dc30082ee2414c5214319250afb673380a7b0e3f0149d8d
- current_digest: 43030eb45b764b898dc30082ee2414c5214319250afb673380a7b0e3f0149d8d
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608041059-7G8D8N

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane task verify-show 202608041059-7G8D8N
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-04T11:01:17.578Z — VERIFY — ok

By: CODER

Note: verified-202608041059-7G8D8N
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-04T11:00:37.123Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608041059-7G8D8N/blueprint/resolved-snapshot.json
- old_digest: 43030eb45b764b898dc30082ee2414c5214319250afb673380a7b0e3f0149d8d
- current_digest: 43030eb45b764b898dc30082ee2414c5214319250afb673380a7b0e3f0149d8d
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608041059-7G8D8N

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane task complete 202608041059-7G8D8N --result verified-202608041059-7G8D8N --commit 2a733690fb1c96d9fb2cd08b6db766bcd152eb99
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-04T11:01:30.353Z — VERIFY — ok

By: CODER

Note: verified-202608041059-7G8D8N
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-04T11:01:17.664Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608041059-7G8D8N/blueprint/resolved-snapshot.json
- old_digest: 43030eb45b764b898dc30082ee2414c5214319250afb673380a7b0e3f0149d8d
- current_digest: 43030eb45b764b898dc30082ee2414c5214319250afb673380a7b0e3f0149d8d
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608041059-7G8D8N

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane task complete 202608041059-7G8D8N --result verified-202608041059-7G8D8N --commit 2a733690fb1c96d9fb2cd08b6db766bcd152eb99
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

- Observation: Command: npm run lint; Result: pass; Evidence: ESLint exited 0. Scope: repository lint, including components/proposals-list.tsx.
  Impact: Command: npm run build; Result: pass; Evidence: Next.js compiled successfully and generated all 9 static pages, including /proposals. Scope: production build.
  Resolution: Command: git diff --check; Result: pass; Evidence: no whitespace errors. Scope: focused one-file implementation diff.
