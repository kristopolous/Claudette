# QueryGuard

## Purpose
Synchronous state machine for the query lifecycle, compatible with React's `useSyncExternalStore`. Prevents re-entry from the queue processor during the async gap between dequeuing and query execution.

## Imports
- **Internal**: `./signal` (createSignal)

## Logic
Three states with defined transitions:
- **idle** → no query, safe to dequeue and process
- **dispatching** → an item was dequeued, async chain hasn't reached `onQuery` yet
- **running** → `onQuery` called `tryStart()`, query is executing

Transitions:
- `idle → dispatching` via `reserve()`
- `dispatching → running` via `tryStart()` (queue processor path)
- `idle → running` via `tryStart()` (direct user submissions)
- `running → idle` via `end()` or `forceEnd()`
- `dispatching → idle` via `cancelReservation()` (when `processQueueIfReady` fails)

`isActive` returns true for both `dispatching` and `running`, preventing re-entry. A `_generation` counter tracks query instances so stale `finally` blocks from cancelled queries can detect they're no longer current.

## Exports
- `class QueryGuard` — State machine with the following methods:
  - `reserve(): boolean` — Transitions idle → dispatching. Returns false if not idle
  - `cancelReservation(): void` — Transitions dispatching → idle when nothing to process
  - `tryStart(): number | null` — Starts a query from idle or dispatching. Returns generation number on success, null if already running
  - `end(generation: number): boolean` — Ends query if generation matches. Returns true if caller should cleanup, false if stale
  - `forceEnd(): void` — Force-ends any running query, increments generation to invalidate stale finally blocks
  - `isActive: boolean` — Getter, true if dispatching or running
  - `generation: number` — Getter for current generation counter
  - `subscribe` — Stable function reference for `useSyncExternalStore` subscription
  - `getSnapshot(): boolean` — Snapshot function returning `isActive` for `useSyncExternalStore`

## Source
`QueryGuard`
