# utils/messageQueueManager

## Purpose
Provides unified command queue management for user input, task notifications, and orphaned permissions.

## Imports
- **Stdlib**: (none)
- **External**: BUILDFLAGS, `@anthropic-ai/sdk`
- **Internal**: types utils, bootstrap state, state, messageQueueTypes, textInputTypes, config, messages, objectGroupBy, sessionStorage, signal

## Logic
1. `SetAppState` - state setter function type
2. `logOperation` - logs queue operation to session storage
3. Records: type, operation, timestamp, sessionId, content
4. `commandQueue` - module-level unified command queue
5. All commands go through single queue (user input, task notifications, orphaned permissions)
6. `snapshot` - frozen array snapshot for useSyncExternalStore
7. `queueChanged` - signal for queue changes
8. `notifySubscribers` - notifies subscribers of queue changes
9. `subscribeToCommandQueue` - subscribes to queue changes
10. `getCommandQueueSnapshot` - gets frozen snapshot of queue
11. `getCommandQueue` - gets current command queue
12. `getCommandQueueLength` - gets queue length
13. `enqueueCommand` - enqueues command with priority
14. `dequeueCommand` - dequeues highest priority command
15. `dequeueAllMatching` - dequeues all matching commands
16. `hasCommandsInQueue` - checks if queue has commands
17. `peek` - peeks at next command without dequeuing
18. Priority: 'now' > 'next' > 'later', FIFO within same priority

## Exports
- `SetAppState` - state setter type
- `subscribeToCommandQueue` - subscribes to queue changes
- `getCommandQueueSnapshot` - gets queue snapshot
- `getCommandQueue` - gets command queue
- `getCommandQueueLength` - gets queue length
- `enqueueCommand` - enqueues command
- `dequeueCommand` - dequeues command
- `dequeueAllMatching` - dequeues matching commands
- `hasCommandsInQueue` - checks queue has commands
- `peek` - peeks at next command
