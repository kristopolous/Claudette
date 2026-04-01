## Purpose
Displays a multi-select dialog for approving or rejecting multiple MCP servers found in .mcp.json.

## Imports
- **Stdlib**: None
- **External**: `react`, `lodash-es/partition`
- **Internal**: `ink`, `SelectMulti`, `Dialog`, `Byline`, `KeyboardShortcutHint`, `ConfigurableShortcutHint`, `MCPServerDialogCopy`, settings utilities, analytics

## Logic
1. Presents all discovered MCP server names as selectable options in a dialog
2. On submit, partitions selected vs unselected servers using lodash partition
3. Updates enabled/disabled MCP server lists in local settings, merging with existing entries
4. Logs analytics events for approved and rejected counts
5. On cancel/escape, rejects all servers by adding them to the disabled list
6. Displays keyboard shortcut hints for selection, confirmation, and rejection

## Exports
- `MCPServerMultiselectDialog` - renders a multi-select approval dialog for batch-enabling MCP servers from .mcp.json
