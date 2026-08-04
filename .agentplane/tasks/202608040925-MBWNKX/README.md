---
id: "202608040925-MBWNKX"
title: "Unify proposal view and edit URLs"
status: "DOING"
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
  updated_at: "2026-08-04T09:26:07.413Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-04T09:26:54.084Z"
  updated_by: "CODER"
  note: "Route reference checks, pnpm lint, and pnpm build pass; production routes are unified under /proposals and edit uses id."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-08-04T09:27:07.546Z"
  updated_by: "EVALUATOR"
  note: "Proposal routes are consistently grouped under /proposals and use id for record lookup."
  evaluated_sha: "f2073087cef0915dcdeff7eac99a156ff425f5d3"
  blueprint_digest: "d9273e9f908fe9e8a868ef46dd114055fd8e460a73d7d0fcdff80dbf4d660046"
  evidence_refs:
    - ".agentplane/tasks/202608040925-MBWNKX/README.md"
    - ".agentplane/tasks/202608040925-MBWNKX/quality/20260804-092707546-recovery-context/quality-report.json"
    - ".agentplane/tasks/202608040925-MBWNKX/quality/20260804-092707546-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202608040925-MBWNKX/quality/20260804-092707546-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202608040925-MBWNKX/blueprint/resolved-snapshot.json"
    - "pnpm lint"
    - "pnpm build"
    - "node .agentplane/policy/check-routing.mjs"
  findings:
    - "The standalone view moved to /proposals/view, old route references were removed, edit now uses id, and the production build emitted the expected route set."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue direct-mode task in current checkout."
events:
  -
    type: "status"
    at: "2026-08-04T09:26:15.060Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue direct-mode task in current checkout."
  -
    type: "verify"
    at: "2026-08-04T09:26:54.084Z"
    author: "CODER"
    state: "ok"
    note: "Route reference checks, pnpm lint, and pnpm build pass; production routes are unified under /proposals and edit uses id."
doc_version: 3
doc_updated_at: "2026-08-04T09:26:54.164Z"
doc_updated_by: "CODER"
description: "Move proposal viewing to /proposals/view?id=<id> and use the id query parameter for /proposals/edit while preserving the standalone printable view layout."
sections:
  Summary: "Unify proposal routes under /proposals and use id as the record identifier query key for both view and edit."
  Scope: "Move the standalone printable view page from app/proposal/view to app/proposals/view, update generated and list view URLs, and change the edit URL/query parser from proposal to id. Remove the old view route without a redirect."
  Plan: "1. Move the standalone proposal view page to /proposals/view. 2. Update all view links and generated view URLs. 3. Change /proposals/edit to use id and update its query parsing. 4. Run route-reference checks, lint, and build."
  Verify Steps: "1. rg -n -F '/proposal/view' app components returns no matches. 2. rg -n -F '/proposals/view' app components confirms both view URL producers. 3. rg -n -F '/proposals/edit?id=' components confirms the edit link. 4. rg -n -F \"params.get('id')\" components/proposal-form.tsx confirms edit query parsing, and rg -n -F \"params.get('proposal')\" components/proposal-form.tsx returns no matches. 5. pnpm lint passes. 6. pnpm build passes and emits /proposals/view, /proposals/edit, and /proposals routes without /proposal/view."
  Verification: |-
    Command: route-reference rg checks. Result: pass. Evidence: no /proposal/view or params.get("proposal") matches; /proposals/view producers, /proposals/edit?id link, and params.get("id") parser found. Scope: app and components routing references. Command: pnpm lint. Result: pass. Evidence: ESLint completed with no findings. Scope: repository source. Command: pnpm build. Result: pass. Evidence: Next.js emitted /proposals, /proposals/edit, /proposals/new, and /proposals/view, with no /proposal/view route. Scope: production compilation and route generation.

    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-04T09:26:54.084Z — VERIFY — ok

    By: CODER

    Note: Route reference checks, pnpm lint, and pnpm build pass; production routes are unified under /proposals and edit uses id.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-04T09:26:53.708Z, excerpt_hash=sha256:adbc51b92f72b21a9f6ed8ca63d79acfbbb7c1b462c3d77e4ec646887b961ed8

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608040925-MBWNKX/blueprint/resolved-snapshot.json
    - old_digest: d9273e9f908fe9e8a868ef46dd114055fd8e460a73d7d0fcdff80dbf4d660046
    - current_digest: d9273e9f908fe9e8a868ef46dd114055fd8e460a73d7d0fcdff80dbf4d660046
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608040925-MBWNKX

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane task verify-show 202608040925-MBWNKX
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Restore app/proposal/view/page.tsx, restore /proposal/view URL producers, and restore proposal as the edit query key."
  Findings: "No findings yet."
id_source: "generated"
---
## Summary

Unify proposal routes under /proposals and use id as the record identifier query key for both view and edit.

## Scope

Move the standalone printable view page from app/proposal/view to app/proposals/view, update generated and list view URLs, and change the edit URL/query parser from proposal to id. Remove the old view route without a redirect.

## Plan

1. Move the standalone proposal view page to /proposals/view. 2. Update all view links and generated view URLs. 3. Change /proposals/edit to use id and update its query parsing. 4. Run route-reference checks, lint, and build.

## Verify Steps

1. rg -n -F '/proposal/view' app components returns no matches. 2. rg -n -F '/proposals/view' app components confirms both view URL producers. 3. rg -n -F '/proposals/edit?id=' components confirms the edit link. 4. rg -n -F "params.get('id')" components/proposal-form.tsx confirms edit query parsing, and rg -n -F "params.get('proposal')" components/proposal-form.tsx returns no matches. 5. pnpm lint passes. 6. pnpm build passes and emits /proposals/view, /proposals/edit, and /proposals routes without /proposal/view.

## Verification

Command: route-reference rg checks. Result: pass. Evidence: no /proposal/view or params.get("proposal") matches; /proposals/view producers, /proposals/edit?id link, and params.get("id") parser found. Scope: app and components routing references. Command: pnpm lint. Result: pass. Evidence: ESLint completed with no findings. Scope: repository source. Command: pnpm build. Result: pass. Evidence: Next.js emitted /proposals, /proposals/edit, /proposals/new, and /proposals/view, with no /proposal/view route. Scope: production compilation and route generation.

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-04T09:26:54.084Z — VERIFY — ok

By: CODER

Note: Route reference checks, pnpm lint, and pnpm build pass; production routes are unified under /proposals and edit uses id.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-04T09:26:53.708Z, excerpt_hash=sha256:adbc51b92f72b21a9f6ed8ca63d79acfbbb7c1b462c3d77e4ec646887b961ed8

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608040925-MBWNKX/blueprint/resolved-snapshot.json
- old_digest: d9273e9f908fe9e8a868ef46dd114055fd8e460a73d7d0fcdff80dbf4d660046
- current_digest: d9273e9f908fe9e8a868ef46dd114055fd8e460a73d7d0fcdff80dbf4d660046
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608040925-MBWNKX

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane task verify-show 202608040925-MBWNKX
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Restore app/proposal/view/page.tsx, restore /proposal/view URL producers, and restore proposal as the edit query key.

## Findings

No findings yet.
