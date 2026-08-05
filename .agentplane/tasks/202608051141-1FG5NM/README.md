---
id: "202608051141-1FG5NM"
title: "Add production Docker deployment"
result_summary: "Added production Docker deployment with configurable Traefik network and local port override."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 26
origin:
  system: "manual"
depends_on: []
tags:
  - "ops"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-08-05T11:49:16.321Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-05T11:50:30.111Z"
  updated_by: "CODER"
  note: "Verified the corrected Compose setup: no main expose/ports declaration, configurable TRAEFIK_NETWORK with dokploy-network default, local-only 3000 publication, AI variables, TLS labels, application build, and Docker image build."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-08-05T11:51:05.121Z"
  updated_by: "EVALUATOR"
  note: "Corrected Docker deployment configuration satisfies the revised network and port-isolation requirements."
  evaluated_sha: "4589e893a55a850b94ec81120d8975f5acb2912a"
  blueprint_digest: "1df8fac8628a53af4f0a1a9c0254abf44c582d9896f3e71104d4bee19c153505"
  evidence_refs:
    - ".agentplane/tasks/202608051141-1FG5NM/README.md"
    - ".agentplane/tasks/202608051141-1FG5NM/quality/20260805-115105121-recovery-context/quality-report.json"
    - ".agentplane/tasks/202608051141-1FG5NM/quality/20260805-115105121-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202608051141-1FG5NM/quality/20260805-115105121-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202608051141-1FG5NM/blueprint/resolved-snapshot.json"
  findings:
    - "Main Compose has no expose or ports entry; TRAEFIK_NETWORK resolves to a caller-supplied network or dokploy-network by default, while the local overlay alone publishes port 3000."
commit:
  hash: "34d17cc698bd547f34bca10e3d15b02067ef8cf0"
  message: "🚧 1FG5NM task: record corrected quality review"
comments:
  -
    author: "CODER"
    body: "Start: continue direct-mode task in current checkout."
  -
    author: "CODER"
    body: "Verified: verified-202608051141-1FG5NM. Guided shortcut recorded verification and is closing the direct task with traceable commit metadata."
  -
    author: "CODER"
    body: "Start: Reopen the task for the approved Traefik network correction and removal of the main Compose expose declaration."
  -
    author: "CODER"
    body: "Verified: Production Docker deployment now has no main port declaration, uses configurable Traefik networking with the dokploy-network default, and exposes port 3000 only through the local overlay."
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
  -
    type: "verify"
    at: "2026-08-05T11:46:20.822Z"
    author: "CODER"
    state: "ok"
    note: "verified-202608051141-1FG5NM"
  -
    type: "status"
    at: "2026-08-05T11:46:20.970Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: verified-202608051141-1FG5NM. Guided shortcut recorded verification and is closing the direct task with traceable commit metadata."
  -
    type: "status"
    at: "2026-08-05T11:48:57.530Z"
    author: "CODER"
    from: "DONE"
    to: "DOING"
    note: "Start: Reopen the task for the approved Traefik network correction and removal of the main Compose expose declaration."
  -
    type: "verify"
    at: "2026-08-05T11:50:30.111Z"
    author: "CODER"
    state: "ok"
    note: "Verified the corrected Compose setup: no main expose/ports declaration, configurable TRAEFIK_NETWORK with dokploy-network default, local-only 3000 publication, AI variables, TLS labels, application build, and Docker image build."
  -
    type: "status"
    at: "2026-08-05T11:51:24.606Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: Production Docker deployment now has no main port declaration, uses configurable Traefik networking with the dokploy-network default, and exposes port 3000 only through the local overlay."
