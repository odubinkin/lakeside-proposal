---
id: "202608041028-N25BTC"
title: "Make proposal add-ons optional"
result_summary: "Proposal add-ons are optional without changing selection, pricing, or persistence"
risk_level: "low"
status: "DONE"
priority: "med"
owner: "CODER"
revision: 13
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "frontend"
verify:
  - "pnpm lint"
  - "pnpm build"
  - "pnpm exec tsc --noEmit"
plan_approval:
  state: "approved"
  updated_at: "2026-08-04T10:29:29.025Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-04T10:30:13.227Z"
  updated_by: "CODER"
  note: "Add-ons are optional; validation no longer rejects empty selections, while selection, pricing, saving, and unrelated required fields remain intact."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-08-04T10:30:21.239Z"
  updated_by: "EVALUATOR"
  note: "The scoped validation change correctly makes add-ons optional without changing selection, pricing, or persistence behavior."
  evaluated_sha: "5fbed1ed4f45566069fcdb8bd8bc36c3679e1d3a"
  blueprint_digest: "5077931c9f0ef4b3a8197b501a483718eca26905b42052a132dc882470c1ef9f"
  evidence_refs:
    - ".agentplane/tasks/202608041028-N25BTC/README.md"
    - ".agentplane/tasks/202608041028-N25BTC/quality/20260804-103021239-recovery-context/quality-report.json"
    - ".agentplane/tasks/202608041028-N25BTC/quality/20260804-103021239-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202608041028-N25BTC/quality/20260804-103021239-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202608041028-N25BTC/blueprint/resolved-snapshot.json"
    - "commit 5fbed1ed4f45566069fcdb8bd8bc36c3679e1d3a"
    - "pnpm lint; pnpm build; pnpm exec tsc --noEmit; focused rg assertion; git diff --check"
  findings:
    - "The empty addOnIds case no longer produces an error; obsolete error types and ARIA references were removed, and the legend now identifies the group as optional."
commit:
  hash: "5fbed1ed4f45566069fcdb8bd8bc36c3679e1d3a"
  message: "🚧 N25BTC frontend: make proposal add-ons optional"
comments:
  -
    author: "CODER"
    body: "Start: make proposal add-ons optional while preserving selection, pricing, saving, and all unrelated validation."
  -
    author: "CODER"
    body: "Verified: proposals can be generated with zero add-ons; lint, build, TypeScript, focused validation assertions, routing, doctor, and evaluator all pass."
events:
  -
    type: "status"
    at: "2026-08-04T10:29:33.622Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: make proposal add-ons optional while preserving selection, pricing, saving, and all unrelated validation."
  -
    type: "verify"
    at: "2026-08-04T10:30:13.227Z"
    author: "CODER"
    state: "ok"
    note: "Add-ons are optional; validation no longer rejects empty selections, while selection, pricing, saving, and unrelated required fields remain intact."
  -
    type: "status"
    at: "2026-08-04T10:30:27.288Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: proposals can be generated with zero add-ons; lint, build, TypeScript, focused validation assertions, routing, doctor, and evaluator all pass."
