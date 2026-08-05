---
id: "202608051020-CZ1H7R"
title: "Strengthen Willow language requirement"
result_summary: "verified-202608051020-CZ1H7R"
status: "DONE"
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
  updated_at: "2026-08-05T10:20:54.031Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-05T10:22:50.942Z"
  updated_by: "CODER"
  note: "verified-202608051020-CZ1H7R"
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-08-05T10:22:24.739Z"
  updated_by: "EVALUATOR"
  note: "Approved language-only prompt change is implemented and verified."
  evaluated_sha: "cd4d6f0587d5f3ec4b0bf6f3ee8f004650eae1bc"
  blueprint_digest: "96f866cbd328d3949ff2298cc44f8c83716489725595dfbaaea401b2d2d2985f"
  evidence_refs:
    - ".agentplane/tasks/202608051020-CZ1H7R/README.md"
    - ".agentplane/tasks/202608051020-CZ1H7R/quality/20260805-102224739-recovery-context/quality-report.json"
    - ".agentplane/tasks/202608051020-CZ1H7R/quality/20260805-102224739-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202608051020-CZ1H7R/quality/20260805-102224739-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202608051020-CZ1H7R/blueprint/resolved-snapshot.json"
    - "npm test -- --run tests/unit/ai-server.test.ts; npm run typecheck; npm run lint; git diff --check"
  findings:
    - "The prompt now enforces the predominant language of the latest user message for all visible natural-language response text while preserving English-only form population; tests and implementation docs match."
commit:
  hash: "26c5313e333af3b6cf5e4aa37dda13e118dcdef3"
  message: "🚧 CZ1H7R task: record verification evidence"
comments:
  -
    author: "CODER"
    body: "Start: continue direct-mode task in current checkout."
  -
    author: "CODER"
    body: "Verified: verified-202608051020-CZ1H7R. Guided shortcut recorded verification and is closing the direct task with traceable commit metadata."
events:
  -
    type: "status"
    at: "2026-08-05T10:21:02.195Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue direct-mode task in current checkout."
  -
    type: "verify"
    at: "2026-08-05T10:21:47.347Z"
    author: "CODER"
    state: "ok"
    note: "Targeted prompt tests passed (11/11); TypeScript typecheck, ESLint, and git diff whitespace validation all completed successfully."
  -
    type: "verify"
    at: "2026-08-05T10:22:30.307Z"
    author: "CODER"
    state: "ok"
    note: "verified-202608051020-CZ1H7R"
  -
    type: "verify"
    at: "2026-08-05T10:22:50.942Z"
    author: "CODER"
    state: "ok"
    note: "verified-202608051020-CZ1H7R"
  -
    type: "status"
    at: "2026-08-05T10:22:51.139Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: verified-202608051020-CZ1H7R. Guided shortcut recorded verification and is closing the direct task with traceable commit metadata."
doc_version: 3
doc_updated_at: "2026-08-05T10:22:51.139Z"
doc_updated_by: "CODER"
description: "Replace the existing response-language sentence with the approved LANGUAGE REQUIREMENT block while preserving English-only form population, update docs/AI_BOT_IMPL.md, and adjust prompt tests."
sections:
  Summary: |-
    Strengthen Willow language requirement

    Replace the existing response-language sentence with the approved LANGUAGE REQUIREMENT block while preserving English-only form population, update docs/AI_BOT_IMPL.md, and adjust prompt tests.
  Scope: |-
    - In scope: Replace the existing response-language sentence with the approved LANGUAGE REQUIREMENT block while preserving English-only form population, update docs/AI_BOT_IMPL.md, and adjust prompt tests.
    - Out of scope: unrelated refactors not required for "Strengthen Willow language requirement".
  Plan: |-
    1. Replace only the response-language paragraph in WILLOW_SYSTEM_PROMPT with the user-approved LANGUAGE REQUIREMENT block, preserving English-only form population.
    2. Update the matching prompt assertions and docs/AI_BOT_IMPL.md description.
    3. Run the targeted AI server tests, lint/typecheck as appropriate, and inspect the final diff/status.
  Verify Steps: |-
    1. Run `npm test -- --run tests/unit/ai-server.test.ts`. Expected: prompt construction and language-requirement assertions pass.
    2. Run `npm run typecheck`. Expected: TypeScript completes without errors.
    3. Run `npm run lint`. Expected: ESLint completes without errors.
    4. Inspect `git diff --check` and the scoped diff. Expected: only the approved prompt, its test, documentation, and AgentPlane task artifacts change, with no whitespace errors.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-05T10:21:47.347Z — VERIFY — ok

    By: CODER

    Note: Targeted prompt tests passed (11/11); TypeScript typecheck, ESLint, and git diff whitespace validation all completed successfully.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-05T10:21:02.195Z, excerpt_hash=sha256:b3c3b9dc68b352016ed5e14b4f56da4cd95270bb86e2fd8761b848c70196a316

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608051020-CZ1H7R/blueprint/resolved-snapshot.json
    - old_digest: 96f866cbd328d3949ff2298cc44f8c83716489725595dfbaaea401b2d2d2985f
    - current_digest: 96f866cbd328d3949ff2298cc44f8c83716489725595dfbaaea401b2d2d2985f
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608051020-CZ1H7R

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane task verify-show 202608051020-CZ1H7R
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-05T10:22:30.307Z — VERIFY — ok

    By: CODER

    Note: verified-202608051020-CZ1H7R
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-05T10:21:47.431Z, excerpt_hash=sha256:b3c3b9dc68b352016ed5e14b4f56da4cd95270bb86e2fd8761b848c70196a316

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608051020-CZ1H7R/blueprint/resolved-snapshot.json
    - old_digest: 96f866cbd328d3949ff2298cc44f8c83716489725595dfbaaea401b2d2d2985f
    - current_digest: 96f866cbd328d3949ff2298cc44f8c83716489725595dfbaaea401b2d2d2985f
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608051020-CZ1H7R

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane task complete 202608051020-CZ1H7R --result verified-202608051020-CZ1H7R --commit cd4d6f0587d5f3ec4b0bf6f3ee8f004650eae1bc
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-05T10:22:50.942Z — VERIFY — ok

    By: CODER

    Note: verified-202608051020-CZ1H7R
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-05T10:22:30.390Z, excerpt_hash=sha256:b3c3b9dc68b352016ed5e14b4f56da4cd95270bb86e2fd8761b848c70196a316

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608051020-CZ1H7R/blueprint/resolved-snapshot.json
    - old_digest: 96f866cbd328d3949ff2298cc44f8c83716489725595dfbaaea401b2d2d2985f
    - current_digest: 96f866cbd328d3949ff2298cc44f8c83716489725595dfbaaea401b2d2d2985f
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608051020-CZ1H7R

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane task complete 202608051020-CZ1H7R --result verified-202608051020-CZ1H7R --commit 26c5313e333af3b6cf5e4aa37dda13e118dcdef3
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert the prompt, test, and documentation changes from the task commit.
    - Re-run the targeted prompt test and static checks to confirm the previous behavior is restored cleanly.
  Findings: ""
