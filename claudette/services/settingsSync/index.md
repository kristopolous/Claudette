# settingsSync/index

## Purpose
Syncs user settings and memory files across Claudette environments (interactive CLI and CCR).

## Imports
- **Stdlib**: `fs/promises`, `path`
- **External**: BUILDFLAGS, `axios`, `lodash-es/pickBy`
- **Internal**: bootstrap state, oauth constants, auth utils, claudemd, config, diagLogs, errors, git, model providers, settings utils, sleep, userAgent, GrowthBook, analytics, API withRetry, settingsSync types

## Logic
1. Interactive CLI: uploads local settings to remote (incremental, only changed entries)
2. CCR: downloads remote settings to local before plugin installation
3. `SETTINGS_SYNC_TIMEOUT_MS` (10s), `DEFAULT_MAX_RETRIES` (3)
4. `MAX_FILE_SIZE_BYTES` (500KB) - matches backend limit
5. `uploadUserSettingsInBackground` - background upload for interactive CLI
6. Feature-gated: UPLOAD_USER_SETTINGS, tengu_enable_settings_sync_push
7. Requires interactive mode and OAuth authentication
8. `fetchUserSettings` - retrieves remote settings for comparison
9. Logs events for upload skipped/started/completed
10. Clears memory file caches on sync
11. Resets settings cache after sync

## Exports
- `uploadUserSettingsInBackground` - async background upload function
- (Additional settings sync functions for download, comparison, merge)
