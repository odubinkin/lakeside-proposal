---
id: "202608050837-7DEV6F"
title: "Support streamed text before form tool calls"
status: "DOING"
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
  updated_at: "2026-08-05T08:37:32.205Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-05T08:41:38.171Z"
  updated_by: "CODER"
  note: "Passed focused and full Vitest suites (23/23 focused; 95/95 full), ESLint, TypeScript no-emit, Next.js production build, routing validation, AgentPlane doctor, and git diff check. Mixed text-before-tool streaming is accepted; the preamble remains visible; terminal form-tool summaries persist and enter only later model history; immediate continuation reconstructs one assistant message with content plus tool_calls."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue direct-mode task in current checkout."
events:
  -
    type: "status"
    at: "2026-08-05T08:37:41.705Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue direct-mode task in current checkout."
  -
    type: "verify"
    at: "2026-08-05T08:41:38.171Z"
    author: "CODER"
    state: "ok"
    note: "Passed focused and full Vitest suites (23/23 focused; 95/95 full), ESLint, TypeScript no-emit, Next.js production build, routing validation, AgentPlane doctor, and git diff check. Mixed text-before-tool streaming is accepted; the preamble remains visible; terminal form-tool summaries persist and enter only later model history; immediate continuation reconstructs one assistant message with content plus tool_calls."
doc_version: 3
doc_updated_at: "2026-08-05T08:41:38.246Z"
doc_updated_by: "CODER"
description: "Allow OpenRouter responses containing a streamed text preamble followed by edit_proposal_form; preserve the preamble in chat, show and persist the user-visible form-tool result, and include completed form-tool statuses in subsequent model history without durably storing raw tool calls."
sections:
  Summary: "Support valid OpenRouter responses that stream assistant text before requesting edit_proposal_form, while preserving the text and the user-visible form-tool outcome in chat history."
  Scope: "Modify the OpenRouter adapter, chat API stream state machine, chat client transcript/history mapping, prompt continuation reconstruction, and focused AI tests. Permit one text preamble followed by one valid edit_proposal_form call; reject text after a tool call, multiple calls, unknown tools, and invalid arguments. Keep non-empty preambles as completed assistant messages. Keep form-tool status entries visible and persisted, and include terminal form-tool summaries in subsequent model history without durably storing raw tool calls or injecting the current tool summary before its structured continuation. No network calls or provider smoke tests."
  Plan: "1. Allow streamed text followed by one validated edit_proposal_form call in the adapter and route. 2. Preserve a non-empty preamble and show the form-tool status separately. 3. Include terminal form-tool summaries in future model history but not before their immediate structured continuation. 4. Reconstruct mixed content and tool_calls correctly for continuation. 5. Add focused tests and run all declared checks."
  Verify Steps: "1. Run npm test -- --run tests/unit/ai-server.test.ts tests/unit/ai-route.test.ts tests/components/ai-chat.test.tsx and require exit code 0; verify coverage includes text-before-tool streaming, retained preamble, separate completed status, continuation ordering, and status inclusion in a later user request. 2. Run npm run lint and require exit code 0. 3. Run npm run build and require exit code 0. 4. Run node .agentplane/policy/check-routing.mjs and require exit code 0. 5. Run ap doctor and require no blocking findings. 6. Run git diff --check and inspect git status --short --untracked-files=all; require no whitespace errors or unintended files."
  Verification: |-
    Command: npm test -- --run tests/unit/ai-server.test.ts tests/unit/ai-route.test.ts tests/components/ai-chat.test.tsx. Result: pass. Evidence: 3 files and 23 tests passed, including mixed OpenRouter normalization, route sequencing, retained preamble, separate completed status, immediate continuation exclusion, subsequent-history inclusion, and localStorage persistence. Scope: focused AI server/route/client behavior. Command: npm test -- --run. Result: pass. Evidence: 13 files and 95 tests passed. Scope: full Vitest regression suite. Command: npm run lint. Result: pass. Evidence: ESLint completed with no findings. Scope: repository source and tests. Command: npm run build. Result: pass. Evidence: Next.js production build compiled and generated all routes including /api/ai/chat. Scope: production integration. Command: npx tsc --noEmit. Result: pass. Evidence: TypeScript emitted no diagnostics. Scope: static type safety. Command: node .agentplane/policy/check-routing.mjs. Result: pass. Evidence: policy routing OK. Scope: repository policy graph. Command: ap doctor. Result: pass. Evidence: errors=0, warnings=0; two informational fallback notes only. Scope: AgentPlane workspace health. Command: git diff --check. Result: pass. Evidence: no whitespace errors. Scope: task diff.

    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-05T08:41:38.171Z — VERIFY — ok

    By: CODER

    Note: Passed focused and full Vitest suites (23/23 focused; 95/95 full), ESLint, TypeScript no-emit, Next.js production build, routing validation, AgentPlane doctor, and git diff check. Mixed text-before-tool streaming is accepted; the preamble remains visible; terminal form-tool summaries persist and enter only later model history; immediate continuation reconstructs one assistant message with content plus tool_calls.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-05T08:41:37.805Z, excerpt_hash=sha256:e9d9ab8180ec2e28e80624da6fa9a9bdfd5c0331635c035dd0e96234a9f8e863

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608050837-7DEV6F/blueprint/resolved-snapshot.json
    - old_digest: 4c0a05f8530b1c2a0b29f29bdc9c955573c595daf5fb487ad739f68dfa7a6196
    - current_digest: 4c0a05f8530b1c2a0b29f29bdc9c955573c595daf5fb487ad739f68dfa7a6196
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608050837-7DEV6F

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane task verify-show 202608050837-7DEV6F
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert the task commit to restore the previous text-or-tool-only protocol and transcript behavior."
  Findings: "None."
