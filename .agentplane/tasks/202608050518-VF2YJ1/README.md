---
id: "202608050518-VF2YJ1"
title: "Specify Willow AI assistant integration"
status: "DOING"
priority: "med"
owner: "DOCS"
revision: 16
origin:
  system: "manual"
depends_on: []
tags:
  - "docs"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-08-05T05:19:05.409Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-05T05:24:21.386Z"
  updated_by: "CODER"
  note: "verified-202608050518-VF2YJ1"
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-08-05T05:24:11.238Z"
  updated_by: "EVALUATOR"
  note: "The English implementation specification satisfies the approved documentation scope and is ready for task closure."
  evaluated_sha: null
  blueprint_digest: "8709f60611f7dd0b5584e44d8250c825f97bf1bb7d10668e306e7fe297646dfd"
  evidence_refs:
    - ".agentplane/tasks/202608050518-VF2YJ1/README.md"
    - ".agentplane/tasks/202608050518-VF2YJ1/quality/20260805-052411238-recovery-context/quality-report.json"
    - ".agentplane/tasks/202608050518-VF2YJ1/quality/20260805-052411238-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202608050518-VF2YJ1/quality/20260805-052411238-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202608050518-VF2YJ1/blueprint/resolved-snapshot.json"
    - "docs/AI_BOT_SPEC.md"
    - "node .agentplane/policy/check-routing.mjs: pass"
    - "ap doctor: pass"
  findings:
    - "The specification maps every requested requirement to explicit architecture, API, prompt, form-tool, persistence, streaming, security, acceptance, and mock-only testing contracts while preserving the current mock branches and exact sample data."
commit: null
comments:
  -
    author: "DOCS"
    body: "Start: Draft the approved English AI assistant implementation specification, grounded in current chat and proposal-form contracts, then validate all required documentation checks."
events:
  -
    type: "status"
    at: "2026-08-05T05:19:11.039Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: Draft the approved English AI assistant implementation specification, grounded in current chat and proposal-form contracts, then validate all required documentation checks."
  -
    type: "verify"
    at: "2026-08-05T05:23:39.607Z"
    author: "DOCS"
    state: "ok"
    note: "English Willow implementation specification completed and cross-checked against current form, catalog, mock behavior, architecture requirements, security constraints, acceptance criteria, and mock-only test requirements."
  -
    type: "verify"
    at: "2026-08-05T05:23:49.197Z"
    author: "CODER"
    state: "ok"
    note: "verified-202608050518-VF2YJ1"
  -
    type: "verify"
    at: "2026-08-05T05:24:21.386Z"
    author: "CODER"
    state: "ok"
    note: "verified-202608050518-VF2YJ1"
