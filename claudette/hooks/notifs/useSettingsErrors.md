## Purpose
Monitors configuration file for validation errors; shows a high-priority warning directing users to `/doctor` for details.

## Imports
- **External**: REACT (useCallback, useEffect, useState)
- **Internal**:
  - src/context/notifications` (useNotifications, addNotification, removeNotification)
  - `.././bootstrap/state` (getIsRemoteMode)
  - `.././utils/settings/allErrors` (getSettingsWithAllErrors)
  - `.././utils/settings/validation` (ValidationError type)
  - `./useSettingsChange` (useSettingsChange)

## Logic
- Hook returns `ValidationError[]` (array of settings issues)
- `useSettingsChange` subscribes to settings file changes and triggers `handleSettingsChange` to re-fetch errors
- State `errors_0` holds current errors; initial read via `getSettingsWithAllErrors()`
- `useEffect` on `[errors_0, addNotification, removeNotification]`:
  - If errors exist (length > 0): add notification with:
    - `key`: "settings-errors"
    - `text`: "Found N settings issue(s) · /doctor for details"
    - `color`: "warning"
    - `priority`: "high"
    - `timeoutMs`: 60000
  - Else: remove notification by key
- Skips in remote mode

## Exports
- `useSettingsErrors` - Hook returning `ValidationError[]`