id_source: "generated"
---
## Summary

Support valid OpenRouter responses that stream assistant text before requesting edit_proposal_form, while preserving the text and the user-visible form-tool outcome in chat history.

## Scope

Modify the OpenRouter adapter, chat API stream state machine, chat client transcript/history mapping, prompt continuation reconstruction, and focused AI tests. Permit one text preamble followed by one valid edit_proposal_form call; reject text after a tool call, multiple calls, unknown tools, and invalid arguments. Keep non-empty preambles as completed assistant messages. Keep form-tool status entries visible and persisted, and include terminal form-tool summaries in subsequent model history without durably storing raw tool calls or injecting the current tool summary before its structured continuation. No network calls or provider smoke tests.

## Plan

1. Allow streamed text followed by one validated edit_proposal_form call in the adapter and route. 2. Preserve a non-empty preamble and show the form-tool status separately. 3. Include terminal form-tool summaries in future model history but not before their immediate structured continuation. 4. Reconstruct mixed content and tool_calls correctly for continuation. 5. Add focused tests and run all declared checks.

## Verify Steps

1. Run npm test -- --run tests/unit/ai-server.test.ts tests/unit/ai-route.test.ts tests/components/ai-chat.test.tsx and require exit code 0; verify coverage includes text-before-tool streaming, retained preamble, separate completed status, continuation ordering, and status inclusion in a later user request. 2. Run npm run lint and require exit code 0. 3. Run npm run build and require exit code 0. 4. Run node .agentplane/policy/check-routing.mjs and require exit code 0. 5. Run ap doctor and require no blocking findings. 6. Run git diff --check and inspect git status --short --untracked-files=all; require no whitespace errors or unintended files.

## Verification

Command: npm test -- --run tests/unit/ai-server.test.ts tests/unit/ai-route.test.ts tests/components/ai-chat.test.tsx. Result: pass. Evidence: 3 files and 23 tests passed, including mixed OpenRouter normalization, route sequencing, retained preamble, separate completed status, immediate continuation exclusion, subsequent-history inclusion, and localStorage persistence. Scope: focused AI server/route/client behavior. Command: npm test -- --run. Result: pass. Evidence: 13 files and 95 tests passed. Scope: full Vitest regression suite. Command: npm run lint. Result: pass. Evidence: ESLint completed with no findings. Scope: repository source and tests. Command: npm run build. Result: pass. Evidence: Next.js production build compiled and generated all routes including /api/ai/chat. Scope: production integration. Command: npx tsc --noEmit. Result: pass. Evidence: TypeScript emitted no diagnostics. Scope: static type safety. Command: node .agentplane/policy/check-routing.mjs. Result: pass. Evidence: policy routing OK. Scope: repository policy graph. Command: ap doctor. Result: pass. Evidence: errors=0, warnings=0; two informational fallback notes only. Scope: AgentPlane workspace health. Command: git diff --check. Result: pass. Evidence: no whitespace errors. Scope: task diff.

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-05T08:41:38.171Z — VERIFY — ok

By: CODER

Note: Passed focused and full Vitest suites (23/23 focused; 95/95 full), ESLint, TypeScript no-emit, Next.js production build, routing validation, AgentPlane doctor, and git diff check. Mixed text-before-tool streaming is accepted; the preamble remains visible; terminal form-tool summaries persist and enter only later model history; immediate continuation reconstructs one assistant message with content plus tool_calls.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-05T08:41:37.805Z, excerpt_hash=sha256:e9d9ab8180ec2e28e80624da6fa9a9bdfd5c0331635c035dd0e96234a9f8e863

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608050837-7DEV6F/blueprint/resolved-snapshot.json
- old_digest: 4c0a05f8530b1c2a0b29f29bdc9c955573c595daf5fb487ad739f68dfa7a6196
- current_digest: 4c0a05f8530b1c2a0b29f29bdc9c955573c595daf5fb487ad739f68dfa7a6196
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608050837-7DEV6F

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane task verify-show 202608050837-7DEV6F
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the task commit to restore the previous text-or-tool-only protocol and transcript behavior.

## Findings

None.
