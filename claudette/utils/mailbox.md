# mailbox

## Purpose
Lightweight message queue with blocking receive, used for inter-process communication between leader and teammate processes.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: `createSignal` (utils/signal)

## Logic
1. `Mailbox` class wraps a FIFO queue with a signal-based pub/sub mechanism
2. `send(msg)` — increments revision, checks if any waiter matches the message; if so resolves the waiter, otherwise queues the message
3. `poll(fn)` — synchronously removes and returns the first matching message from the queue
4. `receive(fn)` — returns a Promise that resolves with the first matching message; if one exists in the queue, resolves immediately, otherwise registers a waiter
5. `subscribe` — exposes the signal's subscribe method for reactive consumers
6. Waiters are checked in insertion order (FIFO); once resolved, the waiter is removed
7. Revision counter increments on every send, useful for detecting changes without polling the full queue

## Exports
- `MessageSource` - type: 'user' | 'teammate' | 'system' | 'tick' | 'task'
- `Message` - type with id, source, content, optional from/color, and timestamp
- `Mailbox` - message queue class with send/poll/receive/subscribe
