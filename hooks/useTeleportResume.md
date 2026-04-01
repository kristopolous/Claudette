# useTeleportResume

## Purpose
Manages teleported session resumption, handling session selection, error states, and the resume operation.

## Imports
- **Stdlib**: None
- **External**: None
- **Internal**: `setTeleportedSessionInfo`, `logEvent`, `TeleportRemoteResponse`, `CodeSession`, `errorMessage`, `TeleportOperationError`, `teleportResumeCodeSession`

## Logic
1. Tracks isResuming state during async resume operation
2. Manages error state with formatted error messages
3. Handles selected session for potential user selection UI
4. Calls teleportResumeCodeSession to resume a session by ID
5. Sets teleported session info in bootstrap state
6. Logs analytics events for resume attempts

## Exports
- `useTeleportResume` - Hook returning resumeSession, isResuming, error, selectedSession, clearError
- `TeleportResumeError` - Error type with message, formattedMessage, isOperationError
- `TeleportSource` - Type for 'cliArg' or 'localCommand'
