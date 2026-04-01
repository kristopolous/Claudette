## Purpose
Tool for stopping running background tasks by ID, with backward compatibility for the deprecated KillShell tool.

## Imports
- **External**: `zod/v4`
- **Internal**: 
  - Tool: `buildTool`, `ToolDef`, `TaskStateBase`
  - Tasks: `stopTask`
  - Utils: `lazySchema`, `jsonStringify`
  - Local: `DESCRIPTION`, `TASK_STOP_TOOL_NAME`, `renderToolResultMessage`, `renderToolUseMessage`

## Logic
1. Accepts task_id (primary) or shell_id (deprecated backward compatibility)
2. Validates that task exists in appState.tasks and is in 'running' status
3. Calls stopTask with getAppState/setAppState to gracefully terminate
4. Returns success message with task details (ID, type, command)
5. Has alias 'KillShell' for transcript compatibility

## Exports
- `TaskStopTool` - Main tool definition
- `Output` - Type for output (message, task_id, task_type, command?)
- Aliases: `KillShell` (deprecated)
