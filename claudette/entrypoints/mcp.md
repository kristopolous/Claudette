# mcp

## Purpose
Implements MCP (Model Context Protocol) server that exposes Claudette tools to external clients.

## Imports
- **Stdlib**: (none)
- **External**: `@modelcontextprotocol/sdk` (Server, StdioServerTransport, schemas)
- **Internal**: AppStateStore, review command, Tool, tools, abortController, fileStateCache, log, messages, model, permissions, Shell, JSON utils, toolErrors, zodToJsonSchema

## Logic
1. `startMCPServer` - main entry point with cwd, debug, verbose options
2. Creates size-limited LRU file state cache (100 files, 25MB)
3. Registers MCP server with name 'claude/tengu' and version
4. `ListTools` handler - returns all available tools with JSON schemas
5. Converts Zod schemas to JSON Schema via zodToJsonSchema
6. Skips output schemas without type: "object" at root (MCP SDK requirement)
7. `CallTool` handler - executes tool with permission check
8. Creates ToolUseContext with file state cache and abort controller
9. Handles tool errors via getErrorParts
10. MCP_COMMANDS includes review command

## Exports
- `startMCPServer` - async function that starts MCP server
