---
id: "202608041016-EVSQ1B"
title: "Replace proposal loading text with centered skeleton"
result_summary: "Centered accessible animated loader replaces both proposal loading text states"
risk_level: "low"
status: "DONE"
priority: "med"
owner: "CODER"
revision: 19
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "frontend"
verify:
  - "pnpm lint"
  - "pnpm build"
plan_approval:
  state: "approved"
  updated_at: "2026-08-04T10:17:29.809Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-04T10:28:07.664Z"
  updated_by: "CODER"
  note: "verified-202608041016-EVSQ1B"
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-08-04T10:28:03.360Z"
  updated_by: "EVALUATOR"
  note: "The centered proposal loader remains valid on the task-attributed integrated evidence commit."
  evaluated_sha: "c1aeb8589cfd1d7b1ebb2e6b192cb18eb121465e"
  blueprint_digest: "0f99b52558650338078445f696524edb628d5da3356d21f5548ef03ed319c515"
  evidence_refs:
    - ".agentplane/tasks/202608041016-EVSQ1B/README.md"
    - ".agentplane/tasks/202608041016-EVSQ1B/quality/20260804-102803360-recovery-context/quality-report.json"
    - ".agentplane/tasks/202608041016-EVSQ1B/quality/20260804-102803360-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202608041016-EVSQ1B/quality/20260804-102803360-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202608041016-EVSQ1B/blueprint/resolved-snapshot.json"
    - "implementation commit ffdf311ddc7960e9c16f477f5a44e4e03cb2cc6e"
    - "pnpm lint; pnpm build; pnpm exec tsc --noEmit; git diff --check"
  findings:
    - "Both proposal loading branches share the accessible animated indicator; no proposal data behavior changed."
commit:
  hash: "c1aeb8589cfd1d7b1ebb2e6b192cb18eb121465e"
  message: "🚧 EVSQ1B task: refresh proposal loader quality evidence"
comments:
  -
    author: "CODER"
    body: "Start: implement the approved centered accessible proposal loader and validate the scoped frontend change."
  -
    author: "CODER"
    body: "Verified: centered accessible loader is used by both proposal loading branches; lint, build, TypeScript, routing, doctor, and evaluator all pass."
events:
  -
    type: "status"
    at: "2026-08-04T10:17:34.747Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement the approved centered accessible proposal loader and validate the scoped frontend change."
  -
    type: "verify"
    at: "2026-08-04T10:19:15.325Z"
    author: "CODER"
    state: "ok"
    note: "All scoped loading-state checks passed; the reusable centered loader preserves proposal behavior and adds accessible reduced-motion support."
  -
    type: "verify"
    at: "2026-08-04T10:20:37.233Z"
    author: "CODER"
    state: "ok"
    note: "verified-202608041016-EVSQ1B"
  -
    type: "verify"
    at: "2026-08-04T10:22:42.933Z"
    author: "CODER"
    state: "ok"
    note: "Centered accessible animated loader replaces both proposal loading text states"
  -
    type: "verify"
    at: "2026-08-04T10:27:42.646Z"
    author: "CODER"
    state: "ok"
    note: "verified-202608041016-EVSQ1B"
  -
    type: "verify"
    at: "2026-08-04T10:28:07.664Z"
    author: "CODER"
    state: "ok"
    note: "verified-202608041016-EVSQ1B"
  -
    type: "status"
    at: "2026-08-04T10:28:17.391Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: centered accessible loader is used by both proposal loading branches; lint, build, TypeScript, routing, doctor, and evaluator all pass."
