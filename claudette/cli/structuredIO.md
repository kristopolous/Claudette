# structuredIO

## Purpose
Provides structured NDJSON IO handling for SDK mode with control request/response, permission decisions, and hook event support.

## Imports
- **Stdlib**: `crypto`
- **External**: `@modelcontextprotocol/sdk`, `zod/v4`
- **Internal**: SDK types, controlSchemas, hooks, Tool, debug/diag/error/process utils, permissions, sessionState, JSON utils, stream, ndjsonSafeStringify, commandLifecycle, controlMessageCompat

## Logic
1. Extends base IO with SDK-specific message handling
2. `SANDBOX_NETWORK_ACCESS_TOOL_NAME` - synthetic tool for sandbox network permission requests
3. `serializeDecisionReason` - formats permission decision reasons for output
4. `buildRequiresActionDetails` - constructs permission prompt details
5. Handles control_request (can_use_tool, initialize, elicitation)
6. Handles control_response (permission decisions)
7. Applies and persists permission updates
8. Executes permission request hooks
9. Notifies session state changes for requires_action events
10. Supports elicitation flow with MCP SDK integration
11. NDJSON-safe stringification for all output

## Exports
- `SANDBOX_NETWORK_ACCESS_TOOL_NAME` - synthetic tool name for sandbox network access
- `StructuredIO` - class handling structured SDK IO with permission/control flows
