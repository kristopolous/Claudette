## Purpose
Shows medium-priority notifications for MCP server connectivity issues: failed servers and servers needing authentication.

## Imports
- **External**: REACT (useEffect)
- **Internal**:
  - src/context/notifications` (useNotifications)
  - `.././bootstrap/state` (getIsRemoteMode)
  - `.././ink` (Text)
  - `.././services/mcp/claudeai` (hasClaudeAiMcpEverConnected)
  - `.././services/mcp/types` (MCPServerConnection)

## Logic
- Props: `mcpClients?: MCPServerConnection[]` (default empty)
- Effect categorizes clients:
  - `failedLocalClients`: type 'failed' and not sse-ide/ws-ide/claudeai-proxy
  - `failedClaudeAiClients`: type 'failed' and config.type 'claudeai-proxy' and has ever connected
  - `needsAuthLocalServers`: type 'needs-auth' and not claudeai-proxy
  - `needsAuthClaudeAiServers`: type 'needs-auth' and claudeai-proxy and has ever connected
- For each non-empty category, shows notification:
  - Failed local: `"{n} MCP server(s) failed"` error + "/mcp"
  - Failed claude.ai: `"{n} claude.ai connector(s) unavailable"` error + "/mcp"
  - Needs auth local: `"{n} MCP server(s) need auth"` warning + "/mcp"
  - Needs auth claude.ai: `"{n} claude.ai connector(s) need auth"` warning + "/mcp"
- Not suppressed by scroll draining; only skipped in remote mode

## Exports
- `useMcpConnectivityStatus` - Hook `(props: { mcpClients?: MCPServerConnection[] }) => void`
