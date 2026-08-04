---
id: "202608041042-87DC6V"
title: "Scroll to first invalid proposal field"
result_summary: "verified-202608041042-87DC6V"
status: "DONE"
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
  updated_at: "2026-08-04T10:42:47.794Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-04T10:45:07.939Z"
  updated_by: "CODER"
  note: "verified-202608041042-87DC6V"
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-08-04T10:44:41.077Z"
  updated_by: "EVALUATOR"
  note: "The implementation is scoped to the proposal form and satisfies the approved scrolling behavior."
  evaluated_sha: "594dfcfabc993b557ca362fccd646bc901015a0a"
  blueprint_digest: "b2c00470e04005ea253fd4231a22c8b4c0e1d91c2d6472fd1036dd0d70b4d224"
  evidence_refs:
    - ".agentplane/tasks/202608041042-87DC6V/README.md"
    - ".agentplane/tasks/202608041042-87DC6V/quality/20260804-104441077-recovery-context/quality-report.json"
    - ".agentplane/tasks/202608041042-87DC6V/quality/20260804-104441077-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202608041042-87DC6V/quality/20260804-104441077-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202608041042-87DC6V/blueprint/resolved-snapshot.json"
    - "npm run lint; npx tsc --noEmit; npm run build; git diff --check"
  findings:
    - "Validation errors are checked in page order; the first invalid control scrolls smoothly only when it is not fully visible, while the existing save and proposal reuse flow remains unchanged."
commit:
  hash: "594dfcfabc993b557ca362fccd646bc901015a0a"
  message: "🚧 87DC6V task: Scroll to first invalid proposal field"
comments:
  -
    author: "CODER"
    body: "Start: continue direct-mode task in current checkout."
  -
    author: "CODER"
    body: "Verified: verified-202608041042-87DC6V. Guided shortcut recorded verification and is closing the direct task with traceable commit metadata."
events:
  -
    type: "status"
    at: "2026-08-04T10:42:58.457Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue direct-mode task in current checkout."
  -
    type: "verify"
    at: "2026-08-04T10:44:13.794Z"
    author: "CODER"
    state: "ok"
    note: "Verified: npm run lint, npx tsc --noEmit, npm run build, and git diff --check all passed; the scoped diff confirms conditional smooth scrolling to the first invalid field."
  -
    type: "verify"
    at: "2026-08-04T10:44:27.513Z"
    author: "CODER"
    state: "ok"
    note: "verified-202608041042-87DC6V"
  -
    type: "verify"
    at: "2026-08-04T10:44:45.966Z"
    author: "CODER"
    state: "ok"
    note: "verified-202608041042-87DC6V"
  -
    type: "verify"
    at: "2026-08-04T10:45:07.939Z"
    author: "CODER"
    state: "ok"
    note: "verified-202608041042-87DC6V"
  -
    type: "status"
    at: "2026-08-04T10:45:08.083Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: verified-202608041042-87DC6V. Guided shortcut recorded verification and is closing the direct task with traceable commit metadata."
