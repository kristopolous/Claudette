## Purpose
Provides a menu interface for managing remote MCP servers (SSE, HTTP, or claude.ai proxy) including authentication, reconnection, and toggling.

## Imports
- **Stdlib**: None
- **External**: `figures`, REACT (useEffect, useRef, useState)
- **Internal**: `services/analytics/index` (logEvent), `commands` (CommandResultDisplay), `constants/oauth` (getOauthConfig), `hooks/useExitOnCtrlCDWithKeybindings`, `hooks/useTerminalSize`, `ink/termio/osc` (setClipboard), `ink` (Box, color, Link, Text, useInput, useTheme), `keybindings/useKeybinding`, `services/mcp/auth` (AuthenticationCancelledError, performMCPOAuthFlow, revokeServerTokens), `services/mcp/client` (clearServerCache), `services/mcp/MCPConnectionManager` (useMcpReconnect, useMcpToggleEnabled), `services/mcp/utils` (describeMcpConfigFilePath, excludeCommandsByServer, excludeResourcesByServer, excludeToolsByServer, filterMcpPromptsByServer), `state/AppState` (useAppState, useSetAppState), `utils/auth` (getOauthAccountInfo), `utils/browser` (openBrowser), `utils/errors` (errorMessage), `utils/log` (logMCPDebug), `utils/stringUtils` (capitalize), `ConfigurableShortcutHint`, `CustomSelect/index` (Select), `design-system/Byline` (Byline), `design-system/KeyboardShortcutHint` (KeyboardShortcutHint), `Spinner`, `TextInput`, `CapabilitiesSection`, `types` (ClaudeAIServerInfo, HTTPServerInfo, SSEServerInfo), `utils/reconnectHelpers` (handleReconnectError, handleReconnectResult)

## Logic
1. Manages multiple authentication states (standard OAuth, claude.ai auth, claude.ai clear auth, reconnecting)
2. Handles OAuth flows with abort controllers, authorization URL display, and manual callback URL input
3. Builds dynamic menu options based on server state (disabled, connected, needs-auth, authenticated)
4. Displays server status, auth state, URL, config location, and capabilities
5. Handles menu actions: view tools, authenticate, re-authenticate, clear auth, reconnect, toggle enabled
6. Supports URL copying with feedback timer and cleanup on unmount

## Exports
- `MCPRemoteServerMenu` - renders a management menu for remote MCP servers with auth and connection controls
