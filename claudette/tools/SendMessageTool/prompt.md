## Purpose
Provides tool name, description, and the prompt for the SendMessage tool, enabling agent-to-agent communication.

## Imports
- **External**: `feature` from 'BUILDFLAGS'
- **Internal**: None in this file itself (but references feature flags for optional sections)

## Logic
Exports:
- `DESCRIPTION` = 'Send a message to another agent'
- `getPrompt()`: Returns a multi-section string:
  - Introduction: SendMessage purpose; shows example JSON with `to` and `message`.
  - Routing table: maps `to` values — "researcher" (teammate by name), "*" (broadcast), and when UDS_INBOX feature enabled, also "uds:/path/to.sock" and "bridge:session_..." for cross-session.
  - Notes: plain text output not visible to other agents; must use tool; teammates' messages delivered automatically; refer by name; don't quote original.
  - Cross-session section (when UDS_INBOX): use ListPeers to discover; examples; reply by copying `from` attribute; messages enqueue.
  - Protocol responses (legacy): handling `shutdown_request` and `plan_approval_request` by responding with `_response` types, echoing `request_id` and setting `approve`. Advises against originating shutdown_request and sending structured JSON status (use TaskUpdate).

The prompt guides agents on how to communicate within teams and with other sessions.

## Exports
- `DESCRIPTION` (string)
- `getPrompt(): string`
