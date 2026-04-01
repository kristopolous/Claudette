# utils/settings/changeDetector

## Purpose
Provides settings file change detection with chokidar watcher and MDM polling.

## Imports
- **Stdlib**: `fs/promises`, `path`
- **External**: `chokidar`
- **Internal**: bootstrap state, cleanupRegistry, debug, errors, hooks, signal, JSON utils, settings constants/internalWrites/managedPath/mdm/settings/settingsCache

## Logic
1. `FILE_STABILITY_THRESHOLD_MS` (1000) - wait time for file writes to stabilize
2. `FILE_STABILITY_POLL_INTERVAL_MS` (500) - polling interval for stability check
3. `INTERNAL_WRITE_WINDOW_MS` (5000) - time window to consider file change as internal
4. `MDM_POLL_INTERVAL_MS` (30 min) - poll interval for MDM settings (registry/plist)
5. `DELETION_GRACE_MS` - grace period before processing settings file deletion
6. Handles delete-and-recreate pattern during auto-updates or session startup
7. Must exceed chokidar's awaitWriteFinish delay (stabilityThreshold + pollInterval)
8. `watcher` - chokidar FSWatcher instance
9. `mdmPollTimer` - MDM poll timer
10. `lastMdmSnapshot` - last MDM settings snapshot
11. `initialized`, `disposed` - initialization and disposal flags
12. `pendingDeletions` - Map of pending deletion timeouts
13. `settingsChanged` - signal for settings changes
14. `testOverrides` - test overrides for timing constants
15. `setupSettingsChangeDetector` - sets up settings change detector
16. `disposeSettingsChangeDetector` - disposes settings change detector
17. `markInternalWrite` - marks internal write to prevent self-triggering
18. `clearInternalWrites`, `consumeInternalWrite` - internal write tracking
19. `executeConfigChangeHooks` - executes config change hooks
20. `hasBlockingResult` - checks if hook has blocking result
21. `getIsRemoteMode` - checks remote mode
22. `registerCleanup` - registers cleanup function
23. `logForDebugging` - debug logging
24. `errorMessage` - gets error message
25. `createSignal` - creates signal
26. `jsonStringify` - JSON stringify
27. `SETTING_SOURCES`, `SettingSource` - setting source types
28. `getManagedSettingsDropInDir` - gets managed settings drop-in dir
29. `getHkcuSettings`, `getMdmSettings`, `refreshMdmSettings`, `setMdmSettingsCache` - MDM settings functions
30. `getSettingsFilePathForSource` - gets settings file path for source
31. `resetSettingsCache` - resets settings cache

## Exports
- `FILE_STABILITY_THRESHOLD_MS` - stability threshold constant
- `FILE_STABILITY_POLL_INTERVAL_MS` - poll interval constant
- `INTERNAL_WRITE_WINDOW_MS` - internal write window constant
- `MDM_POLL_INTERVAL_MS` - MDM poll interval constant
- `DELETION_GRACE_MS` - deletion grace constant
- `setupSettingsChangeDetector` - sets up change detector
- `disposeSettingsChangeDetector` - disposes change detector
- `markInternalWrite` - marks internal write
- (Settings change detection functions)
