## Purpose
Renders the main settings modal with tabbed navigation between Status, Config, Usage, and Gates panels.

## Imports
- **Stdlib**: none
- **External**: REACT, REACT_COMPILER
- **Internal**: `keybindings/useKeybinding`, `hooks/useExitOnCtrlCDWithKeybindings`, `hooks/useTerminalSize`, `context/modalContext`, `components/design-system/Pane`, `components/design-system/Tabs`, `components/Settings/Status`, `components/Settings/Config`, `components/Settings/Usage`, `commands`

## Logic
Manages tab state (Status, Config, Usage, Gates) with Escape key handling that delegates to the active tab. Calculates content height based on modal vs terminal context. Initializes diagnostics promise on mount. Renders a Pane containing Tabs with each tab's content, handling tab visibility and Escape key ownership between tabs.

## Exports
- `Settings` - UI component that renders the tabbed settings modal with Status, Config, Usage, and optional Gates tabs
