## Purpose
Manages IDE integrations: detects available IDEs with Claude extensions, connects/disconnects, and opens projects in IDEs.

## Imports
- **Stdlib**: `path`
- **External**: STYLER, REACT
- **Internal**: Extensive: `logEvent`, `Select`, `Dialog`, `IdeAutoConnectDialog`, `IdeDisableAutoConnectDialog`, `Box`, `Text`, `clearServerCache`, `ScopedMcpServerConfig`, `useAppState`, `useSetAppState`, `getCwd`, `execFileNoThrow`, IDE detection utils (`detectIDEs`, `detectRunningIDEs`, `isJetBrainsIde`, `isSupportedJetBrainsTerminal`, `isSupportedTerminal`, `toIDEDisplayName`), `getCurrentWorktreeSession`, `CommandResultDisplay`, `LocalJSXCommandContext`

## Logic
The `call` function is the main entry point. It handles an optional 'open' argument to directly open the current project in an IDE. Otherwise, it displays an interactive React Ink UI for managing IDE connections. It detects IDEs with Claudette extensions, categorizes them as available/unavailable, shows current IDE connection status, and allows selecting an IDE to connect via MCP. Handles auto-connect dialogs, extension installation prompts for running IDEs without the extension, and disconnection. Uses dynamic MCP config to establish SSE/WebSocket connections to IDE extensions. Manages connection timeout and state updates.

## Exports
- `call` - Async JSX command function (type 'local-jsx')
- `formatWorkspaceFolders` - Helper to format workspace folder paths for display
- Internal components: `IDEScreen`, `IDEOpenSelection`, `RunningIDESelector`, `InstallOnMount`, `IDECommandFlow`
