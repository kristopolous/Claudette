## Purpose
Handles automatic reconnection to a specified MCP server with loading and error states.

## Imports
- **Stdlib**: None
- **External**: `figures`, REACT (useEffect, useState), REACT_COMPILER
- **Internal**: `commands` (CommandResultDisplay), `ink` (Box, color, Text, useTheme), `services/mcp/MCPConnectionManager` (useMcpReconnect), `state/AppState` (useAppStateStore), `Spinner`

## Logic
1. Attempts reconnection to the specified server on mount via useEffect
2. Looks up the server in the app state store by name
3. Calls reconnectMcpServer and handles different result states (connected, needs-auth, pending, failed, disabled)
4. Displays a reconnecting spinner UI while in progress
5. Shows error UI with cross icon and error message on failure
6. Returns null on success (component is transient)

## Exports
- `MCPReconnect` - renders a transient reconnection UI that attempts to reconnect and reports status
