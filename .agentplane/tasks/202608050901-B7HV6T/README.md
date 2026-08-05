---
id: "202608050901-B7HV6T"
title: "Document auto-rendered proposal copy exclusions"
status: "DOING"
priority: "med"
owner: "DOCS"
revision: 10
origin:
  system: "manual"
depends_on: []
tags:
  - "docs"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-08-05T09:02:16.553Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-05T09:03:00.856Z"
  updated_by: "DOCS"
  note: "Command: compare docs/AI_BOT_IMPL.md against lib/ai/server/prompt.ts and docs/AI_BOT_SPEC.md with exact rg matches | Result: pass | Evidence: heading rationale and all seven excluded detail groups agree | Scope: docs/AI_BOT_IMPL.md prompt behavior. Links: lib/ai/server/prompt.ts and docs/AI_BOT_SPEC.md. Command: git diff --check and scoped diff inspection | Result: pass | Evidence: no whitespace errors and only the approved implementation-doc paragraph changed | Scope: docs/AI_BOT_IMPL.md. Command: node .agentplane/policy/check-routing.mjs and ap doctor | Result: pass | Evidence: policy routing OK and doctor OK | Scope: repository documentation policy."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-08-05T09:03:14.597Z"
  updated_by: "EVALUATOR"
  note: "AI_BOT_IMPL now accurately documents the shipped proposalText exclusion contract and agrees with both runtime and canonical specification sources."
  evaluated_sha: "120931775ddc621e195a0dd042f3f2e7abff64db"
  blueprint_digest: "4cf5ef68a5f919db79eac2990ad64bd1a87a16ecf35ea7f86061ac2eef0ff5e8"
  evidence_refs:
    - ".agentplane/tasks/202608050901-B7HV6T/README.md"
    - ".agentplane/tasks/202608050901-B7HV6T/quality/20260805-090314597-recovery-context/quality-report.json"
    - ".agentplane/tasks/202608050901-B7HV6T/quality/20260805-090314597-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202608050901-B7HV6T/quality/20260805-090314597-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202608050901-B7HV6T/blueprint/resolved-snapshot.json"
    - "docs/AI_BOT_IMPL.md"
  findings:
    - "The implementation guide lists the heading, area, bedroom and bathroom counts, selected add-ons or package components and individual prices, base villa price, and final total as automatically rendered details omitted from proposalText."
commit: null
comments:
  -
    author: "DOCS"
    body: "Start: document the shipped proposalText exclusions from the runtime prompt and canonical specification."
events:
  -
    type: "status"
    at: "2026-08-05T09:02:24.758Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: document the shipped proposalText exclusions from the runtime prompt and canonical specification."
  -
    type: "verify"
    at: "2026-08-05T09:03:00.856Z"
    author: "DOCS"
    state: "ok"
    note: "Command: compare docs/AI_BOT_IMPL.md against lib/ai/server/prompt.ts and docs/AI_BOT_SPEC.md with exact rg matches | Result: pass | Evidence: heading rationale and all seven excluded detail groups agree | Scope: docs/AI_BOT_IMPL.md prompt behavior. Links: lib/ai/server/prompt.ts and docs/AI_BOT_SPEC.md. Command: git diff --check and scoped diff inspection | Result: pass | Evidence: no whitespace errors and only the approved implementation-doc paragraph changed | Scope: docs/AI_BOT_IMPL.md. Command: node .agentplane/policy/check-routing.mjs and ap doctor | Result: pass | Evidence: policy routing OK and doctor OK | Scope: repository documentation policy."
