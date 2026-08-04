---
id: "202608040917-D149KT"
title: "Use a dedicated proposal edit URL"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 12
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "frontend"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-08-04T09:17:59.713Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-04T09:19:01.741Z"
  updated_by: "CODER"
  note: "URL checks, pnpm lint, and pnpm build pass; build output includes /proposals/edit and /proposals/new."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue direct-mode task in current checkout."
events:
  -
    type: "status"
    at: "2026-08-04T09:18:08.067Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue direct-mode task in current checkout."
  -
    type: "verify"
    at: "2026-08-04T09:19:01.741Z"
    author: "CODER"
    state: "ok"
    note: "URL checks, pnpm lint, and pnpm build pass; build output includes /proposals/edit and /proposals/new."
doc_version: 3
doc_updated_at: "2026-08-04T09:19:01.818Z"
doc_updated_by: "CODER"
description: "Move proposal editing from /proposals/new?edit=<id> to /proposals/edit?proposal=<id> while preserving the existing new-proposal route."
sections:
  Summary: "Replace the ambiguous proposal editing URL with a dedicated edit route and explicit proposal query parameter."
  Scope: "Add app/(app)/proposals/edit/page.tsx, update ProposalForm to read proposal for edit mode, and change the proposals list Edit link. Preserve /proposals/new?villa=<id> for creation and preserve unrelated working-tree changes."
  Plan: "1. Add a dedicated /proposals/edit page that renders ProposalForm. 2. Make ProposalForm resolve edit state from the proposal query parameter. 3. Update Edit links to /proposals/edit?proposal=<id>. 4. Run targeted URL checks, lint, and build."
  Verify Steps: "1. `rg -n \"/proposals/new\\\\?edit=|params.get\\\\(\\x27edit\\x27\\\\)\" app components` returns no matches. 2. `rg -n \"/proposals/edit\\\\?proposal=|params.get\\\\(\\x27proposal\\x27\\\\)\" app components` confirms the new link and query parsing. 3. `pnpm lint` passes. 4. `pnpm build` passes."
  Verification: |-
    Command: rg URL-pattern checks. Result: pass. Evidence: no old /proposals/new?edit or params.get("edit") matches; new link and params.get("proposal") found. Scope: app and components routing references. Command: pnpm lint. Result: pass. Evidence: ESLint completed with no findings. Scope: repository source. Command: pnpm build. Result: pass. Evidence: Next.js compiled successfully and emitted both /proposals/edit and /proposals/new routes. Scope: production compilation and route generation.

    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-04T09:19:01.741Z — VERIFY — ok

    By: CODER

    Note: URL checks, pnpm lint, and pnpm build pass; build output includes /proposals/edit and /proposals/new.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-04T09:19:01.344Z, excerpt_hash=sha256:b433c5414684824151c38bea9f66f8ffcaca883c32c799950734270b3142756b

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608040917-D149KT/blueprint/resolved-snapshot.json
    - old_digest: 1e0f5c932fe4ab9afec1c836e4c5202cfb91c95b9110410d20199797a3eb26b5
    - current_digest: 1e0f5c932fe4ab9afec1c836e4c5202cfb91c95b9110410d20199797a3eb26b5
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608040917-D149KT

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane task verify-show 202608040917-D149KT
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Remove the dedicated edit page and restore the old edit query key and link target."
  Findings: "No findings yet."
id_source: "generated"
---
## Summary

Replace the ambiguous proposal editing URL with a dedicated edit route and explicit proposal query parameter.

## Scope

Add app/(app)/proposals/edit/page.tsx, update ProposalForm to read proposal for edit mode, and change the proposals list Edit link. Preserve /proposals/new?villa=<id> for creation and preserve unrelated working-tree changes.

## Plan

1. Add a dedicated /proposals/edit page that renders ProposalForm. 2. Make ProposalForm resolve edit state from the proposal query parameter. 3. Update Edit links to /proposals/edit?proposal=<id>. 4. Run targeted URL checks, lint, and build.

## Verify Steps

1. `rg -n "/proposals/new\\?edit=|params.get\\(\x27edit\x27\\)" app components` returns no matches. 2. `rg -n "/proposals/edit\\?proposal=|params.get\\(\x27proposal\x27\\)" app components` confirms the new link and query parsing. 3. `pnpm lint` passes. 4. `pnpm build` passes.

## Verification

Command: rg URL-pattern checks. Result: pass. Evidence: no old /proposals/new?edit or params.get("edit") matches; new link and params.get("proposal") found. Scope: app and components routing references. Command: pnpm lint. Result: pass. Evidence: ESLint completed with no findings. Scope: repository source. Command: pnpm build. Result: pass. Evidence: Next.js compiled successfully and emitted both /proposals/edit and /proposals/new routes. Scope: production compilation and route generation.

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-04T09:19:01.741Z — VERIFY — ok

By: CODER

Note: URL checks, pnpm lint, and pnpm build pass; build output includes /proposals/edit and /proposals/new.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-04T09:19:01.344Z, excerpt_hash=sha256:b433c5414684824151c38bea9f66f8ffcaca883c32c799950734270b3142756b

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608040917-D149KT/blueprint/resolved-snapshot.json
- old_digest: 1e0f5c932fe4ab9afec1c836e4c5202cfb91c95b9110410d20199797a3eb26b5
- current_digest: 1e0f5c932fe4ab9afec1c836e4c5202cfb91c95b9110410d20199797a3eb26b5
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608040917-D149KT

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane task verify-show 202608040917-D149KT
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Remove the dedicated edit page and restore the old edit query key and link target.

## Findings

No findings yet.
