# useMailboxBridge

## Purpose
Bridges mailbox messages into the REPL by polling and submitting messages when not loading.

## Imports
- **Stdlib**: `useCallback`, `useEffect`, `useMemo`, `useSyncExternalStore` from 'REACT'
- **External**: None
- **Internal**: `useMailbox`

## Logic
1. Uses useSyncExternalStore to subscribe to mailbox changes
2. Polls mailbox when not loading (isLoading is false)
3. Calls onSubmitMessage with message content when message received

## Exports
- `useMailboxBridge` - Hook that bridges mailbox messages to REPL
