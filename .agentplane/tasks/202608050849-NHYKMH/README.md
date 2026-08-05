---
id: "202608050849-NHYKMH"
title: "Prevent duplicated package and pricing details in proposal copy"
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
  updated_at: "2026-08-05T08:50:20.593Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-05T08:51:57.967Z"
  updated_by: "CODER"
  note: "verified-202608050849-NHYKMH"
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-08-05T08:51:49.265Z"
  updated_by: "EVALUATOR"
  note: "Prompt, canonical spec, and contract test consistently prohibit duplicated package and pricing details in proposalText; all declared and repository policy checks pass."
  evaluated_sha: "c1590acd9875543a7fb1e1fc8d031d6750f326c7"
  blueprint_digest: "9a99d14a58eb10aa2a0f068dcc73c96107ce327f5e36e72cca0cb5f77d5a6fd8"
  evidence_refs:
    - ".agentplane/tasks/202608050849-NHYKMH/README.md"
    - ".agentplane/tasks/202608050849-NHYKMH/quality/20260805-085149265-recovery-context/quality-report.json"
    - ".agentplane/tasks/202608050849-NHYKMH/quality/20260805-085149265-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202608050849-NHYKMH/quality/20260805-085149265-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202608050849-NHYKMH/blueprint/resolved-snapshot.json"
    - "tests/unit/ai-server.test.ts"
  findings:
    - "The scoped rule is present in both runtime and canonical prompt text, with unit assertions covering package contents, component prices, final total, and automatic document rendering."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implement the approved Willow prompt, canonical spec, and prompt contract test changes."
events:
  -
    type: "status"
    at: "2026-08-05T08:50:29.626Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement the approved Willow prompt, canonical spec, and prompt contract test changes."
  -
    type: "verify"
    at: "2026-08-05T08:51:14.164Z"
    author: "CODER"
    state: "ok"
    note: "Command: npm test -- --run tests/unit/ai-server.test.ts | Result: pass | Evidence: 1 file and 11 tests passed | Scope: runtime prompt contract. Command: npx eslint lib/ai/server/prompt.ts tests/unit/ai-server.test.ts | Result: pass | Evidence: exit 0 with no findings | Scope: changed implementation and test files. Command: git diff --check plus scoped diff inspection | Result: pass | Evidence: no whitespace errors and only the approved prompt, spec, and test changes | Scope: complete task diff."
  -
    type: "verify"
    at: "2026-08-05T08:51:57.967Z"
    author: "CODER"
    state: "ok"
    note: "verified-202608050849-NHYKMH"
doc_version: 3
doc_updated_at: "2026-08-05T08:51:58.058Z"
doc_updated_by: "CODER"
description: "Update Willow's English system prompt so proposalText does not enumerate package contents or include component/final pricing because the generated proposal document adds those details automatically; keep the canonical spec and prompt contract test synchronized."
sections:
  Summary: |-
    Prevent duplicated package and pricing details in proposal copy

    Update Willow's English system prompt so proposalText does not enumerate package contents or include component/final pricing because the generated proposal document adds those details automatically; keep the canonical spec and prompt contract test synchronized.
  Scope: |-
    - In scope: lib/ai/server/prompt.ts, docs/AI_BOT_SPEC.md, and tests/unit/ai-server.test.ts.
    - Add an English instruction limited to proposal-form proposalText generation: do not enumerate package contents and do not state component or final proposal prices because the generated document supplies them automatically.
    - Out of scope: pricing calculations, document rendering, mock response behavior, and unrelated prompt wording.
  Plan: |-
    1. Add the instruction to the runtime Willow system prompt and its canonical specification copy.
    2. Extend the prompt contract unit test with assertions covering package-content and pricing omissions.
    3. Run the targeted unit test, lint the touched files, inspect the diff, and record verification evidence.
  Verify Steps: |-
    1. Run `npm test -- --run tests/unit/ai-server.test.ts`. Expected: the AI server prompt contract suite passes, including assertions for package-content and pricing omissions.
    2. Run `npx eslint lib/ai/server/prompt.ts tests/unit/ai-server.test.ts`. Expected: no lint errors in changed implementation/test files.
    3. Run `git diff --check` and inspect `git diff -- lib/ai/server/prompt.ts docs/AI_BOT_SPEC.md tests/unit/ai-server.test.ts`. Expected: no whitespace errors; runtime prompt, canonical spec, and test express the same scoped instruction with no unrelated changes.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-05T08:51:14.164Z — VERIFY — ok

    By: CODER

    Note: Command: npm test -- --run tests/unit/ai-server.test.ts | Result: pass | Evidence: 1 file and 11 tests passed | Scope: runtime prompt contract. Command: npx eslint lib/ai/server/prompt.ts tests/unit/ai-server.test.ts | Result: pass | Evidence: exit 0 with no findings | Scope: changed implementation and test files. Command: git diff --check plus scoped diff inspection | Result: pass | Evidence: no whitespace errors and only the approved prompt, spec, and test changes | Scope: complete task diff.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-05T08:50:29.626Z, excerpt_hash=sha256:d167af959101c8e59ddf83d97b17790d01ebb147796bb95701bad676d6d728af

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608050849-NHYKMH/blueprint/resolved-snapshot.json
    - old_digest: 9a99d14a58eb10aa2a0f068dcc73c96107ce327f5e36e72cca0cb5f77d5a6fd8
    - current_digest: 9a99d14a58eb10aa2a0f068dcc73c96107ce327f5e36e72cca0cb5f77d5a6fd8
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608050849-NHYKMH

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane task verify-show 202608050849-NHYKMH
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-05T08:51:57.967Z — VERIFY — ok

    By: CODER

    Note: verified-202608050849-NHYKMH
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-05T08:51:14.242Z, excerpt_hash=sha256:d167af959101c8e59ddf83d97b17790d01ebb147796bb95701bad676d6d728af

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608050849-NHYKMH/blueprint/resolved-snapshot.json
    - old_digest: 9a99d14a58eb10aa2a0f068dcc73c96107ce327f5e36e72cca0cb5f77d5a6fd8
    - current_digest: 9a99d14a58eb10aa2a0f068dcc73c96107ce327f5e36e72cca0cb5f77d5a6fd8
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608050849-NHYKMH

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane task complete 202608050849-NHYKMH --result verified-202608050849-NHYKMH --commit c1590acd9875543a7fb1e1fc8d031d6750f326c7
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert the task commit containing the three scoped prompt/spec/test changes.
    - Re-run the targeted AI server unit test to confirm restoration.
  Findings: ""
