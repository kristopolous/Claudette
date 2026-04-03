## Purpose
Displays a scrollable list of all MCP servers grouped by configuration scope with selection and navigation support.

## Imports
- **Stdlib**: None
- **External**: `figures`, REACT (useCallback, useState), REACT_COMPILER
- **Internal**: `commands` (CommandResultDisplay), `ink` (Box, color, Link, Text, useTheme), `keybindings/useKeybinding` (useKeybindings), `services/mcp/types` (ConfigScope), `services/mcp/utils` (describeMcpConfigFilePath), `utils/debug` (isDebugMode), `utils/stringUtils` (plural), `ConfigurableShortcutHint`, `design-system/Byline` (Byline), `design-system/Dialog` (Dialog), `design-system/KeyboardShortcutHint` (KeyboardShortcutHint), `McpParsingWarnings`, `types` (AgentMcpServerInfo, ServerInfo)

## Logic
1. Groups servers by scope (project, local, user, enterprise) using groupServersByScope
2. Separates claude.ai proxy servers, agent servers, and dynamic (built-in) servers
3. Renders server items with status icons (disabled, connected, reconnecting, needs-auth, failed)
4. Manages selected index with keyboard navigation (up/down arrows, enter to select, escape to cancel)
5. Displays scope headings with labels and config file paths
6. Shows agent servers grouped by source agent name
7. Includes parsing warnings and help link for failed clients
8. Wraps content in a Dialog titled "Manage MCP servers"

## Exports
- `MCPListPanel` - renders a comprehensive list of all MCP servers organized by scope with selection support
