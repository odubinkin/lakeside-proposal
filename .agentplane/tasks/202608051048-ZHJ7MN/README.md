---
id: "202608051048-ZHJ7MN"
title: "Improve assistant chat window controls"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 13
origin:
  system: "manual"
depends_on: []
tags:
  - "frontend"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-08-05T10:49:09.379Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-05T10:54:39.413Z"
  updated_by: "CODER"
  note: "verified-202608051048-ZHJ7MN"
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implement the approved assistant chat window controls and suggestion visibility changes with focused tests."
events:
  -
    type: "status"
    at: "2026-08-05T10:49:14.296Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement the approved assistant chat window controls and suggestion visibility changes with focused tests."
  -
    type: "verify"
    at: "2026-08-05T10:54:31.739Z"
    author: "CODER"
    state: "ok"
    note: "Verified: all declared checks pass; focused tests cover icon controls and suggestion hiding, and local Chromium confirms resize, maximize/restore after resize, and narrow-viewport bounds."
  -
    type: "verify"
    at: "2026-08-05T10:54:39.413Z"
    author: "CODER"
    state: "ok"
    note: "verified-202608051048-ZHJ7MN"
doc_version: 3
doc_updated_at: "2026-08-05T10:54:39.495Z"
doc_updated_by: "CODER"
description: "Replace the textual Close control with an accessible icon, add window resize and maximize/restore behavior, and hide action suggestions after the first user message."
sections:
  Summary: "Improve the Willow assistant chat window controls and first-use behavior without changing the shared Modal component or chat transport."
  Scope: "Modify components/chat-bot.tsx and focused chat component tests only. Replace the header Close text with an accessible X icon button; add user-controlled resizing plus maximize/restore; hide suggestion buttons as soon as the transcript contains the first user message, including restored transcripts. Preserve streaming, persistence, focus trapping, and mobile usability."
  Plan: "1. Add local chat window size/maximized state and accessible close/maximize controls in components/chat-bot.tsx. 2. Make the non-maximized dialog resizable within viewport bounds while keeping a usable narrow-screen layout. 3. Derive suggestion visibility from whether any user text entry exists. 4. Add focused component coverage for icon controls, maximize/restore, resize affordance, and suggestion disappearance after the first user message. 5. Run the declared verification commands and inspect the final diff/status."
  Verify Steps: "1. Run npm test -- --run tests/components/catalog-modal-chat.test.tsx tests/components/ai-chat.test.tsx; expected: all focused chat/modal tests pass and assert the accessible Close icon, maximize/restore controls, resize capability, and suggestion buttons disappearing after the first user message/restored user history. 2. Run npm run lint; expected: ESLint exits successfully. 3. Run npm run typecheck; expected: TypeScript exits successfully. 4. Run npm run build; expected: Next.js production build succeeds. 5. Run git diff --check; expected: no whitespace errors. 6. Run ap doctor and node .agentplane/policy/check-routing.mjs; expected: both pass. 7. Inspect git status --short --untracked-files=all; expected: only task-scoped source/test changes plus agentplane task artifacts are present."
  Verification: |-
    Command: npm test -- --run tests/components/catalog-modal-chat.test.tsx tests/components/ai-chat.test.tsx. Result: pass. Evidence: 2 files and 12 tests passed. Scope: accessible icon controls, maximize/restore state, suggestion visibility, transcript persistence and chat transport.

    Command: npm run lint. Result: pass. Evidence: ESLint exited 0. Scope: repository lint rules.

    Command: npm run typecheck. Result: pass. Evidence: tsc --noEmit exited 0. Scope: TypeScript compatibility.

    Command: npm run build. Result: pass. Evidence: Next.js production build compiled and generated all routes. Scope: production compilation and static generation.

    Command: git diff --check. Result: pass. Evidence: no output and exit 0. Scope: task diff whitespace integrity.

    Command: ap doctor && node .agentplane/policy/check-routing.mjs. Result: pass. Evidence: doctor OK with no warnings/errors and policy routing OK. Scope: AgentPlane workflow and policy integrity.

    Command: Playwright CLI local Chromium inspection at 1440x1000 and 375x667. Result: pass. Evidence: manual resize changed 448x600 to 606x702; maximize after resize produced 1408x968 with resize disabled; restore returned 606x702; narrow viewport constrained the dialog to 343x567 at 16px horizontal inset. Scope: actual browser resize/maximize/restore and responsive viewport bounds.

    Command: git status --short --untracked-files=all. Result: pass. Evidence: only components/chat-bot.tsx, the two focused test files, and task 202608051048-ZHJ7MN artifacts are present. Scope: final task change set.

    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-05T10:54:31.739Z — VERIFY — ok

    By: CODER

    Note: Verified: all declared checks pass; focused tests cover icon controls and suggestion hiding, and local Chromium confirms resize, maximize/restore after resize, and narrow-viewport bounds.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-05T10:54:30.778Z, excerpt_hash=sha256:25fcc1b48376a9196778b52b957b0de3a8b2327a99b2f7fe1a2c8eac1a8eddc9

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608051048-ZHJ7MN/blueprint/resolved-snapshot.json
    - old_digest: 15c2a1da43206e2d5bd4880db49e62d797926320d1e557c53f86188a8940ee13
    - current_digest: 15c2a1da43206e2d5bd4880db49e62d797926320d1e557c53f86188a8940ee13
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608051048-ZHJ7MN

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane task verify-show 202608051048-ZHJ7MN
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-05T10:54:39.413Z — VERIFY — ok

    By: CODER

    Note: verified-202608051048-ZHJ7MN
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-05T10:54:31.887Z, excerpt_hash=sha256:25fcc1b48376a9196778b52b957b0de3a8b2327a99b2f7fe1a2c8eac1a8eddc9

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608051048-ZHJ7MN/blueprint/resolved-snapshot.json
    - old_digest: 15c2a1da43206e2d5bd4880db49e62d797926320d1e557c53f86188a8940ee13
    - current_digest: 15c2a1da43206e2d5bd4880db49e62d797926320d1e557c53f86188a8940ee13
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608051048-ZHJ7MN

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane task complete 202608051048-ZHJ7MN --result verified-202608051048-ZHJ7MN --commit 205e635081a3aeab8b4e6427ce939782a62e71e3
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert only the task-scoped changes in components/chat-bot.tsx and the focused chat tests; leave unrelated repository history and artifacts untouched."
  Findings: "None at planning time."
