---
id: "202608051022-C77FG2"
title: "Add proposal ID search coverage"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 11
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "frontend"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-08-05T10:22:56.759Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-05T10:24:29.592Z"
  updated_by: "CODER"
  note: "verified-202608051022-C77FG2"
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-08-05T10:24:23.978Z"
  updated_by: "EVALUATOR"
  note: "Proposal ID search behavior is explicit and regression-tested; all declared and required checks passed."
  evaluated_sha: "3c3865aca9170a62f3add5ed4c5f027ff9b2fb4b"
  blueprint_digest: "f722a7e71dd513e09203c0f4a488df7d4f741551b4a5f24591180390a6ba23ee"
  evidence_refs:
    - ".agentplane/tasks/202608051022-C77FG2/README.md"
    - ".agentplane/tasks/202608051022-C77FG2/quality/20260805-102423978-recovery-context/quality-report.json"
    - ".agentplane/tasks/202608051022-C77FG2/quality/20260805-102423978-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202608051022-C77FG2/quality/20260805-102423978-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202608051022-C77FG2/blueprint/resolved-snapshot.json"
    - "tests/components/proposals.test.tsx"
    - "components/proposals-list.tsx"
  findings:
    - "The existing ID matcher is case-insensitive and supports substring matching; the new test confirms matching and non-matching rows."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Update proposal search affordance and add focused regression coverage for proposal ID filtering without touching unrelated task changes."
events:
  -
    type: "status"
    at: "2026-08-05T10:23:02.377Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Update proposal search affordance and add focused regression coverage for proposal ID filtering without touching unrelated task changes."
  -
    type: "verify"
    at: "2026-08-05T10:23:46.965Z"
    author: "CODER"
    state: "ok"
    note: "Focused proposal-list tests passed (8/8), ESLint passed, TypeScript typecheck passed, git diff --check passed, AgentPlane doctor passed, and policy routing validation passed."
  -
    type: "verify"
    at: "2026-08-05T10:24:29.592Z"
    author: "CODER"
    state: "ok"
    note: "verified-202608051022-C77FG2"
doc_version: 3
doc_updated_at: "2026-08-05T10:24:29.676Z"
doc_updated_by: "CODER"
description: "Make proposal-list search explicitly support and communicate filtering by proposal ID, with regression coverage."
sections:
  Summary: "Enable proposal-list users to search by proposal ID as clearly and reliably as the existing searchable fields."
  Scope: |-
    - In scope: proposal-list search UI copy and focused component regression coverage for full, partial, and case-insensitive proposal ID matching.
    - Out of scope: proposal storage, proposal creation, unrelated search pages, and existing changes from task 202608051020-CZ1H7R.
  Plan: |-
    1. Update the proposals search hint so ID is an explicit searchable field.
    2. Add focused component assertions proving full/partial case-insensitive ID filtering and exclusion of non-matches.
    3. Run the proposal component test, lint, and TypeScript checks; record evidence.
  Verify Steps: |-
    1. Run `npm test -- tests/components/proposals.test.tsx`. Expected: proposal-list tests pass, including full/partial case-insensitive ID filtering and non-match exclusion.
    2. Run `npm run lint`. Expected: ESLint exits successfully.
    3. Run `npm run typecheck`. Expected: TypeScript exits successfully with no errors.
    4. Run `git diff --check`. Expected: no whitespace errors in the task changes.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-05T10:23:46.965Z — VERIFY — ok

    By: CODER

    Note: Focused proposal-list tests passed (8/8), ESLint passed, TypeScript typecheck passed, git diff --check passed, AgentPlane doctor passed, and policy routing validation passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-05T10:23:02.377Z, excerpt_hash=sha256:4511a5e184befe38a8ba4a8394157ddab51d0f02dcaaf1f4e26152b43d32c300

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608051022-C77FG2/blueprint/resolved-snapshot.json
    - old_digest: f722a7e71dd513e09203c0f4a488df7d4f741551b4a5f24591180390a6ba23ee
    - current_digest: f722a7e71dd513e09203c0f4a488df7d4f741551b4a5f24591180390a6ba23ee
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608051022-C77FG2

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane task verify-show 202608051022-C77FG2
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-05T10:24:29.592Z — VERIFY — ok

    By: CODER

    Note: verified-202608051022-C77FG2
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-05T10:23:47.050Z, excerpt_hash=sha256:4511a5e184befe38a8ba4a8394157ddab51d0f02dcaaf1f4e26152b43d32c300

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608051022-C77FG2/blueprint/resolved-snapshot.json
    - old_digest: f722a7e71dd513e09203c0f4a488df7d4f741551b4a5f24591180390a6ba23ee
    - current_digest: f722a7e71dd513e09203c0f4a488df7d4f741551b4a5f24591180390a6ba23ee
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608051022-C77FG2

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane task complete 202608051022-C77FG2 --result verified-202608051022-C77FG2 --commit 3c3865aca9170a62f3add5ed4c5f027ff9b2fb4b
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert only the task-specific changes in components/proposals-list.tsx and tests/components/proposals.test.tsx, then rerun the focused component test."
  Findings: |-
    - Observation: Proposal ID matching already existed in the search field array but was not communicated in the input hint or covered by a focused regression test.
      Impact: Users can now see that ID is searchable, and automated coverage protects full, partial, and case-insensitive ID filtering.
      Resolution: Updated the search placeholder and added focused proposal-list component coverage.
