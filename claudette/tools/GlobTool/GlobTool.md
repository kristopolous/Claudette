## Purpose
Tool for finding files by name pattern or wildcard (glob), with results limited and relativized to save tokens.

## Imports
- **External**: `zod/v4`
- **Internal**: 
  - Tool: `buildTool`, `ToolDef`, `ValidationResult`
  - Utils: `getCwd`, `isENOENT`, `FILE_NOT_FOUND_CWD_NOTE`, `suggestPathUnderCwd`, `getFsImplementation`, `glob`, `lazySchema`, `expandPath`, `toRelativePath`, `checkReadPermissionForTool`, `PermissionDecision`, `matchWildcardPattern`
  - Local: `DESCRIPTION`, `GLOB_TOOL_NAME`, `getToolUseSummary`, `renderToolResultMessage`, `renderToolUseErrorMessage`, `renderToolUseMessage`, `userFacingName`

## Logic
1. Input: pattern (required), path (optional, defaults to CWD)
2. Validates path exists and is a directory if provided; UNC path bypass validation
3. Checks read permissions via permission system; matcher uses wildcard pattern matching
4. Executes glob with configurable limit (default 100) and offset 0; respects abortController
5. Filters by permission context (read patterns) inside glob utility
6. Relativizes results under CWD to reduce token usage
7. Returns durationMs, numFiles, filenames array, truncated flag
8. Output: empty → "No files found"; truncated adds suggestion note

## Exports
- `GlobTool` - Main tool definition
- `Output` - Type (durationMs, numFiles, filenames[], truncated)
- Constant: `GLOB_TOOL_NAME`
