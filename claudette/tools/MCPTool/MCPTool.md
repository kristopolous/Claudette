# tools/MCPTool/MCPTool.ts

## Purpose
Placeholder tool for MCP (Model Context Protocol) tool invocations, with actual implementation delegated to MCP clients.

## Imports
- **External**: `zod/v4`
- **Internal**: 
  - Tool: `buildTool`, `ToolDef`
  - Utils: `lazySchema`, `PermissionResult`, `isOutputLineTruncated`
  - Local: `DESCRIPTION`, `PROMPT`, `renderToolResultMessage`, `renderToolUseMessage`, `renderToolUseProgressMessage`
  - Types: `MCPProgress`

## Logic
1. This is a placeholder tool that is dynamically configured by the MCP client
2. Most properties (name, description, prompt, call implementation) are overridden in mcpClient
3. Accepts any input object via passthrough schema since MCP tools define their own schemas
4. Permission check returns passthrough behavior (MCP handles actual permissions)
5. Output is a simple string representing the MCP tool execution result

## Exports
- `MCPTool` - The placeholder MCP tool definition
- `inputSchema` - Passthrough schema allowing any input
- `outputSchema` - String output schema
- `Output` - Output type (string)
- `MCPProgress` - Type for MCP progress notifications (re-exported)