doc_version: 3
doc_updated_at: "2026-08-04T10:28:17.392Z"
doc_updated_by: "CODER"
description: "On /proposals/view, replace the Loading proposal text states with an accessible centered visual loading indicator while preserving existing loading behavior."
sections:
  Summary: "Replace both visible Loading proposal states on /proposals/view with one reusable, accessible, centered animated loader."
  Scope: "In scope: app/proposals/view/page.tsx, components/proposal-view.tsx, and one small shared loading component. Preserve proposal loading and rendering logic. Out of scope: other proposal routes and data behavior."
  Plan: "1. Add a reusable centered proposal loading indicator with an animated icon and screen-reader status text. 2. Use it for the Suspense fallback and client hydration snapshot state. 3. Run lint and production build, then inspect the diff for scope and accessibility."
  Verify Steps: "1. Run pnpm lint. Expected: ESLint exits successfully. 2. Run pnpm build. Expected: Next.js production build succeeds, including /proposals/view. 3. Run rg -n 'Loading proposal' app/proposals/view/page.tsx components/proposal-view.tsx. Expected: no visible text fallback remains in either file. 4. Review the diff. Expected: both loading branches render the same centered animated status with screen-reader-only context, and proposal data logic is unchanged."
  Verification: |-
    Pending execution.

    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-04T10:19:15.325Z — VERIFY — ok

    By: CODER

    Note: All scoped loading-state checks passed; the reusable centered loader preserves proposal behavior and adds accessible reduced-motion support.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-04T10:17:34.747Z, excerpt_hash=sha256:a1fd05a236ac83ee6e957d84eb183c5c87edb7708e3ebe4f3ed9e84aa7cc24a0

    Details:

    Command: pnpm lint | Result: pass | Evidence: ESLint exited 0. | Scope: repository lint including all three touched frontend files.
    Command: pnpm build | Result: pass | Evidence: Next.js compiled successfully and generated /proposals/view. | Scope: production route build.
    Command: pnpm exec tsc --noEmit | Result: pass | Evidence: TypeScript exited 0. | Scope: project type safety.
    Command: rg -n Loading proposal app/proposals/view/page.tsx components/proposal-view.tsx | Result: pass | Evidence: no matches. | Scope: both prior visible text fallback branches.
    Command: git diff --check; node .agentplane/policy/check-routing.mjs; ap doctor | Result: pass | Evidence: clean diff, policy routing OK, doctor OK. | Scope: patch hygiene and repository workflow.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608041016-EVSQ1B/blueprint/resolved-snapshot.json
    - old_digest: 0f99b52558650338078445f696524edb628d5da3356d21f5548ef03ed319c515
    - current_digest: 0f99b52558650338078445f696524edb628d5da3356d21f5548ef03ed319c515
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608041016-EVSQ1B

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane task verify-show 202608041016-EVSQ1B
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-04T10:20:37.233Z — VERIFY — ok

    By: CODER

    Note: verified-202608041016-EVSQ1B
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-04T10:19:15.540Z, excerpt_hash=sha256:a1fd05a236ac83ee6e957d84eb183c5c87edb7708e3ebe4f3ed9e84aa7cc24a0

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608041016-EVSQ1B/blueprint/resolved-snapshot.json
    - old_digest: 0f99b52558650338078445f696524edb628d5da3356d21f5548ef03ed319c515
    - current_digest: 0f99b52558650338078445f696524edb628d5da3356d21f5548ef03ed319c515
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608041016-EVSQ1B

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane task complete 202608041016-EVSQ1B --result verified-202608041016-EVSQ1B --commit ffdf311ddc7960e9c16f477f5a44e4e03cb2cc6e
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-04T10:22:42.933Z — VERIFY — ok

    By: CODER

    Note: Centered accessible animated loader replaces both proposal loading text states
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-04T10:20:37.337Z, excerpt_hash=sha256:a1fd05a236ac83ee6e957d84eb183c5c87edb7708e3ebe4f3ed9e84aa7cc24a0

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608041016-EVSQ1B/blueprint/resolved-snapshot.json
    - old_digest: 0f99b52558650338078445f696524edb628d5da3356d21f5548ef03ed319c515
    - current_digest: 0f99b52558650338078445f696524edb628d5da3356d21f5548ef03ed319c515
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608041016-EVSQ1B

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane task complete 202608041016-EVSQ1B --result verified-202608041016-EVSQ1B --commit 804b32c66f289708d770f671a0b4b52c7ecdd500
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-04T10:27:42.646Z — VERIFY — ok

    By: CODER

    Note: verified-202608041016-EVSQ1B
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-04T10:22:43.016Z, excerpt_hash=sha256:a1fd05a236ac83ee6e957d84eb183c5c87edb7708e3ebe4f3ed9e84aa7cc24a0

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608041016-EVSQ1B/blueprint/resolved-snapshot.json
    - old_digest: 0f99b52558650338078445f696524edb628d5da3356d21f5548ef03ed319c515
    - current_digest: 0f99b52558650338078445f696524edb628d5da3356d21f5548ef03ed319c515
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608041016-EVSQ1B

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane task complete 202608041016-EVSQ1B --result verified-202608041016-EVSQ1B --commit 77a19d22b2339013d15068242ff1eca2222fc32d
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-04T10:28:07.664Z — VERIFY — ok

    By: CODER

    Note: verified-202608041016-EVSQ1B
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-04T10:27:42.719Z, excerpt_hash=sha256:a1fd05a236ac83ee6e957d84eb183c5c87edb7708e3ebe4f3ed9e84aa7cc24a0

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608041016-EVSQ1B/blueprint/resolved-snapshot.json
    - old_digest: 0f99b52558650338078445f696524edb628d5da3356d21f5548ef03ed319c515
    - current_digest: 0f99b52558650338078445f696524edb628d5da3356d21f5548ef03ed319c515
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608041016-EVSQ1B

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane task complete 202608041016-EVSQ1B --result verified-202608041016-EVSQ1B --commit c1aeb8589cfd1d7b1ebb2e6b192cb18eb121465e
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert the loading component addition and restore the two prior text fallback blocks; no data migration or persistent state changes are involved."
  Findings: "None."
