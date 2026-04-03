## Purpose
Displays a selectable list of MCP tools for a given server within a dialog interface.

## Imports
- **Stdlib**: None
- **External**: REACT, REACT_COMPILER
- **Internal**: `ink` (Text), `services/mcp/mcpStringUtils` (extractMcpToolDisplayName, getMcpDisplayName), `services/mcp/utils` (filterToolsByServer), `state/AppState` (useAppState), `Tool`, `utils/stringUtils` (plural), `ConfigurableShortcutHint`, `CustomSelect/index` (Select), `design-system/Byline` (Byline), `design-system/Dialog` (Dialog), `design-system/KeyboardShortcutHint` (KeyboardShortcutHint), `types` (ServerInfo)

## Logic
1. Filters MCP tools by the provided server name using filterToolsByServer
2. Maps each tool to a select option with display name extracted via extractMcpToolDisplayName and annotations for read-only, destructive, and open-world properties
3. Renders a Dialog with title showing server name and subtitle showing tool count
4. Shows a Select component with tool options when tools exist, otherwise displays "No tools available"
5. Handles tool selection by parsing the index and calling onSelectTool callback

## Exports
- `MCPToolListView` - renders a dialog with a selectable list of tools for a specific MCP server
