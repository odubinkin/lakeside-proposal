---
id: "202608041033-AV1SQJ"
title: "Reuse created proposal on repeated generation"
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
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-08-04T10:34:11.471Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-04T10:37:07.614Z"
  updated_by: "CODER"
  note: "verified-202608041033-AV1SQJ"
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-08-04T10:36:57.437Z"
  updated_by: "EVALUATOR"
  note: "The scoped form change satisfies the approved behavior and all declared checks pass."
  evaluated_sha: "00ea05acbc26ea68f38cf558b9234cf034d78b46"
  blueprint_digest: "28d32703f88ddca14847a8fbc0cf98b31be323f47d9facd76a9e1056790cc80e"
  evidence_refs:
    - ".agentplane/tasks/202608041033-AV1SQJ/README.md"
    - ".agentplane/tasks/202608041033-AV1SQJ/quality/20260804-103657437-recovery-context/quality-report.json"
    - ".agentplane/tasks/202608041033-AV1SQJ/quality/20260804-103657437-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202608041033-AV1SQJ/quality/20260804-103657437-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202608041033-AV1SQJ/blueprint/resolved-snapshot.json"
    - "npm run lint"
    - "npx tsc --noEmit"
    - "npm run build"
    - "git diff --check"
    - "ap doctor"
    - "node .agentplane/policy/check-routing.mjs"
  findings:
    - "Create mode now caches the first saved proposal ID, reuses it on later submissions, guards in-flight re-entry, and validates before persistence."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue direct-mode task in current checkout."
events:
  -
    type: "status"
    at: "2026-08-04T10:34:22.465Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue direct-mode task in current checkout."
  -
    type: "verify"
    at: "2026-08-04T10:35:35.622Z"
    author: "CODER"
    state: "ok"
    note: "Command: npm run lint; Result: pass; Evidence: ESLint exited 0 with no errors; Scope: repository lint. Command: npx tsc --noEmit; Result: pass; Evidence: TypeScript exited 0 with no diagnostics; Scope: project type safety. Command: npm run build; Result: pass; Evidence: Next.js production build compiled and generated 9 static pages; Scope: production compilation. Command: git diff --check and scoped diff inspection; Result: pass; Evidence: no whitespace errors, first create stores saved.id and subsequent submissions reuse it with an in-flight guard; Scope: components/proposal-form.tsx."
  -
    type: "verify"
    at: "2026-08-04T10:35:54.645Z"
    author: "CODER"
    state: "ok"
    note: "verified-202608041033-AV1SQJ"
  -
    type: "verify"
    at: "2026-08-04T10:37:07.614Z"
    author: "CODER"
    state: "ok"
    note: "verified-202608041033-AV1SQJ"
