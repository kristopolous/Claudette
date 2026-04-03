# FileWriteTool/UI.tsx

## Purpose

UI components for rendering FileWrite tool usage and result messages, including file creation and update displays.

## Imports
- **Stdlib**: `path` (isAbsolute, relative, resolve), REACT
- **External**: `@anthropic-ai/sdk` (ToolResultBlockParam), `diff` (StructuredPatchHunk)
- **Internal**:
  - `MessageResponse` component
  - `extractTag` utility
  - `CtrlOToExpand` component
  - `FallbackToolUseErrorMessage` component
  - `FileEditToolUpdatedMessage` component
  - `FileEditToolUseRejectedMessage` component
  - `FilePathLink` component
  - `HighlightedCode` component
  - `useTerminalSize` hook
  - `Box`, `Text` from ink
  - `ProgressMessage` type
  - `ToolProgressData` type
  - `getCwd` utility
  - `getPatchForDisplay` utility
  - `getDisplayPath` utility
  - `logError` utility
  - `getPlansDirectory` utility
  - `openForScan`, `readCapped` from utils/readEditContext
  - `Output` type from FileWriteTool

## Logic
Exports:
- `countLines(content)`: Counts visible lines; trailing newline is a terminator (editor line numbering).
- `userFacingName(input)`: Returns 'Updated plan' for plan files; otherwise 'Write'.
- `isResultTruncated(output)`: Gates show-more for create type; checks if content exceeds MAX_LINES_TO_RENDER.
- `getToolUseSummary(input)`: Returns display path or null.
- `renderToolUseMessage(input, options)`: Shows file path (FilePathLink). For plan files, returns empty string (handled separately).
- `renderToolUseRejectedMessage(input, options)`: Renders rejection diff via `WriteRejectionDiff` component (handles both create and update rejection cases).
- `renderToolUseErrorMessage(result, options)`: Short error "Error writing file" for tool_use_error; falls back to generic.
- `renderToolResultMessage(output, progressMessages, options)`: Based on `output.type`:
  - `'create'`: For plan files in non-verbose non-condensed, shows "/plan to preview"; condensed non-verbose shows one-line summary; otherwise shows `FileWriteToolCreatedMessage` with content preview (up to MAX_LINES_TO_RENDER unless verbose) and syntax highlighting.
  - `'update'`: Shows `FileEditToolUpdatedMessage` with diff and optional file content.

Internal components (`FileWriteToolCreatedMessage`, `WriteRejectionDiff`, `WriteRejectionBody`, `loadRejectionDiff`) handle lazy diff computation and rendering.

## Exports
- `countLines(content)`
- `userFacingName(input)`
- `isResultTruncated(output)`
- `getToolUseSummary(input)`
- `renderToolUseMessage(input, options)`
- `renderToolUseRejectedMessage(input, options)`
- `renderToolUseErrorMessage(result, options)`
- `renderToolResultMessage(output, progressMessages, options)`
