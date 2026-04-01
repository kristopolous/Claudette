## Purpose
Provides a dialog for adding a directory to the workspace, with input validation, directory completion suggestions, and session persistence options.

## Imports
- **Stdlib**: None
- **External**: `figures`, `react`, `usehooks-ts`
- **Internal**: `commands/add-dir/validation`, `components/TextInput`, `ink/events/keyboard-event`, `ink`, `keybindings/useKeybinding`, `Tool`, `utils/suggestions/directoryCompletion`, `ConfigurableShortcutHint`, `CustomSelect/select`, `design-system/Byline`, `design-system/Dialog`, `design-system/KeyboardShortcutHint`, `PromptInput/PromptInputFooterSuggestions`

## Logic
Operates in two modes: when a directory path is pre-selected, shows a confirmation dialog with options to add for the session only or remember persistently. When no path is provided, shows a text input with debounced directory path completions, tab/return to select suggestions, and arrow key navigation. Validates the directory on submission using the validation utility and displays errors inline.

## Exports
- `AddWorkspaceDirectory` - renders a dialog for adding a directory to the workspace with path input, autocomplete, and persistence options
