## Purpose
Derives IDE connection status ('connected' | 'disconnected' | 'pending' | null) and IDE name from MCP clients list.

## Imports
- **External**: `react` (useMemo)
- **Internal**: `../services/mcp/types.js` (MCPServerConnection)

## Logic
- Hook parameter: optional `mcpClients` array
- Searches for client with `name === 'ide'`
- If found:
  - `ideName`: taken from `config.ideName` if `config.type` is 'sse-ide' or 'ws-ide'; else null
  - `status` derived from `client.type`: 'connected', 'pending', or 'disconnected'
- If not found: `{ status: null, ideName: null }`
- Result memoized; updates when `mcpClients` reference changes

## Exports
- `useIdeConnectionStatus` - Hook `(mcpClients?: MCPServerConnection[]) => { status: IdeStatus, ideName: string | null }`
- `IdeConnectionResult` type (return shape)
- `IdeStatus` type: `'connected' | 'disconnected' | 'pending' | null`
