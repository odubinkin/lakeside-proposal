---
id: "202608041045-NE78BB"
title: "Unify remaining proposal loading states"
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
verify:
  - "pnpm lint"
  - "pnpm build"
  - "pnpm exec tsc --noEmit"
plan_approval:
  state: "approved"
  updated_at: "2026-08-04T10:45:49.817Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-04T10:46:40.345Z"
  updated_by: "CODER"
  note: "All remaining proposal loading branches now use the shared accessible animation with page or section layout as appropriate; checks pass."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: replace the remaining proposal loading text states with the shared accessible loader across the approved five-file scope."
events:
  -
    type: "status"
    at: "2026-08-04T10:45:55.867Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: replace the remaining proposal loading text states with the shared accessible loader across the approved five-file scope."
  -
    type: "verify"
    at: "2026-08-04T10:46:40.345Z"
    author: "CODER"
    state: "ok"
    note: "All remaining proposal loading branches now use the shared accessible animation with page or section layout as appropriate; checks pass."
doc_version: 3
doc_updated_at: "2026-08-04T10:46:40.431Z"
doc_updated_by: "CODER"
description: "Replace the remaining visible Loading proposal builder, Loading proposal, and Loading proposals text states with the existing centered accessible animated loader, using context-appropriate screen-reader labels."
sections:
  Summary: "Replace all remaining visible proposal loading text with the shared accessible animated loader."
  Scope: "Modify components/proposal-loading.tsx, components/proposal-form.tsx, components/proposals-list.tsx, app/(app)/proposals/new/page.tsx, and app/(app)/proposals/edit/page.tsx. Preserve loading triggers, proposal data behavior, and unrelated UI."
  Plan: "1. Extend ProposalLoading with context-specific screen-reader labels and a section variant for embedded list loading. 2. Use the page loader in new/edit Suspense fallbacks and proposal form hydration. 3. Use the section loader in the proposals list hydration state. 4. Run lint, build, TypeScript, focused source assertions, and workflow checks."
  Verify Steps: "1. Run pnpm lint. Expected: ESLint exits successfully. 2. Run pnpm build. Expected: Next.js production build succeeds for proposal routes. 3. Run pnpm exec tsc --noEmit. Expected: TypeScript exits successfully. 4. Run rg -n 'Loading proposal builder…|Loading proposal…|Loading proposals…' app components --glob '*.tsx'. Expected: no visible ellipsis loading text remains. 5. Review the diff. Expected: all four branches render ProposalLoading with context-appropriate accessible labels; the list uses the section variant; loading/data logic is unchanged."
  Verification: |-
    Pending execution.

    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-04T10:46:40.345Z — VERIFY — ok

    By: CODER

    Note: All remaining proposal loading branches now use the shared accessible animation with page or section layout as appropriate; checks pass.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-04T10:45:55.867Z, excerpt_hash=sha256:dd65826a726ca300283b3d69bfd1617f80110f4e64e03e598c994547440d598d

    Details:

    Command: pnpm lint | Result: pass | Evidence: ESLint exited 0. | Scope: all five touched frontend files.
    Command: pnpm build | Result: pass | Evidence: Next.js compiled and generated all proposal routes. | Scope: production build.
    Command: pnpm exec tsc --noEmit | Result: pass | Evidence: TypeScript exited 0. | Scope: project type safety.
    Command: focused rg for prior ellipsis loading strings | Result: pass | Evidence: no matches. | Scope: app and components TSX sources.
    Command: git diff --check; policy routing; ap doctor | Result: pass | Evidence: clean diff, routing OK, doctor OK. | Scope: patch and workflow hygiene.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608041045-NE78BB/blueprint/resolved-snapshot.json
    - old_digest: 1f5a02ab6ccfa6683dadf472fbbf8ccbdd28565f3d889d6f6760ca4a0f5edfd1
    - current_digest: 1f5a02ab6ccfa6683dadf472fbbf8ccbdd28565f3d889d6f6760ca4a0f5edfd1
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608041045-NE78BB

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane task verify-show 202608041045-NE78BB
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert the five scoped files to restore the prior text fallbacks and fixed loader API."
  Findings: "None."
id_source: "generated"
---
## Summary

Replace all remaining visible proposal loading text with the shared accessible animated loader.

## Scope

Modify components/proposal-loading.tsx, components/proposal-form.tsx, components/proposals-list.tsx, app/(app)/proposals/new/page.tsx, and app/(app)/proposals/edit/page.tsx. Preserve loading triggers, proposal data behavior, and unrelated UI.

## Plan

1. Extend ProposalLoading with context-specific screen-reader labels and a section variant for embedded list loading. 2. Use the page loader in new/edit Suspense fallbacks and proposal form hydration. 3. Use the section loader in the proposals list hydration state. 4. Run lint, build, TypeScript, focused source assertions, and workflow checks.

## Verify Steps

1. Run pnpm lint. Expected: ESLint exits successfully. 2. Run pnpm build. Expected: Next.js production build succeeds for proposal routes. 3. Run pnpm exec tsc --noEmit. Expected: TypeScript exits successfully. 4. Run rg -n 'Loading proposal builder…|Loading proposal…|Loading proposals…' app components --glob '*.tsx'. Expected: no visible ellipsis loading text remains. 5. Review the diff. Expected: all four branches render ProposalLoading with context-appropriate accessible labels; the list uses the section variant; loading/data logic is unchanged.

## Verification

Pending execution.

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-04T10:46:40.345Z — VERIFY — ok

By: CODER

Note: All remaining proposal loading branches now use the shared accessible animation with page or section layout as appropriate; checks pass.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-04T10:45:55.867Z, excerpt_hash=sha256:dd65826a726ca300283b3d69bfd1617f80110f4e64e03e598c994547440d598d

Details:

Command: pnpm lint | Result: pass | Evidence: ESLint exited 0. | Scope: all five touched frontend files.
Command: pnpm build | Result: pass | Evidence: Next.js compiled and generated all proposal routes. | Scope: production build.
Command: pnpm exec tsc --noEmit | Result: pass | Evidence: TypeScript exited 0. | Scope: project type safety.
Command: focused rg for prior ellipsis loading strings | Result: pass | Evidence: no matches. | Scope: app and components TSX sources.
Command: git diff --check; policy routing; ap doctor | Result: pass | Evidence: clean diff, routing OK, doctor OK. | Scope: patch and workflow hygiene.

BlueprintSnapshotRef:
- state: current
- path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608041045-NE78BB/blueprint/resolved-snapshot.json
- old_digest: 1f5a02ab6ccfa6683dadf472fbbf8ccbdd28565f3d889d6f6760ca4a0f5edfd1
- current_digest: 1f5a02ab6ccfa6683dadf472fbbf8ccbdd28565f3d889d6f6760ca4a0f5edfd1
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608041045-NE78BB

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane task verify-show 202608041045-NE78BB
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the five scoped files to restore the prior text fallbacks and fixed loader API.

## Findings

None.
