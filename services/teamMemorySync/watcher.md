# services/teamMemorySync/watcher

## Purpose
Watches team memory directory for changes and triggers debounced push to server.

## Imports
- **Stdlib**: `fs`
- **External**: `bun:bundle`
- **Internal**: teamMemPaths, cleanupRegistry, debug, errors, git, analytics, teamMemorySync index/types

## Logic
1. `DEBOUNCE_MS` (2s) - wait after last change before pushing
2. Watcher state: FSWatcher, debounceTimer, pushInProgress, hasPendingChanges, currentPushPromise, watcherStarted
3. `pushSuppressedReason` - set after permanent failure to prevent infinite retry loop
4. `isPermanentFailure` - checks if failure can't self-heal
5. Permanent: no_oauth, no_repo, 4xx except 409/429
6. 409 (conflict) and 429 (rate limit) are transient - can retry
7. Sync state shared across all sync operations
8. Performs initial pull on startup
9. Starts directory-level fs.watch for first-time writes
10. Debounces push on file changes
11. Tracks push lifecycle with promise
12. Logs events for analytics
13. Registers cleanup on shutdown

## Exports
- `DEBOUNCE_MS` - debounce interval constant
- `isPermanentFailure` - checks if failure is permanent
- `startTeamMemoryWatcher` - starts file watcher
- `stopTeamMemoryWatcher` - stops file watcher
- (Watcher state and lifecycle functions)
