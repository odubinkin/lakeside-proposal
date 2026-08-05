---
id: "202608051152-6SNRED"
title: "Show form tool progress when streaming begins"
result_summary: "Early form tool progress during argument streaming"
status: "DONE"
priority: "med"
owner: "CODER"
revision: 16
origin:
  system: "manual"
depends_on: []
tags:
  - "backend"
  - "code"
  - "frontend"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-08-05T11:52:45.726Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-05T11:56:50.351Z"
  updated_by: "CODER"
  note: "Verified early progress rendering before validated form mutation with 110 passing tests, TypeScript, lint, and production build."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-08-05T11:56:19.574Z"
  updated_by: "EVALUATOR"
  note: "Early form-tool progress is emitted and rendered before complete arguments while execution remains validation-gated."
  evaluated_sha: "37aecfd26a10590fe48cf8df439f397f10deaca4"
  blueprint_digest: "6e5b15ff2575abca06f49655d600a281c23954ceddcdb237b0726fe04dd36576"
  evidence_refs:
    - ".agentplane/tasks/202608051152-6SNRED/README.md"
    - ".agentplane/tasks/202608051152-6SNRED/quality/20260805-115619574-recovery-context/quality-report.json"
    - ".agentplane/tasks/202608051152-6SNRED/quality/20260805-115619574-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202608051152-6SNRED/quality/20260805-115619574-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202608051152-6SNRED/blueprint/resolved-snapshot.json"
    - "npm test: 13 files, 110 tests passed; npm run typecheck; npm run lint; npm run build; git diff --check"
  findings:
    - "Focused delayed-stream coverage proves the filling status appears before onApplyPatch; full tests, types, lint, build, and diff checks pass."
commit:
  hash: "3943ce256934af9e2df3a9c0f19c60d88c8b256b"
  message: "🚧 6SNRED task: record evaluator quality review"
comments:
  -
    author: "CODER"
    body: "Start: Implement early form-tool progress streaming and focused lifecycle tests while preserving validated execution, cancellation, and continuation behavior."
  -
    author: "CODER"
    body: "Verified: verified-202608051152-6SNRED. Guided shortcut recorded verification and is closing the direct task with traceable commit metadata."
  -
    author: "CODER"
    body: "Verified: early form-tool progress renders before complete arguments arrive, while form execution remains validation-gated."
events:
  -
    type: "status"
    at: "2026-08-05T11:52:50.868Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement early form-tool progress streaming and focused lifecycle tests while preserving validated execution, cancellation, and continuation behavior."
  -
    type: "verify"
    at: "2026-08-05T11:55:35.034Z"
    author: "CODER"
    state: "ok"
    note: "Focused stream, route, server, and chat UI tests passed (41/41); the complete suite passed (110/110); TypeScript, ESLint, production build, and git diff whitespace checks all passed. The delayed-stream component test confirms the filling indicator appears before form mutation."
  -
    type: "verify"
    at: "2026-08-05T11:56:29.617Z"
    author: "CODER"
    state: "ok"
    note: "verified-202608051152-6SNRED"
  -
    type: "verify"
    at: "2026-08-05T11:56:44.253Z"
    author: "CODER"
    state: "ok"
    note: "verified-202608051152-6SNRED"
  -
    type: "status"
    at: "2026-08-05T11:56:44.413Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: verified-202608051152-6SNRED. Guided shortcut recorded verification and is closing the direct task with traceable commit metadata."
  -
    type: "verify"
    at: "2026-08-05T11:56:50.351Z"
    author: "CODER"
    state: "ok"
    note: "Verified early progress rendering before validated form mutation with 110 passing tests, TypeScript, lint, and production build."
  -
    type: "status"
    at: "2026-08-05T11:57:16.006Z"
    author: "CODER"
    from: "DONE"
    to: "DONE"
    note: "Verified: early form-tool progress renders before complete arguments arrive, while form execution remains validation-gated."
