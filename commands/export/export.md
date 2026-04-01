## Purpose
Export the current conversation to a file or via interactive dialog.

## Imports
- **External**: `path` (join)
- **Internal**: ExportDialog component, ToolUseContext, LocalJSXCommandOnDone, Message type, getCwd, renderMessagesToPlainText, writeFileSync_DEPRECATED

## Logic
1. Renders conversation content using `renderMessagesToPlainText` (converts messages to plain text format)
2. If filename argument provided:
   - Appends .txt if missing
   - Writes file to current working directory using writeFileSync_DEPRECATED
   - Calls onDone with success/failure message
   - Returns null
3. If no filename:
   - Extracts first user prompt for naming
   - Sanitizes to create safe filename (lowercase, alphanumeric + hyphens)
   - Formats timestamp (YYYY-MM-DD-HHMMSS)
   - Creates default like `2025-04-01-143022-shortened-prompt.txt`
   - Returns `ExportDialog` component with content and default filename
4. Dialog allows user to confirm filename and export
5. Command type: 'local-jsx', argumentHint: '[filename]'

## Exports
- `call` - async LocalJSXCommandCall returning React component or null
- Helper: `extractFirstPrompt`, `sanitizeFilename`, `formatTimestamp`
