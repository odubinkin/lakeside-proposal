---
id: "202608050604-7ST51V"
title: "Refine Willow AI assistant specification"
result_summary: "Refined Willow AI specification with approved protocol, validation, prompt, persistence, testing, and implementation-documentation contracts"
status: "DONE"
priority: "med"
owner: "DOCS"
revision: 17
origin:
  system: "manual"
depends_on: []
tags:
  - "docs"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-08-05T06:04:48.675Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-05T06:09:40.538Z"
  updated_by: "CODER"
  note: "verified-202608050604-7ST51V"
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-08-05T06:09:12.385Z"
  updated_by: "EVALUATOR"
  note: "Specification revisions are internally consistent and match the approved docs-only scope."
  evaluated_sha: "dc726054bc0ddf6860163478e96196d0e4b6eede"
  blueprint_digest: "e0ef95629751c68a9147a4b8d324343587b0d3c6f6bd3ac0e89fa680f0000fc7"
  evidence_refs:
    - ".agentplane/tasks/202608050604-7ST51V/README.md"
    - ".agentplane/tasks/202608050604-7ST51V/quality/20260805-060912385-recovery-context/quality-report.json"
    - ".agentplane/tasks/202608050604-7ST51V/quality/20260805-060912385-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202608050604-7ST51V/quality/20260805-060912385-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202608050604-7ST51V/blueprint/resolved-snapshot.json"
    - "docs/AI_BOT_SPEC.md; git diff --check; node .agentplane/policy/check-routing.mjs; ap doctor"
  findings:
    - "Streaming correlation, field validation, provider-error UX, prompt grounding, chat lifecycle, tests, and implementation-documentation requirements are explicit; declined complexity was not introduced."
commit:
  hash: "549725492897abf93176b503b980970263236322"
  message: "🚧 7ST51V task: record evaluator quality review"
comments:
  -
    author: "DOCS"
    body: "Start: Update the Willow AI specification within the approved docs-only scope and validate all revised contracts."
  -
    author: "CODER"
    body: "Verified: verified-202608050604-7ST51V. Guided shortcut recorded verification and is closing the direct task with traceable commit metadata."
  -
    author: "DOCS"
    body: "Verified: Refined the Willow AI implementation specification and passed all required docs-policy and repository health checks."
events:
  -
    type: "status"
    at: "2026-08-05T06:04:55.204Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: Update the Willow AI specification within the approved docs-only scope and validate all revised contracts."
  -
    type: "verify"
    at: "2026-08-05T06:08:17.384Z"
    author: "DOCS"
    state: "ok"
    note: "Verified: AI_BOT_SPEC revisions match the approved decisions; diff checks, obsolete-language guards, routing validation, and repository doctor all pass."
  -
    type: "verify"
    at: "2026-08-05T06:08:27.078Z"
    author: "CODER"
    state: "ok"
    note: "verified-202608050604-7ST51V"
  -
    type: "verify"
    at: "2026-08-05T06:09:24.598Z"
    author: "CODER"
    state: "ok"
    note: "verified-202608050604-7ST51V"
  -
    type: "verify"
    at: "2026-08-05T06:09:40.538Z"
    author: "CODER"
    state: "ok"
    note: "verified-202608050604-7ST51V"
  -
    type: "status"
    at: "2026-08-05T06:09:40.746Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: verified-202608050604-7ST51V. Guided shortcut recorded verification and is closing the direct task with traceable commit metadata."
  -
    type: "status"
    at: "2026-08-05T06:10:16.770Z"
    author: "DOCS"
    from: "DONE"
    to: "DONE"
    note: "Verified: Refined the Willow AI implementation specification and passed all required docs-policy and repository health checks."
