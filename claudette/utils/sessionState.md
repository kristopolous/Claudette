# sessionState

## Purpose
Manages session lifecycle state (idle/running/requires_action) and external metadata for CCR/IDE clients. Provides a listener-based pub-sub pattern so state changes propagate to multiple consumers (external_metadata PUT, SDK status stream) from a single choke point.

## Logic
1. Maintains a current `SessionState` ('idle' | 'running' | 'requires_action') and `hasPendingAction` flag
2. Three listener slots: state changes, metadata changes, permission mode changes
3. `notifySessionStateChanged` updates internal state, mirrors `RequiresActionDetails` into external_metadata.pending_action on blocked transitions, clears it on non-blocked transitions, clears task_summary on idle, and optionally emits SDK events (opt-in via CLAUDE_CODE_EMIT_SESSION_STATE_EVENTS)
4. `notifyPermissionModeChanged` fires when toolPermissionContext.mode changes — all mutation paths (Shift+Tab, ExitPlanMode dialog, slash command, bridge set_permission_mode) route through this
5. `SessionExternalMetadata` carries permission_mode, is_ultraplan_mode, model, pending_action, post_turn_summary, and task_summary — queryable JSON on the Session so frontend can iterate without proto round-trips

## Items

### setSessionStateChangedListener
**Type**: Function

### setSessionMetadataChangedListener
**Type**: Function

### setPermissionModeChangedListener
**Type**: Function

### getSessionState
**Type**: Function

### notifySessionStateChanged
**Type**: Function

### notifySessionMetadataChanged
**Type**: Function

### notifyPermissionModeChanged
**Type**: Function

### SessionState
**Type**: Type alias

### RequiresActionDetails
**Type**: Type alias

### SessionExternalMetadata
**Type**: Type alias

### SessionStateChangedListener
**Type**: Type alias

### SessionMetadataChangedListener
**Type**: Type alias

### PermissionModeChangedListener
**Type**: Type alias

## Exports
- SessionState
- RequiresActionDetails
- SessionExternalMetadata
- setSessionStateChangedListener
- setSessionMetadataChangedListener
- setPermissionModeChangedListener
- getSessionState
- notifySessionStateChanged
- notifySessionMetadataChanged
- notifyPermissionModeChanged

## Source
`sessionState`