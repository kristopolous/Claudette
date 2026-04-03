# statsCache

## Purpose
Persisted stats cache stored on disk. Contains aggregated historical stats (daily activity, model tokens, session stats, hour counts, speculation time, shot distribution) that won't change. Provides atomic read/write with version migration and in-memory locking.

## Imports
- **Stdlib**: BUILDFLAGS (feature flag), crypto (randomBytes), fs/promises (open), path
- **External**: (none)
- **Internal**: ../entrypoints/agentSdkTypes, ./debug, ./envUtils, ./errors, ./fsOperations, ./log, ./slowOperations, ./stats

## Logic
1. `STATS_CACHE_VERSION = 3`, `MIN_MIGRATABLE_VERSION = 1`, `STATS_CACHE_FILENAME = 'stats-cache.json'`
2. `withStatsCacheLock(fn)` - simple in-memory lock to prevent concurrent cache operations. Waits for any existing lock, creates new lock, executes fn, releases lock.
3. `PersistedStatsCache` type - schema with: version, lastComputedDate, dailyActivity[], dailyModelTokens[], modelUsage{}, totalSessions, totalMessages, longestSession, firstSessionDate, hourCounts{}, totalSpeculationTimeSavedMs, shotDistribution?
4. `getStatsCachePath()` - returns path to stats-cache.json in Claude config home dir
5. `getEmptyCache()` - returns a fresh cache with all fields zeroed/empty
6. `migrateStatsCache(parsed)` - migrates older cache versions to current schema. Returns null if version is unknown, too old (< MIN_MIGRATABLE_VERSION), or too new. Preserves historical aggregates that would be lost when transcript files have aged out. Notably preserves `shotDistribution` as undefined (not `{}`) so SHOT_STATS recompute check fires for v1/v2 caches.
7. `loadStatsCache()` - loads cache from disk:
   - Reads file, parses JSON
   - If version mismatch, attempts migration; if migration fails or SHOT_STATS feature needs shotDistribution recomputation, returns empty cache
   - Validates structure (dailyActivity, dailyModelTokens arrays; totalSessions, totalMessages numbers)
   - If SHOT_STATS enabled but cache lacks shotDistribution, forces full recomputation
   - Returns empty cache on any error
8. `saveStatsCache(cache)` - saves cache atomically:
   - Writes to temp file (`stats-cache.json.{random}.tmp`) with fsync
   - Atomic rename to final path
   - Cleans up temp file on error
9. `mergeCacheWithNewStats(existingCache, newStats, newLastComputedDate)` - merges new stats into existing cache:
   - Merges dailyActivity by date (sums messageCount, sessionCount, toolCallCount)
   - Merges dailyModelTokens by date (sums tokensByModel)
   - Merges modelUsage (sums all token/cost fields, takes max for contextWindow/maxOutputTokens)
   - Merges hourCounts
   - Updates totalSessions, totalMessages, longestSession, firstSessionDate
   - Merges shotDistribution if SHOT_STATS feature enabled
   - Returns new merged PersistedStatsCache
10. `toDateString(date)` - extracts YYYY-MM-DD from Date ISO string
11. `getTodayDateString()` - today's date as YYYY-MM-DD
12. `getYesterdayDateString()` - yesterday's date as YYYY-MM-DD
13. `isDateBefore(date1, date2)` - string comparison of YYYY-MM-DD dates

## Exports
- `STATS_CACHE_VERSION` - current cache schema version (3)
- `withStatsCacheLock` - async lock wrapper for cache operations
- `PersistedStatsCache` - type alias for the persisted cache schema
- `getStatsCachePath` - returns the file path to the stats cache
- `loadStatsCache` - async function to load cache from disk with migration
- `saveStatsCache` - async function to atomically save cache to disk
- `mergeCacheWithNewStats` - merges new stats into an existing cache
- `toDateString` - extracts YYYY-MM-DD from a Date
- `getTodayDateString` - today's date as YYYY-MM-DD
- `getYesterdayDateString` - yesterday's date as YYYY-MM-DD
- `isDateBefore` - compares two YYYY-MM-DD date strings

## Source
`statsCache`
