# mcp/elicitationHandler

## Purpose
Handles MCP elicitation requests for user confirmation flows (form-based and URL-based).

## Imports
- **Stdlib**: (none)
- **External**: `@modelcontextprotocol/sdk`
- **Internal**: AppState, hooks, log, JSON utils, analytics

## Logic
1. `ElicitationWaitingState` - configuration for waiting state after URL open (actionLabel, showCancel)
2. `ElicitationRequestEvent` - event with serverName, requestId, params, signal, respond, waitingState, onWaitingDismiss, completed
3. `respond` - resolves elicitation with ElicitResult (accept/reject/abort)
4. For URL elicitations: 'accept' is no-op for error-based retry (-32042), retry driven by onWaitingDismiss
5. `getElicitationMode` - determines 'form' or 'url' mode from params
6. `findElicitationInQueue` - finds queued event by serverName and elicitationId
7. `registerElicitationHandler` - registers ElicitRequestSchema handler on client
8. Wrapped in try/catch (throws if client lacks elicitation capability)
9. Executes elicitation hooks before showing prompt
10. Sets app state with elicitation request for UI display
11. Handles ElicitationCompleteNotification for URL flow completion
12. Executes notification hooks and elicitation result hooks
13. Logs elicitation events for analytics

## Exports
- `ElicitationWaitingState` - waiting state configuration type
- `ElicitationRequestEvent` - elicitation request event type
- `registerElicitationHandler` - registers elicitation request handler
