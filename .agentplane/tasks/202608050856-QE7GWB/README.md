---
id: "202608050856-QE7GWB"
title: "Exclude auto-rendered details from proposal copy"
result_summary: "verified-202608050856-QE7GWB"
status: "DONE"
priority: "med"
owner: "CODER"
revision: 13
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-08-05T08:56:39.090Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-05T09:00:23.436Z"
  updated_by: "CODER"
  note: "verified-202608050856-QE7GWB"
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-08-05T09:00:03.997Z"
  updated_by: "EVALUATOR"
  note: "The runtime prompt, canonical specification, and prompt contract test consistently exclude the complete user-provided set of auto-rendered proposal details; all declared and repository checks pass."
  evaluated_sha: "dab87d22c835d8cc32093fcb3db2006f3324272a"
  blueprint_digest: "db2a423cebc06fe17707a9ec8bc2c41759579ba4ca5f8462f0e15498ff6a58c7"
  evidence_refs:
    - ".agentplane/tasks/202608050856-QE7GWB/README.md"
    - ".agentplane/tasks/202608050856-QE7GWB/quality/20260805-090003997-recovery-context/quality-report.json"
    - ".agentplane/tasks/202608050856-QE7GWB/quality/20260805-090003997-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202608050856-QE7GWB/quality/20260805-090003997-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202608050856-QE7GWB/blueprint/resolved-snapshot.json"
    - "tests/unit/ai-server.test.ts"
  findings:
    - "The rule excludes headings, property area, bedroom and bathroom counts, selected add-ons or package components and individual prices, base villa price, and final proposal total from proposalText."
commit:
  hash: "08232e3f1dd99e7e0a03b689a121ed6619435a06"
  message: "🚧 QE7GWB task: record quality evaluation"
comments:
  -
    author: "CODER"
    body: "Start: refine the approved proposalText exclusions and synchronize the prompt contract artifacts."
  -
    author: "CODER"
    body: "Verified: verified-202608050856-QE7GWB. Guided shortcut recorded verification and is closing the direct task with traceable commit metadata."
events:
  -
    type: "status"
    at: "2026-08-05T08:56:49.978Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: refine the approved proposalText exclusions and synchronize the prompt contract artifacts."
  -
    type: "verify"
    at: "2026-08-05T08:59:42.786Z"
    author: "CODER"
    state: "ok"
    note: "Command: npm test -- --run tests/unit/ai-server.test.ts | Result: pass | Evidence: 1 file and 11 tests passed, including full auto-rendered detail assertions | Scope: runtime prompt contract. Command: npx eslint lib/ai/server/prompt.ts tests/unit/ai-server.test.ts | Result: pass | Evidence: exit 0 with no findings | Scope: changed implementation and test. Command: git diff --check plus scoped diff inspection | Result: pass | Evidence: no whitespace errors; prompt and spec match; only approved files changed | Scope: complete product diff."
  -
    type: "verify"
    at: "2026-08-05T09:00:23.436Z"
    author: "CODER"
    state: "ok"
    note: "verified-202608050856-QE7GWB"
  -
    type: "status"
    at: "2026-08-05T09:00:23.657Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: verified-202608050856-QE7GWB. Guided shortcut recorded verification and is closing the direct task with traceable commit metadata."
doc_version: 3
doc_updated_at: "2026-08-05T09:00:23.657Z"
doc_updated_by: "CODER"
description: "Extend Willow's proposalText instruction so it omits headings and automatically rendered property features or amenities such as bedroom and bathroom counts, alongside the existing package-content and pricing exclusions; synchronize the canonical spec and prompt contract test."
sections:
  Summary: |-
    Exclude auto-rendered details from proposal copy

    Extend Willow's proposalText instruction so it omits headings and automatically rendered property features or amenities such as bedroom and bathroom counts, alongside the existing package-content and pricing exclusions; synchronize the canonical spec and prompt contract test.
  Scope: |-
    - In scope: lib/ai/server/prompt.ts, docs/AI_BOT_SPEC.md, and tests/unit/ai-server.test.ts.
    - The proposalText rule must exclude a heading and every automatically rendered detail in the user-provided complete list: property area, bedroom count, bathroom count, selected add-ons or package components and their individual prices, base villa price, and final proposal total.
    - Out of scope: proposal rendering, pricing calculations, catalog data, mock behavior, and unrelated prompt wording.
  Plan: |-
    1. Refine the runtime Willow system prompt and canonical specification copy with the combined auto-rendered-content exclusions.
    2. Extend the prompt contract unit test to cover headings and bedroom/bathroom details.
    3. Run the targeted unit test, lint changed implementation/test files, inspect the scoped diff, and record verification evidence.
  Verify Steps: |-
    1. Run `npm test -- --run tests/unit/ai-server.test.ts`. Expected: the AI server prompt contract suite passes, including assertions for headings, bedroom/bathroom details, package contents, and prices.
    2. Run `npx eslint lib/ai/server/prompt.ts tests/unit/ai-server.test.ts`. Expected: no lint errors in changed implementation/test files.
    3. Run `git diff --check` and inspect `git diff -- lib/ai/server/prompt.ts docs/AI_BOT_SPEC.md tests/unit/ai-server.test.ts`. Expected: no whitespace errors; runtime prompt, canonical spec, and test express the same scoped rule with no unrelated changes.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-05T08:59:42.786Z — VERIFY — ok

    By: CODER

    Note: Command: npm test -- --run tests/unit/ai-server.test.ts | Result: pass | Evidence: 1 file and 11 tests passed, including full auto-rendered detail assertions | Scope: runtime prompt contract. Command: npx eslint lib/ai/server/prompt.ts tests/unit/ai-server.test.ts | Result: pass | Evidence: exit 0 with no findings | Scope: changed implementation and test. Command: git diff --check plus scoped diff inspection | Result: pass | Evidence: no whitespace errors; prompt and spec match; only approved files changed | Scope: complete product diff.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-05T08:59:03.362Z, excerpt_hash=sha256:f1c18091dd956941c21a75259f9049f4f42fccb30af8ab9237bd3567937ff90c

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608050856-QE7GWB/blueprint/resolved-snapshot.json
    - old_digest: db2a423cebc06fe17707a9ec8bc2c41759579ba4ca5f8462f0e15498ff6a58c7
    - current_digest: db2a423cebc06fe17707a9ec8bc2c41759579ba4ca5f8462f0e15498ff6a58c7
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608050856-QE7GWB

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane task verify-show 202608050856-QE7GWB
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-05T09:00:23.436Z — VERIFY — ok

    By: CODER

    Note: verified-202608050856-QE7GWB
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-05T08:59:42.864Z, excerpt_hash=sha256:f1c18091dd956941c21a75259f9049f4f42fccb30af8ab9237bd3567937ff90c

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608050856-QE7GWB/blueprint/resolved-snapshot.json
    - old_digest: db2a423cebc06fe17707a9ec8bc2c41759579ba4ca5f8462f0e15498ff6a58c7
    - current_digest: db2a423cebc06fe17707a9ec8bc2c41759579ba4ca5f8462f0e15498ff6a58c7
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608050856-QE7GWB

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane task complete 202608050856-QE7GWB --result verified-202608050856-QE7GWB --commit 08232e3f1dd99e7e0a03b689a121ed6619435a06
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert the task implementation and closure commits.
    - Re-run the targeted AI server unit test to confirm restoration.
  Findings: ""
