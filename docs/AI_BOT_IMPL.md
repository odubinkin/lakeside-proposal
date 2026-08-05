# Willow AI Assistant Implementation

## Overview

Willow is implemented inside the existing Next.js application. Every typed or suggested chat message is posted to `POST /api/ai/chat`; the client no longer performs keyword matching or owns assistant replies. The server selects either the deterministic mock adapter or an OpenRouter-backed LangChain adapter, and both adapters emit the same correlated NDJSON protocol.

The language model never writes to React state or browser storage. It may request the `edit_proposal_form` tool, but the client validates and applies that patch atomically, then sends a complete tool-result continuation to the server.

## Module map

- `app/api/ai/chat/route.ts` validates public requests, creates non-cacheable NDJSON streams, assigns event sequence numbers, propagates cancellation, and maps errors to safe public messages.
- `lib/ai/contracts.ts` owns protocol version 1, runtime schemas, shared TypeScript types, the exact form field allowlist, trusted catalog-ID validation, continuation consistency checks, and canonical field labels/order.
- `lib/ai/stream.ts` encodes server events and parses client streams across arbitrary byte boundaries while enforcing `protocolVersion`, `runId`, `sequence`, and `messageId` correlation.
- `lib/ai/server/provider.ts` selects mock or OpenRouter mode and resolves trusted villa/add-on context from repository catalogs.
- `lib/ai/server/prompt.ts` owns the canonical system prompt, trusted JSON context delimiters, defensive 50-message truncation, and LangChain message ordering.
- `lib/ai/server/mock-adapter.ts` implements the four deterministic compatibility branches and uses the normal form tool/continuation path for sample autofill.
- `lib/ai/server/openrouter-adapter.ts` configures LangChain, binds the form tool, streams text chunks, validates the final tool call, and rejects mixed or multiple tool calls.
- `lib/ai/client.ts` posts requests, maps pre-stream failures, and passes correlated events to the chat component.
- `lib/ai/form-tool.ts` validates model patches against catalogs and existing form rules, applies only explicit fields, and calculates canonical changed fields without partial mutation.
- `lib/ai/chat-storage.ts` owns the versioned proposal-scoped transcript envelope, safe restore, interrupted-state recovery, draft migration, and deletion.
- `components/chat-bot.tsx` renders the preserved Willow UI, incremental text, tool status replacement, cancellation, retry, persistence warnings, and tool continuations.
- `components/proposal-form.tsx` owns one reducer-backed `ProposalFormState`, supplies current snapshots to Willow, and applies successful patches as one state transition.
- `lib/proposal-storage.ts` removes the matching Willow transcript when a saved proposal is deleted.

## Dependencies and OpenRouter configuration

The implementation pins these direct runtime dependencies:

- `@langchain/openai` 1.5.5
- `@langchain/core` 1.2.4
- `zod` 4.4.3

Real-model mode requires both server-only variables:

```text
OPENROUTER_API_KEY=<credential>
OPENROUTER_MODEL=<OpenRouter model identifier>
```

`OpenRouterAssistantAdapter` constructs `ChatOpenAI` with streaming enabled and `configuration.baseURL` set to `https://openrouter.ai/api/v1`. The API key, model selection, base URL, prompt, and tool definition are never accepted from the browser.

If both trimmed variables are present, Willow uses OpenRouter. If either is missing or empty, it uses the deterministic mock. A partially configured environment logs only a sanitized warning. Authentication, quota, model, configuration, network, and provider failures in OpenRouter mode return `Communication error with the assistant. Please try again later.` and never fall back to mock mode.

## Request and streaming protocol

The public endpoint accepts `ChatRequest` protocol version 1. Each HTTP exchange has a newly generated UUID `runId`, including tool continuations and whole-turn retries. Requests contain only the current editable form state, up to 50 chronological text-history messages, and an optional correlated continuation. Proposal IDs and draft conversation IDs are browser-storage namespaces and are not included.

Successful responses use `application/x-ndjson; charset=utf-8`. Each line contains one event with the same protocol version and run ID plus a contiguous zero-based sequence number. Supported events are:

- `message_start`
- `message_delta`
- `tool_call`
- `message_end`
- `error`

The client parser handles split UTF-8 bytes and multiple lines in one transport chunk. A wrong protocol version, run ID, sequence number, or message ID aborts the active stream before the mismatched event can modify assistant text or execute a tool. Unknown future event types are ignored after their envelope sequence is validated, with a development-only diagnostic.

The route and client both use abort signals. Closing the component or choosing **Cancel request** aborts the active exchange; partial text and in-progress tool entries become interrupted rather than completed history. Retry repeats the full assistant turn with the already stored user message and a new run ID, so the user message is not duplicated.

## Prompt and trusted context

Every real-model invocation is assembled in this order:

