---
id: "202611090913-NM0CN3"
title: "Upgrade runtime and dependencies and resolve security advisories"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 10
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
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
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
doc_version: 3
doc_updated_at: "2026-11-09T09:14:55.772Z"
doc_updated_by: "CODER"
description: "Use latest stable Node.js LTS, TypeScript 7 if published, and latest stable Next.js; resolve dependency vulnerabilities and verify application checks. User approved plan and network access."
sections:
  Summary: "Upgrade the runtime, compiler, framework, and vulnerable dependencies under the user-approved plan."
  Scope: "Dependency manifests and lockfiles, Dockerfile, Node version configuration, README prerequisites, and compatibility fixes required by the upgrades. No external publication. Network access approved by the user."
  Plan: "CODER: confirm current stable versions; upgrade to latest Node LTS, TypeScript 7 and stable Next.js; remediate audit findings; align npm and pnpm lockfiles; run clean install, audit, lint, typecheck, coverage, build and E2E tests; record evidence and finish locally."
  Verify Steps: "Confirm installed Node LTS, TypeScript 7 and latest stable Next.js versions. Run npm ci, npm audit with zero vulnerabilities, npm run lint, npm run typecheck, npm run test:coverage, npm run build and npm run test:e2e. Check pnpm frozen-lockfile consistency, Docker build if daemon is available, ap doctor, routing validation, git diff --check and final git status."
  Verification: "Pending execution; record exact commands, results, scope and any concrete environment limitations."
  Rollback Plan: "Revert only this task implementation commit to restore dependency manifests, lockfiles and runtime configuration; reinstall dependencies from the restored lockfile."
  Findings: "Initial repository clean on main. Docker uses Node 22; TypeScript is pinned to 5.7.3; Next.js is 16.3.0. Stable registry tags report Next.js 16.4.5 and TypeScript 7.0.2. Node release page identifies Node 26 as the newest LTS."
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

Pending execution; record exact commands, results, scope and any concrete environment limitations.

## Rollback Plan

Revert only this task implementation commit to restore dependency manifests, lockfiles and runtime configuration; reinstall dependencies from the restored lockfile.

## Findings

Initial repository clean on main. Docker uses Node 22; TypeScript is pinned to 5.7.3; Next.js is 16.3.0. Stable registry tags report Next.js 16.4.5 and TypeScript 7.0.2. Node release page identifies Node 26 as the newest LTS.
