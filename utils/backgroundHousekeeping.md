# utils/backgroundHousekeeping

## Purpose
Starts background housekeeping tasks for cleanup and feature initialization.

## Imports
- **Stdlib**: (none)
- **External**: `bun:bundle`
- **Internal**: autoDream, MagicDocs, hooks skillImprovement, extractMemories, deepLink registerProtocol, bootstrap state, cleanup, nativeInstaller, plugins pluginAutoupdate

## Logic
1. `RECURRING_CLEANUP_INTERVAL_MS` (24h) - cleanup interval
2. `DELAY_VERY_SLOW_OPERATIONS_THAT_HAPPEN_EVERY_SESSION` (10min) - delay for slow ops
3. `initMagicDocs` - initializes Magic Docs feature
4. `initSkillImprovement` - initializes skill improvement
5. `initExtractMemories` - initializes memory extraction (feature-gated)
6. `initAutoDream` - initializes auto-dream consolidation
7. `autoUpdateMarketplacesAndPluginsInBackground` - auto-updates plugins
8. `ensureDeepLinkProtocolRegistered` - registers deep link protocol (LODESTONE feature)
9. `runVerySlowOps` - runs cleanup operations with user activity check
10. Delays if user interacted in last minute
11. `cleanupOldMessageFilesInBackground` - cleans old message files
12. `cleanupOldVersions` - cleans old CLI versions
13. `cleanupNpmCacheForAnthropicPackages` - cleans npm cache
14. Uses setTimeout with unref for background execution
15. Feature-gated imports for EXTRACT_MEMORIES and LODESTONE

## Exports
- `RECURRING_CLEANUP_INTERVAL_MS` - cleanup interval constant
- `DELAY_VERY_SLOW_OPERATIONS_THAT_HAPPEN_EVERY_SESSION` - delay constant
- `startBackgroundHousekeeping` - starts background tasks
