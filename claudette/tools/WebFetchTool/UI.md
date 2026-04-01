# WebFetchTool/UI.tsx

## Purpose

Renders terminal UI for WebFetchTool, which fetches content from URLs. Displays the URL during tool use (optionally with prompt), a "Fetching…" progress indicator, and the result summary showing size and HTTP status code. In verbose mode, also shows the fetched content.

## Imports

- **Stdlib**: React (for React.ReactNode)
- **External**: None
- **Internal**:
  - Constants: `TOOL_SUMMARY_MAX_LENGTH`
  - Components: `MessageResponse`
  - UI: `Box`, `Text` from `ink.js`
  - Types: `ToolProgressData`, `ProgressMessage`
  - Utils: `formatFileSize`, `truncate`
  - Related Tool: `WebFetchTool` (for Output type)

## Logic

- `renderToolUseMessage(input, {verbose})`:
  - Returns null if no URL
  - Verbose: returns `url: "..."` plus `, prompt: "..."` if prompt provided
  - Non-verbose: returns just the URL string
- `renderToolUseProgressMessage()`: Returns dimmed "Fetching…" in a MessageResponse
- `renderToolResultMessage(output, _progressMessages, {verbose})`:
  - Formats `bytes` via `formatFileSize`
  - Shows "Received `<size>` (`code` `codeText`)" in a MessageResponse
  - In verbose mode: adds a column with the `result` content below
- `getToolUseSummary(input)`: Truncates URL to `TOOL_SUMMARY_MAX_LENGTH` for summary display

## Exports

- `renderToolUseMessage(input: Partial<{url: string; prompt: string}>, options: {theme?: string; verbose: boolean}): React.ReactNode`
- `renderToolUseProgressMessage(): React.ReactNode`
- `renderToolResultMessage(output: Output, _progressMessages: ProgressMessage<ToolProgressData>[], options: {verbose: boolean}): React.ReactNode`
- `getToolUseSummary(input: Partial<{url: string; prompt: string}> | undefined): string | null`
