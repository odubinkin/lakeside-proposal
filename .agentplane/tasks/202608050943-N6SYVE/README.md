---
id: "202608050943-N6SYVE"
title: "Eager-load proposal list villa previews"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 10
origin:
  system: "manual"
depends_on:
  - "202608050937-0VQTK3"
tags:
  - "code"
  - "frontend"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.direct"
verify:
  - "git diff --check"
  - "pnpm lint"
  - "pnpm test -- tests/components/proposals.test.tsx"
plan_approval:
  state: "approved"
  updated_at: "2026-08-05T09:43:50.019Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-05T09:44:53.630Z"
  updated_by: "CODER"
  note: "Scoped verification passed: proposal-list preview images are eager-loaded and the focused multi-image regression test passes; lint and diff checks are clean."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: add eager loading to all proposal-list villa previews with focused regression coverage."
events:
  -
    type: "status"
    at: "2026-08-05T09:43:57.226Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add eager loading to all proposal-list villa previews with focused regression coverage."
  -
    type: "verify"
    at: "2026-08-05T09:44:53.630Z"
    author: "CODER"
    state: "ok"
    note: "Scoped verification passed: proposal-list preview images are eager-loaded and the focused multi-image regression test passes; lint and diff checks are clean."
doc_version: 3
doc_updated_at: "2026-08-05T09:44:53.791Z"
doc_updated_by: "CODER"
description: "Add loading=\"eager\" to villa preview images rendered on /proposals because any visible proposal can become the LCP candidate; preserve all other list behavior and cover the image-loading contract with a component test."
sections:
  Summary: "Make every villa preview rendered in the /proposals list load eagerly so whichever visible proposal becomes the LCP candidate does not trigger the Next.js lazy-LCP warning."
  Scope: |-
    In scope:
    - components/proposals-list.tsx: add loading="eager" to the proposal-card villa Image.
    - tests/components/proposals.test.tsx: assert that rendered proposal preview images are eager-loaded.

    Out of scope:
    - Villa catalog cards and proposal form/view images.
    - Image sources, dimensions, styling, ordering, filtering, or proposal data behavior.
    - Network, dependency, configuration, and unrelated changes.

    Constraint: preserve the existing uncommitted changes owned by task 202608050937-0VQTK3; this task depends on that task to prevent overlapping commit scope.
  Plan: |-
    1. Wait for dependency 202608050937-0VQTK3 to finish so the shared files have a clean ownership boundary.
    2. Inspect the proposal-list Image and existing component-test conventions.
    3. Add loading="eager" to the proposal preview Image.
    4. Add a focused test proving all rendered proposal preview images use eager loading.
    5. Run the declared targeted test, lint, diff checks, and final repository-state inspection.
    6. Record verification evidence and finish with a scoped implementation commit.
  Verify Steps: |-
    1. Run `git diff --check -- components/proposals-list.tsx tests/components/proposals.test.tsx`; pass requires no whitespace errors in scoped files.
    2. Run `pnpm test -- tests/components/proposals.test.tsx`; pass requires the proposal component suite, including the eager-loading assertion, to pass.
    3. Run `pnpm lint`; pass requires exit code 0.
    4. Run `git diff -- components/proposals-list.tsx tests/components/proposals.test.tsx`; pass requires only the approved eager-loading implementation and its focused test beyond the completed dependency changes.
    5. Run `git status --short --untracked-files=all`; pass requires no unintended tracked changes or unreviewed artifacts.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-05T09:44:53.630Z — VERIFY — ok

    By: CODER

    Note: Scoped verification passed: proposal-list preview images are eager-loaded and the focused multi-image regression test passes; lint and diff checks are clean.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-05T09:43:57.226Z, excerpt_hash=sha256:d46716bc20e4e5d500a2bbb167a0c48987ed104fd37e822f845304aa968463d6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608050943-N6SYVE/blueprint/resolved-snapshot.json
    - old_digest: 8478d753709335b6851ed926607959b950f913ebf49b07d66ff63d56a1b32352
    - current_digest: 8478d753709335b6851ed926607959b950f913ebf49b07d66ff63d56a1b32352
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608050943-N6SYVE

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane task verify-show 202608050943-N6SYVE
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Remove only the loading=\"eager\" prop and its focused assertion, then rerun the same verification commands. Do not revert changes belonging to dependency task 202608050937-0VQTK3."
  Findings: |-
    No implementation findings yet. The task is intentionally dependent on 202608050937-0VQTK3 because both tasks touch components/proposals-list.tsx and tests/components/proposals.test.tsx.

    - Observation: Commands: git diff --check -- components/proposals-list.tsx tests/components/proposals.test.tsx (pass); pnpm test -- tests/components/proposals.test.tsx (pass: 13 files, 103 tests); pnpm lint (pass); scoped git diff and full status inspected.
      Impact: The /proposals list no longer leaves villa preview images lazy, so any visible proposal image may become LCP without triggering the Next.js lazy-LCP warning.
      Resolution: Added loading="eager" to the shared proposal-list Image and a two-preview component assertion that every rendered villa preview has loading=eager.
