# useCommandQueue

## Purpose
React hook to subscribe to the unified command queue with frozen array returns.

## Imports
- **Stdlib**: `useSyncExternalStore` from 'react'
- **External**: None
- **Internal**: `QueuedCommand`, `getCommandQueueSnapshot`, `subscribeToCommandQueue`

## Logic
1. Uses useSyncExternalStore for reactive subscription
2. Returns frozen array that only changes reference on mutation
3. Components re-render only when queue changes

## Exports
- `useCommandQueue` - Hook returning readonly QueuedCommand[]
