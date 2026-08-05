---
id: "202608051057-H7TV5C"
title: "Add AI fill action to proposal text"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 16
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "frontend"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-08-05T11:00:23.486Z"
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
    body: "Start: implement the approved proposal-text Fill with AI action through the existing Willow send path, then run focused and repository verification checks."
events:
  -
    type: "status"
    at: "2026-08-05T10:58:15.964Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement the approved proposal-text Fill with AI action through the existing Willow send path, then run focused and repository verification checks."
doc_version: 3
doc_updated_at: "2026-08-05T11:00:19.302Z"
doc_updated_by: "CODER"
description: "Add a Fill with AI robot-icon button to the Proposal text section on proposal create/edit pages. Clicking it opens the existing Willow chat and automatically sends the English user message: Fill in the commercial proposal text."
sections:
  Summary: "Add a proposal-text-specific AI entry point that reuses the existing Willow assistant."
  Scope: "Modify the proposal text section, proposal form integration, chat component API, canonical Willow system prompt, implementation documentation, and focused component/unit tests. Add a robot-icon button labelled Fill with AI. On activation, open Willow and send one user message with exact content: Fill in the commercial proposal text. Require generated proposalText to be personalized for the named client and not read like a generic villa advertisement. Preserve the floating chat launcher, manual chat input, transport, persistence, autosave, and other proposal fields."
  Plan: "1. Add an accessible Fill with AI button with a robot icon to ProposalTextSection. 2. Reuse ChatBot's existing send flow through a narrow external open-and-send API. 3. Wire the exact English prompt from ProposalEditor. 4. Extend the canonical Willow system prompt so proposalText is personalized for the client and avoids generic villa-advertising copy. 5. Update docs/AI_BOT_IMPL.md and prompt regression assertions to match the contract. 6. Run all declared checks and record evidence."
  Verify Steps: "1. Run npm test -- --run tests/components/proposal-form-sections.test.tsx tests/components/proposal-form.test.tsx tests/components/catalog-modal-chat.test.tsx tests/components/ai-chat.test.tsx tests/unit/ai-server.test.ts; expected: focused tests pass and cover the robot-icon Fill with AI control, chat opening, exactly one automatically submitted user message with content Fill in the commercial proposal text., preserved existing chat behavior, and the proposalText personalization/non-generic-advertising prompt contract. 2. Inspect lib/ai/server/prompt.ts and docs/AI_BOT_IMPL.md together; expected: both require proposal text to be personalized for the client and not read as a generic villa advertisement. 3. Run npm run lint; expected: ESLint exits successfully. 4. Run npm run typecheck; expected: TypeScript exits successfully. 5. Run npm run build; expected: Next.js production build succeeds. 6. Run git diff --check; expected: no whitespace errors. 7. Run ap doctor and node .agentplane/policy/check-routing.mjs; expected: both pass. 8. Inspect git status --short --untracked-files=all; expected: only task-scoped source/test/docs changes and Agentplane task artifacts are present."
  Verification: "Pending execution after implementation."
  Rollback Plan: "Revert only the task-scoped proposal text, proposal form, chat API, canonical prompt, prompt documentation, focused test changes, and task lifecycle artifacts; preserve unrelated repository history and user work."
  Findings: "No findings yet."
id_source: "generated"
---
## Summary

Add a proposal-text-specific AI entry point that reuses the existing Willow assistant.

## Scope

Modify the proposal text section, proposal form integration, chat component API, canonical Willow system prompt, implementation documentation, and focused component/unit tests. Add a robot-icon button labelled Fill with AI. On activation, open Willow and send one user message with exact content: Fill in the commercial proposal text. Require generated proposalText to be personalized for the named client and not read like a generic villa advertisement. Preserve the floating chat launcher, manual chat input, transport, persistence, autosave, and other proposal fields.

## Plan

1. Add an accessible Fill with AI button with a robot icon to ProposalTextSection. 2. Reuse ChatBot's existing send flow through a narrow external open-and-send API. 3. Wire the exact English prompt from ProposalEditor. 4. Extend the canonical Willow system prompt so proposalText is personalized for the client and avoids generic villa-advertising copy. 5. Update docs/AI_BOT_IMPL.md and prompt regression assertions to match the contract. 6. Run all declared checks and record evidence.

## Verify Steps

1. Run npm test -- --run tests/components/proposal-form-sections.test.tsx tests/components/proposal-form.test.tsx tests/components/catalog-modal-chat.test.tsx tests/components/ai-chat.test.tsx tests/unit/ai-server.test.ts; expected: focused tests pass and cover the robot-icon Fill with AI control, chat opening, exactly one automatically submitted user message with content Fill in the commercial proposal text., preserved existing chat behavior, and the proposalText personalization/non-generic-advertising prompt contract. 2. Inspect lib/ai/server/prompt.ts and docs/AI_BOT_IMPL.md together; expected: both require proposal text to be personalized for the client and not read as a generic villa advertisement. 3. Run npm run lint; expected: ESLint exits successfully. 4. Run npm run typecheck; expected: TypeScript exits successfully. 5. Run npm run build; expected: Next.js production build succeeds. 6. Run git diff --check; expected: no whitespace errors. 7. Run ap doctor and node .agentplane/policy/check-routing.mjs; expected: both pass. 8. Inspect git status --short --untracked-files=all; expected: only task-scoped source/test/docs changes and Agentplane task artifacts are present.

## Verification

Pending execution after implementation.

## Rollback Plan

Revert only the task-scoped proposal text, proposal form, chat API, canonical prompt, prompt documentation, focused test changes, and task lifecycle artifacts; preserve unrelated repository history and user work.

## Findings

No findings yet.
