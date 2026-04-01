# remoteManagedSettings/index

## Purpose
Manages fetching, caching, and validation of remote-managed settings for enterprise customers.

## Imports
- **Stdlib**: `crypto`, `fs/promises`
- **External**: `axios`
- **Internal**: oauth constants, auth utils, cleanupRegistry, debug, errors, settings changeDetector/types, sleep, JSON utils, userAgent, API withRetry, remoteManagedSettings securityCheck/syncCache/syncCacheState/types

## Logic
1. Checksum-based validation to minimize network traffic
2. Eligibility: Console users all eligible, OAuth needs Enterprise/C4E/Team
3. API fails open (non-blocking) - continues without remote settings on failure
4. `SETTINGS_TIMEOUT_MS` (10s), `DEFAULT_MAX_RETRIES` (5), `POLLING_INTERVAL_MS` (1hr)
5. Background polling with interval
6. `loadingCompletePromise` - resolves when initial loading completes
7. `LOADING_PROMISE_TIMEOUT_MS` (30s) prevents deadlocks
8. `initializeRemoteManagedSettingsLoadingPromise` - creates promise early for other systems
9. Only creates promise if user eligible for remote settings
10. `loadRemoteManagedSettings` - main loading function with retry logic
11. `startBackgroundPolling` - starts hourly polling for updates
12. `stopBackgroundPolling` - stops polling on shutdown
13. Security check via checkManagedSettingsSecurity before applying settings

## Exports
- `initializeRemoteManagedSettingsLoadingPromise` - initializes loading promise
- `loadRemoteManagedSettings` - loads remote managed settings
- `startBackgroundPolling` - starts background polling
- `stopBackgroundPolling` - stops background polling
- `waitForRemoteManagedSettingsToLoad` - waits for settings to load
