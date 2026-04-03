## Purpose
Displays detailed information about a specific MCP tool including its name, description, parameters, and capability annotations.

## Imports
- **Stdlib**: None
- **External**: REACT, REACT_COMPILER
- **Internal**: `ink` (Box, Text), `services/mcp/mcpStringUtils` (extractMcpToolDisplayName, getMcpDisplayName), `Tool`, `ConfigurableShortcutHint`, `design-system/Dialog` (Dialog), `types` (ServerInfo)

## Logic
1. Extracts display names using getMcpDisplayName and extractMcpToolDisplayName
2. Determines tool annotations (read-only, destructive, open-world) and appends them to the title
3. Loads the tool description asynchronously via tool.description() on mount
4. Renders tool name, full name, description, and parameters from inputJSONSchema
5. Displays parameter details including type, required status, and description
6. Wraps content in a Dialog with server name as subtitle

## Exports
- `MCPToolDetailView` - renders a detailed view of a single MCP tool with its schema and annotations
