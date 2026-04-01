## Purpose
Shows a one-shot notification when the user wraps past auto mode in the permission mode carousel, explaining why auto mode is unavailable.

## Imports
- **External**: `bun:bundle` (feature), `react` (useEffect, useRef)
- **Internal**:
  - `src/context/notifications.js` (useNotifications)
  - `../../bootstrap/state.js` (getIsRemoteMode)
  - `../../state/AppState.js` (useAppState)
  - `../../utils/permissions/PermissionMode.js` (PermissionMode type)
  - `../../utils/permissions/permissionSetup.js` (getAutoModeUnavailableNotification, getAutoModeUnavailableReason)
  - `../../utils/settings/settings.js` (hasAutoModeOptIn)

## Logic
- Requires `feature('TRANSCRIPT_CLASSIFIER')` and not remote mode
- Tracks permission mode changes via refs
- Detects transition to `'default'` from a non-default, non-auto mode when auto is unavailable and user has opted in
- Condition indicates user shifted past auto slot in mode carousel
- Shows warning notification with reason text; one-shot per session

## Exports
- `useAutoModeUnavailableNotification` - Hook with no parameters
