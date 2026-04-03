# tools/GrepTool/UI.tsx

## Purpose
UI components for rendering Grep tool usage and result messages.

## Imports
- **Stdlib**: REACT
- **External**: `@anthropic-ai/sdk` (ToolResultBlockParam type)
- **Internal**:
  - `CtrlOToExpand` component
  - `FallbackToolUseErrorMessage` component
  - `MessageResponse` component
  - `TOOL_SUMMARY_MAX_LENGTH` constant
  - `Box`, `Text` from ink
  - `ProgressMessage` type
  - `ToolProgressData` type
  - `FILE_NOT_FOUND_CWD_NOTE`, `getDisplayPath` from utils/file
  - `truncate` from utils/format
  - `extractTag` from utils/messages
  - `Output` type (local)

## Logic
Exports:
- `renderToolUseMessage(input, options)`: Shows pattern (required) and optionally path (display path unless verbose). Returns null if no pattern.
- `renderToolUseErrorMessage(result, options)`: For non-verbose string errors with tool_use_error tag, shows "File not found" or "Error searching files" based on error content. Falls back to generic error component.
- `renderToolResultMessage(output, progressMessages, options)`: Based on `output.mode`:
  - `content`: summary with line count and content.
  - `count`: summary with match count and file count, plus optional content.
  - `files_with_matches` (default): lists filenames, summary with file count.
  Uses `SearchResultSummary` component for consistent formatting. Verbose mode shows full content with indentation.
- `getToolUseSummary(input)`: Returns truncated pattern for summary.
- `SearchResultSummary` (internal): Memoized component showing "Found X lines/matches/files" and optional secondary count, with expand hint (CtrlOToExpand) when not verbose.

## Exports
- `renderToolUseMessage(input, options)`
- `renderToolUseErrorMessage(result, options)`
- `renderToolResultMessage(output, progressMessages, options)`
- `getToolUseSummary(input)`
