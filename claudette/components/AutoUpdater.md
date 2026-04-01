## Purpose
Handles automatic updates for npm-based installations by checking for new versions and performing global or local package updates.

## Imports
- **Stdlib**: none
- **External**: `react` (useEffect, useRef, useState), `usehooks-ts` (useInterval)
- **Internal**: `services/analytics` (logEvent), `hooks/useUpdateNotification`, `ink` (Box, Text), `utils/autoUpdater` (getLatestVersion, getMaxVersion, installGlobalPackage, shouldSkipVersion), `utils/config` (getGlobalConfig, isAutoUpdaterDisabled), `utils/debug` (logForDebugging), `utils/doctorDiagnostic` (getCurrentInstallationType), `utils/localInstaller` (installOrUpdateClaudePackage, localInstallationExists), `utils/nativeInstaller` (removeInstalledSymlink), `utils/semver` (gt, gte), `utils/settings/settings` (getInitialSettings)

## Logic
1. Checks for updates on mount and every 30 minutes using a ref-based guard to prevent concurrent installs
2. Detects the current installation type (npm-local, npm-global, native, development) and chooses the appropriate update method
3. Caps the latest version if a server-side max version is set
4. Removes the native installer symlink when using JS-based updates for non-migrated users
5. Performs the update via installOrUpdateClaudePackage or installGlobalPackage based on installation type
6. Logs analytics events for success and failure with version and duration metadata
7. Displays version info, update progress, success messages, or error states with remediation hints

## Exports
- `AutoUpdater` - manages background update checks and installations for npm-based builds, showing status feedback
