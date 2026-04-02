# FileReadTool/UI.tsx

## Purpose

Renders terminal UI for FileReadTool, which reads files and produces various output types (text, images, PDFs, notebooks, etc.). Handles tool use display (file path, line ranges, pages), result summaries, error messages, and context-sensitive naming (Read vs Reading Plan vs Read agent output).

## Imports

- **Stdlib**: React (for React.ReactNode)
- **External**: `ToolResultBlockParam` type from Anthropic SDK
- **Internal**:
  - Utils: `extractTag`, `FILE_NOT_FOUND_CWD_NOTE`, `getDisplayPath`, `formatFileSize`
  - Paths: `getPlansDirectory`, `getTaskOutputDir`
  - Components: `FallbackToolUseErrorMessage`, `FilePathLink`, `MessageResponse`
  - UI: `Text` from ink`
  - Types: `Input`, `Output` from FileReadTool

## Logic

**Helper**:
- `getAgentOutputTaskId(filePath)`: Extracts task ID from agent output file pattern `{taskOutputDir}/{taskId}.output`; returns null if not agent output

**Exported Functions**:
- `renderToolUseMessage(input, {verbose})`:
  - Returns null if no `file_path`
  - For agent output files: returns empty string (task ID shown separately by AssistantToolUseMessage)
  - Otherwise shows file path via `FilePathLink`; if `pages` present adds `· pages N`; if `offset`/`limit` in verbose mode adds line range
- `renderToolUseTag(input)`:
  - If file is agent output, returns task ID as dimmed Text; else null
- `renderToolResultMessage(output)`:
  - Switch on `output.type`:
    - `image`: "Read image (size)"
    - `notebook`: "Read N cells" or error if no cells
    - `pdf`: "Read PDF (size)"
    - `parts`: "Read N pages (size)" (for multi-page documents)
    - `text`: "Read N lines"
    - `file_unchanged`: dimmed "Unchanged since last read"
- `renderToolUseErrorMessage(result, {verbose})`:
  - Special handling for non-verbose error strings containing `FILE_NOT_FOUND_CWD_NOTE` → "File not found"
  - Also checks for `tool_use_error` tag → "Error reading file"
  - Otherwise falls back to `FallbackToolUseErrorMessage`
- `userFacingName(input)`:
  - If file under plans directory → 'Reading Plan'
  - If agent output file → 'Read agent output'
  - Default → 'Read'
- `getToolUseSummary(input)`:
  - Returns agent task ID for agent output files; else `getDisplayPath(file_path)`

## Exports

- `renderToolUseMessage(input: Partial<Input>, options: {verbose: boolean}): React.ReactNode`
- `renderToolUseTag(input: Partial<Input>): React.ReactNode`
- `renderToolResultMessage(output: Output): React.ReactNode`
- `renderToolUseErrorMessage(result: ToolResultBlockParam['content'], options: {verbose: boolean}): React.ReactNode`
- `userFacingName(input: Partial<Input> | undefined): string`
- `getToolUseSummary(input: Partial<Input> | undefined): string | null`
