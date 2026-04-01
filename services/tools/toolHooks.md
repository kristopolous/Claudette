# services/tools/toolHooks

## Purpose
Executes pre and post tool use hooks with analytics tracking.

## Imports
- **Stdlib**: (none)
- **External**: `zod/v4`
- **Internal**: analytics, analytics metadata, hooks, Tool, hooks types, message types, permissions, attachments, debug, hooks execution, log, permissions PermissionResult/permissions, toolErrors, MCP utils, toolExecution

## Logic
1. `PostToolUseHooksResult<Output>` - union of MessageUpdateLazy or updatedMCPToolOutput
2. `runPostToolUseHooks` - async generator for post-tool hooks
3. Tracks postToolStartTime for duration calculation
4. Gets appState and permissionMode for hook execution
5. Executes post-tool hooks with tool name, ID, input, output, context
6. Handles hook_cancelled attachment type with analytics logging
7. Logs tengu_post_tool_hooks_cancelled event with toolName, queryChainId, queryDepth
8. Sanitizes tool names for analytics
9. Handles MCP tool output updates
10. `runPreToolHooks` - executes pre-tool hooks
11. Gets pre-tool hook blocking message if any
12. Checks rule-based permissions before execution
13. Formats errors for user display
14. Handles MCP server type and base URL tracking
15. Supports async generator for streaming hook results

## Exports
- `PostToolUseHooksResult<Output>` - post-tool hooks result type
- `runPostToolUseHooks` - async generator for post-tool hooks
- `runPreToolHooks` - executes pre-tool hooks
