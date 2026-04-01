## Purpose
Defines Zod schemas and TypeScript types for file edit tool input validation and output structure.

## Imports
- **Stdlib**: none
- **External**: `zod/v4`
- **Internal**: `utils/lazySchema`, `utils/semanticBoolean`

## Logic
1. Defines input schema with file_path, old_string, new_string, and optional replace_all fields
2. Defines output schema with filePath, oldString, newString, originalFile, structuredPatch, userModified, replaceAll, and optional gitDiff
3. Defines hunk schema for diff patch hunks with start/line counts and lines array
4. Defines gitDiff schema for git diff metadata including filename, status, additions, deletions, changes, patch, and repository

## Exports
- `FileEditInput` - type for parsed file edit input with file_path, old_string, new_string, replace_all
- `EditInput` - type for individual edit without file_path
- `FileEdit` - runtime type for edit with old_string, new_string, and guaranteed boolean replace_all
- `hunkSchema` - Zod schema for diff patch hunk structure
- `gitDiffSchema` - Zod schema for git diff output structure
- `FileEditOutput` - type for file edit tool output including patch and metadata
- `inputSchema` - Zod schema for validating file edit input
- `outputSchema` - Zod schema for file edit tool output
