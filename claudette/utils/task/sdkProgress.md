# sdkProgress

## Purpose
Emits `task_progress` SDK events used by background agents (per tool_use in runAsyncAgentLifecycle) and workflows (per flushProgress batch). Accepts already-computed primitives so callers can derive them from their own state shapes.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: `../../types/tools` (SdkWorkflowProgress type), `../sdkEventQueue` (enqueueSdkEvent)

## Logic
1. `emitTaskProgress` constructs a system/task_progress SDK event from caller-supplied params
2. Computes `duration_ms` as `Date.now() - startTime`
3. Enqueues the event via `enqueueSdkEvent` with fields: task_id, tool_use_id, description, usage (total_tokens, tool_uses, duration_ms), last_tool_name, summary, workflow_progress

## Exports
- `emitTaskProgress(params)` - emits a task_progress SDK event. Params: `taskId`, `toolUseId` (optional), `description`, `startTime`, `totalTokens`, `toolUses`, `lastToolName` (optional), `summary` (optional), `workflowProgress` (optional SdkWorkflowProgress[])

## Source
`sdkProgress`