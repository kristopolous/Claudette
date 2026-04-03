## Purpose
Shows low-priority batched notifications when in-process teammates (swarm agents) spawn or shut down, aggregating counts via fold.

## Imports
- **External**: REACT (useEffect, useRef)
- **Internal**:
  - `.././bootstrap/state` (getIsRemoteMode)
  - `.././context/notifications` (Notification type, useNotifications)
  - `.././state/AppState` (useAppState)
  - `.././tasks/InProcessTeammateTask/types` (isInProcessTeammateTask)

## Logic
- Hooks into `useAppState` to watch `tasks`
- Maintains two ref sets: `seenRunningRef` (IDs already spawned) and `seenCompletedRef` (IDs already completed)
- On tasks change:
  - For each `isInProcessTeammateTask`:
    - If status becomes 'running' and ID not in seenRunning → add and `addNotification(makeSpawnNotif(1))`
    - If status becomes 'completed' and ID not in seenCompleted → add and `addNotification(makeShutdownNotif(1))`
- Notifications include:
  - Spawn: key 'teammate-spawn', text "1 agent spawned" or "N agents spawned", priority 'low', timeout 5s, with `fold` that sums counts
  - Shutdown: key 'teammate-shutdown', "1 agent shut down" / "N agents shut down", similar fold
- Fold functions combine multiple notifications into a single aggregated one (displayed count increments)
- Skips in remote mode

## Exports
- `useTeammateLifecycleNotification` - Hook with no parameters (note: exported function name; file is src/hooks/notifs/useTeammateShutdownNotification)
