# utils/sequential

## Purpose
Creates sequential execution wrapper for async functions to prevent race conditions.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: (none)

## Logic
1. `QueueItem<T, R>` - { args, resolve, reject, context }
2. `sequential` - creates sequential wrapper for async function
3. Ensures concurrent calls executed one at a time in order received
4. Preserves correct return values for each call
5. Useful for operations that must be sequential (file writes, database updates)
6. `queue` - array of pending queue items
7. `processing` - flag indicating if currently processing
8. `processQueue` - internal async function to process queue
9. Returns early if already processing or queue empty
10. Sets processing = true, processes all items in queue
11. For each item: applies fn with context, resolves/rejects accordingly
12. After processing: sets processing = false
13. Checks if new items added while processing, restarts if so
14. Returns wrapped function that queues calls and triggers processing

## Exports
- `QueueItem` - queue item type
- `sequential` - creates sequential wrapper
