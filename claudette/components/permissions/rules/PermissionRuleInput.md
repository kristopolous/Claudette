## Purpose
Provides a text input for entering a new permission rule with validation and examples.

## Imports
- **Stdlib**: None
- **External**: `figures`, `react`
- **Internal**: `components/TextInput`, `hooks/useExitOnCtrlCDWithKeybindings`, `hooks/useTerminalSize`, `ink`, `keybindings/useKeybinding`, `tools/BashTool/BashTool`, `tools/WebFetchTool/WebFetchTool`, `utils/permissions/PermissionRule`, `utils/permissions/permissionRuleParser`

## Logic
1. Displays a title and example rules showing the expected format
2. Provides a text input for entering a rule string
3. On submit, parses the input string into a PermissionRuleValue and passes it to the callback along with the rule behavior
4. Shows exit hints with double-press Esc support

## Exports
- `PermissionRuleInput` - renders a text input dialog for creating a new permission rule with examples and parsing