doc_version: 3
doc_updated_at: "2026-08-05T06:10:16.772Z"
doc_updated_by: "DOCS"
description: "Update docs/AI_BOT_SPEC.md to reflect approved product decisions for prompt grounding, provider errors, stream correlation, field validation, chat lifecycle, tests, and implementation documentation."
sections:
  Summary: "Refine the approved Willow AI assistant implementation contract without changing application code."
  Scope: "Modify only docs/AI_BOT_SPEC.md: clarify OpenRouter failure UX, catalog-grounded prompt rules, stream run correlation, changed-field validation, local chat lifecycle, security-focused tests, and the required docs/AI_BOT_IMPL.md implementation record. Preserve the intentionally simple stateless continuation, whole-turn retry, current provider selection, and lack of cross-tab/privacy/idempotency requirements."
  Plan: "1. Patch the relevant configuration, API, tool, prompt, persistence, testing, acceptance, sequence, and DoD sections. 2. Review the complete diff for contradictions and user-declined scope. 3. Run routing validation and agentplane doctor; record verification evidence."
  Verify Steps: "1. Inspect git diff for docs/AI_BOT_SPEC.md and confirm every approved user decision is represented without adding declined complexity. 2. Search for obsolete 256 KiB request-limit language and ambiguous stream-correlation wording. 3. Run node .agentplane/policy/check-routing.mjs. 4. Run ap doctor."
  Verification: |-
    Command: git diff --check; Result: pass; Evidence: no whitespace errors; Scope: docs/AI_BOT_SPEC.md; Links: docs/AI_BOT_SPEC.md. Command: obsolete-language rg guard; Result: pass; Evidence: no 256 KiB, 16,000-character, bounded-body, or API conversationId language remains; Scope: revised limits and request contract; Links: docs/AI_BOT_SPEC.md sections 8-9. Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK; Scope: repository policy integrity; Links: AGENTS.md and loaded docs policies. Command: ap doctor; Result: pass; Evidence: doctor OK with zero errors and zero warnings; Scope: repository workflow health; Links: task 202608050604-7ST51V. Application tests skipped because the approved change is Markdown-only and does not modify generated docs, scripts, or runtime behavior.

    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-05T06:08:17.384Z — VERIFY — ok

    By: DOCS

    Note: Verified: AI_BOT_SPEC revisions match the approved decisions; diff checks, obsolete-language guards, routing validation, and repository doctor all pass.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-05T06:08:16.994Z, excerpt_hash=sha256:96b213747d8d339be260d9667eade8019d9bd3c0dfee18ebd9a327ecae76e8b7

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608050604-7ST51V/blueprint/resolved-snapshot.json
    - old_digest: e0ef95629751c68a9147a4b8d324343587b0d3c6f6bd3ac0e89fa680f0000fc7
    - current_digest: e0ef95629751c68a9147a4b8d324343587b0d3c6f6bd3ac0e89fa680f0000fc7
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608050604-7ST51V

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane task verify-show 202608050604-7ST51V
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-05T06:08:27.078Z — VERIFY — ok

    By: CODER

    Note: verified-202608050604-7ST51V
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-05T06:08:17.461Z, excerpt_hash=sha256:96b213747d8d339be260d9667eade8019d9bd3c0dfee18ebd9a327ecae76e8b7

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608050604-7ST51V/blueprint/resolved-snapshot.json
    - old_digest: e0ef95629751c68a9147a4b8d324343587b0d3c6f6bd3ac0e89fa680f0000fc7
    - current_digest: e0ef95629751c68a9147a4b8d324343587b0d3c6f6bd3ac0e89fa680f0000fc7
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608050604-7ST51V

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane task complete 202608050604-7ST51V --result verified-202608050604-7ST51V --commit 9899b989f9a9de7afcd65fa6cce6b8d0013a4ea3
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-05T06:09:24.598Z — VERIFY — ok

    By: CODER

    Note: verified-202608050604-7ST51V
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-05T06:08:27.158Z, excerpt_hash=sha256:96b213747d8d339be260d9667eade8019d9bd3c0dfee18ebd9a327ecae76e8b7

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608050604-7ST51V/blueprint/resolved-snapshot.json
    - old_digest: e0ef95629751c68a9147a4b8d324343587b0d3c6f6bd3ac0e89fa680f0000fc7
    - current_digest: e0ef95629751c68a9147a4b8d324343587b0d3c6f6bd3ac0e89fa680f0000fc7
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608050604-7ST51V

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane task complete 202608050604-7ST51V --result verified-202608050604-7ST51V --commit dc726054bc0ddf6860163478e96196d0e4b6eede
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-05T06:09:40.538Z — VERIFY — ok

    By: CODER

    Note: verified-202608050604-7ST51V
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-05T06:09:24.694Z, excerpt_hash=sha256:96b213747d8d339be260d9667eade8019d9bd3c0dfee18ebd9a327ecae76e8b7

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608050604-7ST51V/blueprint/resolved-snapshot.json
    - old_digest: e0ef95629751c68a9147a4b8d324343587b0d3c6f6bd3ac0e89fa680f0000fc7
    - current_digest: e0ef95629751c68a9147a4b8d324343587b0d3c6f6bd3ac0e89fa680f0000fc7
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608050604-7ST51V

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane task complete 202608050604-7ST51V --result verified-202608050604-7ST51V --commit 549725492897abf93176b503b980970263236322
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert only the intentional docs/AI_BOT_SPEC.md changes for this task; preserve unrelated working-tree content."
  Findings: "No findings yet."
extensions:
  implementation_commit:
    hash: "dc726054bc0ddf6860163478e96196d0e4b6eede"
    message: "🚧 7ST51V task: refine Willow AI assistant specification"
id_source: "generated"
---
## Summary

Refine the approved Willow AI assistant implementation contract without changing application code.

## Scope

Modify only docs/AI_BOT_SPEC.md: clarify OpenRouter failure UX, catalog-grounded prompt rules, stream run correlation, changed-field validation, local chat lifecycle, security-focused tests, and the required docs/AI_BOT_IMPL.md implementation record. Preserve the intentionally simple stateless continuation, whole-turn retry, current provider selection, and lack of cross-tab/privacy/idempotency requirements.