extensions:
  implementation_commit:
    hash: "dab87d22c835d8cc32093fcb3db2006f3324272a"
    message: "🚧 QE7GWB task: exclude auto-rendered proposal details"
id_source: "generated"
---
## Summary

Exclude auto-rendered details from proposal copy

Extend Willow's proposalText instruction so it omits headings and automatically rendered property features or amenities such as bedroom and bathroom counts, alongside the existing package-content and pricing exclusions; synchronize the canonical spec and prompt contract test.

## Scope

- In scope: lib/ai/server/prompt.ts, docs/AI_BOT_SPEC.md, and tests/unit/ai-server.test.ts.
- The proposalText rule must exclude a heading and every automatically rendered detail in the user-provided complete list: property area, bedroom count, bathroom count, selected add-ons or package components and their individual prices, base villa price, and final proposal total.
- Out of scope: proposal rendering, pricing calculations, catalog data, mock behavior, and unrelated prompt wording.

## Plan

1. Refine the runtime Willow system prompt and canonical specification copy with the combined auto-rendered-content exclusions.
2. Extend the prompt contract unit test to cover headings and bedroom/bathroom details.
3. Run the targeted unit test, lint changed implementation/test files, inspect the scoped diff, and record verification evidence.

## Verify Steps

1. Run `npm test -- --run tests/unit/ai-server.test.ts`. Expected: the AI server prompt contract suite passes, including assertions for headings, bedroom/bathroom details, package contents, and prices.
2. Run `npx eslint lib/ai/server/prompt.ts tests/unit/ai-server.test.ts`. Expected: no lint errors in changed implementation/test files.
3. Run `git diff --check` and inspect `git diff -- lib/ai/server/prompt.ts docs/AI_BOT_SPEC.md tests/unit/ai-server.test.ts`. Expected: no whitespace errors; runtime prompt, canonical spec, and test express the same scoped rule with no unrelated changes.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-05T08:59:42.786Z — VERIFY — ok

By: CODER

Note: Command: npm test -- --run tests/unit/ai-server.test.ts | Result: pass | Evidence: 1 file and 11 tests passed, including full auto-rendered detail assertions | Scope: runtime prompt contract. Command: npx eslint lib/ai/server/prompt.ts tests/unit/ai-server.test.ts | Result: pass | Evidence: exit 0 with no findings | Scope: changed implementation and test. Command: git diff --check plus scoped diff inspection | Result: pass | Evidence: no whitespace errors; prompt and spec match; only approved files changed | Scope: complete product diff.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-05T08:59:03.362Z, excerpt_hash=sha256:f1c18091dd956941c21a75259f9049f4f42fccb30af8ab9237bd3567937ff90c

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608050856-QE7GWB/blueprint/resolved-snapshot.json
- old_digest: db2a423cebc06fe17707a9ec8bc2c41759579ba4ca5f8462f0e15498ff6a58c7
- current_digest: db2a423cebc06fe17707a9ec8bc2c41759579ba4ca5f8462f0e15498ff6a58c7
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608050856-QE7GWB

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane task verify-show 202608050856-QE7GWB
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-05T09:00:23.436Z — VERIFY — ok

By: CODER

Note: verified-202608050856-QE7GWB
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-05T08:59:42.864Z, excerpt_hash=sha256:f1c18091dd956941c21a75259f9049f4f42fccb30af8ab9237bd3567937ff90c

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608050856-QE7GWB/blueprint/resolved-snapshot.json
- old_digest: db2a423cebc06fe17707a9ec8bc2c41759579ba4ca5f8462f0e15498ff6a58c7
- current_digest: db2a423cebc06fe17707a9ec8bc2c41759579ba4ca5f8462f0e15498ff6a58c7
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608050856-QE7GWB

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane task complete 202608050856-QE7GWB --result verified-202608050856-QE7GWB --commit 08232e3f1dd99e7e0a03b689a121ed6619435a06
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the task implementation and closure commits.
- Re-run the targeted AI server unit test to confirm restoration.

## Findings