id_source: "generated"
---
## Summary

Replace both visible Loading proposal states on /proposals/view with one reusable, accessible, centered animated loader.

## Scope

In scope: app/proposals/view/page.tsx, components/proposal-view.tsx, and one small shared loading component. Preserve proposal loading and rendering logic. Out of scope: other proposal routes and data behavior.

## Plan

1. Add a reusable centered proposal loading indicator with an animated icon and screen-reader status text. 2. Use it for the Suspense fallback and client hydration snapshot state. 3. Run lint and production build, then inspect the diff for scope and accessibility.

## Verify Steps

1. Run pnpm lint. Expected: ESLint exits successfully. 2. Run pnpm build. Expected: Next.js production build succeeds, including /proposals/view. 3. Run rg -n 'Loading proposal' app/proposals/view/page.tsx components/proposal-view.tsx. Expected: no visible text fallback remains in either file. 4. Review the diff. Expected: both loading branches render the same centered animated status with screen-reader-only context, and proposal data logic is unchanged.

## Verification

Pending execution.

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-04T10:19:15.325Z — VERIFY — ok

By: CODER

Note: All scoped loading-state checks passed; the reusable centered loader preserves proposal behavior and adds accessible reduced-motion support.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-04T10:17:34.747Z, excerpt_hash=sha256:a1fd05a236ac83ee6e957d84eb183c5c87edb7708e3ebe4f3ed9e84aa7cc24a0

Details:

Command: pnpm lint | Result: pass | Evidence: ESLint exited 0. | Scope: repository lint including all three touched frontend files.
Command: pnpm build | Result: pass | Evidence: Next.js compiled successfully and generated /proposals/view. | Scope: production route build.
Command: pnpm exec tsc --noEmit | Result: pass | Evidence: TypeScript exited 0. | Scope: project type safety.
Command: rg -n Loading proposal app/proposals/view/page.tsx components/proposal-view.tsx | Result: pass | Evidence: no matches. | Scope: both prior visible text fallback branches.
Command: git diff --check; node .agentplane/policy/check-routing.mjs; ap doctor | Result: pass | Evidence: clean diff, policy routing OK, doctor OK. | Scope: patch hygiene and repository workflow.

