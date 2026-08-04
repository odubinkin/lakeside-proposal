---
id: "202608041016-6AXKH5"
title: "Validate new proposal form"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 12
origin:
  system: "manual"
depends_on: []
tags:
  - "frontend"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-08-04T10:17:16.459Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-04T10:25:24.728Z"
  updated_by: "CODER"
  note: "verified-202608041016-6AXKH5"
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-08-04T10:25:17.071Z"
  updated_by: "EVALUATOR"
  note: "Proposal form validation meets the approved required-field, contact, save, and navigation behavior."
  evaluated_sha: null
  blueprint_digest: "1d21d26d09bac54024f08ad6124084ea429b7b47ebbeb900f02be0018bdc3717"
  evidence_refs:
    - ".agentplane/tasks/202608041016-6AXKH5/README.md"
    - ".agentplane/tasks/202608041016-6AXKH5/quality/20260804-102517071-recovery-context/quality-report.json"
    - ".agentplane/tasks/202608041016-6AXKH5/quality/20260804-102517071-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202608041016-6AXKH5/quality/20260804-102517071-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202608041016-6AXKH5/blueprint/resolved-snapshot.json"
    - "components/proposal-form.tsx"
    - "npm run lint"
    - "npm run build"
    - "Playwright /proposals/new submission flow"
  findings:
    - "ESLint and production build pass; browser verification covered empty, malformed-contact, and valid email-only submissions without console errors."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue direct-mode task in current checkout."
events:
  -
    type: "status"
    at: "2026-08-04T10:17:28.139Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue direct-mode task in current checkout."
  -
    type: "verify"
    at: "2026-08-04T10:21:34.306Z"
    author: "CODER"
    state: "ok"
    note: "ESLint and Next.js production build passed; Playwright confirmed invalid submissions save without navigation and show required/format errors, while a valid email-only submission opened the saved proposal in a new tab."
  -
    type: "verify"
    at: "2026-08-04T10:22:57.054Z"
    author: "CODER"
    state: "ok"
    note: "verified-202608041016-6AXKH5"
  -
    type: "verify"
    at: "2026-08-04T10:25:24.728Z"
    author: "CODER"
    state: "ok"
    note: "verified-202608041016-6AXKH5"
doc_version: 3
doc_updated_at: "2026-08-04T10:25:24.814Z"
doc_updated_by: "CODER"
description: "Require all /proposals/new fields except comment, require phone or email, show validation errors, save invalid submissions without navigation, and navigate only after valid Generate Proposal submission."
sections:
  Summary: "Validate the /proposals/new form before proposal generation while preserving local save behavior for incomplete drafts."
  Scope: "Modify the proposal form implementation only as needed to add required-field and contact-format validation, accessible field errors, save-before-validation submission behavior, and navigation gating. Comment remains optional. No backend, schema, or unrelated UI changes."
  Plan: "1. Add form-level validation state and reusable validation helpers in components/proposal-form.tsx. 2. Require proposal text, client name, manager name, and at least one valid contact method; validate any provided phone/email and keep comment optional. 3. Save every submit attempt, show field-local errors, and open the generated proposal only when validation passes. 4. Verify with lint, production build, and a browser flow covering invalid and valid submissions."
  Verify Steps: "1. Run npm run lint. Expected: ESLint exits successfully. 2. Run npm run build. Expected: Next.js production build succeeds. 3. Start the local app and use Playwright CLI on /proposals/new: submit an empty form and confirm client name, manager name, proposal text, and contact errors appear; confirm a proposal is saved in localStorage and no proposal view tab opens. 4. Enter malformed phone/email values and confirm format-specific errors appear while navigation remains blocked. 5. Enter all required values with at least one valid contact method, submit, and confirm the proposal remains saved and /proposals/view opens in a new tab."
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-04T10:21:34.306Z — VERIFY — ok

    By: CODER

    Note: ESLint and Next.js production build passed; Playwright confirmed invalid submissions save without navigation and show required/format errors, while a valid email-only submission opened the saved proposal in a new tab.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-04T10:17:28.139Z, excerpt_hash=sha256:8e99ee0305a1ffd0729c71882768efd16147b28ef148977db057171878c59268

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608041016-6AXKH5/blueprint/resolved-snapshot.json
    - old_digest: 1d21d26d09bac54024f08ad6124084ea429b7b47ebbeb900f02be0018bdc3717
    - current_digest: 1d21d26d09bac54024f08ad6124084ea429b7b47ebbeb900f02be0018bdc3717
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608041016-6AXKH5

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane task verify-show 202608041016-6AXKH5
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-04T10:22:57.054Z — VERIFY — ok

    By: CODER

    Note: verified-202608041016-6AXKH5
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-04T10:21:34.393Z, excerpt_hash=sha256:8e99ee0305a1ffd0729c71882768efd16147b28ef148977db057171878c59268

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608041016-6AXKH5/blueprint/resolved-snapshot.json
    - old_digest: 1d21d26d09bac54024f08ad6124084ea429b7b47ebbeb900f02be0018bdc3717
    - current_digest: 1d21d26d09bac54024f08ad6124084ea429b7b47ebbeb900f02be0018bdc3717
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608041016-6AXKH5

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane task complete 202608041016-6AXKH5 --result verified-202608041016-6AXKH5 --commit 804b32c66f289708d770f671a0b4b52c7ecdd500
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-04T10:25:24.728Z — VERIFY — ok

    By: CODER

    Note: verified-202608041016-6AXKH5
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-04T10:22:57.140Z, excerpt_hash=sha256:8e99ee0305a1ffd0729c71882768efd16147b28ef148977db057171878c59268

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608041016-6AXKH5/blueprint/resolved-snapshot.json
    - old_digest: 1d21d26d09bac54024f08ad6124084ea429b7b47ebbeb900f02be0018bdc3717
    - current_digest: 1d21d26d09bac54024f08ad6124084ea429b7b47ebbeb900f02be0018bdc3717
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608041016-6AXKH5

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane task complete 202608041016-6AXKH5 --result verified-202608041016-6AXKH5 --commit 1be51646de648cff96918cc30d86096fb82e8683
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert the task implementation commit to restore the previous submit behavior and remove the added validation UI."
  Findings: ""