doc_version: 3
doc_updated_at: "2026-08-05T11:51:24.607Z"
doc_updated_by: "CODER"
description: "Add a production standalone Docker image, Traefik-enabled Compose deployment, local port override, AI assistant environment variables, and Docker launch documentation."
sections:
  Summary: "Provide a repeatable production Docker deployment for the Next.js application with Traefik HTTPS routing and a local port-publishing overlay."
  Scope: "Modify next.config.mjs and README.md; add Dockerfile, .dockerignore, docker-compose.yml, and docker-compose.local.yml. Pass OPENROUTER_API_KEY and OPENROUTER_MODEL at runtime. Route APP_DOMAIN through Traefik using the external network named by TRAEFIK_NETWORK with the default dokploy-network and the letsencrypt certificate resolver. The main Compose file must not declare or publish ports; only the local overlay publishes 3000:3000."
  Plan: "1. Enable Next.js standalone production output. 2. Add a multi-stage Node Docker image that builds and runs the standalone server as a non-root user. 3. Add production Compose configuration with AI environment passthrough, no port declaration/publication, and Traefik TLS labels using TRAEFIK_NETWORK with default dokploy-network. 4. Add a local Compose override publishing port 3000. 5. Document production and local Docker startup. 6. Validate Compose rendering, lint, types, production build, and the Docker image."
  Verify Steps: |-
    - APP_DOMAIN=app.example.com TRAEFIK_NETWORK=custom-network OPENROUTER_API_KEY=test-key OPENROUTER_MODEL=test-model docker compose -f docker-compose.yml config
    - APP_DOMAIN=app.example.com OPENROUTER_API_KEY=test-key OPENROUTER_MODEL=test-model docker compose -f docker-compose.yml config
    - Confirm the main Compose output uses custom-network when set and dokploy-network by default, preserves Traefik TLS labels and AI environment variables, and contains no expose or ports entry.
    - APP_DOMAIN=app.example.com OPENROUTER_API_KEY=test-key OPENROUTER_MODEL=test-model docker compose -f docker-compose.yml -f docker-compose.local.yml config
    - Confirm the merged local Compose output publishes host port 3000.
    - npm run lint
    - npm run typecheck
    - npm run build
    - docker build -t lakeside-proposal:verify .
  Verification: |-
    - Command: APP_DOMAIN=app.example.com TRAEFIK_NETWORK=custom-network OPENROUTER_API_KEY=test-key OPENROUTER_MODEL=test-model docker compose -f docker-compose.yml config
      Result: pass
      Evidence: Rendered external network and traefik.docker.network as custom-network; main service contained neither expose nor ports.
      Scope: Explicit Traefik network override and production port isolation.
    - Command: APP_DOMAIN=app.example.com OPENROUTER_API_KEY=test-key OPENROUTER_MODEL=test-model docker compose -f docker-compose.yml config
      Result: pass
      Evidence: Rendered external network and traefik.docker.network as dokploy-network by default, with websecure TLS, letsencrypt, internal service port 3000, and both AI variables.
      Scope: Default production Compose configuration.
    - Command: APP_DOMAIN=app.example.com OPENROUTER_API_KEY=test-key OPENROUTER_MODEL=test-model docker compose -f docker-compose.yml -f docker-compose.local.yml config
      Result: pass
      Evidence: Preserved production configuration and published host port 3000 only in the merged local configuration.
      Scope: Local Compose overlay.
    - Command: npm run lint && npm run typecheck && npm run build
      Result: pass
      Evidence: ESLint and tsc completed without errors; Next.js 16.3.0 produced the optimized production build.
      Scope: Code quality and standalone application build.
    - Command: docker build -t lakeside-proposal:verify .
      Result: pass
      Evidence: Multi-stage image built successfully, including the in-container production build and final standalone layers.
      Scope: Dockerfile and build context.
    - Command: git diff --check && ap doctor && node .agentplane/policy/check-routing.mjs
      Result: pass
      Evidence: No whitespace errors; Agentplane doctor and policy routing passed.
      Scope: Diff hygiene and repository policy.

    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-05T11:50:30.111Z — VERIFY — ok

    By: CODER

    Note: Verified the corrected Compose setup: no main expose/ports declaration, configurable TRAEFIK_NETWORK with dokploy-network default, local-only 3000 publication, AI variables, TLS labels, application build, and Docker image build.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-05T11:50:29.806Z, excerpt_hash=sha256:3957cf7c82986082098937f1ad666ddecfb2b3022b09703151047db273f9a43e

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
    - safe_command: agentplane task complete 202608051141-1FG5NM --result verified-202608051141-1FG5NM --commit 815cc21bebdec9e85860499edfbe0204adf76f54
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Remove the added Docker and Compose files, revert the standalone Next.js setting, and remove the Docker section from README.md."
  Findings: "No findings yet."
extensions:
  implementation_commit:
    hash: "4589e893a55a850b94ec81120d8975f5acb2912a"
    message: "🚧 1FG5NM task: refine Traefik network configuration"
id_source: "generated"
---
## Summary