extensions:
  implementation_commit:
    hash: "cd4d6f0587d5f3ec4b0bf6f3ee8f004650eae1bc"
    message: "🚧 CZ1H7R task: strengthen Willow language requirement"
id_source: "generated"
---
## Summary

Strengthen Willow language requirement

Replace the existing response-language sentence with the approved LANGUAGE REQUIREMENT block while preserving English-only form population, update docs/AI_BOT_IMPL.md, and adjust prompt tests.

## Scope

- In scope: Replace the existing response-language sentence with the approved LANGUAGE REQUIREMENT block while preserving English-only form population, update docs/AI_BOT_IMPL.md, and adjust prompt tests.
- Out of scope: unrelated refactors not required for "Strengthen Willow language requirement".

## Plan

1. Replace only the response-language paragraph in WILLOW_SYSTEM_PROMPT with the user-approved LANGUAGE REQUIREMENT block, preserving English-only form population.
2. Update the matching prompt assertions and docs/AI_BOT_IMPL.md description.
3. Run the targeted AI server tests, lint/typecheck as appropriate, and inspect the final diff/status.

## Verify Steps

1. Run `npm test -- --run tests/unit/ai-server.test.ts`. Expected: prompt construction and language-requirement assertions pass.
2. Run `npm run typecheck`. Expected: TypeScript completes without errors.
3. Run `npm run lint`. Expected: ESLint completes without errors.
4. Inspect `git diff --check` and the scoped diff. Expected: only the approved prompt, its test, documentation, and AgentPlane task artifacts change, with no whitespace errors.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-05T10:21:47.347Z — VERIFY — ok

By: CODER

Note: Targeted prompt tests passed (11/11); TypeScript typecheck, ESLint, and git diff whitespace validation all completed successfully.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-05T10:21:02.195Z, excerpt_hash=sha256:b3c3b9dc68b352016ed5e14b4f56da4cd95270bb86e2fd8761b848c70196a316

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608051020-CZ1H7R/blueprint/resolved-snapshot.json
- old_digest: 96f866cbd328d3949ff2298cc44f8c83716489725595dfbaaea401b2d2d2985f
- current_digest: 96f866cbd328d3949ff2298cc44f8c83716489725595dfbaaea401b2d2d2985f
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608051020-CZ1H7R

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane task verify-show 202608051020-CZ1H7R
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-05T10:22:30.307Z — VERIFY — ok

By: CODER

Note: verified-202608051020-CZ1H7R
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-05T10:21:47.431Z, excerpt_hash=sha256:b3c3b9dc68b352016ed5e14b4f56da4cd95270bb86e2fd8761b848c70196a316

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608051020-CZ1H7R/blueprint/resolved-snapshot.json
- old_digest: 96f866cbd328d3949ff2298cc44f8c83716489725595dfbaaea401b2d2d2985f
- current_digest: 96f866cbd328d3949ff2298cc44f8c83716489725595dfbaaea401b2d2d2985f
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608051020-CZ1H7R

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane task complete 202608051020-CZ1H7R --result verified-202608051020-CZ1H7R --commit cd4d6f0587d5f3ec4b0bf6f3ee8f004650eae1bc
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-05T10:22:50.942Z — VERIFY — ok

By: CODER

Note: verified-202608051020-CZ1H7R
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-05T10:22:30.390Z, excerpt_hash=sha256:b3c3b9dc68b352016ed5e14b4f56da4cd95270bb86e2fd8761b848c70196a316

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608051020-CZ1H7R/blueprint/resolved-snapshot.json
- old_digest: 96f866cbd328d3949ff2298cc44f8c83716489725595dfbaaea401b2d2d2985f
- current_digest: 96f866cbd328d3949ff2298cc44f8c83716489725595dfbaaea401b2d2d2985f
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608051020-CZ1H7R

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane task complete 202608051020-CZ1H7R --result verified-202608051020-CZ1H7R --commit 26c5313e333af3b6cf5e4aa37dda13e118dcdef3
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the prompt, test, and documentation changes from the task commit.
- Re-run the targeted prompt test and static checks to confirm the previous behavior is restored cleanly.

## Findings
