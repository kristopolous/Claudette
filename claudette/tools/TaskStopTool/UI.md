## Purpose
UI components for rendering TaskStop tool usage and result messages.

## Imports
- **Stdlib**: REACT
- **External**: None
- **Internal**:
  - `MessageResponse` component
  - `Text` from ink
  - `stringWidth` from ink/stringWidth
  - `truncateToWidthNoEllipsis` from utils/format
  - `Output` type from TaskStopTool

## Logic
Exports:
- `renderToolUseMessage()`: Returns empty string (no tool-use display).
- `renderToolResultMessage(output, progressMessages, options)`:
  - For `external === 'ant'`, returns null (suppressed).
  - Otherwise formats `output.command`: truncates to max 2 lines and 160 characters width using `truncateCommand`.
  - Displays command followed by " · stopped" (or "… · stopped" if truncated) in dim color within MessageResponse.
- `truncateCommand(command)`: Helper to enforce display limits.

Used to indicate that a task/agent has been stopped, showing the command that was terminated.

## Exports
- `renderToolUseMessage()`
- `renderToolResultMessage(output, progressMessages, options)`
