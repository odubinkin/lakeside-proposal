---
id: "202608051032-6SJS3N"
title: "Refine proposal card hierarchy"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 15
origin:
  system: "manual"
depends_on: []
tags:
  - "frontend"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-08-05T10:33:00.107Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-05T10:37:32.644Z"
  updated_by: "CODER"
  note: "verified-202608051032-6SJS3N"
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-08-05T10:37:21.862Z"
  updated_by: "EVALUATOR"
  note: "Proposal card layout matches the approved hierarchy and responsive sizing requirements."
  evaluated_sha: "884481e0896c7c309f86b7034b641044b58a9df0"
  blueprint_digest: "950c0e2114bd3d6f16aabefce779b5752017763749468ddae572d7c252906c7c"
  evidence_refs:
    - ".agentplane/tasks/202608051032-6SJS3N/README.md"
    - ".agentplane/tasks/202608051032-6SJS3N/quality/20260805-103721862-recovery-context/quality-report.json"
    - ".agentplane/tasks/202608051032-6SJS3N/quality/20260805-103721862-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202608051032-6SJS3N/quality/20260805-103721862-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202608051032-6SJS3N/blueprint/resolved-snapshot.json"
    - "npm test -- --run tests/components/proposals.test.tsx"
    - "npm run lint"
    - "npm run typecheck"
    - "Playwright 390x844 and 1440x1000 visual inspection"
  findings:
    - "ID and Draft share a dedicated metadata row above the villa title; the desktop preview is larger while mobile layout remains overflow-free."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue direct-mode task in current checkout."
events:
  -
    type: "status"
    at: "2026-08-05T10:33:06.930Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue direct-mode task in current checkout."
  -
    type: "verify"
    at: "2026-08-05T10:36:52.673Z"
    author: "CODER"
    state: "ok"
    note: "Proposal card hierarchy and responsive preview sizing verified by targeted component tests, lint, typecheck, local desktop/mobile Playwright inspection, Agentplane doctor, and policy routing validation."
  -
    type: "verify"
    at: "2026-08-05T10:37:32.644Z"
    author: "CODER"
    state: "ok"
    note: "verified-202608051032-6SJS3N"
doc_version: 3
doc_updated_at: "2026-08-05T10:37:32.724Z"
doc_updated_by: "CODER"
description: "On /proposals, move the proposal ID and Draft status badges to a dedicated row above the villa title, and slightly enlarge the villa preview image at wide-screen breakpoints while preserving mobile layout and existing behavior."
sections:
  Summary: "Refine the saved-proposal card hierarchy on /proposals by separating metadata badges from the villa title and enlarging the wide-screen villa preview."
  Scope: "Modify components/proposals-list.tsx and, only if needed for regression coverage, tests/components/proposals.test.tsx. Preserve mobile sizing, proposal data, pricing, search, and actions."
  Plan: "1. Place proposal ID and the conditional Draft badge in a dedicated metadata row above the villa title row. 2. Keep villa title and total price together beneath the badges. 3. Slightly increase preview dimensions at the existing wide-screen breakpoint while preserving the mobile dimensions. 4. Run targeted tests, lint, typecheck, and visual checks at mobile and desktop widths."
  Verify Steps: "1. Run npm test -- --run tests/components/proposals.test.tsx; expected: proposal list behaviors remain green. 2. Run npm run lint; expected: no lint errors. 3. Run npm run typecheck; expected: no TypeScript errors. 4. Open /proposals with representative saved completed and draft proposals at mobile and wide-screen widths; expected: ID/Draft appear above the villa title, mobile image size is unchanged, and the wide-screen image is slightly larger without overlap or clipped actions."
  Verification: |-
    - Command: npm test -- --run tests/components/proposals.test.tsx
    - Result: pass
    - Evidence: 1 file and 8 tests passed.
    - Scope: proposal list behavior and metadata-row regression.

    - Command: npm run lint
    - Result: pass
    - Evidence: ESLint completed with no errors.
    - Scope: repository lint rules.

    - Command: npm run typecheck
    - Result: pass
    - Evidence: tsc --noEmit completed with no errors.
    - Scope: repository TypeScript correctness.

    - Command: local Playwright visual check at 390x844 and 1440x1000
    - Result: pass
    - Evidence: badges render above the villa title; preview measured 324x112 on mobile and 160x112 on desktop; document scroll width equals client width at both viewports; browser console reported zero errors.
    - Scope: responsive /proposals card layout.

    - Command: ap doctor && node .agentplane/policy/check-routing.mjs
    - Result: pass
    - Evidence: doctor OK with zero warnings/errors and policy routing OK.
    - Scope: Agentplane workflow and policy integrity.

    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-05T10:36:52.673Z — VERIFY — ok

    By: CODER

    Note: Proposal card hierarchy and responsive preview sizing verified by targeted component tests, lint, typecheck, local desktop/mobile Playwright inspection, Agentplane doctor, and policy routing validation.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-05T10:36:52.288Z, excerpt_hash=sha256:754ba5967576b283197b703c94f4e0197c5a588439e9a33873495db8272a7c95

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608051032-6SJS3N/blueprint/resolved-snapshot.json
    - old_digest: 950c0e2114bd3d6f16aabefce779b5752017763749468ddae572d7c252906c7c
    - current_digest: 950c0e2114bd3d6f16aabefce779b5752017763749468ddae572d7c252906c7c
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608051032-6SJS3N

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane task verify-show 202608051032-6SJS3N
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-05T10:37:32.644Z — VERIFY — ok

    By: CODER

    Note: verified-202608051032-6SJS3N
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-05T10:36:52.776Z, excerpt_hash=sha256:754ba5967576b283197b703c94f4e0197c5a588439e9a33873495db8272a7c95

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608051032-6SJS3N/blueprint/resolved-snapshot.json
    - old_digest: 950c0e2114bd3d6f16aabefce779b5752017763749468ddae572d7c252906c7c
    - current_digest: 950c0e2114bd3d6f16aabefce779b5752017763749468ddae572d7c252906c7c
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608051032-6SJS3N

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane task complete 202608051032-6SJS3N --result verified-202608051032-6SJS3N --commit 884481e0896c7c309f86b7034b641044b58a9df0
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert the scoped layout-class and markup changes in components/proposals-list.tsx, plus any directly associated regression assertion."
  Findings: "No scope drift, skipped checks, or residual issues identified."
