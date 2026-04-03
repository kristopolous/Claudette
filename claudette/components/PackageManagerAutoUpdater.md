## Purpose
Checks for available updates and displays an update prompt with the appropriate package manager command.

## Imports
- **Stdlib**: none
- **External**: REACT, `usehooks-ts`
- **Internal**: `Text`, `getLatestVersionFromGcs`, `getMaxVersion`, `shouldSkipVersion`, `isAutoUpdaterDisabled`, `logForDebugging`, `getPackageManager`, `gt`, `gte`, `getInitialSettings`

## Logic
On mount and at 30-minute intervals, checks for updates by fetching the latest version from GCS, respecting the auto-update channel and max version cap. Compares the current version against the latest using semver comparison. If an update is available, displays the appropriate upgrade command based on the detected package manager (homebrew, winget, or apk).

## Exports
- `PackageManagerAutoUpdater` - renders an update available message with the correct package manager command
