# tools/ListMcpResourcesTool/UI.tsx

## Purpose

Renders terminal UI for the ListMcpResourcesTool, which queries MCP (Model Context Protocol) servers for available resources. Shows which server is being queried during tool use, and formats the resulting resource list as pretty-printed JSON.

## Imports

- **Stdlib**: React (for React.ReactNode)
- **External**: None
- **Internal**:
  - Components: `MessageResponse`, `OutputLine`
  - UI: `Text` from ink`
  - Types: `ToolProgressData`, `ProgressMessage`
  - Utils: `jsonStringify` (from slow operations)
  - Related Tool: `ListMcpResourcesTool` (for Output type)

## Logic

- **`renderToolUseMessage(input)`**:
  - Accepts optional `server` field in input
  - If server specified: returns `List MCP resources from server "server-name"`
  - If no server: returns `List all MCP resources`
- **`renderToolResultMessage(output, _progressMessages, {verbose})`**:
  - If `output` is null or empty array: shows `(No resources found)` in dim color
  - Otherwise: pretty-prints `output` as JSON (2-space indent) using `jsonStringify`
  - Renders through `OutputLine` component which handles truncation and verbose mode

## Exports

- `renderToolUseMessage(input: Partial<{server?: string}>): React.ReactNode`
- `renderToolResultMessage(output: Output, _progressMessages: ProgressMessage<ToolProgressData>[], options: {verbose: boolean}): React.ReactNode`
