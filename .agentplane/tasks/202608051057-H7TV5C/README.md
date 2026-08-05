---
id: "202608051057-H7TV5C"
title: "Add AI fill action to proposal text"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 21
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "frontend"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-08-05T11:00:23.486Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-05T11:03:06.418Z"
  updated_by: "CODER"
  note: "Expanded verification passed: 5 focused files/37 tests, prompt-documentation contract cross-check, ESLint, TypeScript, production build, whitespace, Agentplane doctor, routing, and scoped-status checks all succeeded."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implement the approved proposal-text Fill with AI action through the existing Willow send path, then run focused and repository verification checks."
events:
  -
    type: "status"
    at: "2026-08-05T10:58:15.964Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement the approved proposal-text Fill with AI action through the existing Willow send path, then run focused and repository verification checks."
  -
    type: "verify"
    at: "2026-08-05T11:01:02.575Z"
    author: "CODER"
    state: "ok"
    note: "Focused UI/chat tests, lint, typecheck, production build, whitespace, Agentplane doctor, routing, and scoped-status checks all passed."
  -
    type: "verify"
    at: "2026-08-05T11:01:40.318Z"
    author: "CODER"
    state: "needs_rework"
    note: "Focused verification must be rerun for the newly approved prompt and documentation scope: tests/unit/ai-server.test.ts failed because the existing case-sensitive heading assertion expected lowercase 'do not include a heading' after the prompt sentence now begins with uppercase 'Do not include a heading'."
  -
    type: "verify"
    at: "2026-08-05T11:03:06.418Z"
    author: "CODER"
    state: "ok"
    note: "Expanded verification passed: 5 focused files/37 tests, prompt-documentation contract cross-check, ESLint, TypeScript, production build, whitespace, Agentplane doctor, routing, and scoped-status checks all succeeded."