id_source: "generated"
---
## Summary

Prevent duplicated package and pricing details in proposal copy

Update Willow's English system prompt so proposalText does not enumerate package contents or include component/final pricing because the generated proposal document adds those details automatically; keep the canonical spec and prompt contract test synchronized.

## Scope

- In scope: lib/ai/server/prompt.ts, docs/AI_BOT_SPEC.md, and tests/unit/ai-server.test.ts.
- Add an English instruction limited to proposal-form proposalText generation: do not enumerate package contents and do not state component or final proposal prices because the generated document supplies them automatically.
- Out of scope: pricing calculations, document rendering, mock response behavior, and unrelated prompt wording.

## Plan

1. Add the instruction to the runtime Willow system prompt and its canonical specification copy.
2. Extend the prompt contract unit test with assertions covering package-content and pricing omissions.
3. Run the targeted unit test, lint the touched files, inspect the diff, and record verification evidence.

## Verify Steps

1. Run `npm test -- --run tests/unit/ai-server.test.ts`. Expected: the AI server prompt contract suite passes, including assertions for package-content and pricing omissions.
2. Run `npx eslint lib/ai/server/prompt.ts tests/unit/ai-server.test.ts`. Expected: no lint errors in changed implementation/test files.
3. Run `git diff --check` and inspect `git diff -- lib/ai/server/prompt.ts docs/AI_BOT_SPEC.md tests/unit/ai-server.test.ts`. Expected: no whitespace errors; runtime prompt, canonical spec, and test express the same scoped instruction with no unrelated changes.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-05T08:51:14.164Z — VERIFY — ok

By: CODER

Note: Command: npm test -- --run tests/unit/ai-server.test.ts | Result: pass | Evidence: 1 file and 11 tests passed | Scope: runtime prompt contract. Command: npx eslint lib/ai/server/prompt.ts tests/unit/ai-server.test.ts | Result: pass | Evidence: exit 0 with no findings | Scope: changed implementation and test files. Command: git diff --check plus scoped diff inspection | Result: pass | Evidence: no whitespace errors and only the approved prompt, spec, and test changes | Scope: complete task diff.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-05T08:50:29.626Z, excerpt_hash=sha256:d167af959101c8e59ddf83d97b17790d01ebb147796bb95701bad676d6d728af

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608050849-NHYKMH/blueprint/resolved-snapshot.json
- old_digest: 9a99d14a58eb10aa2a0f068dcc73c96107ce327f5e36e72cca0cb5f77d5a6fd8
- current_digest: 9a99d14a58eb10aa2a0f068dcc73c96107ce327f5e36e72cca0cb5f77d5a6fd8
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608050849-NHYKMH

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane task verify-show 202608050849-NHYKMH
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-05T08:51:57.967Z — VERIFY — ok

By: CODER

Note: verified-202608050849-NHYKMH
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-05T08:51:14.242Z, excerpt_hash=sha256:d167af959101c8e59ddf83d97b17790d01ebb147796bb95701bad676d6d728af

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608050849-NHYKMH/blueprint/resolved-snapshot.json
- old_digest: 9a99d14a58eb10aa2a0f068dcc73c96107ce327f5e36e72cca0cb5f77d5a6fd8
- current_digest: 9a99d14a58eb10aa2a0f068dcc73c96107ce327f5e36e72cca0cb5f77d5a6fd8
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608050849-NHYKMH

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane task complete 202608050849-NHYKMH --result verified-202608050849-NHYKMH --commit c1590acd9875543a7fb1e1fc8d031d6750f326c7
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the task commit containing the three scoped prompt/spec/test changes.
- Re-run the targeted AI server unit test to confirm restoration.

## Findings
