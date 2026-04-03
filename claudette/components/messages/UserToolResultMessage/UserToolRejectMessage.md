## Purpose
Renders a message for a rejected tool use, displaying the original input and rejection context.

## Imports
- **External**: REACT
- **Internal**: `hooks/useTerminalSize`, `ink`, `Tool`, `types/message`, `utils/messages`, `components/FallbackToolUseRejectedMessage`

## Logic
Retrieves terminal size and theme context. If the tool does not provide a custom rejection message renderer, falls back to FallbackToolUseRejectedMessage. Otherwise, parses the input against the tool's input schema and delegates to the tool's renderToolUseRejectedMessage method, falling back to the fallback component if parsing fails.

## Exports
- `UserToolRejectMessage` - renders a rejection message for a tool use, using the tool's custom renderer or a fallback
