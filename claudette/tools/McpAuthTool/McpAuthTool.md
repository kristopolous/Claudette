# tools/McpAuthTool/McpAuthTool.ts

## Purpose
Factory function that creates pseudo-tools for MCP servers requiring authentication. Allows the model to initiate OAuth flows and provide users with authorization URLs.

## Imports
- **External**: `lodash-es/reject`, `zod/v4`
- **Internal**: 
  - MCP: `performMCPOAuthFlow`, `clearMcpAuthCache`, `reconnectMcpServerImpl`, `buildMcpToolName`, `getMcpPrefix`
  - Types: `McpHTTPServerConfig`, `McpSSEServerConfig`, `ScopedMcpServerConfig`
  - Tool: `Tool`
  - Utils: `errorMessage`, `lazySchema`, `logMCPDebug`, `logMCPError`
  - Permission: `PermissionDecision`

## Logic
1. `createMcpAuthTool(serverName, config)` returns a Tool object with no input required
2. Tool name: `mcp__<server>__authenticate`
3. Enabled always; not concurrency-safe; not read-only
4. description/prompt explain the server needs auth and that calling returns an auth URL
5. Permissions: auto-allow (no user interaction needed to start OAuth)
6. call() performs OAuth flow:
   - claude.ai connectors: returns unsupported with manual /mcp instruction
   - Non-SSE/HTTP transports: returns unsupported with manual instruction
   - For SSE/HTTP: starts performMCPOAuthFlow with skipBrowserOpen
   - Races authUrlPromise against oauth completion
   - Returns authUrl for user to open, or silent completion message
   - On catch: returns error status
7. Background: after OAuth completes, reconnects server and swaps real tools into appState.mcp (prefix-based replacement removes this auth tool)
8. Maps result to simple message content

## Exports
- `createMcpAuthTool` - Factory function returning Tool<InputSchema, McpAuthOutput>
- `McpAuthOutput` - Output type (status: 'auth_url' | 'unsupported' | 'error', message, authUrl?)
