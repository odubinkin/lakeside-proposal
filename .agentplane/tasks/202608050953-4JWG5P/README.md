---
id: "202608050953-4JWG5P"
title: "Preserve saved proposal URL and show proposal ID"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "frontend"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-08-05T09:53:25.311Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-05T10:06:23.400Z"
  updated_by: "CODER"
  note: |-
    Command: npm test -- --run tests/components/proposal-form.test.tsx
    Result: pass (9/9).
    Evidence: first save replaces the URL once, renders the assigned ID badge, and later saves preserve identity.
    Scope: proposal editor component behavior.

    Command: npx playwright test e2e/proposal-flows.spec.ts --config playwright.task.config.ts (temporary isolated mock-mode server)
    Result: pass (5/5).
    Evidence: client-side URL change preserved the document, refresh restored the saved proposal, responsive badge was visible, and Willow transcript coverage passed.
    Scope: full proposal browser flows.

    Command: npm run lint && npm run typecheck && npm test -- --run && npm run build
    Result: pass (lint clean, typecheck clean, 103/103 tests, production build successful).
    Scope: repository static checks, unit suite, and production compilation.

    Command: node .agentplane/policy/check-routing.mjs
    Result: pass (policy routing OK).
    Scope: repository workflow policy.
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implement client-side first-save URL replacement and responsive proposal ID badge with focused component and end-to-end coverage."
events:
  -
    type: "status"
    at: "2026-08-05T09:53:32.698Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement client-side first-save URL replacement and responsive proposal ID badge with focused component and end-to-end coverage."
  -
    type: "verify"
    at: "2026-08-05T10:06:23.400Z"
    author: "CODER"
    state: "ok"
    note: |-
      Command: npm test -- --run tests/components/proposal-form.test.tsx
      Result: pass (9/9).
      Evidence: first save replaces the URL once, renders the assigned ID badge, and later saves preserve identity.
      Scope: proposal editor component behavior.

      Command: npx playwright test e2e/proposal-flows.spec.ts --config playwright.task.config.ts (temporary isolated mock-mode server)
      Result: pass (5/5).
      Evidence: client-side URL change preserved the document, refresh restored the saved proposal, responsive badge was visible, and Willow transcript coverage passed.
      Scope: full proposal browser flows.

      Command: npm run lint && npm run typecheck && npm test -- --run && npm run build
      Result: pass (lint clean, typecheck clean, 103/103 tests, production build successful).
      Scope: repository static checks, unit suite, and production compilation.

      Command: node .agentplane/policy/check-routing.mjs
      Result: pass (policy routing OK).
      Scope: repository workflow policy.
doc_version: 3
doc_updated_at: "2026-08-05T10:06:23.533Z"
doc_updated_by: "CODER"
description: "After the first successful save on /proposals/new, replace the browser URL with /proposals/edit?id=<proposal-id> without a full page reload, and show the assigned proposal ID as a responsive heading badge."
sections:
  Summary: |-
    Preserve saved proposal URL and show proposal ID

    After the first successful save on /proposals/new, replace the browser URL with /proposals/edit?id=<proposal-id> without a full page reload, and show the assigned proposal ID as a responsive heading badge.
  Scope: |-
    - In scope: After the first successful save on /proposals/new, replace the browser URL with /proposals/edit?id=<proposal-id> without a full page reload, and show the assigned proposal ID as a responsive heading badge.
    - Out of scope: unrelated refactors not required for "Preserve saved proposal URL and show proposal ID".
  Plan: |-
    1. Update the proposal editor so the first successful save replaces /proposals/new with /proposals/edit?id=<proposal-id> through client-side routing, preserving scroll and avoiding a document reload.
    2. Render the assigned proposal ID as a responsive badge in the editor heading: right-aligned on the same row when space permits and left-aligned after wrapping.
    3. Add focused component and end-to-end coverage for the first-save URL transition, stable proposal identity, refresh-safe destination, and conditional ID badge.
    4. Run targeted tests, lint, typecheck, build, and routing policy validation; record evidence and finish the task.
  Verify Steps: |-
    1. Run `npm test -- --run tests/components/proposal-form.test.tsx`. Expected: component tests prove the ID badge is hidden before save, appears after the first save, client-side URL replacement targets `/proposals/edit?id=<encoded-id>`, and later saves keep the same proposal identity.
    2. Run `npm run test:e2e -- e2e/proposal-flows.spec.ts`. Expected: proposal creation reaches the edit URL without a document reload, shows the proposal ID badge, and remains editable after reload.
    3. Run `npm run lint && npm run typecheck && npm run build`. Expected: lint, TypeScript, and production build all pass.
    4. Run `node .agentplane/policy/check-routing.mjs`. Expected: repository routing policy validation passes.
    5. Run `git status --short --untracked-files=all`. Expected: only intentional task and implementation artifacts remain.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-05T10:06:23.400Z — VERIFY — ok

    By: CODER

    Note: Command: npm test -- --run tests/components/proposal-form.test.tsx
    Result: pass (9/9).
    Evidence: first save replaces the URL once, renders the assigned ID badge, and later saves preserve identity.
    Scope: proposal editor component behavior.

    Command: npx playwright test e2e/proposal-flows.spec.ts --config playwright.task.config.ts (temporary isolated mock-mode server)
    Result: pass (5/5).
    Evidence: client-side URL change preserved the document, refresh restored the saved proposal, responsive badge was visible, and Willow transcript coverage passed.
    Scope: full proposal browser flows.

    Command: npm run lint && npm run typecheck && npm test -- --run && npm run build
    Result: pass (lint clean, typecheck clean, 103/103 tests, production build successful).
    Scope: repository static checks, unit suite, and production compilation.

    Command: node .agentplane/policy/check-routing.mjs
    Result: pass (policy routing OK).
    Scope: repository workflow policy.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-05T09:53:32.698Z, excerpt_hash=sha256:84d859a9542f093252645e7a3438c12033e880b3d16ab2ab0ae60740e731962c

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608050953-4JWG5P/blueprint/resolved-snapshot.json
    - old_digest: 7c25c76d26fdbb1e72959447caf14ca61a9954eaad6a8c6a484baccfaa64c656
    - current_digest: 7c25c76d26fdbb1e72959447caf14ca61a9954eaad6a8c6a484baccfaa64c656
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608050953-4JWG5P

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane task verify-show 202608050953-4JWG5P
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Preserve saved proposal URL and show proposal ID