doc_version: 3
doc_updated_at: "2026-08-05T05:24:21.468Z"
doc_updated_by: "DOCS"
description: "Create an English implementation specification for the LangChain TypeScript and OpenRouter-backed Willow proposal assistant, including server API, client-executed form tools, mock fallback, streaming, local chat persistence, security, acceptance criteria, and tests."
sections:
  Summary: "Create an English implementation specification for integrating the Willow AI assistant into the existing Next.js proposal form."
  Scope: "Add docs/AI_BOT_SPEC.md. Cover the current form and mock behavior, LangChain for TypeScript, server-only OpenRouter access, environment-driven mock fallback, request context and 50-message history, proposal-scoped localStorage persistence, client-executed form-edit tool calls, streaming, errors, security, acceptance criteria, and a sufficient test matrix. Do not implement application code or use the network."
  Plan: "1. Derive exact form, villa, add-on, and current mock contracts from repository code. 2. Define target architecture, API and streaming event contracts, server prompt/model/mock behavior, client tool execution handshake, local persistence, validation, security, and failure handling. 3. Include the canonical English Willow system prompt, acceptance criteria, implementation breakdown, and test matrix using server mocks only. 4. Validate the document against the approved requirements and repository policy."
  Verify Steps: "1. Confirm docs/AI_BOT_SPEC.md exists and is written in English. Expected: every requested behavior is represented by a normative requirement or acceptance criterion. 2. Cross-check field names and catalog shapes against components/proposal-form.tsx and lib/data.ts. Expected: form-edit tool and context schemas cover villaId, addOnIds, proposalText, clientName, manager, phone, email, and comment without inventing persisted fields. 3. Cross-check mock triggers, suggestions, replies, autofill values, and status replacement behavior against components/chat-bot.tsx. Expected: legacy mock behavior is preserved through the server endpoint. 4. Run node .agentplane/policy/check-routing.mjs and ap doctor. Expected: both pass. 5. Run git diff --check and inspect git status --short --untracked-files=all. Expected: no whitespace errors or unintended files."
  Verification: |-
    Command: test -s docs/AI_BOT_SPEC.md; Result: pass; Evidence: the English specification exists and is non-empty; Scope: docs/AI_BOT_SPEC.md; Links: none. Command: Cyrillic and trailing-whitespace rg checks; Result: pass; Evidence: no Cyrillic text or trailing whitespace found; Scope: docs/AI_BOT_SPEC.md; Links: none. Command: git diff --check; Result: pass; Evidence: no whitespace errors; Scope: current task changes; Links: none. Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK; Scope: repository routing contract; Links: .agentplane/policy modules. Command: ap doctor; Result: pass; Evidence: doctor OK with zero errors and zero warnings; two informational fallback notes only; Scope: repository workflow health; Links: Agentplane task 202608050518-VF2YJ1. Manual cross-check: pass; Evidence: form fields match components/proposal-form.tsx and lib/data.ts; deterministic suggestions, branch precedence, reply copy, autofill data, and status behavior match components/chat-bot.tsx, with the requested completion field list and in-place replacement added as target behavior.

    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-05T05:23:39.607Z — VERIFY — ok

    By: DOCS

    Note: English Willow implementation specification completed and cross-checked against current form, catalog, mock behavior, architecture requirements, security constraints, acceptance criteria, and mock-only test requirements.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-05T05:23:39.114Z, excerpt_hash=sha256:b522e65440ddc063cdfd0c3bd85542724d728c729907512ac53c71bb08bb7675

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608050518-VF2YJ1/blueprint/resolved-snapshot.json
    - old_digest: 8709f60611f7dd0b5584e44d8250c825f97bf1bb7d10668e306e7fe297646dfd
    - current_digest: 8709f60611f7dd0b5584e44d8250c825f97bf1bb7d10668e306e7fe297646dfd
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608050518-VF2YJ1

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane task verify-show 202608050518-VF2YJ1
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-05T05:23:49.197Z — VERIFY — ok

    By: CODER

    Note: verified-202608050518-VF2YJ1
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-05T05:23:39.696Z, excerpt_hash=sha256:b522e65440ddc063cdfd0c3bd85542724d728c729907512ac53c71bb08bb7675

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608050518-VF2YJ1/blueprint/resolved-snapshot.json
    - old_digest: 8709f60611f7dd0b5584e44d8250c825f97bf1bb7d10668e306e7fe297646dfd
    - current_digest: 8709f60611f7dd0b5584e44d8250c825f97bf1bb7d10668e306e7fe297646dfd
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608050518-VF2YJ1

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane task complete 202608050518-VF2YJ1 --result verified-202608050518-VF2YJ1 --commit 6defe14b70bb9be5b438bf5caed44f0ad270a85d
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-05T05:24:21.386Z — VERIFY — ok

    By: CODER

    Note: verified-202608050518-VF2YJ1
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-05T05:23:49.273Z, excerpt_hash=sha256:b522e65440ddc063cdfd0c3bd85542724d728c729907512ac53c71bb08bb7675

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608050518-VF2YJ1/blueprint/resolved-snapshot.json
    - old_digest: 8709f60611f7dd0b5584e44d8250c825f97bf1bb7d10668e306e7fe297646dfd
    - current_digest: 8709f60611f7dd0b5584e44d8250c825f97bf1bb7d10668e306e7fe297646dfd
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608050518-VF2YJ1

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane task complete 202608050518-VF2YJ1 --result verified-202608050518-VF2YJ1 --commit 6defe14b70bb9be5b438bf5caed44f0ad270a85d
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Remove docs/AI_BOT_SPEC.md and revert only the task-local Agentplane records created for this documentation task if explicitly requested."
  Findings: "No material scope drift, unresolved documentation gap, or skipped required check was identified."
id_source: "generated"
---
## Summary

Create an English implementation specification for integrating the Willow AI assistant into the existing Next.js proposal form.

## Scope

Add docs/AI_BOT_SPEC.md. Cover the current form and mock behavior, LangChain for TypeScript, server-only OpenRouter access, environment-driven mock fallback, request context and 50-message history, proposal-scoped localStorage persistence, client-executed form-edit tool calls, streaming, errors, security, acceptance criteria, and a sufficient test matrix. Do not implement application code or use the network.

## Plan

1. Derive exact form, villa, add-on, and current mock contracts from repository code. 2. Define target architecture, API and streaming event contracts, server prompt/model/mock behavior, client tool execution handshake, local persistence, validation, security, and failure handling. 3. Include the canonical English Willow system prompt, acceptance criteria, implementation breakdown, and test matrix using server mocks only. 4. Validate the document against the approved requirements and repository policy.

