# FileEditTool/types.ts

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

- `inputSchema: z.ZodObject<InputSchema>`
- `outputSchema: z.ZodObject<OutputSchema>`
- `hunkSchema: z.ZodObject<Hunk>`
- `gitDiffSchema: z.ZodObject<GitDiff>`
- `FileEditInput: z.infer<InputSchema>`
- `EditInput: Omit<FileEditInput, 'file_path'>`
- `FileEdit: { old_string: string; new_string: string; replace_all: boolean }`
- `FileEditOutput: z.infer<OutputSchema>`
