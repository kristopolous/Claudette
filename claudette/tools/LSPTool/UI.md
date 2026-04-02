# tools/LSPTool/UI.tsx

## Purpose

Renders terminal UI for LSPTool (Language Server Protocol operations). Displays operation context during tool use, handles error messages, and presents results with collapsed/expanded views showing summary counts and detailed content. Supports all 9 LSP operations (go to definition, find references, hover, etc.).

## Imports

- **Stdlib**: React compiler runtime (`_c`)
- **External**: `ToolResultBlockParam` type from `@anthropic-ai/sdk`
- **Internal**:
  - Components: `CtrlOToExpand`, `FallbackToolUseErrorMessage`, `MessageResponse`
  - UI: `Box`, `Text` from ink`
  - Utils: `getDisplayPath`, `extractTag`
  - Type: `Input`, `Output` from LSPTool
  - Helper: `getSymbolAtPosition` from symbolContext`

## Logic

- **`OPERATION_LABELS`**: Lookup map for singular/plural labels per operation (e.g., "definition"/"definitions", "reference"/"references"). Hover has special "available" label when non-empty.
- **`LSPResultSummary`**: Reusable component for collapsible result display
  - Accepts: `operation`, `resultCount`, `fileCount`, `content`, `verbose`
  - Shows summary line: "Found X results" or "Hover info available"; adds "across Y files" if multiple
  - In verbose mode: shows expanded content with indentation marker (`⎿`)
  - In non-verbose mode: shows collapse indicator (`CtrlOToExpand`) when count > 0
  - Uses React compiler optimizations (`_c`) for memoization
- **`userFacingName(): string`**: Returns `'LSP'` - the display name for the tool
- **`renderToolUseMessage(input, {verbose})`**:
  - For position-based operations (goToDefinition, findReferences, hover, goToImplementation):
    - Calls `getSymbolAtPosition` to get symbol name at cursor
    - Shows: `operation: "...", symbol: "..." in: "file"` (if symbol found) or `file + position`
  - For other operations (documentSymbol, workspaceSymbol):
    - Shows: `operation: "...", file: "path"`
  - Uses `getDisplayPath` for shorter paths unless verbose
- **`renderToolUseErrorMessage(result, {verbose})`**:
  - If not verbose and result contains `tool_use_error` tag: shows simple "LSP operation failed"
  - Otherwise: falls back to `FallbackToolUseErrorMessage` component
- **`renderToolResultMessage(output, _progressMessages, {verbose})`**:
  - If `resultCount` and `fileCount` are defined: uses `LSPResultSummary` for smart collapsed/expanded view
  - Otherwise: renders simple `MessageResponse` with `output.result` (fallback for errors/initialization failures)

## Exports

- `userFacingName(): string`
- `renderToolUseMessage(input: Partial<Input>, options: {verbose: boolean}): React.ReactNode`
- `renderToolUseErrorMessage(result: ToolResultBlockParam['content'], options: {verbose: boolean}): React.ReactNode`
- `renderToolResultMessage(output: Output, _progressMessages: unknown[], options: {verbose: boolean}): React.ReactNode`