doc_version: 3
doc_updated_at: "2026-08-05T09:03:00.947Z"
doc_updated_by: "DOCS"
description: "Update docs/AI_BOT_IMPL.md so the implemented prompt behavior explicitly documents every detail excluded from proposalText because the final proposal document renders it automatically."
sections:
  Summary: |-
    Document auto-rendered proposal copy exclusions

    Update docs/AI_BOT_IMPL.md so the implemented prompt behavior explicitly documents every detail excluded from proposalText because the final proposal document renders it automatically.
  Scope: |-
    - In scope: docs/AI_BOT_IMPL.md only.
    - Document the implemented proposalText prompt rule and its complete exclusions: heading, property area, bedroom count, bathroom count, selected add-ons or package components and individual prices, base villa price, and final proposal total.
    - State that the generated proposal document adds these details automatically.
    - Out of scope: runtime prompt, canonical specification, tests, and application behavior, which were updated in the preceding task.
  Plan: |-
    1. Extend the Prompt and trusted context section with the current proposalText exclusion contract.
    2. Compare the wording against lib/ai/server/prompt.ts and docs/AI_BOT_SPEC.md.
    3. Run documentation policy checks, inspect the scoped diff, and record verification evidence.
  Verify Steps: |-
    1. Compare the updated paragraph with `lib/ai/server/prompt.ts` and `docs/AI_BOT_SPEC.md`. Expected: every excluded detail and the automatic-rendering rationale agree, with no conflicting rule.
    2. Run `git diff --check` and inspect `git diff -- docs/AI_BOT_IMPL.md`. Expected: no whitespace errors and only the approved documentation update.
    3. Run `node .agentplane/policy/check-routing.mjs` and `ap doctor`. Expected: both checks pass.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-05T09:03:00.856Z — VERIFY — ok

    By: DOCS

    Note: Command: compare docs/AI_BOT_IMPL.md against lib/ai/server/prompt.ts and docs/AI_BOT_SPEC.md with exact rg matches | Result: pass | Evidence: heading rationale and all seven excluded detail groups agree | Scope: docs/AI_BOT_IMPL.md prompt behavior. Links: lib/ai/server/prompt.ts and docs/AI_BOT_SPEC.md. Command: git diff --check and scoped diff inspection | Result: pass | Evidence: no whitespace errors and only the approved implementation-doc paragraph changed | Scope: docs/AI_BOT_IMPL.md. Command: node .agentplane/policy/check-routing.mjs and ap doctor | Result: pass | Evidence: policy routing OK and doctor OK | Scope: repository documentation policy.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-05T09:02:24.758Z, excerpt_hash=sha256:386f7c7cbbe34704ffa00d9174b009a6ede26ce0449fdde99ef6fd6930396b6d

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608050901-B7HV6T/blueprint/resolved-snapshot.json
    - old_digest: 4cf5ef68a5f919db79eac2990ad64bd1a87a16ecf35ea7f86061ac2eef0ff5e8
    - current_digest: 4cf5ef68a5f919db79eac2990ad64bd1a87a16ecf35ea7f86061ac2eef0ff5e8
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608050901-B7HV6T

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane task verify-show 202608050901-B7HV6T
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert the documentation implementation and closure commits.
    - Re-run the documentation policy checks.
  Findings: ""
id_source: "generated"
---
## Summary

Document auto-rendered proposal copy exclusions

Update docs/AI_BOT_IMPL.md so the implemented prompt behavior explicitly documents every detail excluded from proposalText because the final proposal document renders it automatically.

## Scope

- In scope: docs/AI_BOT_IMPL.md only.
- Document the implemented proposalText prompt rule and its complete exclusions: heading, property area, bedroom count, bathroom count, selected add-ons or package components and individual prices, base villa price, and final proposal total.
- State that the generated proposal document adds these details automatically.
- Out of scope: runtime prompt, canonical specification, tests, and application behavior, which were updated in the preceding task.

## Plan

1. Extend the Prompt and trusted context section with the current proposalText exclusion contract.
2. Compare the wording against lib/ai/server/prompt.ts and docs/AI_BOT_SPEC.md.
3. Run documentation policy checks, inspect the scoped diff, and record verification evidence.

## Verify Steps

1. Compare the updated paragraph with `lib/ai/server/prompt.ts` and `docs/AI_BOT_SPEC.md`. Expected: every excluded detail and the automatic-rendering rationale agree, with no conflicting rule.
2. Run `git diff --check` and inspect `git diff -- docs/AI_BOT_IMPL.md`. Expected: no whitespace errors and only the approved documentation update.
3. Run `node .agentplane/policy/check-routing.mjs` and `ap doctor`. Expected: both checks pass.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-05T09:03:00.856Z — VERIFY — ok

By: DOCS

Note: Command: compare docs/AI_BOT_IMPL.md against lib/ai/server/prompt.ts and docs/AI_BOT_SPEC.md with exact rg matches | Result: pass | Evidence: heading rationale and all seven excluded detail groups agree | Scope: docs/AI_BOT_IMPL.md prompt behavior. Links: lib/ai/server/prompt.ts and docs/AI_BOT_SPEC.md. Command: git diff --check and scoped diff inspection | Result: pass | Evidence: no whitespace errors and only the approved implementation-doc paragraph changed | Scope: docs/AI_BOT_IMPL.md. Command: node .agentplane/policy/check-routing.mjs and ap doctor | Result: pass | Evidence: policy routing OK and doctor OK | Scope: repository documentation policy.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-05T09:02:24.758Z, excerpt_hash=sha256:386f7c7cbbe34704ffa00d9174b009a6ede26ce0449fdde99ef6fd6930396b6d

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608050901-B7HV6T/blueprint/resolved-snapshot.json
- old_digest: 4cf5ef68a5f919db79eac2990ad64bd1a87a16ecf35ea7f86061ac2eef0ff5e8
- current_digest: 4cf5ef68a5f919db79eac2990ad64bd1a87a16ecf35ea7f86061ac2eef0ff5e8
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608050901-B7HV6T

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane task verify-show 202608050901-B7HV6T
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the documentation implementation and closure commits.
- Re-run the documentation policy checks.

## Findings
