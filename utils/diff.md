# utils/diff

## Purpose
Provides diff utilities for file edits with line counting and analytics.

## Imports
- **Stdlib**: (none)
- **External**: `diff`
- **Internal**: analytics, bootstrap state, cost-tracker, FileEditTool types, array, file

## Logic
1. `CONTEXT_LINES` (3) - context lines for diff
2. `DIFF_TIMEOUT_MS` (5000) - diff timeout
3. `adjustHunkLineNumbers` - shifts hunk line numbers by offset
4. Used when getPatchForDisplay received file slice (readEditContext)
5. Converts slice-relative to file-relative line numbers
6. `AMPERSAND_TOKEN`, `DOLLAR_TOKEN` - tokens to escape & and $ for diff
7. `escapeForDiff` - escapes & and $ before diff
8. `unescapeFromDiff` - unescapes tokens after diff
9. `countLinesChanged` - counts lines added/removed in patch
10. For new files: counts all lines as additions
11. Updates total lines changed via addToTotalLinesChanged
12. Updates LOC counter via getLocCounter
13. Logs tengu_file_changed event with lines_added/lines_removed
14. `getPatchForDisplay` - gets formatted patch for display
15. `generateUnifiedDiff` - generates unified diff format
16. `parseUnifiedDiff` - parses unified diff to hunks

## Exports
- `CONTEXT_LINES` - context lines constant
- `DIFF_TIMEOUT_MS` - diff timeout constant
- `adjustHunkLineNumbers` - adjusts hunk line numbers
- `escapeForDiff` - escapes for diff
- `unescapeFromDiff` - unescapes from diff
- `countLinesChanged` - counts changed lines
- `getPatchForDisplay` - gets patch for display
- `generateUnifiedDiff` - generates unified diff
- `parseUnifiedDiff` - parses unified diff
