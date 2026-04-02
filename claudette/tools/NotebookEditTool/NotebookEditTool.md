# tools/NotebookEditTool/NotebookEditTool.ts

## Purpose
Tool for editing Jupyter notebook (.ipynb) cells with support for replace, insert, and delete operations.

## Imports
- **External**: `zod/v4`
- **Stdlib**: `path`
- **Internal**: 
  - Feature flags: `feature`
  - Utils: `fileHistoryEnabled`, `fileHistoryTrackEdit`
  - Tool: `buildTool`, `ToolDef`, `ToolUseContext`
  - Types: `NotebookCell`, `NotebookContent`
  - Utils: `getCwd`, `isENOENT`, `getFileModificationTime`, `writeTextContent`, `readFileSyncWithMetadata`, `safeParseJSON`, `lazySchema`, `parseCellId`
  - Permissions: `checkWritePermissionForTool`, `PermissionDecision`
  - Slow operations: `jsonParse`, `jsonStringify`
  - Local: `NOTEBOOK_EDIT_TOOL_NAME`, `DESCRIPTION`, `PROMPT`, `getToolUseSummary`, `renderToolResultMessage`, `renderToolUseErrorMessage`, `renderToolUseMessage`, `renderToolUseRejectedMessage`

## Logic
1. Validates notebook file extension (.ipynb), edit mode (replace/insert/delete), and cell_id presence
2. Enforces Read-before-Edit using readFileState
3. Checks for file modifications since last read
4. Parses notebook JSON and validates structure
5. Resolves cell ID (actual ID or numeric index)
6. Operations:
   - replace: updates cell source, resets execution_count/outputs for code cells
   - insert: creates new cell after specified ID (auto-generates ID for nbformat≥4.5)
   - delete: removes cell
7. Writes updated notebook with original encoding/line endings
8. Updates readFileState with new timestamp
9. Tracks file history if enabled
10. Returns structured output including original/updated file contents

## Exports
- `NotebookEditTool` - Main tool definition
- `inputSchema` - Input schema (notebook_path, cell_id?, new_source, cell_type?, edit_mode?)
- `outputSchema` - Output schema
- `Output` - Output type (new_source, cell_id?, cell_type, language, edit_mode, error?, notebook_path, original_file, updated_file)