Provide a repeatable production Docker deployment for the Next.js application with Traefik HTTPS routing and a local port-publishing overlay.

## Scope

Modify next.config.mjs and README.md; add Dockerfile, .dockerignore, docker-compose.yml, and docker-compose.local.yml. Pass OPENROUTER_API_KEY and OPENROUTER_MODEL at runtime. Route APP_DOMAIN through Traefik using the external network named by TRAEFIK_NETWORK with the default dokploy-network and the letsencrypt certificate resolver. The main Compose file must not declare or publish ports; only the local overlay publishes 3000:3000.

## Plan

1. Enable Next.js standalone production output. 2. Add a multi-stage Node Docker image that builds and runs the standalone server as a non-root user. 3. Add production Compose configuration with AI environment passthrough, no port declaration/publication, and Traefik TLS labels using TRAEFIK_NETWORK with default dokploy-network. 4. Add a local Compose override publishing port 3000. 5. Document production and local Docker startup. 6. Validate Compose rendering, lint, types, production build, and the Docker image.

## Verify Steps

- APP_DOMAIN=app.example.com TRAEFIK_NETWORK=custom-network OPENROUTER_API_KEY=test-key OPENROUTER_MODEL=test-model docker compose -f docker-compose.yml config
- APP_DOMAIN=app.example.com OPENROUTER_API_KEY=test-key OPENROUTER_MODEL=test-model docker compose -f docker-compose.yml config
- Confirm the main Compose output uses custom-network when set and dokploy-network by default, preserves Traefik TLS labels and AI environment variables, and contains no expose or ports entry.
- APP_DOMAIN=app.example.com OPENROUTER_API_KEY=test-key OPENROUTER_MODEL=test-model docker compose -f docker-compose.yml -f docker-compose.local.yml config
- Confirm the merged local Compose output publishes host port 3000.
- npm run lint
- npm run typecheck
- npm run build
- docker build -t lakeside-proposal:verify .

## Verification

- Command: APP_DOMAIN=app.example.com TRAEFIK_NETWORK=custom-network OPENROUTER_API_KEY=test-key OPENROUTER_MODEL=test-model docker compose -f docker-compose.yml config
  Result: pass
  Evidence: Rendered external network and traefik.docker.network as custom-network; main service contained neither expose nor ports.
  Scope: Explicit Traefik network override and production port isolation.
- Command: APP_DOMAIN=app.example.com OPENROUTER_API_KEY=test-key OPENROUTER_MODEL=test-model docker compose -f docker-compose.yml config
  Result: pass
  Evidence: Rendered external network and traefik.docker.network as dokploy-network by default, with websecure TLS, letsencrypt, internal service port 3000, and both AI variables.
  Scope: Default production Compose configuration.
- Command: APP_DOMAIN=app.example.com OPENROUTER_API_KEY=test-key OPENROUTER_MODEL=test-model docker compose -f docker-compose.yml -f docker-compose.local.yml config
  Result: pass
  Evidence: Preserved production configuration and published host port 3000 only in the merged local configuration.
  Scope: Local Compose overlay.
- Command: npm run lint && npm run typecheck && npm run build
  Result: pass
  Evidence: ESLint and tsc completed without errors; Next.js 16.3.0 produced the optimized production build.
  Scope: Code quality and standalone application build.
- Command: docker build -t lakeside-proposal:verify .
  Result: pass
  Evidence: Multi-stage image built successfully, including the in-container production build and final standalone layers.
  Scope: Dockerfile and build context.
- Command: git diff --check && ap doctor && node .agentplane/policy/check-routing.mjs
  Result: pass
  Evidence: No whitespace errors; Agentplane doctor and policy routing passed.
  Scope: Diff hygiene and repository policy.

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-05T11:50:30.111Z — VERIFY — ok

By: CODER

Note: Verified the corrected Compose setup: no main expose/ports declaration, configurable TRAEFIK_NETWORK with dokploy-network default, local-only 3000 publication, AI variables, TLS labels, application build, and Docker image build.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-05T11:50:29.806Z, excerpt_hash=sha256:3957cf7c82986082098937f1ad666ddecfb2b3022b09703151047db273f9a43e

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
- safe_command: agentplane task complete 202608051141-1FG5NM --result verified-202608051141-1FG5NM --commit 815cc21bebdec9e85860499edfbe0204adf76f54
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
