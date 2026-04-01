## Purpose
Tool for updating individual tasks in the task list (Todo V2). Supports field updates, status changes, blocking relationships, and deletion.

## Imports
- **External**: `zod/v4`
- **Internal**: 
  - Analytics: `getFeatureValue_CACHED_MAY_BE_STALE`
  - Tool: `buildTool`, `ToolDef`
  - Swarm: `isAgentSwarmsEnabled`
  - Hooks: `executeTaskCompletedHooks`, `getTaskCompletedHookMessage`
  - Tasks: `blockTask`, `deleteTask`, `getTask`, `getTaskListId`, `isTodoV2Enabled`, `listTasks`, `TaskStatus`, `TaskStatusSchema`, `updateTask`
  - Teammate: `getAgentId`, `getAgentName`, `getTeammateColor`, `getTeamName`, `writeToMailbox`
  - Constants: `VERIFICATION_AGENT_TYPE`
  - Local: `TASK_UPDATE_TOOL_NAME`, `DESCRIPTION`, `PROMPT`

## Logic
1. Enabled only when Todo V2 is enabled (isTodoV2Enabled() returns true)
2. Looks up task in task list (getTaskListId())
3. Updates provided fields (subject, description, activeForm, owner, metadata) if different
4. Auto-sets owner to agent name when a teammate sets status to 'in_progress' without explicit owner
5. Special handling for status='deleted': calls deleteTask and returns early
6. For status='completed': runs TaskCompleted hooks (blocking errors abort)
7. Adds blocking relationships (addBlocks, addBlockedBy) via blockTask
8. Notifies new owner via mailbox when ownership changes
9. Verification nudge: if last task completed in a 3+ task list with no verification, adds reminder
10. Returns success, taskId, updatedFields, optional statusChange, verificationNudgeNeeded

## Exports
- `TaskUpdateTool` - Main tool definition
- `Input` - Type (taskId, subject?, description?, activeForm?, status?, addBlocks?, addBlockedBy?, owner?, metadata?)
- `Output` - Type (success, taskId, updatedFields[], error?, statusChange? {from,to}, verificationNudgeNeeded?)
- TaskUpdateStatusSchema: TaskStatus or 'deleted'