doc_version: 3
doc_updated_at: "2026-08-04T10:30:27.289Z"
doc_updated_by: "CODER"
description: "Allow /proposals/new and /proposals/edit submissions with no additional options selected, removing the unnecessary Select at least one additional option validation error while preserving add-on selection and pricing behavior."
sections:
  Summary: "Allow proposals to be generated and edited with no additional options selected."
  Scope: "Modify only components/proposal-form.tsx validation and add-ons accessibility/error plumbing. Preserve add-on selection, pricing, draft saving, and all other required-field validation."
  Plan: "1. Remove addOnIds from required validation inputs and errors. 2. Update the add-ons fieldset semantics to describe options as optional and remove unreachable error wiring. 3. Run lint, production build, TypeScript, and a focused source assertion."
  Verify Steps: "1. Run pnpm lint. Expected: ESLint exits successfully. 2. Run pnpm build. Expected: Next.js production build succeeds. 3. Run pnpm exec tsc --noEmit. Expected: TypeScript exits successfully. 4. Run rg -n 'Select at least one additional option|add-ons-error|Additional options \\(required\\)' components/proposal-form.tsx. Expected: no matches. 5. Review the diff. Expected: empty addOnIds no longer creates a validation error, while add-on selection, pricing, and saved addOnIds remain unchanged."
  Verification: |-
    Pending execution.

    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-04T10:30:13.227Z — VERIFY — ok

    By: CODER

    Note: Add-ons are optional; validation no longer rejects empty selections, while selection, pricing, saving, and unrelated required fields remain intact.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-04T10:29:33.622Z, excerpt_hash=sha256:a50e6b3e2eae60fb2b8a134db4a200f0d75ec8eb4c913d7a38a2597161d1c75e

    Details:

    Command: pnpm lint | Result: pass | Evidence: ESLint exited 0. | Scope: proposal form and repository lint.
    Command: pnpm build | Result: pass | Evidence: Next.js compiled and generated proposal routes. | Scope: production build.
    Command: pnpm exec tsc --noEmit | Result: pass | Evidence: TypeScript exited 0. | Scope: project type safety.
    Command: rg focused validation strings | Result: pass | Evidence: no obsolete required add-ons error or ARIA wiring remains. | Scope: components/proposal-form.tsx.
    Command: git diff --check; policy routing; ap doctor | Result: pass | Evidence: clean diff, routing OK, doctor OK. | Scope: patch and workflow hygiene.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608041028-N25BTC/blueprint/resolved-snapshot.json
    - old_digest: 5077931c9f0ef4b3a8197b501a483718eca26905b42052a132dc882470c1ef9f
    - current_digest: 5077931c9f0ef4b3a8197b501a483718eca26905b42052a132dc882470c1ef9f
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608041028-N25BTC

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane task verify-show 202608041028-N25BTC
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert the scoped proposal-form validation change to restore the prior add-ons requirement."
  Findings: "None."
id_source: "generated"
---
## Summary

Allow proposals to be generated and edited with no additional options selected.

## Scope

Modify only components/proposal-form.tsx validation and add-ons accessibility/error plumbing. Preserve add-on selection, pricing, draft saving, and all other required-field validation.

## Plan

1. Remove addOnIds from required validation inputs and errors. 2. Update the add-ons fieldset semantics to describe options as optional and remove unreachable error wiring. 3. Run lint, production build, TypeScript, and a focused source assertion.

## Verify Steps

1. Run pnpm lint. Expected: ESLint exits successfully. 2. Run pnpm build. Expected: Next.js production build succeeds. 3. Run pnpm exec tsc --noEmit. Expected: TypeScript exits successfully. 4. Run rg -n 'Select at least one additional option|add-ons-error|Additional options \(required\)' components/proposal-form.tsx. Expected: no matches. 5. Review the diff. Expected: empty addOnIds no longer creates a validation error, while add-on selection, pricing, and saved addOnIds remain unchanged.

## Verification

Pending execution.

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-04T10:30:13.227Z — VERIFY — ok

By: CODER

Note: Add-ons are optional; validation no longer rejects empty selections, while selection, pricing, saving, and unrelated required fields remain intact.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-04T10:29:33.622Z, excerpt_hash=sha256:a50e6b3e2eae60fb2b8a134db4a200f0d75ec8eb4c913d7a38a2597161d1c75e

Details:

Command: pnpm lint | Result: pass | Evidence: ESLint exited 0. | Scope: proposal form and repository lint.
Command: pnpm build | Result: pass | Evidence: Next.js compiled and generated proposal routes. | Scope: production build.
Command: pnpm exec tsc --noEmit | Result: pass | Evidence: TypeScript exited 0. | Scope: project type safety.
Command: rg focused validation strings | Result: pass | Evidence: no obsolete required add-ons error or ARIA wiring remains. | Scope: components/proposal-form.tsx.
Command: git diff --check; policy routing; ap doctor | Result: pass | Evidence: clean diff, routing OK, doctor OK. | Scope: patch and workflow hygiene.

BlueprintSnapshotRef:
- state: current
- path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608041028-N25BTC/blueprint/resolved-snapshot.json
- old_digest: 5077931c9f0ef4b3a8197b501a483718eca26905b42052a132dc882470c1ef9f
- current_digest: 5077931c9f0ef4b3a8197b501a483718eca26905b42052a132dc882470c1ef9f
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608041028-N25BTC

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane task verify-show 202608041028-N25BTC
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the scoped proposal-form validation change to restore the prior add-ons requirement.

## Findings

None.