doc_version: 3
doc_updated_at: "2026-08-05T11:57:16.009Z"
doc_updated_by: "CODER"
description: "Emit and render form-tool progress as soon as the provider starts streaming a tool call, while preserving validated execution, cancellation, transcript recovery, and completion behavior."
sections:
  Summary: "Show the form-editing progress indicator as soon as the AI provider begins streaming a validated form-tool call, instead of waiting for the complete tool arguments and provider stream termination."
  Scope: "Update the assistant adapter/public stream lifecycle and chat UI state needed for an early form-tool progress event. Preserve complete argument validation before execution, the existing text preamble, a single persisted tool status, cancellation/interruption recovery, completion continuation, and unrelated chat behavior. Expected implementation and tests are limited to lib/ai/server/assistant.ts, lib/ai/server/openrouter-adapter.ts, app/api/ai/chat/route.ts, lib/ai/contracts.ts, lib/ai/stream.ts, components/chat-bot.tsx, and focused tests under tests/unit and tests/components. No network, deployment, provider configuration, prompt, or unrelated UI changes."
  Plan: "Emit an early tool-start lifecycle event, show and reuse one filling status in the chat UI, retain validation before execution, cover delayed tool completion with focused tests, and validate typecheck, lint, build, diff, and repository state."
  Verify Steps: "1. Run npm test -- --run tests/unit/ai-server.test.ts tests/unit/ai-route.test.ts tests/unit/ai-stream-storage.test.ts tests/components/ai-chat.test.tsx. Expected: provider normalization emits tool start before the final call; the public protocol accepts the ordered lifecycle; the UI shows Filling in the form… before complete arguments arrive; existing continuation and interruption tests pass. 2. Run npm run typecheck. Expected: all internal/public event unions and consumers are exhaustive and type-safe. 3. Run npm run lint. Expected: no lint regressions. 4. Run npm run build. Expected: the production Next.js build succeeds. 5. Run git diff --check and git status --short --untracked-files=all. Expected: no whitespace errors and only intentional task files plus the pre-existing user-owned .agentplane task README change are present."
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-05T11:55:35.034Z — VERIFY — ok

    By: CODER

    Note: Focused stream, route, server, and chat UI tests passed (41/41); the complete suite passed (110/110); TypeScript, ESLint, production build, and git diff whitespace checks all passed. The delayed-stream component test confirms the filling indicator appears before form mutation.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-05T11:52:50.868Z, excerpt_hash=sha256:833a989572fd1304588ced52e1d2c4b7e0c85f24ba7a2c9e9d70de5d0dcba1fd

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608051152-6SNRED/blueprint/resolved-snapshot.json
    - old_digest: 6e5b15ff2575abca06f49655d600a281c23954ceddcdb237b0726fe04dd36576
    - current_digest: 6e5b15ff2575abca06f49655d600a281c23954ceddcdb237b0726fe04dd36576
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608051152-6SNRED

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane task verify-show 202608051152-6SNRED
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-05T11:56:29.617Z — VERIFY — ok

    By: CODER

    Note: verified-202608051152-6SNRED
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-05T11:55:35.094Z, excerpt_hash=sha256:833a989572fd1304588ced52e1d2c4b7e0c85f24ba7a2c9e9d70de5d0dcba1fd

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608051152-6SNRED/blueprint/resolved-snapshot.json
    - old_digest: 6e5b15ff2575abca06f49655d600a281c23954ceddcdb237b0726fe04dd36576
    - current_digest: 6e5b15ff2575abca06f49655d600a281c23954ceddcdb237b0726fe04dd36576
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608051152-6SNRED

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane task complete 202608051152-6SNRED --result verified-202608051152-6SNRED --commit 37aecfd26a10590fe48cf8df439f397f10deaca4
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-05T11:56:44.253Z — VERIFY — ok

    By: CODER

    Note: verified-202608051152-6SNRED
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-05T11:56:29.726Z, excerpt_hash=sha256:833a989572fd1304588ced52e1d2c4b7e0c85f24ba7a2c9e9d70de5d0dcba1fd

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608051152-6SNRED/blueprint/resolved-snapshot.json
    - old_digest: 6e5b15ff2575abca06f49655d600a281c23954ceddcdb237b0726fe04dd36576
    - current_digest: 6e5b15ff2575abca06f49655d600a281c23954ceddcdb237b0726fe04dd36576
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608051152-6SNRED

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane task complete 202608051152-6SNRED --result verified-202608051152-6SNRED --commit 3943ce256934af9e2df3a9c0f19c60d88c8b256b
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-05T11:56:50.351Z — VERIFY — ok

    By: CODER

    Note: Verified early progress rendering before validated form mutation with 110 passing tests, TypeScript, lint, and production build.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-05T11:56:44.413Z, excerpt_hash=sha256:833a989572fd1304588ced52e1d2c4b7e0c85f24ba7a2c9e9d70de5d0dcba1fd

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608051152-6SNRED/blueprint/resolved-snapshot.json
    - old_digest: 6e5b15ff2575abca06f49655d600a281c23954ceddcdb237b0726fe04dd36576
    - current_digest: 6e5b15ff2575abca06f49655d600a281c23954ceddcdb237b0726fe04dd36576
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608051152-6SNRED

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane commit 202608051152-6SNRED --close --unstage-others
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert only the task-scoped protocol, adapter, UI, and test changes. The previous behavior will again show form progress only after the complete tool call is received; no data migration or external rollback is required."
  Findings: ""
extensions:
  implementation_commit:
    hash: "37aecfd26a10590fe48cf8df439f397f10deaca4"
    message: "🚧 6SNRED task: show early form tool progress"
id_source: "generated"
---
## Summary

Show the form-editing progress indicator as soon as the AI provider begins streaming a validated form-tool call, instead of waiting for the complete tool arguments and provider stream termination.

## Scope

