## Purpose
Provides a dialog for exporting conversation content to the clipboard or a file.

## Imports
- **Stdlib**: `path`
- **External**: REACT
- **Internal**: `hooks/useExitOnCtrlCDWithKeybindings`, `hooks/useTerminalSize`, `ink/termio/osc`, `ink`, `keybindings/useKeybinding`, `utils/cwd`, `utils/slowOperations`, `components/ConfigurableShortcutHint`, `components/CustomSelect/select`, `components/design-system/Byline`, `components/design-system/Dialog`, `components/design-system/KeyboardShortcutHint`, `components/TextInput`

## Logic
1. Presents two export options: copy to clipboard or save to file
2. Clipboard export copies content immediately and reports success
3. File export shows a filename input with automatic .txt extension enforcement
4. Writes the file to the current working directory with UTF-8 encoding
5. Handles errors during file writing and reports failure to the caller
6. Supports navigating back from filename input to option selection via cancel
7. Renders context-appropriate keyboard shortcut hints based on current dialog state

## Exports
- `ExportDialog` - renders a dialog with clipboard and file export options for conversation content
