---
id: "202608051217-XJE3EB"
title: "Stabilize cross-browser proposal printing"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 18
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-08-05T12:17:51.919Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-05T12:39:24.569Z"
  updated_by: "CODER"
  note: "verified-202608051217-XJE3EB"
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-08-05T12:39:13.714Z"
  updated_by: "EVALUATOR"
  note: "Cross-browser proposal print layout is implementation-complete and verified."
  evaluated_sha: "859dddea94ce35569d9901e4db111adce50a4917"
  blueprint_digest: "95a4e04827d8717a5970e748270eb12ef365ccaa158c87db086fb13438599526"
  evidence_refs:
    - ".agentplane/tasks/202608051217-XJE3EB/README.md"
    - ".agentplane/tasks/202608051217-XJE3EB/quality/20260805-123913714-recovery-context/quality-report.json"
    - ".agentplane/tasks/202608051217-XJE3EB/quality/20260805-123913714-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202608051217-XJE3EB/quality/20260805-123913714-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202608051217-XJE3EB/blueprint/resolved-snapshot.json"
    - "implementation commit 859dddea94ce; npm run lint; npm run typecheck; npm test; npm run build; focused Chromium print E2E; manual Safari confirmation; ap doctor; routing check"
  findings:
    - "A4 page sizing, targeted fragmentation groups, and legacy page-break fallbacks are scoped to the printable proposal; Chromium automation and user-confirmed Safari output pass."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue direct-mode task in current checkout."
  -
    author: "CODER"
    body: "Blocked: print behavior is implemented and its focused Chromium scenario passes, but the full E2E contract has an unrelated Willow status failure that requires user direction before scope changes."
  -
    author: "CODER"
    body: "Start: continue direct-mode task in current checkout."
events:
  -
    type: "status"
    at: "2026-08-05T12:18:03.796Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue direct-mode task in current checkout."
  -
    type: "verify"
    at: "2026-08-05T12:22:20.652Z"
    author: "CODER"
    state: "needs_rework"
    note: "Print-specific implementation checks pass, but the declared full Chromium E2E file remains red on an unrelated Willow progress-status assertion."
  -
    type: "status"
    at: "2026-08-05T12:22:20.967Z"
    author: "CODER"
    from: "DOING"
    to: "BLOCKED"
    note: "Blocked: print behavior is implemented and its focused Chromium scenario passes, but the full E2E contract has an unrelated Willow status failure that requires user direction before scope changes."
  -
    type: "status"
    at: "2026-08-05T12:35:31.626Z"
    author: "CODER"
    from: "BLOCKED"
    to: "DOING"
    note: "Start: continue direct-mode task in current checkout."
  -
    type: "verify"
    at: "2026-08-05T12:38:35.122Z"
    author: "CODER"
    state: "ok"
    note: "Print CSS, focused Chromium coverage, production build, repository checks, and user-confirmed Safari pagination all pass; the task is ready to commit and close."
  -
    type: "verify"
    at: "2026-08-05T12:39:24.569Z"
    author: "CODER"
    state: "ok"
    note: "verified-202608051217-XJE3EB"
