## Purpose
Provides a menu interface for managing stdio-based MCP servers including reconnection and toggling.

## Imports
- **Stdlib**: None
- **External**: `figures`, REACT (useState)
- **Internal**: `commands` (CommandResultDisplay), `hooks/useExitOnCtrlCDWithKeybindings`, `ink` (Box, color, Text, useTheme), `services/mcp/config` (getMcpConfigByName), `services/mcp/MCPConnectionManager` (useMcpReconnect, useMcpToggleEnabled), `services/mcp/utils` (describeMcpConfigFilePath, filterMcpPromptsByServer), `state/AppState` (useAppState), `utils/errors` (errorMessage), `utils/stringUtils` (capitalize), `ConfigurableShortcutHint`, `CustomSelect/index` (Select), `design-system/Byline` (Byline), `design-system/KeyboardShortcutHint` (KeyboardShortcutHint), `Spinner`, `CapabilitiesSection`, `types` (StdioServerInfo), `utils/reconnectHelpers` (handleReconnectError, handleReconnectResult)

## Logic
1. Displays server status, command, arguments, config location, and capabilities
2. Builds menu options based on server state (view tools, reconnect, disable/enable)
3. Handles reconnect action with loading state and spinner display
4. Handles toggle enabled action with error handling
5. Shows capabilities section when server is connected

## Exports
- `MCPStdioServerMenu` - renders a management menu for stdio-based MCP servers with reconnect and toggle controls
