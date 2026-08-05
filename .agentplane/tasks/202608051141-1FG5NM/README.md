---
id: "202608051141-1FG5NM"
title: "Add production Docker deployment"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 15
origin:
  system: "manual"
depends_on: []
tags:
  - "ops"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-08-05T11:41:57.052Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-05T11:45:57.876Z"
  updated_by: "CODER"
  note: "verified-202608051141-1FG5NM"
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-08-05T11:45:47.376Z"
  updated_by: "EVALUATOR"
  note: "Docker deployment scope is implemented and all declared checks passed."
  evaluated_sha: "c79809274ff7bf3d22414097f8414e92ee515d2a"
  blueprint_digest: "1df8fac8628a53af4f0a1a9c0254abf44c582d9896f3e71104d4bee19c153505"
  evidence_refs:
    - ".agentplane/tasks/202608051141-1FG5NM/README.md"
    - ".agentplane/tasks/202608051141-1FG5NM/quality/20260805-114547376-recovery-context/quality-report.json"
    - ".agentplane/tasks/202608051141-1FG5NM/quality/20260805-114547376-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202608051141-1FG5NM/quality/20260805-114547376-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202608051141-1FG5NM/blueprint/resolved-snapshot.json"
  findings:
    - "No blocking quality findings; runtime routing depends on the documented external Traefik network, websecure entrypoint, and letsencrypt resolver."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue direct-mode task in current checkout."
events:
  -
    type: "status"
    at: "2026-08-05T11:42:05.268Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue direct-mode task in current checkout."
  -
    type: "verify"
    at: "2026-08-05T11:44:37.352Z"
    author: "CODER"
    state: "ok"
    note: "Verified production and local Compose rendering, AI environment passthrough, Traefik TLS labels, lint, type checking, standalone Next.js production build, Docker image build, and repository policy checks."
  -
    type: "verify"
    at: "2026-08-05T11:44:47.672Z"
    author: "CODER"
    state: "ok"
    note: "verified-202608051141-1FG5NM"
  -
    type: "verify"
    at: "2026-08-05T11:45:57.876Z"
    author: "CODER"
    state: "ok"
    note: "verified-202608051141-1FG5NM"
