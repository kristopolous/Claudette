# tools/GrepTool/GrepTool.ts

## Purpose
Powerful search tool built on ripgrep for searching file contents using regular expressions with various output modes and filtering options.

## Imports
- **External**: `zod/v4`
- **Internal**: 
  - Tool: `buildTool`, `ToolDef`, `ValidationResult`
  - Utils: `getCwd`, `isENOENT`, `FILE_NOT_FOUND_CWD_NOTE`, `suggestPathUnderCwd`, `getFsImplementation`, `lazySchema`, `expandPath`, `toRelativePath`, `checkReadPermissionForTool`, `getFileReadIgnorePatterns`, `normalizePatternsToPath`, `PermissionDecision`, `matchWildcardPattern`, `getGlobExclusionsForPluginCache`, `ripGrep`, `semanticBoolean`, `semanticNumber`, `plural`
  - Local: `GREP_TOOL_NAME`, `getDescription`, `getToolUseSummary`, `renderToolResultMessage`, `renderToolUseErrorMessage`, `renderToolUseMessage`

## Logic
1. Constructs ripgrep command with args based on input
2. Excludes VCS directories (.git, .svn, etc.) and orphaned plugin dirs automatically
3. Enforces line length limit (500 chars) to prevent clutter
4. Handles multiline mode, case insensitivity, context lines
5. Supports three output modes:
   - files_with_matches: returns matching file paths sorted by mtime
   - content: returns matching lines with optional line numbers and context
   - count: returns filename:count format with totals
6. Applies head_limit/offset pagination
7. Validates path existence before searching
8. Converts absolute paths to relative in output to save tokens
9. Permission checking respects deny rules and ignore patterns
10. UNC paths skip fs operations for security

## Exports
- `GrepTool` - Main tool definition
