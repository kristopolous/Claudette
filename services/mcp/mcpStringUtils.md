# mcp/mcpStringUtils

## Purpose
Provides lightweight string utilities for MCP tool/server name parsing without heavy dependencies.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: normalization utils

## Logic
1. `mcpInfoFromString` - parses "mcp__serverName__toolName" format
2. Returns { serverName, toolName } or null if invalid
3. Known limitation: server names with "__" cause incorrect parsing
4. `getMcpPrefix` - generates "mcp__{normalizedServerName}__" prefix
5. `buildMcpToolName` - builds fully qualified tool name (inverse of mcpInfoFromString)
6. `getToolNameForPermissionCheck` - returns prefixed name for MCP tools, bare name otherwise
7. Prevents deny rules targeting builtins from matching MCP replacements
8. `getMcpDisplayName` - strips MCP prefix to get display name

## Exports
- `mcpInfoFromString` - parses MCP tool string into server/tool parts
- `getMcpPrefix` - generates MCP prefix for server name
- `buildMcpToolName` - builds fully qualified MCP tool name
- `getToolNameForPermissionCheck` - gets name for permission matching
- `getMcpDisplayName` - strips MCP prefix for display
