## Purpose
Renders an error message when a tool execution fails, with optional truncation for verbose mode.

## Imports
- **Stdlib**: none
- **External**: `@anthropic-ai/sdk` (ToolResultBlockParam), `react`, `react/compiler-runtime`
- **Internal**: `stripUnderlineAnsi` (components/shell/OutputLine), `extractTag` (utils/messages), `removeSandboxViolationTags` (utils/sandbox/sandbox-ui-utils), `Box`, `Text` (ink), `useShortcutDisplay` (keybindings), `countCharInString` (utils/stringUtils), `MessageResponse`

## Logic
Extracts the error message from the tool result, stripping sandbox violation tags and error XML tags. In non-verbose mode, shortens input validation errors and truncates output to a maximum of 10 rendered lines. Displays the error text in error color within a MessageResponse wrapper, with a hint showing remaining line count and the transcript toggle shortcut when content is truncated.

## Exports
- `FallbackToolUseErrorMessage` - renders a formatted tool execution error message with truncation support