doc_version: 3
doc_updated_at: "2026-08-05T11:45:57.935Z"
doc_updated_by: "CODER"
description: "Add a production standalone Docker image, Traefik-enabled Compose deployment, local port override, AI assistant environment variables, and Docker launch documentation."
sections:
  Summary: "Provide a repeatable production Docker deployment for the Next.js application with Traefik HTTPS routing and a local port-publishing overlay."
  Scope: "Modify next.config.mjs and README.md; add Dockerfile, .dockerignore, docker-compose.yml, and docker-compose.local.yml. Pass OPENROUTER_API_KEY and OPENROUTER_MODEL at runtime. Route APP_DOMAIN through Traefik using the existing external traefik network and letsencrypt certificate resolver."
  Plan: "1. Enable Next.js standalone production output. 2. Add a multi-stage Node Docker image that builds and runs the standalone server as a non-root user. 3. Add production Compose configuration with AI environment passthrough and Traefik TLS labels. 4. Add a local Compose override publishing port 3000. 5. Document production and local Docker startup. 6. Validate Compose rendering, lint, types, production build, and the Docker image when Docker is available."
  Verify Steps: |-
    - APP_DOMAIN=app.example.com OPENROUTER_API_KEY=test-key OPENROUTER_MODEL=test-model docker compose -f docker-compose.yml config
    - APP_DOMAIN=app.example.com OPENROUTER_API_KEY=test-key OPENROUTER_MODEL=test-model docker compose -f docker-compose.yml -f docker-compose.local.yml config
    - Confirm the merged local Compose output publishes host port 3000 and preserves Traefik labels plus AI environment variables.
    - npm run lint
    - npm run typecheck
    - npm run build
    - docker build -t lakeside-proposal:verify . (when Docker is available; approved network access may be used to pull the base image or dependencies)
  Verification: |-
    - Command: APP_DOMAIN=app.example.com OPENROUTER_API_KEY=test-key OPENROUTER_MODEL=test-model docker compose -f docker-compose.yml config
      Result: pass
      Evidence: Rendered the app service with Host(app.example.com), websecure, TLS, letsencrypt, port 3000, and both AI variables.
      Scope: Production Compose configuration.
    - Command: APP_DOMAIN=app.example.com OPENROUTER_API_KEY=test-key OPENROUTER_MODEL=test-model docker compose -f docker-compose.yml -f docker-compose.local.yml config
      Result: pass
      Evidence: Preserved production labels and environment while publishing host port 3000 to container port 3000.
      Scope: Local Compose overlay.
    - Command: npm run lint
      Result: pass
      Evidence: ESLint completed without errors.
      Scope: Repository lint rules.
    - Command: npm run typecheck
      Result: pass
      Evidence: tsc --noEmit completed without errors.
      Scope: TypeScript project.
    - Command: npm run build
      Result: pass
      Evidence: Next.js 16.3.0 produced the optimized production build and all application routes.
      Scope: Standalone production build configuration.
    - Command: docker build -t lakeside-proposal:verify .
      Result: pass
      Evidence: Multi-stage node:22-alpine image built successfully, including the in-container production build and final standalone layers.
      Scope: Dockerfile and build context.
    - Command: git diff --check && ap doctor && node .agentplane/policy/check-routing.mjs
      Result: pass
      Evidence: No whitespace errors; Agentplane doctor reported zero warnings/errors and policy routing passed.
      Scope: Diff hygiene and repository policy.

    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-05T11:44:37.352Z — VERIFY — ok

    By: CODER

    Note: Verified production and local Compose rendering, AI environment passthrough, Traefik TLS labels, lint, type checking, standalone Next.js production build, Docker image build, and repository policy checks.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-05T11:44:37.073Z, excerpt_hash=sha256:1656b8113a0f031352a9c2e1149b0dbd33c8536c9f1038db736aedfb0414a22a

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608051141-1FG5NM/blueprint/resolved-snapshot.json
    - old_digest: 1df8fac8628a53af4f0a1a9c0254abf44c582d9896f3e71104d4bee19c153505
    - current_digest: 1df8fac8628a53af4f0a1a9c0254abf44c582d9896f3e71104d4bee19c153505
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608051141-1FG5NM

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane task verify-show 202608051141-1FG5NM
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-05T11:44:47.672Z — VERIFY — ok

    By: CODER

    Note: verified-202608051141-1FG5NM
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-05T11:44:37.411Z, excerpt_hash=sha256:1656b8113a0f031352a9c2e1149b0dbd33c8536c9f1038db736aedfb0414a22a

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608051141-1FG5NM/blueprint/resolved-snapshot.json
    - old_digest: 1df8fac8628a53af4f0a1a9c0254abf44c582d9896f3e71104d4bee19c153505
    - current_digest: 1df8fac8628a53af4f0a1a9c0254abf44c582d9896f3e71104d4bee19c153505
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608051141-1FG5NM

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane task complete 202608051141-1FG5NM --result verified-202608051141-1FG5NM --commit 6cfbcc39ebdeae2cdfa81d785783981dfe58ed6c
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-05T11:45:57.876Z — VERIFY — ok

    By: CODER

    Note: verified-202608051141-1FG5NM
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-05T11:44:47.729Z, excerpt_hash=sha256:1656b8113a0f031352a9c2e1149b0dbd33c8536c9f1038db736aedfb0414a22a

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608051141-1FG5NM/blueprint/resolved-snapshot.json
    - old_digest: 1df8fac8628a53af4f0a1a9c0254abf44c582d9896f3e71104d4bee19c153505
    - current_digest: 1df8fac8628a53af4f0a1a9c0254abf44c582d9896f3e71104d4bee19c153505
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608051141-1FG5NM

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane task complete 202608051141-1FG5NM --result verified-202608051141-1FG5NM --commit c79809274ff7bf3d22414097f8414e92ee515d2a
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Remove the added Docker and Compose files, revert the standalone Next.js setting, and remove the Docker section from README.md."
  Findings: "No findings yet."
id_source: "generated"
---
## Summary

Provide a repeatable production Docker deployment for the Next.js application with Traefik HTTPS routing and a local port-publishing overlay.

## Scope

Modify next.config.mjs and README.md; add Dockerfile, .dockerignore, docker-compose.yml, and docker-compose.local.yml. Pass OPENROUTER_API_KEY and OPENROUTER_MODEL at runtime. Route APP_DOMAIN through Traefik using the existing external traefik network and letsencrypt certificate resolver.

## Plan

1. Enable Next.js standalone production output. 2. Add a multi-stage Node Docker image that builds and runs the standalone server as a non-root user. 3. Add production Compose configuration with AI environment passthrough and Traefik TLS labels. 4. Add a local Compose override publishing port 3000. 5. Document production and local Docker startup. 6. Validate Compose rendering, lint, types, production build, and the Docker image when Docker is available.

## Verify Steps

