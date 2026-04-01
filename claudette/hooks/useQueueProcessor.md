## Purpose
Processes the unified command queue when a query is not active, there are queued commands, and no local JSX UI is blocking input.

## Imports
- **External**: `react` (useEffect, useSyncExternalStore)
- **Internal**:
  - `../types/textInputTypes.js` (QueuedCommand)
  - `../utils/messageQueueManager.js` (getCommandQueueSnapshot, subscribeToCommandQueue)
  - `../utils/QueryGuard.js` (QueryGuard type)
  - `../utils/queueProcessor.js` (processQueueIfReady)

## Logic
- Hook parameters:
  - `executeQueuedInput`: async function that executes an array of queued commands
  - `hasActiveLocalJsxUI`: boolean; if true, processing is blocked
  - `queryGuard`: object with `subscribe`, `getSnapshot`, and `reserve/cancelReservation`
- Subscribes to two external stores via `useSyncExternalStore`:
  1. `queryGuard` → `isQueryActive` (true during API requests)
  2. Command queue → `queueSnapshot` (current queued commands)
- `useEffect` watches `[queueSnapshot, isQueryActive, executeQueuedInput, hasActiveLocalJsxUI, queryGuard]`
- Effect body: if query active, UI blocking, or queue empty → return; else calls `processQueueIfReady({ executeInput: executeQueuedInput })`
- The queue processor handles priority ordering ('now' > 'next' > 'later') and reservation semantics to avoid concurrent exec

## Exports
- `useQueueProcessor` - Hook `(params: { executeQueuedInput: (commands: QueuedCommand[]) => Promise<void>, hasActiveLocalJsxUI: boolean, queryGuard: QueryGuard }) => void`
- `UseQueueProcessorParams` type
