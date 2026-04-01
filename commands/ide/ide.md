## Purpose
Manage IDE integrations and show connection status.

## Imports
- **External**: `chalk` (terminal colors), `path` module
- **Internal**: React, many UI components (Select, Dialog), IDE auto-connect dialogs, MCP client cache clear, AppState hooks, execFileNoThrow, IDE detection utilities, worktree session utils

## Logic
1. Local-jsx command that manages IDE integrations
2. Provides UI to:
   - Detect available IDEs on the system (JetBrains IDEs, supported terminals)
   - Detect running IDE instances with their ports/workspaces
   - Allow user to select an IDE to connect to
   - Manage auto-connect settings (with confirmation dialogs)
   - Disconnect from IDE
3. Uses IDE detection utilities:
   - detectIDEs() - finds installed IDEs
   - detectRunningIDEs() - finds running instances with ports
   - isJetBrainsIde, isSupportedJetBrainsTerminal, isSupportedTerminal checks
4. Shows dialogs for auto-connect confirmation when enabling
5. Shows disable confirmation when disconnecting
6. Clears MCP server cache on some actions
7. Command is part of IDE integration feature for AI assistance inside editor
8. Argument hint: '[open]' (future use)

## Exports
- `call` - async LocalJSXCommandCall rendering IDEScreen component with selection UI
- `IDEScreen` - React component (internal export)
- state management: selectedValue, showAutoConnectDialog, showDisableAutoConnectDialog