- APP_DOMAIN=app.example.com OPENROUTER_API_KEY=test-key OPENROUTER_MODEL=test-model docker compose -f docker-compose.yml config
- APP_DOMAIN=app.example.com OPENROUTER_API_KEY=test-key OPENROUTER_MODEL=test-model docker compose -f docker-compose.yml -f docker-compose.local.yml config
- Confirm the merged local Compose output publishes host port 3000 and preserves Traefik labels plus AI environment variables.
- npm run lint
- npm run typecheck
- npm run build
- docker build -t lakeside-proposal:verify . (when Docker is available; approved network access may be used to pull the base image or dependencies)

## Verification

- Command: APP_DOMAIN=app.example.com OPENROUTER_API_KEY=test-key OPENROUTER_MODEL=test-model docker compose -f docker-compose.yml config
  Result: pass
  Evidence: Rendered the app service with Host(app.example.com), websecure, TLS, letsencrypt, port 3000, and both AI variables.
  Scope: Production Compose configuration.
- Command: APP_DOMAIN=app.example.com OPENROUTER_API_KEY=test-key OPENROUTER_MODEL=test-model docker compose -f docker-compose.yml -f docker-compose.local.yml config
  Result: pass
  Evidence: Preserved production labels and environment while publishing host port 3000 to container port 3000.
  Scope: Local Compose overlay.
- Command: npm run lint
  Result: pass
  Evidence: ESLint completed without errors.
  Scope: Repository lint rules.
- Command: npm run typecheck
  Result: pass
  Evidence: tsc --noEmit completed without errors.
  Scope: TypeScript project.
- Command: npm run build
  Result: pass
  Evidence: Next.js 16.3.0 produced the optimized production build and all application routes.
  Scope: Standalone production build configuration.
- Command: docker build -t lakeside-proposal:verify .
  Result: pass
  Evidence: Multi-stage node:22-alpine image built successfully, including the in-container production build and final standalone layers.
  Scope: Dockerfile and build context.
- Command: git diff --check && ap doctor && node .agentplane/policy/check-routing.mjs
  Result: pass
  Evidence: No whitespace errors; Agentplane doctor reported zero warnings/errors and policy routing passed.
  Scope: Diff hygiene and repository policy.

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-05T11:44:37.352Z — VERIFY — ok

By: CODER

Note: Verified production and local Compose rendering, AI environment passthrough, Traefik TLS labels, lint, type checking, standalone Next.js production build, Docker image build, and repository policy checks.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-05T11:44:37.073Z, excerpt_hash=sha256:1656b8113a0f031352a9c2e1149b0dbd33c8536c9f1038db736aedfb0414a22a

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608051141-1FG5NM/blueprint/resolved-snapshot.json
- old_digest: 1df8fac8628a53af4f0a1a9c0254abf44c582d9896f3e71104d4bee19c153505
- current_digest: 1df8fac8628a53af4f0a1a9c0254abf44c582d9896f3e71104d4bee19c153505
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608051141-1FG5NM

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane task verify-show 202608051141-1FG5NM
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-05T11:44:47.672Z — VERIFY — ok

By: CODER

Note: verified-202608051141-1FG5NM
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-05T11:44:37.411Z, excerpt_hash=sha256:1656b8113a0f031352a9c2e1149b0dbd33c8536c9f1038db736aedfb0414a22a

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608051141-1FG5NM/blueprint/resolved-snapshot.json
- old_digest: 1df8fac8628a53af4f0a1a9c0254abf44c582d9896f3e71104d4bee19c153505
- current_digest: 1df8fac8628a53af4f0a1a9c0254abf44c582d9896f3e71104d4bee19c153505
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608051141-1FG5NM

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane task complete 202608051141-1FG5NM --result verified-202608051141-1FG5NM --commit 6cfbcc39ebdeae2cdfa81d785783981dfe58ed6c
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-05T11:45:57.876Z — VERIFY — ok

By: CODER

Note: verified-202608051141-1FG5NM
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-05T11:44:47.729Z, excerpt_hash=sha256:1656b8113a0f031352a9c2e1149b0dbd33c8536c9f1038db736aedfb0414a22a

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/odubinkin/Projects/lakeside-proposal/.agentplane/tasks/202608051141-1FG5NM/blueprint/resolved-snapshot.json
- old_digest: 1df8fac8628a53af4f0a1a9c0254abf44c582d9896f3e71104d4bee19c153505
- current_digest: 1df8fac8628a53af4f0a1a9c0254abf44c582d9896f3e71104d4bee19c153505
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608051141-1FG5NM

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane task complete 202608051141-1FG5NM --result verified-202608051141-1FG5NM --commit c79809274ff7bf3d22414097f8414e92ee515d2a
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Remove the added Docker and Compose files, revert the standalone Next.js setting, and remove the Docker section from README.md.

## Findings

No findings yet.