1. the canonical Willow system prompt;
2. a server-authored context message containing the current form, complete selected-villa record, and complete add-on catalog as delimited JSON;
3. the latest 50 validated user/assistant messages; and
4. for a continuation, reconstructed LangChain assistant-tool-call and tool-result messages.

The prompt identifies form, catalog, conversation, and tool-result strings as untrusted data. It restricts Willow to Redwood Lakeside sales and proposal preparation, requires catalog grounding, prohibits unsupported commercial/financial/legal claims, and requires every returned field-validation error to be explained without claiming partial success.

The deterministic mock receives the same trusted context object but does not serialize an LLM prompt or contact a network service.

## Client-executed form tool

The bound tool is named `edit_proposal_form`. Its strict Zod schema permits a non-empty partial patch containing only `villaId`, `addOnIds`, `proposalText`, `clientName`, `manager`, `phone`, `email`, and `comment`. Villa and add-on IDs must exist in the imported catalogs; add-on IDs must be unique.

When a tool event arrives, the client:

1. shows one stable `Filling in the form…` status entry;
2. captures the latest form snapshot, not the snapshot sent at request start;
3. validates the patch and a complete candidate form;
4. retains validation errors only for fields explicitly included in the patch;
5. either rejects the full patch or replaces the reducer state atomically;
6. computes changed fields in canonical order; and
7. sends complete old/new forms, changed fields, arguments, and correlation IDs in a new continuation request.

Invalid patches leave old and new forms identical and report all invalid changed fields with `INVALID_TOOL_ARGUMENTS`. An unexpected application exception returns `FORM_UPDATE_FAILED`. Neither failure partially mutates the form. Successful status text is replaced in place with either `Form completed, fields changed: …` or `Form completed, no fields changed.` The tool does not save or generate a proposal.

## Transcript persistence

Transcripts use `lakeside.ai-chat.v1:<conversationId>` and a strict `{ version: 1, entries: [...] }` envelope. Text entries distinguish complete, streaming, and interrupted delivery; status entries distinguish filling, done, failed, and interrupted states. Only complete user/assistant text becomes model-visible history.

An existing proposal uses its proposal ID. A new editor creates an in-memory `draft:<uuid>` namespace. On first save, the transcript is written to the proposal key before the draft key is removed. If migration fails, the old draft key remains and the in-memory chat continues with a non-blocking warning. A new page load for an unsaved editor intentionally creates a different draft ID, and abandoned draft entries are not automatically collected.

Malformed envelopes are ignored. A restored streaming message becomes interrupted, and a restored filling status becomes a recoverable interrupted status. Stored history suppresses the default welcome message; an empty conversation receives it once. Deleting a proposal also attempts to delete its scoped chat key without making proposal deletion depend on chat-storage availability.

## Automated verification

`tests/setup.tsx` explicitly removes both OpenRouter variables before tests. Unit and component suites use the server mock or in-process fake adapters; no automated test instantiates a configured real provider or contacts OpenRouter.

Coverage is organized as follows:

- `tests/unit/ai-contracts-form.test.ts`: schemas, continuation consistency, field allowlist, atomic validation, and changed-field ordering.
- `tests/unit/ai-stream-storage.test.ts`: split-chunk NDJSON parsing, correlation failures, terminal errors, versioned storage, recovery, migration, and deletion.
- `tests/unit/ai-server.test.ts`: provider selection, prompt/context ordering and grounding, history truncation, and all mock branches.
- `tests/unit/ai-route.test.ts`: route validation, ordered streams, tool continuation, and sanitized provider failures.
- `tests/components/catalog-modal-chat.test.tsx` and `tests/components/ai-chat.test.tsx`: endpoint transport, incremental deltas, tool status replacement, proposal scoping, draft migration, 50-message requests, retry, and storage failures.
- `e2e/proposal-flows.spec.ts`: complete forced-mock autofill, visible progress, form updates, save migration, transcript restoration, and cross-proposal isolation.

The release verification commands are:

```bash
npm run lint
npm run typecheck
npm run test:coverage
npm run build
npm run test:e2e
node .agentplane/policy/check-routing.mjs
ap doctor
```

## Limitations and operational caveats

- The application has no authentication boundary. A public deployment must add suitable authentication and abuse/rate limiting before enabling a paid OpenRouter key.
- Conversations remain browser-local and do not synchronize across devices or tabs.
- Draft namespaces intentionally do not survive reload as the same conversation and are not automatically garbage-collected.
- The initial protocol supports one active assistant exchange and one active form tool per chat instance; multiple simultaneous model tool calls are rejected.
- Automated verification covers mock and fake failure adapters only. A deployment owner should perform a controlled smoke test with the selected OpenRouter model because provider-specific tool and streaming support can vary.
- The UI keeps the progress status visible briefly so the client-side tool transition is perceivable; this delay is presentation-only and is not part of the server contract.

There are no intentional functional deviations from `docs/AI_BOT_SPEC.md` in the implemented scope.