doc_version: 3
doc_updated_at: "2026-08-04T10:45:08.084Z"
doc_updated_by: "CODER"
description: "When Generate Proposal validation fails, scroll to the first invalid form field only when that field is outside the viewport."
sections:
  Summary: |-
    Scroll to first invalid proposal field

    When Generate Proposal validation fails, scroll to the first invalid form field only when that field is outside the viewport.
  Scope: "Modify only components/proposal-form.tsx. After failed Generate Proposal validation, identify the first invalid field in page order and smoothly scroll it into view only when its full field bounds are outside the viewport. Preserve the existing proposal save/reuse behavior."
  Plan: |-
    1. Add a stable mapping from validation error keys to form control IDs in page order.
    2. After validation fails, locate the first invalid control and check whether it is fully visible.
    3. Call smooth scrollIntoView only when that control is outside the viewport.
    4. Run the declared lint, typecheck, build, and diff checks.
  Verify Steps: |-
    1. Run npm run lint. Expected: ESLint exits successfully with no errors.
    2. Run npx tsc --noEmit. Expected: TypeScript exits successfully with no diagnostics.
    3. Run npm run build. Expected: Next.js production build completes successfully.
    4. Run git diff --check and inspect the scoped diff. Expected: no whitespace errors; failed validation selects the first invalid field in page order, calls smooth scrollIntoView only when that field is outside the viewport, and leaves the existing save/reuse flow unchanged.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-04T10:44:13.794Z — VERIFY — ok

    By: CODER

    Note: Verified: npm run lint, npx tsc --noEmit, npm run build, and git diff --check all passed; the scoped diff confirms conditional smooth scrolling to the first invalid field.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-04T10:42:58.457Z, excerpt_hash=sha256:70156bfb8584fdf6931d5e98fdf31f2ca239f141eb17e778b624ec4562938975

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608041042-87DC6V/blueprint/resolved-snapshot.json
    - old_digest: b2c00470e04005ea253fd4231a22c8b4c0e1d91c2d6472fd1036dd0d70b4d224
    - current_digest: b2c00470e04005ea253fd4231a22c8b4c0e1d91c2d6472fd1036dd0d70b4d224
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608041042-87DC6V

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane task verify-show 202608041042-87DC6V
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-04T10:44:27.513Z — VERIFY — ok

    By: CODER

    Note: verified-202608041042-87DC6V
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-04T10:44:13.882Z, excerpt_hash=sha256:70156bfb8584fdf6931d5e98fdf31f2ca239f141eb17e778b624ec4562938975

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608041042-87DC6V/blueprint/resolved-snapshot.json
    - old_digest: b2c00470e04005ea253fd4231a22c8b4c0e1d91c2d6472fd1036dd0d70b4d224
    - current_digest: b2c00470e04005ea253fd4231a22c8b4c0e1d91c2d6472fd1036dd0d70b4d224
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608041042-87DC6V

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane task complete 202608041042-87DC6V --result verified-202608041042-87DC6V --commit 594dfcfabc993b557ca362fccd646bc901015a0a
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-04T10:44:45.966Z — VERIFY — ok

    By: CODER

    Note: verified-202608041042-87DC6V
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-04T10:44:27.590Z, excerpt_hash=sha256:70156bfb8584fdf6931d5e98fdf31f2ca239f141eb17e778b624ec4562938975

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608041042-87DC6V/blueprint/resolved-snapshot.json
    - old_digest: b2c00470e04005ea253fd4231a22c8b4c0e1d91c2d6472fd1036dd0d70b4d224
    - current_digest: b2c00470e04005ea253fd4231a22c8b4c0e1d91c2d6472fd1036dd0d70b4d224
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608041042-87DC6V

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane task complete 202608041042-87DC6V --result verified-202608041042-87DC6V --commit 594dfcfabc993b557ca362fccd646bc901015a0a
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-04T10:45:07.939Z — VERIFY — ok

    By: CODER

    Note: verified-202608041042-87DC6V
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-04T10:44:46.047Z, excerpt_hash=sha256:70156bfb8584fdf6931d5e98fdf31f2ca239f141eb17e778b624ec4562938975

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608041042-87DC6V/blueprint/resolved-snapshot.json
    - old_digest: b2c00470e04005ea253fd4231a22c8b4c0e1d91c2d6472fd1036dd0d70b4d224
    - current_digest: b2c00470e04005ea253fd4231a22c8b4c0e1d91c2d6472fd1036dd0d70b4d224
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608041042-87DC6V

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane task complete 202608041042-87DC6V --result verified-202608041042-87DC6V --commit 522823d4c5bf3f1cb26e1a505c747f32b3ca7216
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert the task implementation change in components/proposal-form.tsx, then rerun npm run lint and npx tsc --noEmit."
  Findings: ""
id_source: "generated"
---
## Summary

Scroll to first invalid proposal field

When Generate Proposal validation fails, scroll to the first invalid form field only when that field is outside the viewport.

## Scope

Modify only components/proposal-form.tsx. After failed Generate Proposal validation, identify the first invalid field in page order and smoothly scroll it into view only when its full field bounds are outside the viewport. Preserve the existing proposal save/reuse behavior.