doc_version: 3
doc_updated_at: "2026-08-05T12:39:24.630Z"
doc_updated_by: "CODER"
description: "Make the commercial proposal print layout predictable across Chromium, Firefox, and Safari/WebKit using robust print CSS. Keep Playwright configured for Chromium only. Do not close the task until the user explicitly requests closure."
sections:
  Summary: "Stabilize the printable commercial proposal so page sizing, margins, color handling, and fragmentation behave predictably in Chromium, Firefox, and Safari/WebKit."
  Scope: "Update proposal print CSS and targeted proposal markup only as needed. Preserve the existing screen layout. Keep Playwright configured for Chromium only and do not add browser projects. Do not touch the unrelated active proposal-list changes. Leave this task open after implementation and verification until the user explicitly requests closure."
  Plan: "1. Define an explicit A4 print page contract with stable margins, document width, backgrounds, and color adjustment. 2. Replace blanket section fragmentation avoidance with targeted keep-together and legacy fallback rules for bounded proposal blocks. 3. Add focused Chromium print-media assertions without adding Playwright browser projects. 4. Run lint, typecheck, relevant tests, build, Chromium E2E, AgentPlane doctor, and routing validation; record verification but do not finish the task."
  Verify Steps: "1. Run npm run lint and npm run typecheck. Expected: both pass. 2. Run npm test. Expected: all unit and component tests pass. 3. Run npm run build. Expected: Next.js production build succeeds. 4. Run npm run test:e2e -- e2e/proposal-flows.spec.ts --project=chromium --grep \"opens a printable proposal\". Expected: the focused proposal print scenario passes with no horizontal overflow and active keep-together rules; Playwright remains Chromium-only. The unrelated Willow mock-flow assertion is excluded from this task by explicit user direction. 5. Manually print the proposal in Safari. Expected: Price breakdown and Client details headings stay on the same page as their grouped content. 6. Run ap doctor and node .agentplane/policy/check-routing.mjs. Expected: repository workflow and policy checks pass."
  Verification: |-
    Command: npm run lint; Result: pass; Evidence: ESLint exited cleanly; Scope: repository source and tests. Command: npm run typecheck; Result: pass; Evidence: tsc --noEmit exited cleanly; Scope: TypeScript source and test types. Command: npm test; Result: pass; Evidence: 13 files and 110 tests passed; Scope: unit and component behavior. Command: npm run build; Result: pass; Evidence: Next.js production build generated all routes; Scope: production compilation. Command: npm run test:e2e -- e2e/proposal-flows.spec.ts --project=chromium --grep opens-a-printable-proposal; Result: pass; Evidence: 1 focused print scenario passed with grouped-section fragmentation assertions; Scope: Chromium print-media layout. Check: manual Safari printing; Result: pass; Evidence: user confirmed the corrected layout prints well and section headings remain with their content; Scope: Safari/WebKit pagination. Command: ap doctor and node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: doctor OK with no warnings or errors and policy routing OK; Scope: repository workflow.

    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-05T12:38:35.122Z — VERIFY — ok

    By: CODER

    Note: Print CSS, focused Chromium coverage, production build, repository checks, and user-confirmed Safari pagination all pass; the task is ready to commit and close.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-05T12:38:34.779Z, excerpt_hash=sha256:e81275080079e7e57276953b024d17555aae61b0d9b8214f887d89a56a60848f

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608051217-XJE3EB/blueprint/resolved-snapshot.json
    - old_digest: 95a4e04827d8717a5970e748270eb12ef365ccaa158c87db086fb13438599526
    - current_digest: 95a4e04827d8717a5970e748270eb12ef365ccaa158c87db086fb13438599526
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608051217-XJE3EB

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane task verify-show 202608051217-XJE3EB
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-05T12:39:24.569Z — VERIFY — ok

    By: CODER

    Note: verified-202608051217-XJE3EB
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-05T12:38:35.197Z, excerpt_hash=sha256:e81275080079e7e57276953b024d17555aae61b0d9b8214f887d89a56a60848f

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608051217-XJE3EB/blueprint/resolved-snapshot.json
    - old_digest: 95a4e04827d8717a5970e748270eb12ef365ccaa158c87db086fb13438599526
    - current_digest: 95a4e04827d8717a5970e748270eb12ef365ccaa158c87db086fb13438599526
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608051217-XJE3EB

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane task complete 202608051217-XJE3EB --result verified-202608051217-XJE3EB --commit 859dddea94ce35569d9901e4db111adce50a4917
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert only the print-style, proposal-markup, and focused Chromium E2E changes introduced by this task; preserve all pre-existing worktree changes and task records."
  Findings: |-
    - Observation: npm run test:e2e -- e2e/proposal-flows.spec.ts --project=chromium passes the print scenario and three other flows, but the Willow mock flow cannot locate the transient Filling in the form status within 8 seconds.
      Impact: The cross-browser print change is validated in Chromium, while task-level verification cannot be recorded as OK under the approved full-file acceptance contract.
      Resolution: Keep the print implementation unchanged and request user direction before either widening scope to the AI flow or approving a scoped verification exception.

    - Observation: The full Chromium E2E file selected the real OpenRouter provider from the ignored local environment, making the unrelated Willow mock-flow assertion nondeterministic.
      Impact: This failure does not exercise proposal printing and must not gate the print compatibility task.
      Resolution: Per explicit user direction, verification is narrowed to the focused Chromium print scenario plus manual Safari confirmation.
id_source: "generated"
---
## Summary

Stabilize the printable commercial proposal so page sizing, margins, color handling, and fragmentation behave predictably in Chromium, Firefox, and Safari/WebKit.

## Scope

Update proposal print CSS and targeted proposal markup only as needed. Preserve the existing screen layout. Keep Playwright configured for Chromium only and do not add browser projects. Do not touch the unrelated active proposal-list changes. Leave this task open after implementation and verification until the user explicitly requests closure.

## Plan

