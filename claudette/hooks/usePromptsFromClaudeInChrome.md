## Purpose
Listens for prompt notifications from the Claude for Chrome extension, enqueues them as user prompts, and syncs the current permission mode to the extension.

## Imports
- **External**: REACT (useEffect, useRef), `@anthropic-ai/sdk` (ContentBlockParam), `zod/v4` (z)
- **Internal**:
  - src/utils/log` (logError)
  - `./services/mcp/client` (callIdeRpc)
  - `./services/mcp/types` (MCPServerConnection, ConnectedMCPServer)
  - `./types/permissions` (PermissionMode)
  - `./utils/claudeInChrome/common` (CLAUDE_IN_CHROME_MCP_SERVER_NAME, isTrackedClaudeInChromeTabId)
  - `./utils/lazySchema` (lazySchema)
  - `./utils/messageQueueManager` (enqueuePendingNotification)

## Logic
- Hook parameters: `mcpClients`, `toolPermissionMode`
- Two independent effects:
  1. On `mcpClients` change: finds Chrome client via `findChromeClient` (connected + name === CLAUDE_IN_CHROME_MCP_SERVER_NAME). If found, registers notification handler for `ClaudeInChromePromptNotificationSchema`:
     - Notification format: method 'notifications/message' with params { prompt: string, image?, tabId? }
     - Handler enqueues prompt via `enqueuePendingNotification` (user message priority 'later')
  2. On `mcpClients` or `toolPermissionMode` change: calls `callIdeRpc("set_permission_mode", { mode: chromeMode }, chromeClient)` where `chromeMode` is "skip_all_permission_checks" if mode is "bypassPermissions", else "ask"
- Both effects are no-ops if no Chrome client found
- Uses REACT_COMPILER (`_c`) to memoize effect dependencies

## Exports
- `usePromptsFromClaudeInChrome` - Hook `(mcpClients: MCPServerConnection[], toolPermissionMode: PermissionMode) => void`
