# services/teamMemorySync/index

## Purpose
Syncs team memory files between local filesystem and server API with repo-scoped sharing.

## Imports
- **Stdlib**: `crypto`, `fs/promises`, `path`
- **External**: `axios`
- **Internal**: oauth constants, teamMemPaths, array utils, auth, debug, errors, git, model providers, sleep, JSON utils, userAgent, analytics, API withRetry, secretScanner, types

## Logic
1. API contract: GET/PUT /api/claude_code/team_memory?repo={owner/repo}
2. GET with view=hashes returns metadata + entryChecksums only (no bodies)
3. Sync semantics: pull overwrites local (server wins), push uploads delta (upsert)
4. File deletions don't propagate - next pull restores deleted files
5. SyncState object for mutable state (ETag tracking, watcher suppression)
6. `TEAM_MEMORY_SYNC_TIMEOUT_MS` (30s)
7. `MAX_FILE_SIZE_BYTES` (250KB) - pre-filtering saves bandwidth
8. No client-side entry cap - learns from server's structured 413
9. Gateway body-size cap (~256-512KB)
10. `pullTeamMemory` - fetches and applies server state
11. `pushTeamMemory` - uploads delta with checksum comparison
12. `isTeamMemorySyncAvailable` - checks sync availability
13. `createSyncState` - creates sync state object
14. Secret scanning before upload via scanForSecrets

## Exports
- `TEAM_MEMORY_SYNC_TIMEOUT_MS` - sync timeout constant
- `MAX_FILE_SIZE_BYTES` - max file size constant
- `pullTeamMemory` - pulls team memory from server
- `pushTeamMemory` - pushes team memory to server
- `isTeamMemorySyncAvailable` - checks sync availability
- `createSyncState` - creates sync state object
- `SyncState` - sync state type
