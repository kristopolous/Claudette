# utils/activityManager

## Purpose
Manages activity tracking for user and CLI operations with automatic deduplication.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: bootstrap state

## Logic
1. `ActivityManagerOptions` - getNow, getActiveTimeCounter options
2. Singleton pattern via getInstance()
3. `activeOperations` - Set tracking active operations
4. `lastUserActivityTime` - timestamp of last user activity (0 = none)
5. `lastCLIRecordedTime` - timestamp of last CLI time recorded
6. `isCLIActive` - flag for CLI activity state
7. `USER_ACTIVITY_TIMEOUT_MS` (5s) - timeout for user activity
8. `recordUserActivity` - records user interaction
9. Doesn't record if CLI active (CLI takes precedence)
10. Records time if within timeout window
11. `startCLIActivity` - marks CLI activity start
12. `endCLIActivity` - marks CLI activity end, records accumulated time
13. `startOperation`/`endOperation` - tracks named operations
14. `resetInstance`/`createInstance` - testing utilities
15. Uses getActiveTimeCounter for time accumulation

## Exports
- `ActivityManagerOptions` - options type
- `ActivityManager` - activity manager class
