# compact/timeBasedMCConfig

## Purpose
Provides GrowthBook configuration for time-based microcompact that triggers on session idle gaps.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: growthbook utils

## Logic
1. `TimeBasedMCConfig` - configuration type with enabled, gapThresholdMinutes, keepRecent
2. `enabled` - master switch for time-based microcompact
3. `gapThresholdMinutes` - triggers when (now - last assistant timestamp) exceeds threshold
4. Default 60 minutes - safe choice matching server's 1h cache TTL (guaranteed expired)
5. `keepRecent` - number of most-recent compactable tool results to preserve
6. Runs BEFORE API call (in microcompactMessages, upstream of callModel)
7. Shrunk prompt is what actually gets sent (not after first miss)
8. Main thread only - subagents have short lifetimes where gap-based eviction doesn't apply
9. `TIME_BASED_MC_CONFIG_DEFAULTS` - enabled: false, gapThresholdMinutes: 60, keepRecent: 5
10. `getTimeBasedMCConfig` - fetches config from GrowthBook with defaults

## Exports
- `TimeBasedMCConfig` - configuration type
- `getTimeBasedMCConfig` - fetches time-based MC config from GrowthBook
- `TIME_BASED_MC_CONFIG_DEFAULTS` - default configuration values