id_source: "generated"
---
## Summary

Enable proposal-list users to search by proposal ID as clearly and reliably as the existing searchable fields.

## Scope

- In scope: proposal-list search UI copy and focused component regression coverage for full, partial, and case-insensitive proposal ID matching.
- Out of scope: proposal storage, proposal creation, unrelated search pages, and existing changes from task 202608051020-CZ1H7R.

## Plan

1. Update the proposals search hint so ID is an explicit searchable field.
2. Add focused component assertions proving full/partial case-insensitive ID filtering and exclusion of non-matches.
3. Run the proposal component test, lint, and TypeScript checks; record evidence.

## Verify Steps

1. Run `npm test -- tests/components/proposals.test.tsx`. Expected: proposal-list tests pass, including full/partial case-insensitive ID filtering and non-match exclusion.
2. Run `npm run lint`. Expected: ESLint exits successfully.
3. Run `npm run typecheck`. Expected: TypeScript exits successfully with no errors.
4. Run `git diff --check`. Expected: no whitespace errors in the task changes.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-05T10:23:46.965Z — VERIFY — ok

By: CODER

Note: Focused proposal-list tests passed (8/8), ESLint passed, TypeScript typecheck passed, git diff --check passed, AgentPlane doctor passed, and policy routing validation passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-05T10:23:02.377Z, excerpt_hash=sha256:4511a5e184befe38a8ba4a8394157ddab51d0f02dcaaf1f4e26152b43d32c300

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608051022-C77FG2/blueprint/resolved-snapshot.json
- old_digest: f722a7e71dd513e09203c0f4a488df7d4f741551b4a5f24591180390a6ba23ee
- current_digest: f722a7e71dd513e09203c0f4a488df7d4f741551b4a5f24591180390a6ba23ee
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608051022-C77FG2

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane task verify-show 202608051022-C77FG2
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-05T10:24:29.592Z — VERIFY — ok

By: CODER

Note: verified-202608051022-C77FG2
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-05T10:23:47.050Z, excerpt_hash=sha256:4511a5e184befe38a8ba4a8394157ddab51d0f02dcaaf1f4e26152b43d32c300

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608051022-C77FG2/blueprint/resolved-snapshot.json
- old_digest: f722a7e71dd513e09203c0f4a488df7d4f741551b4a5f24591180390a6ba23ee
- current_digest: f722a7e71dd513e09203c0f4a488df7d4f741551b4a5f24591180390a6ba23ee
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608051022-C77FG2

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane task complete 202608051022-C77FG2 --result verified-202608051022-C77FG2 --commit 3c3865aca9170a62f3add5ed4c5f027ff9b2fb4b
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert only the task-specific changes in components/proposals-list.tsx and tests/components/proposals.test.tsx, then rerun the focused component test.

## Findings

- Observation: Proposal ID matching already existed in the search field array but was not communicated in the input hint or covered by a focused regression test.
  Impact: Users can now see that ID is searchable, and automated coverage protects full, partial, and case-insensitive ID filtering.
  Resolution: Updated the search placeholder and added focused proposal-list component coverage.
