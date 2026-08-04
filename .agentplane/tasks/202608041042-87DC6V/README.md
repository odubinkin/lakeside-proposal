---
id: "202608041042-87DC6V"
title: "Scroll to first invalid proposal field"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "frontend"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-08-04T10:42:47.794Z"
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
    at: "2026-08-04T10:42:58.457Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue direct-mode task in current checkout."
doc_version: 3
doc_updated_at: "2026-08-04T10:42:58.457Z"
doc_updated_by: "CODER"
description: "When Generate Proposal validation fails, scroll to the first invalid form field only when that field is outside the viewport."
sections:
  Summary: |-
    Scroll to first invalid proposal field

    When Generate Proposal validation fails, scroll to the first invalid form field only when that field is outside the viewport.
  Scope: "Modify only components/proposal-form.tsx. After failed Generate Proposal validation, identify the first invalid field in page order and smoothly scroll it into view only when its full field bounds are outside the viewport. Preserve the existing proposal save/reuse behavior."
  Plan: |-
    1. Add a stable mapping from validation error keys to form control IDs in page order.
    2. After validation fails, locate the first invalid control and check whether it is fully visible.
    3. Call smooth scrollIntoView only when that control is outside the viewport.
    4. Run the declared lint, typecheck, build, and diff checks.
  Verify Steps: |-
    1. Run npm run lint. Expected: ESLint exits successfully with no errors.
    2. Run npx tsc --noEmit. Expected: TypeScript exits successfully with no diagnostics.
    3. Run npm run build. Expected: Next.js production build completes successfully.
    4. Run git diff --check and inspect the scoped diff. Expected: no whitespace errors; failed validation selects the first invalid field in page order, calls smooth scrollIntoView only when that field is outside the viewport, and leaves the existing save/reuse flow unchanged.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert the task implementation change in components/proposal-form.tsx, then rerun npm run lint and npx tsc --noEmit."
  Findings: ""
id_source: "generated"
---
## Summary

Scroll to first invalid proposal field

When Generate Proposal validation fails, scroll to the first invalid form field only when that field is outside the viewport.

## Scope

Modify only components/proposal-form.tsx. After failed Generate Proposal validation, identify the first invalid field in page order and smoothly scroll it into view only when its full field bounds are outside the viewport. Preserve the existing proposal save/reuse behavior.

## Plan

1. Add a stable mapping from validation error keys to form control IDs in page order.
2. After validation fails, locate the first invalid control and check whether it is fully visible.
3. Call smooth scrollIntoView only when that control is outside the viewport.
4. Run the declared lint, typecheck, build, and diff checks.

## Verify Steps

1. Run npm run lint. Expected: ESLint exits successfully with no errors.
2. Run npx tsc --noEmit. Expected: TypeScript exits successfully with no diagnostics.
3. Run npm run build. Expected: Next.js production build completes successfully.
4. Run git diff --check and inspect the scoped diff. Expected: no whitespace errors; failed validation selects the first invalid field in page order, calls smooth scrollIntoView only when that field is outside the viewport, and leaves the existing save/reuse flow unchanged.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the task implementation change in components/proposal-form.tsx, then rerun npm run lint and npx tsc --noEmit.

## Findings