id_source: "generated"
---
## Summary

Make every villa preview rendered in the /proposals list load eagerly so whichever visible proposal becomes the LCP candidate does not trigger the Next.js lazy-LCP warning.

## Scope

In scope:
- components/proposals-list.tsx: add loading="eager" to the proposal-card villa Image.
- tests/components/proposals.test.tsx: assert that rendered proposal preview images are eager-loaded.

Out of scope:
- Villa catalog cards and proposal form/view images.
- Image sources, dimensions, styling, ordering, filtering, or proposal data behavior.
- Network, dependency, configuration, and unrelated changes.

Constraint: preserve the existing uncommitted changes owned by task 202608050937-0VQTK3; this task depends on that task to prevent overlapping commit scope.

## Plan

1. Wait for dependency 202608050937-0VQTK3 to finish so the shared files have a clean ownership boundary.
2. Inspect the proposal-list Image and existing component-test conventions.
3. Add loading="eager" to the proposal preview Image.
4. Add a focused test proving all rendered proposal preview images use eager loading.
5. Run the declared targeted test, lint, diff checks, and final repository-state inspection.
6. Record verification evidence and finish with a scoped implementation commit.

## Verify Steps

1. Run `git diff --check -- components/proposals-list.tsx tests/components/proposals.test.tsx`; pass requires no whitespace errors in scoped files.
2. Run `pnpm test -- tests/components/proposals.test.tsx`; pass requires the proposal component suite, including the eager-loading assertion, to pass.
3. Run `pnpm lint`; pass requires exit code 0.
4. Run `git diff -- components/proposals-list.tsx tests/components/proposals.test.tsx`; pass requires only the approved eager-loading implementation and its focused test beyond the completed dependency changes.
5. Run `git status --short --untracked-files=all`; pass requires no unintended tracked changes or unreviewed artifacts.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-05T09:44:53.630Z — VERIFY — ok

By: CODER

Note: Scoped verification passed: proposal-list preview images are eager-loaded and the focused multi-image regression test passes; lint and diff checks are clean.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-05T09:43:57.226Z, excerpt_hash=sha256:d46716bc20e4e5d500a2bbb167a0c48987ed104fd37e822f845304aa968463d6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608050943-N6SYVE/blueprint/resolved-snapshot.json
- old_digest: 8478d753709335b6851ed926607959b950f913ebf49b07d66ff63d56a1b32352
- current_digest: 8478d753709335b6851ed926607959b950f913ebf49b07d66ff63d56a1b32352
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608050943-N6SYVE

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane task verify-show 202608050943-N6SYVE
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Remove only the loading="eager" prop and its focused assertion, then rerun the same verification commands. Do not revert changes belonging to dependency task 202608050937-0VQTK3.

## Findings

No implementation findings yet. The task is intentionally dependent on 202608050937-0VQTK3 because both tasks touch components/proposals-list.tsx and tests/components/proposals.test.tsx.

- Observation: Commands: git diff --check -- components/proposals-list.tsx tests/components/proposals.test.tsx (pass); pnpm test -- tests/components/proposals.test.tsx (pass: 13 files, 103 tests); pnpm lint (pass); scoped git diff and full status inspected.
  Impact: The /proposals list no longer leaves villa preview images lazy, so any visible proposal image may become LCP without triggering the Next.js lazy-LCP warning.
  Resolution: Added loading="eager" to the shared proposal-list Image and a two-preview component assertion that every rendered villa preview has loading=eager.
