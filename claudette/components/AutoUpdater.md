## Purpose
A component that manages the automatic checking, downloading, and installation of application updates to ensure the user is running the latest stable version.

## Imports
- **Stdlib**: None
- **External**: `react`, `usehooks-ts`
- **Internal**: `ink` (Box, Text), `hooks/useUpdateNotification`, `services/analytics`, `utils/autoUpdater`, `utils/config`, `utils/debug`, `utils/doctorDiagnostic`, `utils/localInstaller`, `utils/nativeInstaller`, `utils/semver`, `utils/settings/settings` (getInitialSettings)

## Logic
1. **Version Checking**:
    - Periodically polls for the latest available application version from a specified update channel (e.g., 'latest').
    - Compares the latest version against the currently running version and a server-side maximum version cap (`getMaxVersion`), which acts as a kill switch.
    - Respects user preferences and configuration flags to disable auto-updates or skip specific versions.
2. **Update Mechanism**:
    - Detects the installation type (local npm, global npm, or native) to determine the appropriate update strategy.
    - Executes package manager commands (`npm update` for local, `npm i -g` for global) to install the new version.
    - Manages a state flag (`isUpdating`) to prevent concurrent update processes.
    - Handles legacy symlink removal if migrating to a different installation method.
3. **User Feedback and Reporting**:
    - Displays real-time status messages to the user (e.g., "Auto-updating...", success notifications, or detailed error messages with troubleshooting advice).
    - Logs detailed telemetry events for both successful updates and failures, including version numbers, duration, and installation method.
4. **Error Handling and Resiliency**:
    - Implements robust error logging and display for failed updates, suggesting common manual fixes (e.g., running `claude doctor` or manual package updates).
    - Gracefully handles scenarios like development builds or unexpected installation types.

## Exports
- `AutoUpdater` - A component that handles the lifecycle of checking for and applying application updates.