id_source: "generated"
---
## Summary

Improve the Willow assistant chat window controls and first-use behavior without changing the shared Modal component or chat transport.

## Scope

Modify components/chat-bot.tsx and focused chat component tests only. Replace the header Close text with an accessible X icon button; add user-controlled resizing plus maximize/restore; hide suggestion buttons as soon as the transcript contains the first user message, including restored transcripts. Preserve streaming, persistence, focus trapping, and mobile usability.

## Plan

1. Add local chat window size/maximized state and accessible close/maximize controls in components/chat-bot.tsx. 2. Make the non-maximized dialog resizable within viewport bounds while keeping a usable narrow-screen layout. 3. Derive suggestion visibility from whether any user text entry exists. 4. Add focused component coverage for icon controls, maximize/restore, resize affordance, and suggestion disappearance after the first user message. 5. Run the declared verification commands and inspect the final diff/status.

## Verify Steps

1. Run npm test -- --run tests/components/catalog-modal-chat.test.tsx tests/components/ai-chat.test.tsx; expected: all focused chat/modal tests pass and assert the accessible Close icon, maximize/restore controls, resize capability, and suggestion buttons disappearing after the first user message/restored user history. 2. Run npm run lint; expected: ESLint exits successfully. 3. Run npm run typecheck; expected: TypeScript exits successfully. 4. Run npm run build; expected: Next.js production build succeeds. 5. Run git diff --check; expected: no whitespace errors. 6. Run ap doctor and node .agentplane/policy/check-routing.mjs; expected: both pass. 7. Inspect git status --short --untracked-files=all; expected: only task-scoped source/test changes plus agentplane task artifacts are present.

## Verification

Command: npm test -- --run tests/components/catalog-modal-chat.test.tsx tests/components/ai-chat.test.tsx. Result: pass. Evidence: 2 files and 12 tests passed. Scope: accessible icon controls, maximize/restore state, suggestion visibility, transcript persistence and chat transport.

Command: npm run lint. Result: pass. Evidence: ESLint exited 0. Scope: repository lint rules.

Command: npm run typecheck. Result: pass. Evidence: tsc --noEmit exited 0. Scope: TypeScript compatibility.

Command: npm run build. Result: pass. Evidence: Next.js production build compiled and generated all routes. Scope: production compilation and static generation.

Command: git diff --check. Result: pass. Evidence: no output and exit 0. Scope: task diff whitespace integrity.

Command: ap doctor && node .agentplane/policy/check-routing.mjs. Result: pass. Evidence: doctor OK with no warnings/errors and policy routing OK. Scope: AgentPlane workflow and policy integrity.

Command: Playwright CLI local Chromium inspection at 1440x1000 and 375x667. Result: pass. Evidence: manual resize changed 448x600 to 606x702; maximize after resize produced 1408x968 with resize disabled; restore returned 606x702; narrow viewport constrained the dialog to 343x567 at 16px horizontal inset. Scope: actual browser resize/maximize/restore and responsive viewport bounds.

Command: git status --short --untracked-files=all. Result: pass. Evidence: only components/chat-bot.tsx, the two focused test files, and task 202608051048-ZHJ7MN artifacts are present. Scope: final task change set.

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-05T10:54:31.739Z — VERIFY — ok

By: CODER

Note: Verified: all declared checks pass; focused tests cover icon controls and suggestion hiding, and local Chromium confirms resize, maximize/restore after resize, and narrow-viewport bounds.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-05T10:54:30.778Z, excerpt_hash=sha256:25fcc1b48376a9196778b52b957b0de3a8b2327a99b2f7fe1a2c8eac1a8eddc9

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608051048-ZHJ7MN/blueprint/resolved-snapshot.json
- old_digest: 15c2a1da43206e2d5bd4880db49e62d797926320d1e557c53f86188a8940ee13
- current_digest: 15c2a1da43206e2d5bd4880db49e62d797926320d1e557c53f86188a8940ee13
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608051048-ZHJ7MN

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane task verify-show 202608051048-ZHJ7MN
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-05T10:54:39.413Z — VERIFY — ok

By: CODER

Note: verified-202608051048-ZHJ7MN
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-05T10:54:31.887Z, excerpt_hash=sha256:25fcc1b48376a9196778b52b957b0de3a8b2327a99b2f7fe1a2c8eac1a8eddc9

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608051048-ZHJ7MN/blueprint/resolved-snapshot.json
- old_digest: 15c2a1da43206e2d5bd4880db49e62d797926320d1e557c53f86188a8940ee13
- current_digest: 15c2a1da43206e2d5bd4880db49e62d797926320d1e557c53f86188a8940ee13
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608051048-ZHJ7MN

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane task complete 202608051048-ZHJ7MN --result verified-202608051048-ZHJ7MN --commit 205e635081a3aeab8b4e6427ce939782a62e71e3
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert only the task-scoped changes in components/chat-bot.tsx and the focused chat tests; leave unrelated repository history and artifacts untouched.

## Findings

None at planning time.