After the first successful save on /proposals/new, replace the browser URL with /proposals/edit?id=<proposal-id> without a full page reload, and show the assigned proposal ID as a responsive heading badge.

## Scope

- In scope: After the first successful save on /proposals/new, replace the browser URL with /proposals/edit?id=<proposal-id> without a full page reload, and show the assigned proposal ID as a responsive heading badge.
- Out of scope: unrelated refactors not required for "Preserve saved proposal URL and show proposal ID".

## Plan

1. Update the proposal editor so the first successful save replaces /proposals/new with /proposals/edit?id=<proposal-id> through client-side routing, preserving scroll and avoiding a document reload.
2. Render the assigned proposal ID as a responsive badge in the editor heading: right-aligned on the same row when space permits and left-aligned after wrapping.
3. Add focused component and end-to-end coverage for the first-save URL transition, stable proposal identity, refresh-safe destination, and conditional ID badge.
4. Run targeted tests, lint, typecheck, build, and routing policy validation; record evidence and finish the task.

## Verify Steps

1. Run `npm test -- --run tests/components/proposal-form.test.tsx`. Expected: component tests prove the ID badge is hidden before save, appears after the first save, client-side URL replacement targets `/proposals/edit?id=<encoded-id>`, and later saves keep the same proposal identity.
2. Run `npm run test:e2e -- e2e/proposal-flows.spec.ts`. Expected: proposal creation reaches the edit URL without a document reload, shows the proposal ID badge, and remains editable after reload.
3. Run `npm run lint && npm run typecheck && npm run build`. Expected: lint, TypeScript, and production build all pass.
4. Run `node .agentplane/policy/check-routing.mjs`. Expected: repository routing policy validation passes.
5. Run `git status --short --untracked-files=all`. Expected: only intentional task and implementation artifacts remain.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-05T10:06:23.400Z — VERIFY — ok

By: CODER

Note: Command: npm test -- --run tests/components/proposal-form.test.tsx
Result: pass (9/9).
Evidence: first save replaces the URL once, renders the assigned ID badge, and later saves preserve identity.
Scope: proposal editor component behavior.

Command: npx playwright test e2e/proposal-flows.spec.ts --config playwright.task.config.ts (temporary isolated mock-mode server)
Result: pass (5/5).
Evidence: client-side URL change preserved the document, refresh restored the saved proposal, responsive badge was visible, and Willow transcript coverage passed.
Scope: full proposal browser flows.

Command: npm run lint && npm run typecheck && npm test -- --run && npm run build
Result: pass (lint clean, typecheck clean, 103/103 tests, production build successful).
Scope: repository static checks, unit suite, and production compilation.

Command: node .agentplane/policy/check-routing.mjs
Result: pass (policy routing OK).
Scope: repository workflow policy.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-05T09:53:32.698Z, excerpt_hash=sha256:84d859a9542f093252645e7a3438c12033e880b3d16ab2ab0ae60740e731962c

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608050953-4JWG5P/blueprint/resolved-snapshot.json
- old_digest: 7c25c76d26fdbb1e72959447caf14ca61a9954eaad6a8c6a484baccfaa64c656
- current_digest: 7c25c76d26fdbb1e72959447caf14ca61a9954eaad6a8c6a484baccfaa64c656
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608050953-4JWG5P

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane task verify-show 202608050953-4JWG5P
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