## Plan

1. Add a stable mapping from validation error keys to form control IDs in page order.
2. After validation fails, locate the first invalid control and check whether it is fully visible.
3. Call smooth scrollIntoView only when that control is outside the viewport.
4. Run the declared lint, typecheck, build, and diff checks.

## Verify Steps

1. Run npm run lint. Expected: ESLint exits successfully with no errors.
2. Run npx tsc --noEmit. Expected: TypeScript exits successfully with no diagnostics.
3. Run npm run build. Expected: Next.js production build completes successfully.
4. Run git diff --check and inspect the scoped diff. Expected: no whitespace errors; failed validation selects the first invalid field in page order, calls smooth scrollIntoView only when that field is outside the viewport, and leaves the existing save/reuse flow unchanged.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-04T10:44:13.794Z — VERIFY — ok

By: CODER

Note: Verified: npm run lint, npx tsc --noEmit, npm run build, and git diff --check all passed; the scoped diff confirms conditional smooth scrolling to the first invalid field.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-04T10:42:58.457Z, excerpt_hash=sha256:70156bfb8584fdf6931d5e98fdf31f2ca239f141eb17e778b624ec4562938975

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608041042-87DC6V/blueprint/resolved-snapshot.json
- old_digest: b2c00470e04005ea253fd4231a22c8b4c0e1d91c2d6472fd1036dd0d70b4d224
- current_digest: b2c00470e04005ea253fd4231a22c8b4c0e1d91c2d6472fd1036dd0d70b4d224
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608041042-87DC6V

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane task verify-show 202608041042-87DC6V
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-04T10:44:27.513Z — VERIFY — ok

By: CODER

Note: verified-202608041042-87DC6V
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-04T10:44:13.882Z, excerpt_hash=sha256:70156bfb8584fdf6931d5e98fdf31f2ca239f141eb17e778b624ec4562938975

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608041042-87DC6V/blueprint/resolved-snapshot.json
- old_digest: b2c00470e04005ea253fd4231a22c8b4c0e1d91c2d6472fd1036dd0d70b4d224
- current_digest: b2c00470e04005ea253fd4231a22c8b4c0e1d91c2d6472fd1036dd0d70b4d224
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608041042-87DC6V

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane task complete 202608041042-87DC6V --result verified-202608041042-87DC6V --commit 594dfcfabc993b557ca362fccd646bc901015a0a
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-04T10:44:45.966Z — VERIFY — ok

By: CODER

Note: verified-202608041042-87DC6V
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-04T10:44:27.590Z, excerpt_hash=sha256:70156bfb8584fdf6931d5e98fdf31f2ca239f141eb17e778b624ec4562938975

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608041042-87DC6V/blueprint/resolved-snapshot.json
- old_digest: b2c00470e04005ea253fd4231a22c8b4c0e1d91c2d6472fd1036dd0d70b4d224
- current_digest: b2c00470e04005ea253fd4231a22c8b4c0e1d91c2d6472fd1036dd0d70b4d224
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608041042-87DC6V

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane task complete 202608041042-87DC6V --result verified-202608041042-87DC6V --commit 594dfcfabc993b557ca362fccd646bc901015a0a
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-04T10:45:07.939Z — VERIFY — ok

By: CODER

Note: verified-202608041042-87DC6V
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-04T10:44:46.047Z, excerpt_hash=sha256:70156bfb8584fdf6931d5e98fdf31f2ca239f141eb17e778b624ec4562938975

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608041042-87DC6V/blueprint/resolved-snapshot.json
- old_digest: b2c00470e04005ea253fd4231a22c8b4c0e1d91c2d6472fd1036dd0d70b4d224
- current_digest: b2c00470e04005ea253fd4231a22c8b4c0e1d91c2d6472fd1036dd0d70b4d224
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608041042-87DC6V

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane task complete 202608041042-87DC6V --result verified-202608041042-87DC6V --commit 522823d4c5bf3f1cb26e1a505c747f32b3ca7216
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the task implementation change in components/proposal-form.tsx, then rerun npm run lint and npx tsc --noEmit.

## Findings
