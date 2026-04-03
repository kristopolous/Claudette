# tools/NotebookEditTool/UI.tsx

## Purpose
UI components for rendering NotebookEdit tool usage and result messages for Jupyter notebook cell modifications.

## Imports
- **Stdlib**: REACT
- **External**: `@anthropic-ai/sdk` (ToolResultBlockParam), `zod/v4` (type), `diff` (StructuredPatchHunk)
- **Internal**:
  - `extractTag` utility
  - `FallbackToolUseErrorMessage` component
  - `FilePathLink` component
  - `HighlightedCode` component
  - `MessageResponse` component
  - `NotebookEditToolUseRejectedMessage` component
  - `Box`, `Text` from ink
  - `ThemeName` type
  - `Tools` type from Tool
  - `getDisplayPath` utility
  - `inputSchema`, `Output` types from NotebookEditTool

## Logic
Exports:
- `getToolUseSummary(input)`: Returns display path of notebook_path or null.
- `renderToolUseMessage(input, options)`: Shows notebook path (with optional cell_id and content preview in verbose). Omits if required fields missing. For plan files, shows just path; in verbose shows more details (cell_id, content snippet, cell_type, edit_mode).
- `renderToolUseRejectedMessage(input, options)`: Renders the rejection message via `NotebookEditToolUseRejectedMessage` component, showing diff of proposed change.
- `renderToolUseErrorMessage(result, options)`: For non-verbose tool_use_error strings, shows "Error editing notebook"; else falls back to generic.
- `renderToolResultMessage(output)`: If `output.error`, displays error in red; otherwise shows "Updated cell {cell_id}:" and highlights new_source code as HighlightedCode with filePath "notebook.py".

## Exports
- `getToolUseSummary(input)`
- `renderToolUseMessage(input, options)`
- `renderToolUseRejectedMessage(input, options)`
- `renderToolUseErrorMessage(result, options)`
- `renderToolResultMessage(output)`
