# mcp

## Purpose
Implements MCP (Model Context Protocol) subcommand handlers for server management including serve, remove, add, list, and health checks.

## Imports
- **Stdlib**: `fs/promises`, `process`, `path`
- **External**: `p-map`, `react`
- **Internal**: MCP components, ink render, analytics, MCP auth/client/config/utils, state, config, error/gracefulShutdown/json/platform utils, exit helpers

## Logic
1. `checkMcpServerHealth` - connects to server and returns status (connected/needs-auth/failed)
2. `mcpServeHandler` - starts MCP server in current directory
3. `mcpRemoveHandler` - removes server config, cleans up secure storage
4. Supports scoped removal (project/global)
5. Looks up config before removal for secure storage cleanup
6. Logs analytics events for MCP operations
7. Handles directory existence checks before serving

## Exports
- `checkMcpServerHealth` - checks server connection status
- `mcpServeHandler` - starts MCP server
- `mcpRemoveHandler` - removes MCP server config
- (Additional MCP handler functions for add/list/import operations)
