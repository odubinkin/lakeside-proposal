---
id: "202611090913-NM0CN3"
title: "Upgrade runtime and dependencies and resolve security advisories"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 16
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-11-09T09:14:44.503Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-11-09T09:29:25.724Z"
  updated_by: "CODER"
  note: "Verified clean npm ci, zero npm and pnpm audit vulnerabilities, Node LTS selectors, TypeScript 7.0.2 compiler, Next.js 16.4.5, lint, typecheck, 111 unit/component tests with coverage, 5 Chromium E2E tests, production and Docker builds, frozen pnpm lockfile, routing and doctor checks."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue direct-mode task in current checkout."
events:
  -
    type: "status"
    at: "2026-11-09T09:14:55.772Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue direct-mode task in current checkout."
  -
    type: "verify"
    at: "2026-11-09T09:29:25.724Z"
    author: "CODER"
    state: "ok"
    note: "Verified clean npm ci, zero npm and pnpm audit vulnerabilities, Node LTS selectors, TypeScript 7.0.2 compiler, Next.js 16.4.5, lint, typecheck, 111 unit/component tests with coverage, 5 Chromium E2E tests, production and Docker builds, frozen pnpm lockfile, routing and doctor checks."
doc_version: 3
doc_updated_at: "2026-11-09T09:29:25.798Z"
doc_updated_by: "CODER"
description: "Use latest stable Node.js LTS, TypeScript 7 if published, and latest stable Next.js; resolve dependency vulnerabilities and verify application checks. User approved plan and network access."
sections:
  Summary: "Upgrade the runtime, compiler, framework, and vulnerable dependencies under the user-approved plan."
  Scope: "Dependency manifests and lockfiles, Dockerfile, Node version configuration, README prerequisites, and compatibility fixes required by the upgrades. No external publication. Network access approved by the user."
  Plan: "CODER: confirm current stable versions; upgrade to latest Node LTS, TypeScript 7 and stable Next.js; remediate audit findings; align npm and pnpm lockfiles; run clean install, audit, lint, typecheck, coverage, build and E2E tests; record evidence and finish locally."
  Verify Steps: "Confirm installed Node LTS, TypeScript 7 and latest stable Next.js versions. Run npm ci, npm audit with zero vulnerabilities, npm run lint, npm run typecheck, npm run test:coverage, npm run build and npm run test:e2e. Check pnpm frozen-lockfile consistency, Docker build if daemon is available, ap doctor, routing validation, git diff --check and final git status."
  Verification: |-
    All checks passed using Node v26.13.0 LTS and npm 11.20.0. Command: npx --no-install tsc --version; Result: pass; Evidence: Version 7.0.2; Scope: native project compiler. Command: npm ci; Result: pass; Evidence: 597 packages installed, found 0 vulnerabilities; Scope: reproducible clean install. Commands: npm audit --json and pnpm audit --json; Result: pass; Evidence: zero findings at every severity; Scope: complete dependency graphs. Commands: npm run lint and npm run typecheck; Result: pass, including final E2E test change; Scope: project sources and TypeScript 7. Command: npm run test:coverage; Result: pass; Evidence: 13 files, 111 tests, 95.52% statements, 93.49% branches, 96.22% functions, 97.2% lines; Scope: existing unit/component suite. Command: npm run build; Result: pass; Evidence: TypeScript 7 gate and optimized Next.js 16.4.5 build. Command: CI=1 npm run test:e2e with repository-local PLAYWRIGHT_BROWSERS_PATH; Result: pass; Evidence: 5 passed in 26.3s; Scope: full Chromium browser suite, mobile/print/accessibility and Willow flow. Command: pnpm install --lockfile-only --frozen-lockfile --ignore-scripts; Result: pass; Scope: pnpm lockfile consistency. Command: docker build -t lakeside-proposal:nm0cn3 .; Result: pass; Evidence: clean install reports 0 vulnerabilities and production image builds. Command: docker run --rm --entrypoint node lakeside-proposal:nm0cn3 --version; Result: pass; Evidence: v26.13.0; image also reports Next.js 16.4.5. Commands: ap doctor and node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: doctor OK, routing OK; unrelated pre-existing managed hook shim warning documented. Command: git diff --check; Result: pass. No mandatory checks skipped. Generated Next.js dev-server additions to AGENTS.md were reverted; repository policy is unchanged.

    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-11-09T09:29:25.724Z — VERIFY — ok

    By: CODER

    Note: Verified clean npm ci, zero npm and pnpm audit vulnerabilities, Node LTS selectors, TypeScript 7.0.2 compiler, Next.js 16.4.5, lint, typecheck, 111 unit/component tests with coverage, 5 Chromium E2E tests, production and Docker builds, frozen pnpm lockfile, routing and doctor checks.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-11-09T09:29:25.280Z, excerpt_hash=sha256:ab8e425c22b94439f99f81bc9745c16e6b9e02984752f57a2efc5abd46439592

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202611090913-NM0CN3/blueprint/resolved-snapshot.json
    - old_digest: c86cf696edc033ed779bce8178bcf8ab695af4976e1e477cffdfe3e153ef4a69
    - current_digest: c86cf696edc033ed779bce8178bcf8ab695af4976e1e477cffdfe3e153ef4a69
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202611090913-NM0CN3

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane task verify-show 202611090913-NM0CN3
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: do not repeat task verify-show; complete the approved semantic work and verification before recomputing the route
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert only this task implementation commit to restore dependency manifests, lockfiles and runtime configuration; reinstall dependencies from the restored lockfile."
  Findings: |-
    Initial repository clean on main. Docker uses Node 22; TypeScript is pinned to 5.7.3; Next.js is 16.3.0. Stable registry tags report Next.js 16.4.5 and TypeScript 7.0.2. Node release page identifies Node 26 as the newest LTS.

    - Observation: Stable TypeScript 7 has no legacy compiler API; ESLint requires TypeScript 6. Node 26 native Web Storage shadows jsdom storage in Vitest 4. Latest shadcn CLI retains unpatched deepmerge; project only imports its CSS.
      Impact: Direct TypeScript replacement causes peer conflicts, Node upgrade breaks browser-storage tests, and updating shadcn alone cannot reach zero audit findings.
      Resolution: Use Microsoft recommended TypeScript 7 native alias plus TypeScript 6 compatibility API; disable native Web Storage in Vitest workers; vendor unchanged MIT-licensed shadcn CSS and remove unused CLI; override vulnerable minimatch versions to 11.0.1. User requested moving LTS selectors instead of exact Node pins.

    - Observation: After storage compatibility was fixed, one coverage run timed out under simultaneous build load; a standalone repeat passed all 111 tests. E2E repeatedly missed the 350 ms progress indicator even though the form was already completed successfully.
      Impact: A transient-state E2E assertion depended on wall-clock timing with the updated browser/toolchain.
      Resolution: Keep the progress assertion and all completion/persistence checks; install Playwright browser clock before page load, pause before sending, observe progress, and resume to verify completion. No production timing changes or test skips.

    - Observation: Command: CI=1 npm run test:e2e (PLAYWRIGHT_BROWSERS_PATH set to the repository cache); Result: pass; Evidence: 5 passed, including proposal creation/edit/delete, corrupt storage, accessibility/print/mobile checks, and Willow tool/transcript flow; Scope: complete Chromium E2E suite.
      Impact: The full browser contract is verified after the dependency and test-clock compatibility changes.
      Resolution: All declared functional checks have passed; zero audit findings remain in npm and pnpm. Final lint/typecheck and diff checks also pass.