BlueprintSnapshotRef:
- state: current
- path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608041016-EVSQ1B/blueprint/resolved-snapshot.json
- old_digest: 0f99b52558650338078445f696524edb628d5da3356d21f5548ef03ed319c515
- current_digest: 0f99b52558650338078445f696524edb628d5da3356d21f5548ef03ed319c515
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608041016-EVSQ1B

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane task verify-show 202608041016-EVSQ1B
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-04T10:20:37.233Z — VERIFY — ok

By: CODER

Note: verified-202608041016-EVSQ1B
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-04T10:19:15.540Z, excerpt_hash=sha256:a1fd05a236ac83ee6e957d84eb183c5c87edb7708e3ebe4f3ed9e84aa7cc24a0

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608041016-EVSQ1B/blueprint/resolved-snapshot.json
- old_digest: 0f99b52558650338078445f696524edb628d5da3356d21f5548ef03ed319c515
- current_digest: 0f99b52558650338078445f696524edb628d5da3356d21f5548ef03ed319c515
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608041016-EVSQ1B

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane task complete 202608041016-EVSQ1B --result verified-202608041016-EVSQ1B --commit ffdf311ddc7960e9c16f477f5a44e4e03cb2cc6e
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-04T10:22:42.933Z — VERIFY — ok

By: CODER

Note: Centered accessible animated loader replaces both proposal loading text states
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-04T10:20:37.337Z, excerpt_hash=sha256:a1fd05a236ac83ee6e957d84eb183c5c87edb7708e3ebe4f3ed9e84aa7cc24a0

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608041016-EVSQ1B/blueprint/resolved-snapshot.json
- old_digest: 0f99b52558650338078445f696524edb628d5da3356d21f5548ef03ed319c515
- current_digest: 0f99b52558650338078445f696524edb628d5da3356d21f5548ef03ed319c515
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608041016-EVSQ1B

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane task complete 202608041016-EVSQ1B --result verified-202608041016-EVSQ1B --commit 804b32c66f289708d770f671a0b4b52c7ecdd500
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-04T10:27:42.646Z — VERIFY — ok

By: CODER

Note: verified-202608041016-EVSQ1B
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-04T10:22:43.016Z, excerpt_hash=sha256:a1fd05a236ac83ee6e957d84eb183c5c87edb7708e3ebe4f3ed9e84aa7cc24a0

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608041016-EVSQ1B/blueprint/resolved-snapshot.json
- old_digest: 0f99b52558650338078445f696524edb628d5da3356d21f5548ef03ed319c515
- current_digest: 0f99b52558650338078445f696524edb628d5da3356d21f5548ef03ed319c515
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608041016-EVSQ1B

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane task complete 202608041016-EVSQ1B --result verified-202608041016-EVSQ1B --commit 77a19d22b2339013d15068242ff1eca2222fc32d
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-04T10:28:07.664Z — VERIFY — ok

By: CODER

Note: verified-202608041016-EVSQ1B
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-04T10:27:42.719Z, excerpt_hash=sha256:a1fd05a236ac83ee6e957d84eb183c5c87edb7708e3ebe4f3ed9e84aa7cc24a0

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608041016-EVSQ1B/blueprint/resolved-snapshot.json
- old_digest: 0f99b52558650338078445f696524edb628d5da3356d21f5548ef03ed319c515
- current_digest: 0f99b52558650338078445f696524edb628d5da3356d21f5548ef03ed319c515
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608041016-EVSQ1B

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane task complete 202608041016-EVSQ1B --result verified-202608041016-EVSQ1B --commit c1aeb8589cfd1d7b1ebb2e6b192cb18eb121465e
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the loading component addition and restore the two prior text fallback blocks; no data migration or persistent state changes are involved.

## Findings

None.
