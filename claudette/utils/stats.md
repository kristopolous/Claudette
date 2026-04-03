# stats

## Purpose
Aggregates usage statistics from all Claude Code session files across all projects, including session counts, message counts, daily activity, streaks, model usage, and speculation time saved. Uses a disk cache to avoid reprocessing historical data.

## Imports
- **Stdlib**: BUILDFLAGS, `fs/promises`, `path`
- **External**: none
- **Internal**: `src/entrypoints/agentSdkTypes`, `../types/logs`, `./debug`, `./errors`, `./fsOperations`, `./json`, `./messages`, `./sessionStorage`, `./shell/shellToolUtils`, `./slowOperations`, `./statsCache`

## Logic
1. **Session file discovery**: `getAllSessionFiles()` scans all project directories for `.jsonl` session files, including subagent transcripts in `{projectDir}/{sessionId}/subagents/agent-{agentId}.jsonl`
2. **Processing**: `processSessionFiles()` reads entries in parallel batches (20 at a time), extracts transcript messages, tracks daily activity, model usage, tool calls, speculation time, and shot counts (ant-only, gated by `SHOT_STATS` feature flag). Subagent files contribute tokens/tool-calls but aren't counted as separate sessions.
3. **Caching**: `aggregateClaudeCodeStats()` uses a lock-protected disk cache (`statsCache`). On first run it processes all historical data; on subsequent runs it only processes days since `lastComputedDate`. Today's data is always processed live.
4. **Derived stats**: `cacheToStats()` merges the persisted cache with today's stats, computing streaks, peak activity day/hour, longest session, first/last session dates, and total days span.
5. **Date ranges**: `aggregateClaudeCodeStatsForRange()` supports `'7d'`, `'30d'`, and `'all'` ranges. For non-`'all'` ranges it bypasses the cache and processes files directly.
6. **Streak calculation**: `calculateStreaks()` computes current streak (working backwards from today) and longest streak from the set of active dates.
7. **Optimization**: `readSessionStartDate()` peeks at the first 4KB of a session file to extract the start date without loading the full file, used to skip old sessions when a `fromDate` filter is applied.

## Exports
- `DailyActivity` - type for daily session/message/tool-call counts
- `DailyModelTokens` - type for daily token usage per model
- `StreakInfo` - type for current/longest streak data
- `SessionStats` - type for individual session metadata
- `ClaudeCodeStats` - type for the full aggregated stats object
- `StatsDateRange` - type alias for `'7d' | '30d' | 'all'`
- `aggregateClaudeCodeStats` - main entry point, aggregates all stats with caching
- `aggregateClaudeCodeStatsForRange` - aggregates stats for a specific date range
- `readSessionStartDate` - peeks at a session file's first transcript message date

## Source
`stats`
