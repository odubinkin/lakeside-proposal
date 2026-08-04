---
id: "202608040934-8X0SES"
title: "Store villa catalog in JSON"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 11
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-08-04T09:34:55.547Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-04T09:37:05.776Z"
  updated_by: "CODER"
  note: "verified-202608040934-8X0SES"
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-08-04T09:37:00.097Z"
  updated_by: "EVALUATOR"
  note: "Static JSON catalog preserves the typed data API and passes all declared checks."
  evaluated_sha: "5470dc83bfa732668846457423529805d676be63"
  blueprint_digest: "5ddafc6fe4ba8661f12bd4dd45a4e7a673be8056ed9cd101734b466904727254"
  evidence_refs:
    - ".agentplane/tasks/202608040934-8X0SES/README.md"
    - ".agentplane/tasks/202608040934-8X0SES/quality/20260804-093700097-recovery-context/quality-report.json"
    - ".agentplane/tasks/202608040934-8X0SES/quality/20260804-093700097-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202608040934-8X0SES/quality/20260804-093700097-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202608040934-8X0SES/blueprint/resolved-snapshot.json"
    - "commit 5470dc8: data/villas.json and lib/data.ts"
    - "npm run lint; npm run build; ./node_modules/.bin/tsc --noEmit; git diff --check"
  findings:
    - "All six villa records moved intact to one JSON source; lib/data.ts now performs a build-time import typed as Villa[]."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue direct-mode task in current checkout."
events:
  -
    type: "status"
    at: "2026-08-04T09:35:01.264Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue direct-mode task in current checkout."
  -
    type: "verify"
    at: "2026-08-04T09:36:25.168Z"
    author: "CODER"
    state: "ok"
    note: "Command: npm run lint. Result: pass. Evidence: ESLint exited 0 with no findings. Scope: repository lint. Command: npm run build. Result: pass. Evidence: Next.js compiled successfully and generated 8 static pages including /villas. Scope: production bundle with static JSON import. Command: ./node_modules/.bin/tsc --noEmit. Result: pass. Evidence: TypeScript exited 0. Scope: JSON assignment to Villa[] and all TypeScript sources. Command: git diff --check plus JSON validation. Result: pass. Evidence: no whitespace errors; 6 unique villa records contain all required fields. Scope: data/villas.json and lib/data.ts."
  -
    type: "verify"
    at: "2026-08-04T09:37:05.776Z"
    author: "CODER"
    state: "ok"
    note: "verified-202608040934-8X0SES"
doc_version: 3
doc_updated_at: "2026-08-04T09:37:05.855Z"
doc_updated_by: "CODER"
description: "Move the villa catalog from TypeScript into a single statically imported JSON file while preserving the existing typed data API."
sections:
  Summary: "Store every villa catalog record in one repository JSON file and expose it through the existing typed data module without changing consumers."
  Scope: |-
    - In scope: add `data/villas.json`; move all six villa records from `lib/data.ts`; statically import and type the JSON in `lib/data.ts`; preserve existing exports and UI behavior.
    - Out of scope: add-ons, proposals, runtime APIs, remote storage, component redesigns, and unrelated working-tree changes.
  Plan: |-
    1. Add `data/villas.json` containing the complete current villa catalog.
    2. Replace the inline villa array in `lib/data.ts` with a statically imported, `Villa`-typed JSON value while keeping `villas` and `getVilla` compatible.
    3. Run lint and production build, then verify the final diff contains only approved implementation and task artifacts.
  Verify Steps: |-
    1. Run `npm run lint`. Expected: ESLint exits successfully.
    2. Run `npm run build`. Expected: Next.js production build and TypeScript validation succeed with the static JSON import.
    3. Run `git diff --check`. Expected: no whitespace errors in task changes.
    4. Inspect `data/villas.json` and `lib/data.ts`. Expected: all six villa records exist only in the JSON catalog, `villas` remains typed as `Villa[]`, and consumers require no changes.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-04T09:36:25.168Z — VERIFY — ok

    By: CODER

    Note: Command: npm run lint. Result: pass. Evidence: ESLint exited 0 with no findings. Scope: repository lint. Command: npm run build. Result: pass. Evidence: Next.js compiled successfully and generated 8 static pages including /villas. Scope: production bundle with static JSON import. Command: ./node_modules/.bin/tsc --noEmit. Result: pass. Evidence: TypeScript exited 0. Scope: JSON assignment to Villa[] and all TypeScript sources. Command: git diff --check plus JSON validation. Result: pass. Evidence: no whitespace errors; 6 unique villa records contain all required fields. Scope: data/villas.json and lib/data.ts.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-04T09:35:01.264Z, excerpt_hash=sha256:026e8562eafb9a3246658663076f026a2a650e31d93d1c1ac7d90bd10d815dd1

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608040934-8X0SES/blueprint/resolved-snapshot.json
    - old_digest: 5ddafc6fe4ba8661f12bd4dd45a4e7a673be8056ed9cd101734b466904727254
    - current_digest: 5ddafc6fe4ba8661f12bd4dd45a4e7a673be8056ed9cd101734b466904727254
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608040934-8X0SES

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane task verify-show 202608040934-8X0SES
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-04T09:37:05.776Z — VERIFY — ok

    By: CODER

    Note: verified-202608040934-8X0SES
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-04T09:36:25.242Z, excerpt_hash=sha256:026e8562eafb9a3246658663076f026a2a650e31d93d1c1ac7d90bd10d815dd1

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608040934-8X0SES/blueprint/resolved-snapshot.json
    - old_digest: 5ddafc6fe4ba8661f12bd4dd45a4e7a673be8056ed9cd101734b466904727254
    - current_digest: 5ddafc6fe4ba8661f12bd4dd45a4e7a673be8056ed9cd101734b466904727254
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608040934-8X0SES

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane task complete 202608040934-8X0SES --result verified-202608040934-8X0SES --commit 5470dc83bfa732668846457423529805d676be63
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert the task commit to restore the inline `villas` array in `lib/data.ts` and remove `data/villas.json`, then rerun lint and build."
  Findings: ""
