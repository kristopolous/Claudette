## Purpose
Renders the navigation footer for wizard dialogs with keyboard shortcut hints and exit confirmation messaging.

## Imports
- **Stdlib**: none
- **External**: REACT
- **Internal**: `hooks/useExitOnCtrlCDWithKeybindings`, `ink`, `components/ConfigurableShortcutHint`, `components/design-system/Byline`, `components/design-system/KeyboardShortcutHint`

## Logic
1. Sets up exit-on-Ctrl+C keybinding handling via useExitOnCtrlCDWithKeybindings hook
2. Displays default keyboard navigation hints (arrow keys for navigate, Enter for select, Esc for go back) unless custom instructions are provided
3. Shows exit confirmation prompt when the exit state is pending, otherwise renders the instructions
4. Wraps content in a Box with left and top margins and dimmed text styling

## Exports
- `WizardNavigationFooter` - Component that renders keyboard shortcut hints and exit messaging at the bottom of wizard dialogs
