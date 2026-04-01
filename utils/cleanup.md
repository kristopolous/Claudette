# utils/cleanup

## Purpose
Provides cleanup utilities for old files, messages, errors, and caches.

## Imports
- **Stdlib**: `fs/promises`, `os`, `path`
- **External**: (none)
- **Internal**: analytics, cachePaths, debug, envUtils, fsOperations, imageStore, lockfile, log, nativeInstaller, pasteStore, sessionStorage, settings allErrors/settings, toolResultStorage, worktree

## Logic
1. `DEFAULT_CLEANUP_PERIOD_DAYS` (30) - default cleanup period
2. `getCutoffDate` - calculates cutoff date from settings.cleanupPeriodDays
3. `CleanupResult` - messages, errors count
4. `addCleanupResults` - combines cleanup results
5. `convertFileNameToDate` - converts filename format to Date
6. Handles ISO string with T-HH-MM-SS-MSZ format
7. `cleanupOldFilesInDirectory` - cleans old files in directory
8. Converts filename to timestamp, compares to cutoff
9. Unlinks files older than cutoff
10. Tracks messages vs errors separately
11. `cleanupOldMessageFilesInBackground` - cleans old message files
12. `cleanupOldErrorFilesInBackground` - cleans old error files
13. `cleanupOldImageCaches` - cleans old image caches
14. `cleanupOldPastes` - cleans old pastes
15. `cleanupOldVersions` - cleans old CLI versions
16. `cleanupStaleAgentWorktrees` - cleans stale worktrees
17. Uses lockfile for concurrent cleanup prevention

## Exports
- `DEFAULT_CLEANUP_PERIOD_DAYS` - default cleanup period
- `CleanupResult` - cleanup result type
- `addCleanupResults` - combines cleanup results
- `convertFileNameToDate` - converts filename to date
- `cleanupOldFilesInDirectory` - cleans old files
- (Background cleanup functions)