Update the assistant adapter/public stream lifecycle and chat UI state needed for an early form-tool progress event. Preserve complete argument validation before execution, the existing text preamble, a single persisted tool status, cancellation/interruption recovery, completion continuation, and unrelated chat behavior. Expected implementation and tests are limited to lib/ai/server/assistant.ts, lib/ai/server/openrouter-adapter.ts, app/api/ai/chat/route.ts, lib/ai/contracts.ts, lib/ai/stream.ts, components/chat-bot.tsx, and focused tests under tests/unit and tests/components. No network, deployment, provider configuration, prompt, or unrelated UI changes.

## Plan

Emit an early tool-start lifecycle event, show and reuse one filling status in the chat UI, retain validation before execution, cover delayed tool completion with focused tests, and validate typecheck, lint, build, diff, and repository state.

## Verify Steps

1. Run npm test -- --run tests/unit/ai-server.test.ts tests/unit/ai-route.test.ts tests/unit/ai-stream-storage.test.ts tests/components/ai-chat.test.tsx. Expected: provider normalization emits tool start before the final call; the public protocol accepts the ordered lifecycle; the UI shows Filling in the form… before complete arguments arrive; existing continuation and interruption tests pass. 2. Run npm run typecheck. Expected: all internal/public event unions and consumers are exhaustive and type-safe. 3. Run npm run lint. Expected: no lint regressions. 4. Run npm run build. Expected: the production Next.js build succeeds. 5. Run git diff --check and git status --short --untracked-files=all. Expected: no whitespace errors and only intentional task files plus the pre-existing user-owned .agentplane task README change are present.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-05T11:55:35.034Z — VERIFY — ok

By: CODER

Note: Focused stream, route, server, and chat UI tests passed (41/41); the complete suite passed (110/110); TypeScript, ESLint, production build, and git diff whitespace checks all passed. The delayed-stream component test confirms the filling indicator appears before form mutation.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-05T11:52:50.868Z, excerpt_hash=sha256:833a989572fd1304588ced52e1d2c4b7e0c85f24ba7a2c9e9d70de5d0dcba1fd

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608051152-6SNRED/blueprint/resolved-snapshot.json
- old_digest: 6e5b15ff2575abca06f49655d600a281c23954ceddcdb237b0726fe04dd36576
- current_digest: 6e5b15ff2575abca06f49655d600a281c23954ceddcdb237b0726fe04dd36576
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608051152-6SNRED

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane task verify-show 202608051152-6SNRED
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-05T11:56:29.617Z — VERIFY — ok

By: CODER

Note: verified-202608051152-6SNRED
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-05T11:55:35.094Z, excerpt_hash=sha256:833a989572fd1304588ced52e1d2c4b7e0c85f24ba7a2c9e9d70de5d0dcba1fd

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608051152-6SNRED/blueprint/resolved-snapshot.json
- old_digest: 6e5b15ff2575abca06f49655d600a281c23954ceddcdb237b0726fe04dd36576
- current_digest: 6e5b15ff2575abca06f49655d600a281c23954ceddcdb237b0726fe04dd36576
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608051152-6SNRED

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane task complete 202608051152-6SNRED --result verified-202608051152-6SNRED --commit 37aecfd26a10590fe48cf8df439f397f10deaca4
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-05T11:56:44.253Z — VERIFY — ok

By: CODER

Note: verified-202608051152-6SNRED
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-05T11:56:29.726Z, excerpt_hash=sha256:833a989572fd1304588ced52e1d2c4b7e0c85f24ba7a2c9e9d70de5d0dcba1fd

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608051152-6SNRED/blueprint/resolved-snapshot.json
- old_digest: 6e5b15ff2575abca06f49655d600a281c23954ceddcdb237b0726fe04dd36576
- current_digest: 6e5b15ff2575abca06f49655d600a281c23954ceddcdb237b0726fe04dd36576
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608051152-6SNRED

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane task complete 202608051152-6SNRED --result verified-202608051152-6SNRED --commit 3943ce256934af9e2df3a9c0f19c60d88c8b256b
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-05T11:56:50.351Z — VERIFY — ok

By: CODER

Note: Verified early progress rendering before validated form mutation with 110 passing tests, TypeScript, lint, and production build.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-05T11:56:44.413Z, excerpt_hash=sha256:833a989572fd1304588ced52e1d2c4b7e0c85f24ba7a2c9e9d70de5d0dcba1fd

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608051152-6SNRED/blueprint/resolved-snapshot.json
- old_digest: 6e5b15ff2575abca06f49655d600a281c23954ceddcdb237b0726fe04dd36576
- current_digest: 6e5b15ff2575abca06f49655d600a281c23954ceddcdb237b0726fe04dd36576
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608051152-6SNRED

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane commit 202608051152-6SNRED --close --unstage-others
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert only the task-scoped protocol, adapter, UI, and test changes. The previous behavior will again show form progress only after the complete tool call is received; no data migration or external rollback is required.

## Findings