doc_version: 3
doc_updated_at: "2026-08-05T11:03:06.596Z"
doc_updated_by: "CODER"
description: "Add a Fill with AI robot-icon button to the Proposal text section on proposal create/edit pages. Clicking it opens the existing Willow chat and automatically sends the English user message: Fill in the commercial proposal text."
sections:
  Summary: "Add a proposal-text-specific AI entry point that reuses the existing Willow assistant."
  Scope: "Modify the proposal text section, proposal form integration, chat component API, canonical Willow system prompt, implementation documentation, and focused component/unit tests. Add a robot-icon button labelled Fill with AI. On activation, open Willow and send one user message with exact content: Fill in the commercial proposal text. Require generated proposalText to be personalized for the named client and not read like a generic villa advertisement. Preserve the floating chat launcher, manual chat input, transport, persistence, autosave, and other proposal fields."
  Plan: "1. Add an accessible Fill with AI button with a robot icon to ProposalTextSection. 2. Reuse ChatBot's existing send flow through a narrow external open-and-send API. 3. Wire the exact English prompt from ProposalEditor. 4. Extend the canonical Willow system prompt so proposalText is personalized for the client and avoids generic villa-advertising copy. 5. Update docs/AI_BOT_IMPL.md and prompt regression assertions to match the contract. 6. Run all declared checks and record evidence."
  Verify Steps: "1. Run npm test -- --run tests/components/proposal-form-sections.test.tsx tests/components/proposal-form.test.tsx tests/components/catalog-modal-chat.test.tsx tests/components/ai-chat.test.tsx tests/unit/ai-server.test.ts; expected: focused tests pass and cover the robot-icon Fill with AI control, chat opening, exactly one automatically submitted user message with content Fill in the commercial proposal text., preserved existing chat behavior, and the proposalText personalization/non-generic-advertising prompt contract. 2. Inspect lib/ai/server/prompt.ts and docs/AI_BOT_IMPL.md together; expected: both require proposal text to be personalized for the client and not read as a generic villa advertisement. 3. Run npm run lint; expected: ESLint exits successfully. 4. Run npm run typecheck; expected: TypeScript exits successfully. 5. Run npm run build; expected: Next.js production build succeeds. 6. Run git diff --check; expected: no whitespace errors. 7. Run ap doctor and node .agentplane/policy/check-routing.mjs; expected: both pass. 8. Inspect git status --short --untracked-files=all; expected: only task-scoped source/test/docs changes and Agentplane task artifacts are present."
  Verification: |-
    Command: npm test -- --run tests/components/proposal-form-sections.test.tsx tests/components/proposal-form.test.tsx tests/components/catalog-modal-chat.test.tsx tests/components/ai-chat.test.tsx tests/unit/ai-server.test.ts. Result: pass. Evidence: 5 test files and 37 tests passed after correcting the case-sensitive heading assertion exposed by the first run. Scope: Fill with AI UI/chat behavior and the canonical proposalText personalization prompt contract.

    Command: manual cross-check of lib/ai/server/prompt.ts and docs/AI_BOT_IMPL.md. Result: pass. Evidence: both require a personalized offer for the client identified in the current form, reflect known needs and preferences, and prohibit generic villa-advertising or reusable marketing copy. Scope: canonical prompt and implementation documentation.

    Command: npm run lint. Result: pass. Evidence: ESLint exited successfully with no findings. Scope: repository source, tests, and docs-adjacent code.

    Command: npm run typecheck. Result: pass. Evidence: TypeScript no-emit check exited successfully. Scope: repository types.

    Command: npm run build. Result: pass. Evidence: Next.js production build compiled successfully and generated all application routes. Scope: production application build.

    Command: git diff --check. Result: pass. Evidence: no whitespace errors. Scope: task changes.

    Command: ap doctor. Result: pass. Evidence: doctor OK with zero errors and zero warnings; two informational fallback notes only. Scope: Agentplane workspace health.

    Command: node .agentplane/policy/check-routing.mjs. Result: pass. Evidence: policy routing OK. Scope: repository routing contract.

    Command: git status --short --untracked-files=all. Result: pass. Evidence: only the active task README plus the three approved prompt, documentation, and unit-test files are modified. Scope: expanded task change set.

    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-05T11:03:06.418Z — VERIFY — ok

    By: CODER

    Note: Expanded verification passed: 5 focused files/37 tests, prompt-documentation contract cross-check, ESLint, TypeScript, production build, whitespace, Agentplane doctor, routing, and scoped-status checks all succeeded.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-05T11:03:05.670Z, excerpt_hash=sha256:7478bdfcded1b3a5f07729cf3d5e7c93cc5d9b358a86485ccba00f3ad746f118

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608051057-H7TV5C/blueprint/resolved-snapshot.json
    - old_digest: 40330ad7f576175b4c7882fa9c94b957c839978fe24dab75c20030f0efa4839b
    - current_digest: 40330ad7f576175b4c7882fa9c94b957c839978fe24dab75c20030f0efa4839b
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608051057-H7TV5C

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane task verify-show 202608051057-H7TV5C
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert only the task-scoped proposal text, proposal form, chat API, canonical prompt, prompt documentation, focused test changes, and task lifecycle artifacts; preserve unrelated repository history and user work."
  Findings: "No findings yet."
id_source: "generated"
---
## Summary

Add a proposal-text-specific AI entry point that reuses the existing Willow assistant.

## Scope

Modify the proposal text section, proposal form integration, chat component API, canonical Willow system prompt, implementation documentation, and focused component/unit tests. Add a robot-icon button labelled Fill with AI. On activation, open Willow and send one user message with exact content: Fill in the commercial proposal text. Require generated proposalText to be personalized for the named client and not read like a generic villa advertisement. Preserve the floating chat launcher, manual chat input, transport, persistence, autosave, and other proposal fields.

## Plan

1. Add an accessible Fill with AI button with a robot icon to ProposalTextSection. 2. Reuse ChatBot's existing send flow through a narrow external open-and-send API. 3. Wire the exact English prompt from ProposalEditor. 4. Extend the canonical Willow system prompt so proposalText is personalized for the client and avoids generic villa-advertising copy. 5. Update docs/AI_BOT_IMPL.md and prompt regression assertions to match the contract. 6. Run all declared checks and record evidence.