## Plan

1. Patch the relevant configuration, API, tool, prompt, persistence, testing, acceptance, sequence, and DoD sections. 2. Review the complete diff for contradictions and user-declined scope. 3. Run routing validation and agentplane doctor; record verification evidence.

## Verify Steps

1. Inspect git diff for docs/AI_BOT_SPEC.md and confirm every approved user decision is represented without adding declined complexity. 2. Search for obsolete 256 KiB request-limit language and ambiguous stream-correlation wording. 3. Run node .agentplane/policy/check-routing.mjs. 4. Run ap doctor.

## Verification

Command: git diff --check; Result: pass; Evidence: no whitespace errors; Scope: docs/AI_BOT_SPEC.md; Links: docs/AI_BOT_SPEC.md. Command: obsolete-language rg guard; Result: pass; Evidence: no 256 KiB, 16,000-character, bounded-body, or API conversationId language remains; Scope: revised limits and request contract; Links: docs/AI_BOT_SPEC.md sections 8-9. Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK; Scope: repository policy integrity; Links: AGENTS.md and loaded docs policies. Command: ap doctor; Result: pass; Evidence: doctor OK with zero errors and zero warnings; Scope: repository workflow health; Links: task 202608050604-7ST51V. Application tests skipped because the approved change is Markdown-only and does not modify generated docs, scripts, or runtime behavior.

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-05T06:08:17.384Z — VERIFY — ok

By: DOCS

Note: Verified: AI_BOT_SPEC revisions match the approved decisions; diff checks, obsolete-language guards, routing validation, and repository doctor all pass.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-05T06:08:16.994Z, excerpt_hash=sha256:96b213747d8d339be260d9667eade8019d9bd3c0dfee18ebd9a327ecae76e8b7

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608050604-7ST51V/blueprint/resolved-snapshot.json
- old_digest: e0ef95629751c68a9147a4b8d324343587b0d3c6f6bd3ac0e89fa680f0000fc7
- current_digest: e0ef95629751c68a9147a4b8d324343587b0d3c6f6bd3ac0e89fa680f0000fc7
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608050604-7ST51V

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane task verify-show 202608050604-7ST51V
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-05T06:08:27.078Z — VERIFY — ok

By: CODER

Note: verified-202608050604-7ST51V
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-05T06:08:17.461Z, excerpt_hash=sha256:96b213747d8d339be260d9667eade8019d9bd3c0dfee18ebd9a327ecae76e8b7

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608050604-7ST51V/blueprint/resolved-snapshot.json
- old_digest: e0ef95629751c68a9147a4b8d324343587b0d3c6f6bd3ac0e89fa680f0000fc7
- current_digest: e0ef95629751c68a9147a4b8d324343587b0d3c6f6bd3ac0e89fa680f0000fc7
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608050604-7ST51V

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane task complete 202608050604-7ST51V --result verified-202608050604-7ST51V --commit 9899b989f9a9de7afcd65fa6cce6b8d0013a4ea3
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-05T06:09:24.598Z — VERIFY — ok

By: CODER

Note: verified-202608050604-7ST51V
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-05T06:08:27.158Z, excerpt_hash=sha256:96b213747d8d339be260d9667eade8019d9bd3c0dfee18ebd9a327ecae76e8b7

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608050604-7ST51V/blueprint/resolved-snapshot.json
- old_digest: e0ef95629751c68a9147a4b8d324343587b0d3c6f6bd3ac0e89fa680f0000fc7
- current_digest: e0ef95629751c68a9147a4b8d324343587b0d3c6f6bd3ac0e89fa680f0000fc7
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608050604-7ST51V

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane task complete 202608050604-7ST51V --result verified-202608050604-7ST51V --commit dc726054bc0ddf6860163478e96196d0e4b6eede
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-05T06:09:40.538Z — VERIFY — ok

By: CODER

Note: verified-202608050604-7ST51V
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-05T06:09:24.694Z, excerpt_hash=sha256:96b213747d8d339be260d9667eade8019d9bd3c0dfee18ebd9a327ecae76e8b7

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608050604-7ST51V/blueprint/resolved-snapshot.json
- old_digest: e0ef95629751c68a9147a4b8d324343587b0d3c6f6bd3ac0e89fa680f0000fc7
- current_digest: e0ef95629751c68a9147a4b8d324343587b0d3c6f6bd3ac0e89fa680f0000fc7
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608050604-7ST51V

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane task complete 202608050604-7ST51V --result verified-202608050604-7ST51V --commit 549725492897abf93176b503b980970263236322
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert only the intentional docs/AI_BOT_SPEC.md changes for this task; preserve unrelated working-tree content.

## Findings

No findings yet.
