# utils/autoUpdater

## Purpose
Provides automatic CLI update checking and installation.

## Imports
- **Stdlib**: `fs/promises`, `os`, `path`
- **External**: `axios`
- **Internal**: growthbook, analytics, config, debug, env, envUtils, errors, execFileNoThrow, fsOperations, gracefulShutdown, log, semver, settings, shellConfig, JSON utils

## Logic
1. `GCS_BUCKET_URL` - Google Cloud Storage bucket for releases
2. `AutoUpdaterError` - extends ClaudeError
3. `InstallStatus` - success, no_permissions, install_failed, in_progress
4. `AutoUpdaterResult` - version, status, notifications
5. `MaxVersionConfig` - external/ant version limits with messages
6. `assertMinVersion` - checks minimum version from Statsig config
7. Uses semver comparison (ignores build metadata +SHA)
8. Terminates process if version too old
9. SHA-based versioning for continuous deployment
10. `checkForUpdates` - checks for available updates
11. `installGlobalPackage` - installs package globally
12. `getLatestVersion` - gets latest version from registry
13. `updateShellAliases` - updates shell aliases after update
14. `filterClaudeAliases` - filters claude-related aliases
15. `getShellConfigPaths` - gets shell config file paths
16. `readFileLines`/`writeFileLines` - file line operations

## Exports
- `AutoUpdaterError` - auto updater error class
- `InstallStatus` - install status type
- `AutoUpdaterResult` - update result type
- `MaxVersionConfig` - max version config type
- `assertMinVersion` - asserts minimum version
- `checkForUpdates` - checks for updates
- `installGlobalPackage` - installs package globally
- `getLatestVersion` - gets latest version
