# update

## Purpose
Implements the update command that checks for newer versions, detects installation issues, and performs updates.

## Imports
- **Stdlib**: (none)
- **External**: STYLER
- **Internal**: analytics, autoUpdater, completionCache, config, debug, doctorDiagnostic, gracefulShutdown, localInstaller, nativeInstaller, semver, settings, process utils

## Logic
1. Logs update check event and displays current version
2. Checks for updates based on autoUpdatesChannel (latest/stable)
3. Runs diagnostic to detect installation type and issues
4. Warns about multiple installations found
5. Displays warnings with fix suggestions (PATH issues, etc.)
6. Updates config to track installation method if not set
7. Maps diagnostic installation type to config install method (local/native/global)
8. Skips install method tracking for package manager installations

## Exports
- `update` - async function that performs update check and installation
