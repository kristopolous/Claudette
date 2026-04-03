## Purpose
A dialog component with title, subtitle, cancel handling, keyboard keybindings, and an input guide for confirm/cancel interactions.

## Imports
- **Stdlib**: none
- **External**: REACT, REACT_COMPILER
- **Internal**: `ExitState`, `useExitOnCtrlCDWithKeybindings`, `Box`, `Text`, `useKeybinding`, `Theme`, `ConfigurableShortcutHint`, `Byline`, `KeyboardShortcutHint`, `Pane`

## Logic
Sets up exit keybindings for Ctrl+C/D with double-press confirmation, registers Esc/n as cancel via keybinding, renders title and subtitle, children content, and an input guide showing keyboard hints or a "press again to exit" message. Optionally wraps content in a Pane with a colored border.

## Exports
- `Dialog` - renders a dialog with title, content, cancel keybindings, and keyboard shortcut hints