id_source: "generated"
---
## Summary

Refine the saved-proposal card hierarchy on /proposals by separating metadata badges from the villa title and enlarging the wide-screen villa preview.

## Scope

Modify components/proposals-list.tsx and, only if needed for regression coverage, tests/components/proposals.test.tsx. Preserve mobile sizing, proposal data, pricing, search, and actions.

## Plan

1. Place proposal ID and the conditional Draft badge in a dedicated metadata row above the villa title row. 2. Keep villa title and total price together beneath the badges. 3. Slightly increase preview dimensions at the existing wide-screen breakpoint while preserving the mobile dimensions. 4. Run targeted tests, lint, typecheck, and visual checks at mobile and desktop widths.

## Verify Steps

1. Run npm test -- --run tests/components/proposals.test.tsx; expected: proposal list behaviors remain green. 2. Run npm run lint; expected: no lint errors. 3. Run npm run typecheck; expected: no TypeScript errors. 4. Open /proposals with representative saved completed and draft proposals at mobile and wide-screen widths; expected: ID/Draft appear above the villa title, mobile image size is unchanged, and the wide-screen image is slightly larger without overlap or clipped actions.

## Verification

- Command: npm test -- --run tests/components/proposals.test.tsx
- Result: pass
- Evidence: 1 file and 8 tests passed.
- Scope: proposal list behavior and metadata-row regression.

- Command: npm run lint
- Result: pass
- Evidence: ESLint completed with no errors.
- Scope: repository lint rules.

- Command: npm run typecheck
- Result: pass
- Evidence: tsc --noEmit completed with no errors.
- Scope: repository TypeScript correctness.

- Command: local Playwright visual check at 390x844 and 1440x1000
- Result: pass
- Evidence: badges render above the villa title; preview measured 324x112 on mobile and 160x112 on desktop; document scroll width equals client width at both viewports; browser console reported zero errors.
- Scope: responsive /proposals card layout.

- Command: ap doctor && node .agentplane/policy/check-routing.mjs
- Result: pass
- Evidence: doctor OK with zero warnings/errors and policy routing OK.
- Scope: Agentplane workflow and policy integrity.

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-05T10:36:52.673Z — VERIFY — ok

By: CODER

Note: Proposal card hierarchy and responsive preview sizing verified by targeted component tests, lint, typecheck, local desktop/mobile Playwright inspection, Agentplane doctor, and policy routing validation.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-05T10:36:52.288Z, excerpt_hash=sha256:754ba5967576b283197b703c94f4e0197c5a588439e9a33873495db8272a7c95

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608051032-6SJS3N/blueprint/resolved-snapshot.json
- old_digest: 950c0e2114bd3d6f16aabefce779b5752017763749468ddae572d7c252906c7c
- current_digest: 950c0e2114bd3d6f16aabefce779b5752017763749468ddae572d7c252906c7c
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608051032-6SJS3N

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane task verify-show 202608051032-6SJS3N
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-05T10:37:32.644Z — VERIFY — ok

By: CODER

Note: verified-202608051032-6SJS3N
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-05T10:36:52.776Z, excerpt_hash=sha256:754ba5967576b283197b703c94f4e0197c5a588439e9a33873495db8272a7c95

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608051032-6SJS3N/blueprint/resolved-snapshot.json
- old_digest: 950c0e2114bd3d6f16aabefce779b5752017763749468ddae572d7c252906c7c
- current_digest: 950c0e2114bd3d6f16aabefce779b5752017763749468ddae572d7c252906c7c
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608051032-6SJS3N

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane task complete 202608051032-6SJS3N --result verified-202608051032-6SJS3N --commit 884481e0896c7c309f86b7034b641044b58a9df0
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the scoped layout-class and markup changes in components/proposals-list.tsx, plus any directly associated regression assertion.

## Findings

No scope drift, skipped checks, or residual issues identified.
