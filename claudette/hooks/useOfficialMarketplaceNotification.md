## Purpose
Runs on application startup to ensure the official Anthropic marketplace plugin is installed, showing success or error notifications in the REPL bottom-right corner.

## Imports
- **Stdlib**: None
- **External**: `react` (none directly), `ink` (`Text`)
- **Internal**:
  - `context/notifications` - `Notification` type
  - `utils/debug` - `logForDebugging`
  - `utils/plugins/officialMarketplaceStartupCheck` - `checkAndInstallOfficialMarketplace`
  - `hooks/notifs/useStartupNotification` - `useStartupNotification`

## Logic
This hook delegates to `useStartupNotification`, passing an async initializer function that calls `checkAndInstallOfficialMarketplace()`. The initializer builds an array of notifications based on the result:

- If `configSaveFailed`: warns about permissions (`~/.claude.json`) with a 10s error.
- If `installed`: success tick with 7s timeout prompting `/plugin`.
- If `skipped` with `reason === "unknown"`: warning that installation will retry on next startup (8s).

The `useStartupNotification` effect runs this initializer once on mount and queues the returned notifications.

## Exports
- `useOfficialMarketplaceNotification` - mount this hook to trigger marketplace auto-install and notifications.