id_source: "generated"
---
## Summary

Upgrade the runtime, compiler, framework, and vulnerable dependencies under the user-approved plan.

## Scope

Dependency manifests and lockfiles, Dockerfile, Node version configuration, README prerequisites, and compatibility fixes required by the upgrades. No external publication. Network access approved by the user.

## Plan

CODER: confirm current stable versions; upgrade to latest Node LTS, TypeScript 7 and stable Next.js; remediate audit findings; align npm and pnpm lockfiles; run clean install, audit, lint, typecheck, coverage, build and E2E tests; record evidence and finish locally.

## Verify Steps

Confirm installed Node LTS, TypeScript 7 and latest stable Next.js versions. Run npm ci, npm audit with zero vulnerabilities, npm run lint, npm run typecheck, npm run test:coverage, npm run build and npm run test:e2e. Check pnpm frozen-lockfile consistency, Docker build if daemon is available, ap doctor, routing validation, git diff --check and final git status.

## Verification

All checks passed using Node v26.13.0 LTS and npm 11.20.0. Command: npx --no-install tsc --version; Result: pass; Evidence: Version 7.0.2; Scope: native project compiler. Command: npm ci; Result: pass; Evidence: 597 packages installed, found 0 vulnerabilities; Scope: reproducible clean install. Commands: npm audit --json and pnpm audit --json; Result: pass; Evidence: zero findings at every severity; Scope: complete dependency graphs. Commands: npm run lint and npm run typecheck; Result: pass, including final E2E test change; Scope: project sources and TypeScript 7. Command: npm run test:coverage; Result: pass; Evidence: 13 files, 111 tests, 95.52% statements, 93.49% branches, 96.22% functions, 97.2% lines; Scope: existing unit/component suite. Command: npm run build; Result: pass; Evidence: TypeScript 7 gate and optimized Next.js 16.4.5 build. Command: CI=1 npm run test:e2e with repository-local PLAYWRIGHT_BROWSERS_PATH; Result: pass; Evidence: 5 passed in 26.3s; Scope: full Chromium browser suite, mobile/print/accessibility and Willow flow. Command: pnpm install --lockfile-only --frozen-lockfile --ignore-scripts; Result: pass; Scope: pnpm lockfile consistency. Command: docker build -t lakeside-proposal:nm0cn3 .; Result: pass; Evidence: clean install reports 0 vulnerabilities and production image builds. Command: docker run --rm --entrypoint node lakeside-proposal:nm0cn3 --version; Result: pass; Evidence: v26.13.0; image also reports Next.js 16.4.5. Commands: ap doctor and node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: doctor OK, routing OK; unrelated pre-existing managed hook shim warning documented. Command: git diff --check; Result: pass. No mandatory checks skipped. Generated Next.js dev-server additions to AGENTS.md were reverted; repository policy is unchanged.

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-11-09T09:29:25.724Z — VERIFY — ok