id_source: "generated"
---
## Summary

Validate the /proposals/new form before proposal generation while preserving local save behavior for incomplete drafts.

## Scope

Modify the proposal form implementation only as needed to add required-field and contact-format validation, accessible field errors, save-before-validation submission behavior, and navigation gating. Comment remains optional. No backend, schema, or unrelated UI changes.

## Plan

1. Add form-level validation state and reusable validation helpers in components/proposal-form.tsx. 2. Require proposal text, client name, manager name, and at least one valid contact method; validate any provided phone/email and keep comment optional. 3. Save every submit attempt, show field-local errors, and open the generated proposal only when validation passes. 4. Verify with lint, production build, and a browser flow covering invalid and valid submissions.

## Verify Steps

1. Run npm run lint. Expected: ESLint exits successfully. 2. Run npm run build. Expected: Next.js production build succeeds. 3. Start the local app and use Playwright CLI on /proposals/new: submit an empty form and confirm client name, manager name, proposal text, and contact errors appear; confirm a proposal is saved in localStorage and no proposal view tab opens. 4. Enter malformed phone/email values and confirm format-specific errors appear while navigation remains blocked. 5. Enter all required values with at least one valid contact method, submit, and confirm the proposal remains saved and /proposals/view opens in a new tab.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-04T10:21:34.306Z — VERIFY — ok

By: CODER

Note: ESLint and Next.js production build passed; Playwright confirmed invalid submissions save without navigation and show required/format errors, while a valid email-only submission opened the saved proposal in a new tab.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-04T10:17:28.139Z, excerpt_hash=sha256:8e99ee0305a1ffd0729c71882768efd16147b28ef148977db057171878c59268

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608041016-6AXKH5/blueprint/resolved-snapshot.json
- old_digest: 1d21d26d09bac54024f08ad6124084ea429b7b47ebbeb900f02be0018bdc3717
- current_digest: 1d21d26d09bac54024f08ad6124084ea429b7b47ebbeb900f02be0018bdc3717
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608041016-6AXKH5

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane task verify-show 202608041016-6AXKH5
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-04T10:22:57.054Z — VERIFY — ok

By: CODER

Note: verified-202608041016-6AXKH5
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-04T10:21:34.393Z, excerpt_hash=sha256:8e99ee0305a1ffd0729c71882768efd16147b28ef148977db057171878c59268

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608041016-6AXKH5/blueprint/resolved-snapshot.json
- old_digest: 1d21d26d09bac54024f08ad6124084ea429b7b47ebbeb900f02be0018bdc3717
- current_digest: 1d21d26d09bac54024f08ad6124084ea429b7b47ebbeb900f02be0018bdc3717
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608041016-6AXKH5

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane task complete 202608041016-6AXKH5 --result verified-202608041016-6AXKH5 --commit 804b32c66f289708d770f671a0b4b52c7ecdd500
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-04T10:25:24.728Z — VERIFY — ok

By: CODER

Note: verified-202608041016-6AXKH5
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-04T10:22:57.140Z, excerpt_hash=sha256:8e99ee0305a1ffd0729c71882768efd16147b28ef148977db057171878c59268

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608041016-6AXKH5/blueprint/resolved-snapshot.json
- old_digest: 1d21d26d09bac54024f08ad6124084ea429b7b47ebbeb900f02be0018bdc3717
- current_digest: 1d21d26d09bac54024f08ad6124084ea429b7b47ebbeb900f02be0018bdc3717
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608041016-6AXKH5

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane task complete 202608041016-6AXKH5 --result verified-202608041016-6AXKH5 --commit 1be51646de648cff96918cc30d86096fb82e8683
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the task implementation commit to restore the previous submit behavior and remove the added validation UI.

## Findings
