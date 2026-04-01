# utils/claudeInChrome/mcpServer

## Purpose
Creates and manages Claude for Chrome MCP server with bridge support.

## Imports
- **Stdlib**: `util`
- **External**: `@ant/claude-for-chrome-mcp`, `@modelcontextprotocol/sdk`
- **Internal**: analytics datadog/firstPartyEventLogger/growthbook/index/sink, auth, config, debug, envUtils, sideQuery, claudeInChrome common

## Logic
1. `EXTENSION_DOWNLOAD_URL` - 'https://claude.ai/chrome'
2. `BUG_REPORT_URL` - GitHub issues URL for bug reports
3. `SAFE_BRIDGE_STRING_KEYS` - analytics-safe string metadata keys
4. `PERMISSION_MODES` - ask, skip_all_permission_checks, follow_a_plan
5. `isPermissionMode` - validates permission mode string
6. `getChromeBridgeUrl` - resolves bridge URL based on environment
7. Bridge used when feature flag enabled or ant user
8. LOCAL_BRIDGE/USE_LOCAL_OAUTH → ws://localhost:8765
9. USE_STAGING_OAUTH → wss://bridge-staging.claudeusercontent.com
10. Default → wss://bridge.claudeusercontent.com
11. API key/3P users fall back to native messaging
12. `isLocalBridge` - checks if local bridge enabled
13. `createClaudeForChromeMcpServer` - creates MCP server instance
14. `StdioServerTransport` for stdio communication
15. Initializes analytics sink
16. Handles OAuth tokens for bridge auth
17. Logs events for analytics with safe key filtering

## Exports
- `EXTENSION_DOWNLOAD_URL` - extension download URL
- `BUG_REPORT_URL` - bug report URL
- `SAFE_BRIDGE_STRING_KEYS` - safe analytics keys
- `PERMISSION_MODES` - permission modes array
- `getChromeBridgeUrl` - gets Chrome bridge URL
- `isLocalBridge` - checks local bridge
- (MCP server creation functions)
