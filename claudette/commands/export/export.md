## Purpose
Exports the current conversation to a text file or clipboard.

## Imports
- **Stdlib**: `path`
- **External**: `react`
- **Internal**: `ExportDialog` component, `ToolUseContext`, `LocalJSXCommandOnDone`, `Message` type, `getCwd`, `renderMessagesToPlainText`, `writeFileSync_DEPRECATED`

## Logic
`call` renders the conversation using `renderMessagesToPlainText`. If a filename argument is provided, writes directly to that file (adding .txt if missing) and returns confirmation. Otherwise, generates a default filename from the first user prompt (sanitized) or timestamp, and returns an `<ExportDialog>` component for user interaction.

## Exports
- `call` - JSX command function
- `extractFirstPrompt` - Helper to get first user message text
- `sanitizeFilename` - Helper to sanitize prompt for filename
