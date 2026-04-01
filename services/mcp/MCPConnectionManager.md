# mcp/MCPConnectionManager

## Purpose
Provides React context for MCP server connection management (reconnect, toggle enabled).

## Imports
- **Stdlib**: (none)
- **External**: `react/compiler-runtime`, `react`
- **Internal**: commands, Tool, MCP types, useManageMCPConnections

## Logic
1. `MCPConnectionContextValue` - interface with reconnectMcpServer and toggleMcpServer methods
2. `reconnectMcpServer` - returns Promise with client, tools, commands, optional resources
3. `toggleMcpServer` - toggles server enabled state
4. `MCPConnectionContext` - React context created with null default
5. `useMcpReconnect` - hook to get reconnect function, throws if outside provider
6. `useMcpToggleEnabled` - hook to get toggle function, throws if outside provider
7. `MCPConnectionManager` - provider component wrapping children with context
8. Uses useManageMCPConnections for connection management logic
9. Memoizes context value to avoid unnecessary re-renders
10. TODO: May be able to move functions to app state instead of context

## Exports
- `MCPConnectionContextValue` - context value interface
- `MCPConnectionContext` - React context
- `useMcpReconnect` - hook for reconnecting MCP server
- `useMcpToggleEnabled` - hook for toggling server enabled state
- `MCPConnectionManager` - provider component
