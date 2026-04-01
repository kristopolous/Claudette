## Purpose
Defines the TaskListTool for listing all tasks in the task list with filtering and formatting logic.

## Imports
- **Stdlib**: None
- **External**: `zod/v4`
- **Internal**: `Tool`, `lazySchema`, `getTaskListId`, `isTodoV2Enabled`, `listTasks`, `TaskStatusSchema`, `TASK_LIST_TOOL_NAME`, `DESCRIPTION`, `getPrompt`

## Logic
Builds a tool definition using zod schemas for input/output validation. The `call` method retrieves all tasks, filters out internal ones, and maps blockedBy to only include unresolved task IDs. The `mapToolResultToToolResultBlockParam` formats tasks into readable lines showing ID, status, subject, owner, and blockers. The tool is read-only, concurrency-safe, and only enabled when TodoV2 is active.

## Exports
- `Output` - inferred type for the tool output containing an array of tasks
- `TaskListTool` - the built tool definition with schema, call logic, and result formatting
