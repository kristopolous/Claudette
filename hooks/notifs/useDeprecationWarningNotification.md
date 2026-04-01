## Purpose
Shows a high-priority notification when the currently selected model is deprecated.

## Imports
- **External**: `react` (useEffect, useRef)
- **Internal**:
  - `src/context/notifications.js` (useNotifications)
  - `src/utils/model/deprecation.js` (getModelDeprecationWarning)
  - `../../bootstrap/state.js` (getIsRemoteMode)

## Logic
- Hook parameter: `model: string`
- Not shown in remote mode (`getIsRemoteMode()`)
- Calls `getModelDeprecationWarning(model)` to get warning text (or null)
- If warning exists and differs from last shown: displays notification with key "model-deprecation-warning", color "warning", priority "high"
- Tracks last warning via ref to avoid repeat notifications
- When model loses deprecation, resets last warning ref
- Effect re-runs when `model` or `addNotification` changes

## Exports
- `useDeprecationWarningNotification` - Hook `(model: string) => void`