By: CODER

Note: Verified clean npm ci, zero npm and pnpm audit vulnerabilities, Node LTS selectors, TypeScript 7.0.2 compiler, Next.js 16.4.5, lint, typecheck, 111 unit/component tests with coverage, 5 Chromium E2E tests, production and Docker builds, frozen pnpm lockfile, routing and doctor checks.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-11-09T09:29:25.280Z, excerpt_hash=sha256:ab8e425c22b94439f99f81bc9745c16e6b9e02984752f57a2efc5abd46439592

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202611090913-NM0CN3/blueprint/resolved-snapshot.json
- old_digest: c86cf696edc033ed779bce8178bcf8ab695af4976e1e477cffdfe3e153ef4a69
- current_digest: c86cf696edc033ed779bce8178bcf8ab695af4976e1e477cffdfe3e153ef4a69
- route_changed: no
- safe_command: agentplane blueprint snapshot 202611090913-NM0CN3

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane task verify-show 202611090913-NM0CN3
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: do not repeat task verify-show; complete the approved semantic work and verification before recomputing the route
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert only this task implementation commit to restore dependency manifests, lockfiles and runtime configuration; reinstall dependencies from the restored lockfile.

## Findings

Initial repository clean on main. Docker uses Node 22; TypeScript is pinned to 5.7.3; Next.js is 16.3.0. Stable registry tags report Next.js 16.4.5 and TypeScript 7.0.2. Node release page identifies Node 26 as the newest LTS.

- Observation: Stable TypeScript 7 has no legacy compiler API; ESLint requires TypeScript 6. Node 26 native Web Storage shadows jsdom storage in Vitest 4. Latest shadcn CLI retains unpatched deepmerge; project only imports its CSS.
  Impact: Direct TypeScript replacement causes peer conflicts, Node upgrade breaks browser-storage tests, and updating shadcn alone cannot reach zero audit findings.
  Resolution: Use Microsoft recommended TypeScript 7 native alias plus TypeScript 6 compatibility API; disable native Web Storage in Vitest workers; vendor unchanged MIT-licensed shadcn CSS and remove unused CLI; override vulnerable minimatch versions to 11.0.1. User requested moving LTS selectors instead of exact Node pins.

- Observation: After storage compatibility was fixed, one coverage run timed out under simultaneous build load; a standalone repeat passed all 111 tests. E2E repeatedly missed the 350 ms progress indicator even though the form was already completed successfully.
  Impact: A transient-state E2E assertion depended on wall-clock timing with the updated browser/toolchain.
  Resolution: Keep the progress assertion and all completion/persistence checks; install Playwright browser clock before page load, pause before sending, observe progress, and resume to verify completion. No production timing changes or test skips.

- Observation: Command: CI=1 npm run test:e2e (PLAYWRIGHT_BROWSERS_PATH set to the repository cache); Result: pass; Evidence: 5 passed, including proposal creation/edit/delete, corrupt storage, accessibility/print/mobile checks, and Willow tool/transcript flow; Scope: complete Chromium E2E suite.
  Impact: The full browser contract is verified after the dependency and test-clock compatibility changes.
  Resolution: All declared functional checks have passed; zero audit findings remain in npm and pnpm. Final lint/typecheck and diff checks also pass.