## Verify Steps

1. Confirm docs/AI_BOT_SPEC.md exists and is written in English. Expected: every requested behavior is represented by a normative requirement or acceptance criterion. 2. Cross-check field names and catalog shapes against components/proposal-form.tsx and lib/data.ts. Expected: form-edit tool and context schemas cover villaId, addOnIds, proposalText, clientName, manager, phone, email, and comment without inventing persisted fields. 3. Cross-check mock triggers, suggestions, replies, autofill values, and status replacement behavior against components/chat-bot.tsx. Expected: legacy mock behavior is preserved through the server endpoint. 4. Run node .agentplane/policy/check-routing.mjs and ap doctor. Expected: both pass. 5. Run git diff --check and inspect git status --short --untracked-files=all. Expected: no whitespace errors or unintended files.

## Verification

Command: test -s docs/AI_BOT_SPEC.md; Result: pass; Evidence: the English specification exists and is non-empty; Scope: docs/AI_BOT_SPEC.md; Links: none. Command: Cyrillic and trailing-whitespace rg checks; Result: pass; Evidence: no Cyrillic text or trailing whitespace found; Scope: docs/AI_BOT_SPEC.md; Links: none. Command: git diff --check; Result: pass; Evidence: no whitespace errors; Scope: current task changes; Links: none. Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK; Scope: repository routing contract; Links: .agentplane/policy modules. Command: ap doctor; Result: pass; Evidence: doctor OK with zero errors and zero warnings; two informational fallback notes only; Scope: repository workflow health; Links: Agentplane task 202608050518-VF2YJ1. Manual cross-check: pass; Evidence: form fields match components/proposal-form.tsx and lib/data.ts; deterministic suggestions, branch precedence, reply copy, autofill data, and status behavior match components/chat-bot.tsx, with the requested completion field list and in-place replacement added as target behavior.

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-05T05:23:39.607Z — VERIFY — ok

By: DOCS

Note: English Willow implementation specification completed and cross-checked against current form, catalog, mock behavior, architecture requirements, security constraints, acceptance criteria, and mock-only test requirements.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-05T05:23:39.114Z, excerpt_hash=sha256:b522e65440ddc063cdfd0c3bd85542724d728c729907512ac53c71bb08bb7675

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608050518-VF2YJ1/blueprint/resolved-snapshot.json
- old_digest: 8709f60611f7dd0b5584e44d8250c825f97bf1bb7d10668e306e7fe297646dfd
- current_digest: 8709f60611f7dd0b5584e44d8250c825f97bf1bb7d10668e306e7fe297646dfd
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608050518-VF2YJ1

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane task verify-show 202608050518-VF2YJ1
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-05T05:23:49.197Z — VERIFY — ok

By: CODER

Note: verified-202608050518-VF2YJ1
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-05T05:23:39.696Z, excerpt_hash=sha256:b522e65440ddc063cdfd0c3bd85542724d728c729907512ac53c71bb08bb7675

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608050518-VF2YJ1/blueprint/resolved-snapshot.json
- old_digest: 8709f60611f7dd0b5584e44d8250c825f97bf1bb7d10668e306e7fe297646dfd
- current_digest: 8709f60611f7dd0b5584e44d8250c825f97bf1bb7d10668e306e7fe297646dfd
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608050518-VF2YJ1

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane task complete 202608050518-VF2YJ1 --result verified-202608050518-VF2YJ1 --commit 6defe14b70bb9be5b438bf5caed44f0ad270a85d
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-05T05:24:21.386Z — VERIFY — ok

By: CODER

Note: verified-202608050518-VF2YJ1
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-05T05:23:49.273Z, excerpt_hash=sha256:b522e65440ddc063cdfd0c3bd85542724d728c729907512ac53c71bb08bb7675

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608050518-VF2YJ1/blueprint/resolved-snapshot.json
- old_digest: 8709f60611f7dd0b5584e44d8250c825f97bf1bb7d10668e306e7fe297646dfd
- current_digest: 8709f60611f7dd0b5584e44d8250c825f97bf1bb7d10668e306e7fe297646dfd
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608050518-VF2YJ1

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane task complete 202608050518-VF2YJ1 --result verified-202608050518-VF2YJ1 --commit 6defe14b70bb9be5b438bf5caed44f0ad270a85d
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Remove docs/AI_BOT_SPEC.md and revert only the task-local Agentplane records created for this documentation task if explicitly requested.

## Findings

No material scope drift, unresolved documentation gap, or skipped required check was identified.
