# services/api/promptCacheBreakDetection

## Purpose
Detects and logs prompt cache breaks for debugging cache invalidation issues.

## Imports
- **Stdlib**: `fs/promises`, `path`
- **External**: `@anthropic-ai/sdk`, `diff`
- **Internal**: ids, message types, debug, hash, log, filesystem, JSON utils, querySource, analytics

## Logic
1. `getCacheBreakDiffPath` - generates random diff file path in temp dir
2. `PreviousState` - tracks systemHash, toolsHash, cacheControlHash, toolNames, perToolHashes
3. Tracks: systemCharCount, model, fastMode, globalCacheStrategy, betas, autoModeActive
4. Tracks: isUsingOverage, cachedMCEnabled, effortValue, extraBodyHash, callCount
5. `PendingChanges` - flags for what changed (systemPrompt, toolSchemas, model, fastMode, etc.)
6. cacheDeletionsPending - set when cached microcompact sends cache_edits deletions
7. `buildDiffableContent` - builds content for diff comparison
8. Detects cache breaks from: system prompt changes, tool schema changes, model changes
9. Detects cache breaks from: fastMode, cacheControl, globalCacheStrategy, betas changes
10. Detects cache breaks from: autoMode, overage, cachedMC state flips
11. Writes diff files for debugging
12. Logs events for analytics
13. `notifyCacheDeletion` - notifies of cache deletion
14. `cleanupAgentTracking` - cleans up agent tracking on completion

## Exports
- `PreviousState` - previous state type
- `PendingChanges` - pending changes type
- `getCacheBreakDiffPath` - generates diff file path
- `notifyCacheDeletion` - notifies cache deletion
- `cleanupAgentTracking` - cleans up agent tracking
