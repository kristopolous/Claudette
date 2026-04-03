## Purpose
Base hook for one-time startup notifications; handles remote-mode gating, single execution per session, and supports async compute.

## Imports
- **External**: REACT (useEffect, useRef)
- **Internal**:
  - `.././bootstrap/state` (getIsRemoteMode)
  - `.././context/notifications` (Notification type, useNotifications)
  - `.././utils/log` (logError)

## Logic
- Hook parameter `compute`: function returning `Notification` | `Notification[]` | `null` | `Promise` of same
- On mount (first effect):
  - Skip if `getIsRemoteMode()` or if already executed (`hasRunRef`)
  - Call `computeRef.current()` (ensures latest compute without re-subscribing)
  - If result truthy:
    - Normalize to array and call `addNotification` for each
  - Catch errors and route to `logError`
- Runs exactly once per session; subsequent remounts (like hot-reload) are no-ops due to `hasRunRef`
- Many specialized startup notification hooks wrap this (e.g., useInstallMessages, useNpmDeprecationNotification)

## Exports
- `useStartupNotification` - Hook `(compute: () => Result | Promise<Result>) => void`
- `Result` - Type alias: `Notification | Notification[] | null`
