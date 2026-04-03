# mcp/useManageMCPConnections

## Purpose
UI hook for managing MCP server connections (connect, disconnect, reconnect, toggle).

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: MCP types, connection management utilities

## Logic
1. Manages MCP server connection lifecycle in UI context
2. `connectMcpServer` - establishes connection to MCP server
3. `disconnectMcpServer` - closes connection gracefully
4. `reconnectMcpServer` - reconnects server (stop then start)
5. `toggleMcpServer` - toggles server enabled state
6. Tracks connection state per server (connected, connecting, error, disconnected)
7. Handles tool and command registration from connected servers
8. Manages server resources exposure
9. Error handling with retry logic
10. Used by MCPConnectionManager to provide context value

## Exports
- `useManageMCPConnections` - hook for managing MCP server connections
