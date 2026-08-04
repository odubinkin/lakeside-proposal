---
id: "202608040959-NH1XVT"
title: "Remove unused public images and add favicon"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 10
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify:
  - "test -f app/icon.png && sips -g pixelWidth -g pixelHeight app/icon.png"
  - "pnpm lint"
  - "pnpm build"
plan_approval:
  state: "approved"
  updated_at: "2026-08-04T10:01:02.871Z"
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
    body: "Start: delete the eight approved unused assets and create the App Router favicon from the existing logo."
  -
    author: "CODER"
    body: "Blocked: A concurrent task has staged components/proposal-form.tsx and its task artifacts, so the scoped commit guard cannot create this task's commit without touching unrelated work. The favicon and deletions are applied and validated; resume after the parallel index entries are cleared or committed."
  -
    author: "CODER"
    body: "Start: resume after the parallel task cleared its staged entries; commit only the approved favicon and unused-asset deletions."
events:
  -
    type: "status"
    at: "2026-08-04T10:01:23.506Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: delete the eight approved unused assets and create the App Router favicon from the existing logo."
  -
    type: "status"
    at: "2026-08-04T10:04:24.598Z"
    author: "CODER"
    from: "DOING"
    to: "BLOCKED"
    note: "Blocked: A concurrent task has staged components/proposal-form.tsx and its task artifacts, so the scoped commit guard cannot create this task's commit without touching unrelated work. The favicon and deletions are applied and validated; resume after the parallel index entries are cleared or committed."
  -
    type: "status"
    at: "2026-08-04T10:04:51.159Z"
    author: "CODER"
    from: "BLOCKED"
    to: "DOING"
    note: "Start: resume after the parallel task cleared its staged entries; commit only the approved favicon and unused-asset deletions."
doc_version: 3
doc_updated_at: "2026-08-04T10:04:51.159Z"
doc_updated_by: "CODER"
description: "Delete statically unused image assets from public and add an App Router favicon derived from public/redwood-lakeside-logo.png. Preserve the logo, placeholder fallback, and public/villas assets."
sections:
  Summary: |-
    Remove unused public images and add favicon

    Delete statically unused image assets from public and add an App Router favicon derived from public/redwood-lakeside-logo.png. Preserve the logo, placeholder fallback, and public/villas assets.
  Scope: |-
    - In scope: delete the eight named unused images in public; create app/icon.png from public/redwood-lakeside-logo.png.
    - Preserve: public/redwood-lakeside-logo.png, public/placeholder.svg, and all public/villas assets.
    - Out of scope: visual redesign, image-content changes, and unrelated source changes.
  Plan: |-
    1. Confirm that only redwood-lakeside-logo.png and placeholder.svg have application references outside public/villas.
    2. Delete exactly these unused public assets: apple-icon.png, icon-dark-32x32.png, icon-light-32x32.png, icon.svg, placeholder-logo.png, placeholder-logo.svg, placeholder-user.jpg, and placeholder.jpg.
    3. Create app/icon.png by resizing public/redwood-lakeside-logo.png to a 512×512 PNG; rely on Next.js App Router icon-file metadata support.
    4. Run the declared static checks, lint, production build, and diff review.
    5. Record results and finish only if all checks pass.
  Verify Steps: |-
    1. Run `test -f app/icon.png && sips -g pixelWidth -g pixelHeight app/icon.png`; pass requires a 512×512 PNG.
    2. Run `for f in public/apple-icon.png public/icon-dark-32x32.png public/icon-light-32x32.png public/icon.svg public/placeholder-logo.png public/placeholder-logo.svg public/placeholder-user.jpg public/placeholder.jpg; do test ! -e "$f"; done`; pass requires every deleted asset to be absent.
    3. Run `rg -n "redwood-lakeside-logo|placeholder\.svg" app components lib data`; pass requires the existing logo and fallback references to remain.
    4. Run `pnpm lint` and `pnpm build`; both must pass.
    5. Run `git diff --check` and inspect the scoped diff; pass requires no whitespace errors and only the planned assets/task records.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: The first task-scoped implementation commit was rejected by the repository hook because generated artifacts for this task were not staged.
      Impact: No source change or validation result was affected; the implementation files remain staged only within the approved allowlist.
      Resolution: Use agentplane commit with --allow-tasks so only this task's README and blueprint snapshot join the scoped commit.

    - Observation: A concurrent task staged components/proposal-form.tsx and its own task artifacts while this task was preparing its scoped implementation commit.
      Impact: The commit guard rejects the mixed index; committing or unstaging would risk including or disrupting unrelated work.
      Resolution: Leave the concurrent staged paths untouched. Resume this task after the other task commits or clears its index entries, then stage and commit only the approved favicon, deletions, and NH1XVT artifacts.
id_source: "generated"
---
## Summary

Remove unused public images and add favicon

Delete statically unused image assets from public and add an App Router favicon derived from public/redwood-lakeside-logo.png. Preserve the logo, placeholder fallback, and public/villas assets.

## Scope

- In scope: delete the eight named unused images in public; create app/icon.png from public/redwood-lakeside-logo.png.
- Preserve: public/redwood-lakeside-logo.png, public/placeholder.svg, and all public/villas assets.
- Out of scope: visual redesign, image-content changes, and unrelated source changes.

## Plan

1. Confirm that only redwood-lakeside-logo.png and placeholder.svg have application references outside public/villas.
2. Delete exactly these unused public assets: apple-icon.png, icon-dark-32x32.png, icon-light-32x32.png, icon.svg, placeholder-logo.png, placeholder-logo.svg, placeholder-user.jpg, and placeholder.jpg.
3. Create app/icon.png by resizing public/redwood-lakeside-logo.png to a 512×512 PNG; rely on Next.js App Router icon-file metadata support.
4. Run the declared static checks, lint, production build, and diff review.
5. Record results and finish only if all checks pass.

## Verify Steps

1. Run `test -f app/icon.png && sips -g pixelWidth -g pixelHeight app/icon.png`; pass requires a 512×512 PNG.
2. Run `for f in public/apple-icon.png public/icon-dark-32x32.png public/icon-light-32x32.png public/icon.svg public/placeholder-logo.png public/placeholder-logo.svg public/placeholder-user.jpg public/placeholder.jpg; do test ! -e "$f"; done`; pass requires every deleted asset to be absent.
3. Run `rg -n "redwood-lakeside-logo|placeholder\.svg" app components lib data`; pass requires the existing logo and fallback references to remain.
4. Run `pnpm lint` and `pnpm build`; both must pass.
5. Run `git diff --check` and inspect the scoped diff; pass requires no whitespace errors and only the planned assets/task records.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: The first task-scoped implementation commit was rejected by the repository hook because generated artifacts for this task were not staged.
  Impact: No source change or validation result was affected; the implementation files remain staged only within the approved allowlist.
  Resolution: Use agentplane commit with --allow-tasks so only this task's README and blueprint snapshot join the scoped commit.

- Observation: A concurrent task staged components/proposal-form.tsx and its own task artifacts while this task was preparing its scoped implementation commit.
  Impact: The commit guard rejects the mixed index; committing or unstaging would risk including or disrupting unrelated work.
  Resolution: Leave the concurrent staged paths untouched. Resume this task after the other task commits or clears its index entries, then stage and commit only the approved favicon, deletions, and NH1XVT artifacts.
