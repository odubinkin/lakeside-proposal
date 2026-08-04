---
id: "202608040911-3B1QPW"
title: "Eager-load above-the-fold villa images"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 11
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "frontend"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-08-04T09:13:04.072Z"
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
    at: "2026-08-04T09:13:28.298Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue direct-mode task in current checkout."
doc_version: 3
doc_updated_at: "2026-08-04T09:13:28.298Z"
doc_updated_by: "CODER"
description: "Add loading=\"eager\" only to the villa next/image previews in components/proposal-form.tsx and components/proposal-view.tsx so their LCP candidates begin loading immediately; preserve all other image and page behavior."
sections:
  Summary: "Add loading=\"eager\" to the two above-the-fold villa Next.js Image previews identified as LCP candidates. Success means both targeted Image elements eagerly load, their existing src/alt/fill/sizes/className behavior is preserved, no other implementation files are changed, and the declared local checks pass."
  Scope: |-
    In scope:
    - components/proposal-form.tsx: the villa preview Image currently at the top of the proposal form.
    - components/proposal-view.tsx: the villa Image in the proposal view.
    - Add only the loading="eager" prop to those two next/image elements.

    Out of scope:
    - Other Image elements or assets.
    - Layout, styling, sizes, src, alt, fill, caching, preload, priority, or data-flow changes.
    - Dependency, configuration, policy, and unrelated file changes.
    - Network access.
  Plan: |-
    1. Inspect the two targeted villa Image elements and confirm the current props.
    2. Add loading="eager" to each targeted Image without changing any other behavior.
    3. Review the scoped diff and run the declared verification commands.
    4. Record exact verification evidence through AgentPlane; stop and request re-approval if scope or verification must expand.
  Verify Steps: |-
    1. Run `git diff --check -- components/proposal-form.tsx components/proposal-view.tsx`; pass requires no whitespace errors.
    2. Run `rg -n -F loading= components/proposal-form.tsx components/proposal-view.tsx`; pass requires exactly one match in each file and each matched line must be `loading="eager"` on the targeted villa Image element.
    3. Run `git diff -- components/proposal-form.tsx components/proposal-view.tsx`; inspect that the implementation diff adds only `loading="eager"` to the two targeted Image elements and preserves all existing props.
    4. Run `pnpm lint`; pass requires exit code 0.
    5. Run `pnpm build`; pass requires exit code 0.
    6. Run `git status --short --untracked-files=all`; pass requires no unintended tracked changes or unreviewed untracked artifacts beyond AgentPlane task records and the two scoped implementation files.
  Verification: "CODER must record each declared command, pass/fail result, concise evidence, and covered scope after execution. No check may be skipped without explicit approval and a documented reason, risk, and approver."
  Rollback Plan: "If the change causes regression, remove only the two added loading=\"eager\" props from components/proposal-form.tsx and components/proposal-view.tsx, rerun the same verification contract, and record the outcome. Do not revert unrelated user changes."
  Findings: "None at planning time."
id_source: "generated"
---
## Summary

Add loading="eager" to the two above-the-fold villa Next.js Image previews identified as LCP candidates. Success means both targeted Image elements eagerly load, their existing src/alt/fill/sizes/className behavior is preserved, no other implementation files are changed, and the declared local checks pass.

## Scope

In scope:
- components/proposal-form.tsx: the villa preview Image currently at the top of the proposal form.
- components/proposal-view.tsx: the villa Image in the proposal view.
- Add only the loading="eager" prop to those two next/image elements.

Out of scope:
- Other Image elements or assets.
- Layout, styling, sizes, src, alt, fill, caching, preload, priority, or data-flow changes.
- Dependency, configuration, policy, and unrelated file changes.
- Network access.

## Plan

1. Inspect the two targeted villa Image elements and confirm the current props.
2. Add loading="eager" to each targeted Image without changing any other behavior.
3. Review the scoped diff and run the declared verification commands.
4. Record exact verification evidence through AgentPlane; stop and request re-approval if scope or verification must expand.

## Verify Steps

1. Run `git diff --check -- components/proposal-form.tsx components/proposal-view.tsx`; pass requires no whitespace errors.
2. Run `rg -n -F loading= components/proposal-form.tsx components/proposal-view.tsx`; pass requires exactly one match in each file and each matched line must be `loading="eager"` on the targeted villa Image element.
3. Run `git diff -- components/proposal-form.tsx components/proposal-view.tsx`; inspect that the implementation diff adds only `loading="eager"` to the two targeted Image elements and preserves all existing props.
4. Run `pnpm lint`; pass requires exit code 0.
5. Run `pnpm build`; pass requires exit code 0.
6. Run `git status --short --untracked-files=all`; pass requires no unintended tracked changes or unreviewed untracked artifacts beyond AgentPlane task records and the two scoped implementation files.

## Verification

CODER must record each declared command, pass/fail result, concise evidence, and covered scope after execution. No check may be skipped without explicit approval and a documented reason, risk, and approver.

## Rollback Plan

If the change causes regression, remove only the two added loading="eager" props from components/proposal-form.tsx and components/proposal-view.tsx, rerun the same verification contract, and record the outcome. Do not revert unrelated user changes.

## Findings

None at planning time.
