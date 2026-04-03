## Purpose
Handles automatic updates for native installations by checking for new versions and installing them in the background.

## Imports
- **Stdlib**: none
- **External**: REACT (useEffect, useRef, useState), `usehooks-ts` (useInterval)
- **Internal**: `services/analytics` (logEvent), `utils/debug` (logForDebugging), `utils/log` (logError), `hooks/useUpdateNotification`, `ink` (Box, Text), `utils/autoUpdater` (getMaxVersion, getMaxVersionMessage), `utils/config` (isAutoUpdaterDisabled), `utils/nativeInstaller` (installLatest), `utils/semver` (gt), `utils/settings/settings` (getInitialSettings)

## Logic
1. Checks for updates on mount and every 30 minutes using a ref-based guard to prevent concurrent installs
2. Verifies max version constraints from the server before proceeding
3. Calls installLatest to fetch and install the newest version from the configured channel
4. Logs analytics events for start, success, lock contention, and failure with error type categorization
5. Displays version info, update progress, success messages, or error states based on current status

## Exports
- `NativeAutoUpdater` - manages background update checks and installations for native builds, showing status feedback