doc_version: 3
doc_updated_at: "2026-08-04T10:37:07.694Z"
doc_updated_by: "CODER"
description: "Remember the proposal ID after the first successful save in create mode so subsequent Generate Proposal submissions update the same proposal instead of creating duplicates."
sections:
  Summary: |-
    Reuse created proposal on repeated generation

    Remember the proposal ID after the first successful save in create mode so subsequent Generate Proposal submissions update the same proposal instead of creating duplicates.
  Scope: |-
    - In scope: update components/proposal-form.tsx so create mode remembers the first saved proposal ID and reuses it for subsequent Generate Proposal submissions; guard against duplicate in-flight submissions.
    - Out of scope: proposal storage schema changes, routing changes, and unrelated UI refactors.
  Plan: |-
    1. Add form-local proposal ID tracking initialized from the edit route ID.
    2. After the first successful create, store the returned proposal ID and pass it to later saveProposal calls so they update the same record.
    3. Add a submission guard and disable the Generate Proposal button while saving.
    4. Run lint, TypeScript, production build, and diff checks; record verification evidence.
  Verify Steps: |-
    1. Run `npm run lint`. Expected: ESLint exits successfully with no errors.
    2. Run `npx tsc --noEmit`. Expected: TypeScript exits successfully with no diagnostics.
    3. Run `npm run build`. Expected: Next.js production build completes successfully.
    4. Run `git diff --check` and inspect the scoped diff. Expected: no whitespace errors; create mode saves without an ID only once, then reuses the returned ID, and the submit control prevents an in-flight duplicate submission.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-04T10:35:35.622Z — VERIFY — ok

    By: CODER

    Note: Command: npm run lint; Result: pass; Evidence: ESLint exited 0 with no errors; Scope: repository lint. Command: npx tsc --noEmit; Result: pass; Evidence: TypeScript exited 0 with no diagnostics; Scope: project type safety. Command: npm run build; Result: pass; Evidence: Next.js production build compiled and generated 9 static pages; Scope: production compilation. Command: git diff --check and scoped diff inspection; Result: pass; Evidence: no whitespace errors, first create stores saved.id and subsequent submissions reuse it with an in-flight guard; Scope: components/proposal-form.tsx.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-04T10:34:22.465Z, excerpt_hash=sha256:49a4cb8e70aa4dda0f9f1f0e8b155da2b0ad3053491ac1db4bc49955f1eb01b2

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608041033-AV1SQJ/blueprint/resolved-snapshot.json
    - old_digest: 28d32703f88ddca14847a8fbc0cf98b31be323f47d9facd76a9e1056790cc80e
    - current_digest: 28d32703f88ddca14847a8fbc0cf98b31be323f47d9facd76a9e1056790cc80e
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608041033-AV1SQJ

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane task verify-show 202608041033-AV1SQJ
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-04T10:35:54.645Z — VERIFY — ok

    By: CODER

    Note: verified-202608041033-AV1SQJ
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-04T10:35:35.702Z, excerpt_hash=sha256:49a4cb8e70aa4dda0f9f1f0e8b155da2b0ad3053491ac1db4bc49955f1eb01b2

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608041033-AV1SQJ/blueprint/resolved-snapshot.json
    - old_digest: 28d32703f88ddca14847a8fbc0cf98b31be323f47d9facd76a9e1056790cc80e
    - current_digest: 28d32703f88ddca14847a8fbc0cf98b31be323f47d9facd76a9e1056790cc80e
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608041033-AV1SQJ

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane task complete 202608041033-AV1SQJ --result verified-202608041033-AV1SQJ --commit 0de1a5e6995bb06deb940138a0b49370150a98c3
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-04T10:37:07.614Z — VERIFY — ok

    By: CODER

    Note: verified-202608041033-AV1SQJ
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-04T10:35:54.724Z, excerpt_hash=sha256:49a4cb8e70aa4dda0f9f1f0e8b155da2b0ad3053491ac1db4bc49955f1eb01b2

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608041033-AV1SQJ/blueprint/resolved-snapshot.json
    - old_digest: 28d32703f88ddca14847a8fbc0cf98b31be323f47d9facd76a9e1056790cc80e
    - current_digest: 28d32703f88ddca14847a8fbc0cf98b31be323f47d9facd76a9e1056790cc80e
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608041033-AV1SQJ

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane task complete 202608041033-AV1SQJ --result verified-202608041033-AV1SQJ --commit 00ea05acbc26ea68f38cf558b9234cf034d78b46
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert the task implementation commit affecting components/proposal-form.tsx, then rerun npm run lint and npx tsc --noEmit."
  Findings: ""
id_source: "generated"
---
## Summary

Reuse created proposal on repeated generation

Remember the proposal ID after the first successful save in create mode so subsequent Generate Proposal submissions update the same proposal instead of creating duplicates.

## Scope

- In scope: update components/proposal-form.tsx so create mode remembers the first saved proposal ID and reuses it for subsequent Generate Proposal submissions; guard against duplicate in-flight submissions.
- Out of scope: proposal storage schema changes, routing changes, and unrelated UI refactors.

