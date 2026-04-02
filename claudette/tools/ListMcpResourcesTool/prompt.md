# tools/ListMcpResourcesTool/prompt.ts

## Purpose

Exports constants providing the tool name, description, and prompt for ListMcpResourcesTool. Documents the tool's purpose (listing MCP server resources), usage examples, and parameter format.

## Imports

- **Stdlib**: None
- **External**: None
- **Internal**: None

## Logic

- `LIST_MCP_RESOURCES_TOOL_NAME`: Constant `'ListMcpResourcesTool'` - canonical tool name
- `DESCRIPTION`: Multi-line string containing:
  - Purpose: "Lists available resources from configured MCP servers"
  - Note: each resource includes a `server` field indicating source
  - Usage examples:
    - List all resources: `listMcpResources`
    - List from specific server: `listMcpResources({ server: "myserver" })`
- `PROMPT`: Multi-line string with more detailed instructions:
  - Restates purpose
  - Notes that resources include standard MCP fields + `server` field
  - Documents parameter:
    - `server` (optional): name of specific MCP server; if omitted, returns all servers' resources

## Exports

- `LIST_MCP_RESOURCES_TOOL_NAME: string`
- `DESCRIPTION: string`
- `PROMPT: string`
