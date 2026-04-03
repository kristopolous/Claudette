## Purpose
Returns formatted elapsed time for a timer; updates at regular intervals while running, supports pausing and optional end time to freeze duration.

## Imports
- **External**: REACT (useCallback, useSyncExternalStore)
- **Internal**: `../utils/format` (formatDuration)

## Logic
- Parameters: `startTime: number`, `isRunning: boolean`, `ms: number = 1000`, `pausedMs: number = 0`, `endTime?: number`
- `get` snapshot: `duration = (endTime ?? Date.now()) - startTime - pausedMs`; formats with `formatDuration` (non-negative)
- `subscribe`: if `isRunning`, sets interval to call `notify` every `ms`; clears on unsubscribe
- Uses `useSyncExternalStore(subscribe, get, get)` for efficient, consistent updates
- Common use: terminal task timers that can pause or complete

## Exports
- `useElapsedTime` - Hook returning formatted duration string
