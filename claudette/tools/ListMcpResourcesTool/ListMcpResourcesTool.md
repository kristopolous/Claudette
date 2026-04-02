# tools/ListMcpResourcesTool/ListMcpResourcesTool.ts

## Purpose
Tool for listing available resources from connected MCP (Model Context Protocol) servers.

## Imports
- **External**: `zod/v4`
- **Internal**: 
  - MCP service: `ensureConnectedClient`, `fetchResourcesForClient`
  - Tool: `buildTool`, `ToolDef`
  - Utils: `errorMessage`, `lazySchema`, `logMCPError`, `jsonStringify`, `isOutputLineTruncated`
  - Local: `DESCRIPTION`, `LIST_MCP_RESOURCES_TOOL_NAME`, `PROMPT`, `renderToolResultMessage`, `renderToolUseMessage`

## Logic
1. Accepts optional server filter parameter
2. Ensures MCP clients are connected (with reconnection if needed)
3. Fetches resources from each client (LRU-cached by server name)
4. Handles individual server failures gracefully without failing entire operation
5. Flattens results from all servers into single array
6. Checks for truncation when serializing to JSON
7. Returns formatted result or "no resources found" message if empty

## Exports
- `ListMcpResourcesTool` - Main tool definition
- `Output` - Type for output (array of resource objects with uri, name, mimeType, description, server)
