# ConfigTool/UI

## Purpose

Renders UI components for the configuration tool messages including use, result, and rejected states in the terminal interface.

## Imports

- **Stdlib**: none
- **External**: REACT
- **Internal**: `components/MessageResponse`, `ink`, `utils/slowOperations`, `tools/ConfigTool/ConfigTool`

## Logic

1. Renders tool use message showing the setting being read or the value being set
2. Renders tool result message displaying success with setting value, or failure with error message
3. Renders rejection message with a warning indicator for config changes

## Exports

- `renderToolUseMessage(input: Partial<Input>): React.ReactNode`
- `renderToolResultMessage(content: Output): React.ReactNode`
- `renderToolUseRejectedMessage(): React.ReactNode`
