## Purpose
Displays a message when a user rejects a file edit tool use, showing either the rejected content preview or a structured diff.

## Imports
- **Stdlib**: `path`
- **External**: `diff`, REACT
- **Internal**: `useTerminalSize`, `getCwd`, `Box`, `Text`, `HighlightedCode`, `MessageResponse`, `StructuredDiffList`

## Logic
Determines the display format based on the operation type and available data. For write operations with content, shows a truncated code preview (limited to 10 lines) with syntax highlighting. For update operations with a patch, renders a structured diff list. In condensed mode without verbose output, shows only a brief rejection message.

## Exports
- `FileEditToolUseRejectedMessage` - renders a rejection message with either a code preview or structured diff depending on the edit operation type
