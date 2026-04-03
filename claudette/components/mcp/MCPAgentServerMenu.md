## Purpose
Provides a menu interface for agent-specific MCP servers that are defined in agent frontmatter and only connect when the agent runs.

## Imports
- **Stdlib**: None
- **External**: `figures`, REACT (useCallback, useEffect, useRef, useState)
- **Internal**: `commands` (CommandResultDisplay), `ink` (Box, color, Link, Text, useTheme), `keybindings/useKeybinding`, `services/mcp/auth` (AuthenticationCancelledError, performMCPOAuthFlow), `utils/stringUtils` (capitalize), `ConfigurableShortcutHint`, `CustomSelect/index` (Select), `design-system/Byline` (Byline), `design-system/Dialog` (Dialog), `design-system/KeyboardShortcutHint` (KeyboardShortcutHint), `Spinner`, `types` (AgentMcpServerInfo)

## Logic
1. Displays agent server details including transport type, URL, command, source agents, and auth status
2. Handles OAuth authentication flow for HTTP/SSE agent servers with abort controller support
3. Shows authentication UI with authorization URL display when browser does not open automatically
4. Builds menu options conditionally based on auth needs (authenticate/re-authenticate, back)
5. Renders within a Dialog with "agent-only" subtitle and keyboard navigation hints

## Exports
- `MCPAgentServerMenu` - renders a management menu for agent-specific MCP servers with pre-authentication support