1. Define an explicit A4 print page contract with stable margins, document width, backgrounds, and color adjustment. 2. Replace blanket section fragmentation avoidance with targeted keep-together and legacy fallback rules for bounded proposal blocks. 3. Add focused Chromium print-media assertions without adding Playwright browser projects. 4. Run lint, typecheck, relevant tests, build, Chromium E2E, AgentPlane doctor, and routing validation; record verification but do not finish the task.

## Verify Steps

1. Run npm run lint and npm run typecheck. Expected: both pass. 2. Run npm test. Expected: all unit and component tests pass. 3. Run npm run build. Expected: Next.js production build succeeds. 4. Run npm run test:e2e -- e2e/proposal-flows.spec.ts --project=chromium --grep "opens a printable proposal". Expected: the focused proposal print scenario passes with no horizontal overflow and active keep-together rules; Playwright remains Chromium-only. The unrelated Willow mock-flow assertion is excluded from this task by explicit user direction. 5. Manually print the proposal in Safari. Expected: Price breakdown and Client details headings stay on the same page as their grouped content. 6. Run ap doctor and node .agentplane/policy/check-routing.mjs. Expected: repository workflow and policy checks pass.

## Verification

Command: npm run lint; Result: pass; Evidence: ESLint exited cleanly; Scope: repository source and tests. Command: npm run typecheck; Result: pass; Evidence: tsc --noEmit exited cleanly; Scope: TypeScript source and test types. Command: npm test; Result: pass; Evidence: 13 files and 110 tests passed; Scope: unit and component behavior. Command: npm run build; Result: pass; Evidence: Next.js production build generated all routes; Scope: production compilation. Command: npm run test:e2e -- e2e/proposal-flows.spec.ts --project=chromium --grep opens-a-printable-proposal; Result: pass; Evidence: 1 focused print scenario passed with grouped-section fragmentation assertions; Scope: Chromium print-media layout. Check: manual Safari printing; Result: pass; Evidence: user confirmed the corrected layout prints well and section headings remain with their content; Scope: Safari/WebKit pagination. Command: ap doctor and node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: doctor OK with no warnings or errors and policy routing OK; Scope: repository workflow.

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-05T12:38:35.122Z — VERIFY — ok

By: CODER

Note: Print CSS, focused Chromium coverage, production build, repository checks, and user-confirmed Safari pagination all pass; the task is ready to commit and close.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-05T12:38:34.779Z, excerpt_hash=sha256:e81275080079e7e57276953b024d17555aae61b0d9b8214f887d89a56a60848f

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608051217-XJE3EB/blueprint/resolved-snapshot.json
- old_digest: 95a4e04827d8717a5970e748270eb12ef365ccaa158c87db086fb13438599526
- current_digest: 95a4e04827d8717a5970e748270eb12ef365ccaa158c87db086fb13438599526
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608051217-XJE3EB

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane task verify-show 202608051217-XJE3EB
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-05T12:39:24.569Z — VERIFY — ok

By: CODER

Note: verified-202608051217-XJE3EB
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-05T12:38:35.197Z, excerpt_hash=sha256:e81275080079e7e57276953b024d17555aae61b0d9b8214f887d89a56a60848f

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608051217-XJE3EB/blueprint/resolved-snapshot.json
- old_digest: 95a4e04827d8717a5970e748270eb12ef365ccaa158c87db086fb13438599526
- current_digest: 95a4e04827d8717a5970e748270eb12ef365ccaa158c87db086fb13438599526
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608051217-XJE3EB

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane task complete 202608051217-XJE3EB --result verified-202608051217-XJE3EB --commit 859dddea94ce35569d9901e4db111adce50a4917
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert only the print-style, proposal-markup, and focused Chromium E2E changes introduced by this task; preserve all pre-existing worktree changes and task records.

## Findings

- Observation: npm run test:e2e -- e2e/proposal-flows.spec.ts --project=chromium passes the print scenario and three other flows, but the Willow mock flow cannot locate the transient Filling in the form status within 8 seconds.
  Impact: The cross-browser print change is validated in Chromium, while task-level verification cannot be recorded as OK under the approved full-file acceptance contract.
  Resolution: Keep the print implementation unchanged and request user direction before either widening scope to the AI flow or approving a scoped verification exception.

- Observation: The full Chromium E2E file selected the real OpenRouter provider from the ignored local environment, making the unrelated Willow mock-flow assertion nondeterministic.
  Impact: This failure does not exercise proposal printing and must not gate the print compatibility task.
  Resolution: Per explicit user direction, verification is narrowed to the focused Chromium print scenario plus manual Safari confirmation.