id_source: "generated"
---
## Summary

Store every villa catalog record in one repository JSON file and expose it through the existing typed data module without changing consumers.

## Scope

- In scope: add `data/villas.json`; move all six villa records from `lib/data.ts`; statically import and type the JSON in `lib/data.ts`; preserve existing exports and UI behavior.
- Out of scope: add-ons, proposals, runtime APIs, remote storage, component redesigns, and unrelated working-tree changes.

## Plan

1. Add `data/villas.json` containing the complete current villa catalog.
2. Replace the inline villa array in `lib/data.ts` with a statically imported, `Villa`-typed JSON value while keeping `villas` and `getVilla` compatible.
3. Run lint and production build, then verify the final diff contains only approved implementation and task artifacts.

## Verify Steps

1. Run `npm run lint`. Expected: ESLint exits successfully.
2. Run `npm run build`. Expected: Next.js production build and TypeScript validation succeed with the static JSON import.
3. Run `git diff --check`. Expected: no whitespace errors in task changes.
4. Inspect `data/villas.json` and `lib/data.ts`. Expected: all six villa records exist only in the JSON catalog, `villas` remains typed as `Villa[]`, and consumers require no changes.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-04T09:36:25.168Z — VERIFY — ok

By: CODER

Note: Command: npm run lint. Result: pass. Evidence: ESLint exited 0 with no findings. Scope: repository lint. Command: npm run build. Result: pass. Evidence: Next.js compiled successfully and generated 8 static pages including /villas. Scope: production bundle with static JSON import. Command: ./node_modules/.bin/tsc --noEmit. Result: pass. Evidence: TypeScript exited 0. Scope: JSON assignment to Villa[] and all TypeScript sources. Command: git diff --check plus JSON validation. Result: pass. Evidence: no whitespace errors; 6 unique villa records contain all required fields. Scope: data/villas.json and lib/data.ts.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-04T09:35:01.264Z, excerpt_hash=sha256:026e8562eafb9a3246658663076f026a2a650e31d93d1c1ac7d90bd10d815dd1

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608040934-8X0SES/blueprint/resolved-snapshot.json
- old_digest: 5ddafc6fe4ba8661f12bd4dd45a4e7a673be8056ed9cd101734b466904727254
- current_digest: 5ddafc6fe4ba8661f12bd4dd45a4e7a673be8056ed9cd101734b466904727254
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608040934-8X0SES

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane task verify-show 202608040934-8X0SES
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-04T09:37:05.776Z — VERIFY — ok

By: CODER

Note: verified-202608040934-8X0SES
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-04T09:36:25.242Z, excerpt_hash=sha256:026e8562eafb9a3246658663076f026a2a650e31d93d1c1ac7d90bd10d815dd1

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608040934-8X0SES/blueprint/resolved-snapshot.json
- old_digest: 5ddafc6fe4ba8661f12bd4dd45a4e7a673be8056ed9cd101734b466904727254
- current_digest: 5ddafc6fe4ba8661f12bd4dd45a4e7a673be8056ed9cd101734b466904727254
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608040934-8X0SES

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane task complete 202608040934-8X0SES --result verified-202608040934-8X0SES --commit 5470dc83bfa732668846457423529805d676be63
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the task commit to restore the inline `villas` array in `lib/data.ts` and remove `data/villas.json`, then rerun lint and build.

## Findings
