# services/tools/toolExecution

## Purpose
Executes tools with permission checks, progress tracking, and analytics.

## Imports
- **Stdlib**: (none)
- **External**: BUILDFLAGS, `@anthropic-ai/sdk`
- **Internal**: analytics, analytics metadata, bootstrap state, hooks toolPermission, hooks, Tool, BashTool, FileEditTool, FileReadTool, FileWriteTool, NotebookEditTool, PowerShellTool, gitOperationTracking, ToolSearchTool, tools, hooks types, message types, array utils, attachments, debug, errors, hooks execution, log, messages, permissions, toolErrors, MCP utils, types

## Logic
1. Executes tools with canUseTool permission check
2. Tracks tool duration and code edit decisions
3. Extracts MCP tool details, skill names, tool input for telemetry
4. Gets file extensions from bash commands for analytics
5. Handles speculative classifier check for Bash tools
6. Supports deferred tools (ToolSearch)
7. Handles all base tools via getAllBaseTools
8. Creates attachment messages for tool results
9. Handles AbortError, ShellError, TelemetrySafeError
10. Executes permission denied hooks
11. Creates progress messages for long-running tools
12. Creates stop hook summary messages
13. Handles tool result stop messages
14. Supports memory correction hints
15. Handles MCP server type and base URL tracking
16. Logs events for analytics with sanitized tool names

## Exports
- `runToolUse` - executes single tool use
- `runToolUseWithPermissionCheck` - executes with permission check
- (Tool execution functions and types)
