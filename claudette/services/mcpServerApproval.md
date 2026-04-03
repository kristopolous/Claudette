# mcpServerApproval

## Purpose
Shows MCP server approval dialogs for pending project servers using existing Ink root.

## Imports
- **Stdlib**: (none)
- **External**: REACT
- **Internal**: MCP components, ink Root, keybindings, state, MCP config/utils

## Logic
1. `handleMcpjsonServerApprovals` - main function taking Ink root
2. Fetches project-scoped MCP server configs
3. Filters to pending status servers only
4. Returns early if no pending servers
5. Single server: renders MCPServerApprovalDialog
6. Multiple servers: renders MCPServerMultiselectDialog
7. Wraps with AppStateProvider and KeybindingSetup
8. Uses provided Ink root (reuses existing instance from main)
9. Resolves promise when user completes dialog interaction

## Exports
- `handleMcpjsonServerApprovals` - async function showing approval dialogs
