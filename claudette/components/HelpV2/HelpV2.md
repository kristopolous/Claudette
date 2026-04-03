## Purpose
Renders a tabbed help dialog displaying general information, built-in commands, and custom commands with keyboard dismissal support.

## Imports
- **Stdlib**: Math
- **External**: REACT, REACT/compiler-runtime
- **Internal**: hooks/useExitOnCtrlCDWithKeybindings, keybindings/useShortcutDisplay, commands, context/modalContext, hooks/useTerminalSize, ink, keybindings/useKeybinding, components/design-system/Pane, components/design-system/Tabs, components/HelpV2/Commands, components/HelpV2/General

## Logic
1. Calculates dialog height from terminal size and checks if running inside a modal
2. Sets up keybindings for dismissing the dialog with Ctrl+C/D and escape
3. Separates commands into built-in and custom categories by filtering against builtInCommandNames
4. Constructs tabs for general info, built-in commands, and custom commands (with a hidden ant-only tab)
5. Renders a Tabs component inside a Pane with a documentation link and exit confirmation hint

## Exports
- `HelpV2` - UI component that renders the full help dialog with tabbed navigation
