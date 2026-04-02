# sdkEventQueue

## Purpose
Queue for SDK events emitted during non-interactive (headless/streaming) sessions. Events are enqueued during execution and drained with UUIDs and session IDs attached.

## Imports
- **Stdlib**: `crypto` (UUID type, randomUUID)
- **External**: (none)
- **Internal**: `../bootstrap/state` (getIsNonInteractiveSession, getSessionId), `../types/tools` (SdkWorkflowProgress)

## Logic
1. Event types: TaskStartedEvent (task_started), TaskProgressEvent (task_progress with usage stats and optional workflow_progress), TaskNotificationSdkEvent (task_notification for terminal states), SessionStateChangedEvent (session_state_changed with idle/running/requires_action)
2. `MAX_QUEUE_SIZE` (1000) - cap on queued events; oldest dropped when exceeded
3. `queue` - module-level array of SdkEvent
4. `enqueueSdkEvent(event)` - only enqueues in non-interactive sessions (TUI mode would accumulate and never read); drops oldest if queue is full
5. `drainSdkEvents()` - splices all events from queue and enriches each with uuid (randomUUID) and session_id; returns empty array if queue is empty
6. `emitTaskTerminatedSdk(taskId, status, opts?)` - convenience for emitting task_notification terminal events; closing bookend to registerTask()'s task_started; called from exit paths that don't go through print.ts XML notification parser

## Exports
- `SdkEvent` - union type of all SDK event types
- `enqueueSdkEvent(event: SdkEvent)` - adds event to queue (no-op in TUI mode)
- `drainSdkEvents()` - returns all queued events enriched with uuid and session_id
- `emitTaskTerminatedSdk(taskId, status, opts?)` - emits task_notification for terminal state
- `TaskStartedEvent` - type (internal, part of SdkEvent union)
- `TaskProgressEvent` - type (internal, part of SdkEvent union)
- `TaskNotificationSdkEvent` - type (internal, part of SdkEvent union)
- `SessionStateChangedEvent` - type (internal, part of SdkEvent union)
