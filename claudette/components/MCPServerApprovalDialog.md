## Purpose
Displays a dialog for approving or rejecting a single MCP server found in mcpon.

## Imports
- **Stdlib**: None
- **External**: REACT
- **Internal**: `Select`, `Dialog`, `MCPServerDialogCopy`, settings utilities, analytics

## Logic
1. Presents a dialog with the discovered server name and three options: use this and all future servers, use this server only, or skip
2. On selection, logs an analytics event with the user's choice
3. For "yes" or "yes_all" choices, adds the server to the enabled list; "yes_all" also enables all project MCP servers
4. For "no" choice, adds the server to the disabled list
5. Updates local settings via the settings utility and calls the completion callback
6. Cancel/escape defaults to rejecting the server

## Exports
- `MCPServerApprovalDialog` - renders a single-server approval dialog with options to enable, enable-all, or skip the MCP server