## Plan

1. Add form-local proposal ID tracking initialized from the edit route ID.
2. After the first successful create, store the returned proposal ID and pass it to later saveProposal calls so they update the same record.
3. Add a submission guard and disable the Generate Proposal button while saving.
4. Run lint, TypeScript, production build, and diff checks; record verification evidence.

## Verify Steps

1. Run `npm run lint`. Expected: ESLint exits successfully with no errors.
2. Run `npx tsc --noEmit`. Expected: TypeScript exits successfully with no diagnostics.
3. Run `npm run build`. Expected: Next.js production build completes successfully.
4. Run `git diff --check` and inspect the scoped diff. Expected: no whitespace errors; create mode saves without an ID only once, then reuses the returned ID, and the submit control prevents an in-flight duplicate submission.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-04T10:35:35.622Z — VERIFY — ok

By: CODER

Note: Command: npm run lint; Result: pass; Evidence: ESLint exited 0 with no errors; Scope: repository lint. Command: npx tsc --noEmit; Result: pass; Evidence: TypeScript exited 0 with no diagnostics; Scope: project type safety. Command: npm run build; Result: pass; Evidence: Next.js production build compiled and generated 9 static pages; Scope: production compilation. Command: git diff --check and scoped diff inspection; Result: pass; Evidence: no whitespace errors, first create stores saved.id and subsequent submissions reuse it with an in-flight guard; Scope: components/proposal-form.tsx.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-04T10:34:22.465Z, excerpt_hash=sha256:49a4cb8e70aa4dda0f9f1f0e8b155da2b0ad3053491ac1db4bc49955f1eb01b2

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608041033-AV1SQJ/blueprint/resolved-snapshot.json
- old_digest: 28d32703f88ddca14847a8fbc0cf98b31be323f47d9facd76a9e1056790cc80e
- current_digest: 28d32703f88ddca14847a8fbc0cf98b31be323f47d9facd76a9e1056790cc80e
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608041033-AV1SQJ

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane task verify-show 202608041033-AV1SQJ
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-04T10:35:54.645Z — VERIFY — ok

By: CODER

Note: verified-202608041033-AV1SQJ
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-04T10:35:35.702Z, excerpt_hash=sha256:49a4cb8e70aa4dda0f9f1f0e8b155da2b0ad3053491ac1db4bc49955f1eb01b2

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608041033-AV1SQJ/blueprint/resolved-snapshot.json
- old_digest: 28d32703f88ddca14847a8fbc0cf98b31be323f47d9facd76a9e1056790cc80e
- current_digest: 28d32703f88ddca14847a8fbc0cf98b31be323f47d9facd76a9e1056790cc80e
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608041033-AV1SQJ

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane task complete 202608041033-AV1SQJ --result verified-202608041033-AV1SQJ --commit 0de1a5e6995bb06deb940138a0b49370150a98c3
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-04T10:37:07.614Z — VERIFY — ok

By: CODER

Note: verified-202608041033-AV1SQJ
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-04T10:35:54.724Z, excerpt_hash=sha256:49a4cb8e70aa4dda0f9f1f0e8b155da2b0ad3053491ac1db4bc49955f1eb01b2

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608041033-AV1SQJ/blueprint/resolved-snapshot.json
- old_digest: 28d32703f88ddca14847a8fbc0cf98b31be323f47d9facd76a9e1056790cc80e
- current_digest: 28d32703f88ddca14847a8fbc0cf98b31be323f47d9facd76a9e1056790cc80e
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608041033-AV1SQJ

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane task complete 202608041033-AV1SQJ --result verified-202608041033-AV1SQJ --commit 00ea05acbc26ea68f38cf558b9234cf034d78b46
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the task implementation commit affecting components/proposal-form.tsx, then rerun npm run lint and npx tsc --noEmit.

## Findings