## Verify Steps

1. Run npm test -- --run tests/components/proposal-form-sections.test.tsx tests/components/proposal-form.test.tsx tests/components/catalog-modal-chat.test.tsx tests/components/ai-chat.test.tsx tests/unit/ai-server.test.ts; expected: focused tests pass and cover the robot-icon Fill with AI control, chat opening, exactly one automatically submitted user message with content Fill in the commercial proposal text., preserved existing chat behavior, and the proposalText personalization/non-generic-advertising prompt contract. 2. Inspect lib/ai/server/prompt.ts and docs/AI_BOT_IMPL.md together; expected: both require proposal text to be personalized for the client and not read as a generic villa advertisement. 3. Run npm run lint; expected: ESLint exits successfully. 4. Run npm run typecheck; expected: TypeScript exits successfully. 5. Run npm run build; expected: Next.js production build succeeds. 6. Run git diff --check; expected: no whitespace errors. 7. Run ap doctor and node .agentplane/policy/check-routing.mjs; expected: both pass. 8. Inspect git status --short --untracked-files=all; expected: only task-scoped source/test/docs changes and Agentplane task artifacts are present.

## Verification

Command: npm test -- --run tests/components/proposal-form-sections.test.tsx tests/components/proposal-form.test.tsx tests/components/catalog-modal-chat.test.tsx tests/components/ai-chat.test.tsx tests/unit/ai-server.test.ts. Result: pass. Evidence: 5 test files and 37 tests passed after correcting the case-sensitive heading assertion exposed by the first run. Scope: Fill with AI UI/chat behavior and the canonical proposalText personalization prompt contract.

Command: manual cross-check of lib/ai/server/prompt.ts and docs/AI_BOT_IMPL.md. Result: pass. Evidence: both require a personalized offer for the client identified in the current form, reflect known needs and preferences, and prohibit generic villa-advertising or reusable marketing copy. Scope: canonical prompt and implementation documentation.

Command: npm run lint. Result: pass. Evidence: ESLint exited successfully with no findings. Scope: repository source, tests, and docs-adjacent code.

Command: npm run typecheck. Result: pass. Evidence: TypeScript no-emit check exited successfully. Scope: repository types.

Command: npm run build. Result: pass. Evidence: Next.js production build compiled successfully and generated all application routes. Scope: production application build.

Command: git diff --check. Result: pass. Evidence: no whitespace errors. Scope: task changes.

Command: ap doctor. Result: pass. Evidence: doctor OK with zero errors and zero warnings; two informational fallback notes only. Scope: Agentplane workspace health.

Command: node .agentplane/policy/check-routing.mjs. Result: pass. Evidence: policy routing OK. Scope: repository routing contract.

Command: git status --short --untracked-files=all. Result: pass. Evidence: only the active task README plus the three approved prompt, documentation, and unit-test files are modified. Scope: expanded task change set.

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-05T11:03:06.418Z — VERIFY — ok

By: CODER

Note: Expanded verification passed: 5 focused files/37 tests, prompt-documentation contract cross-check, ESLint, TypeScript, production build, whitespace, Agentplane doctor, routing, and scoped-status checks all succeeded.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-05T11:03:05.670Z, excerpt_hash=sha256:7478bdfcded1b3a5f07729cf3d5e7c93cc5d9b358a86485ccba00f3ad746f118

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608051057-H7TV5C/blueprint/resolved-snapshot.json
- old_digest: 40330ad7f576175b4c7882fa9c94b957c839978fe24dab75c20030f0efa4839b
- current_digest: 40330ad7f576175b4c7882fa9c94b957c839978fe24dab75c20030f0efa4839b
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608051057-H7TV5C

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane task verify-show 202608051057-H7TV5C
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert only the task-scoped proposal text, proposal form, chat API, canonical prompt, prompt documentation, focused test changes, and task lifecycle artifacts; preserve unrelated repository history and user work.

## Findings

No findings yet.
