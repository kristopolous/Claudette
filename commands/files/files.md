## Purpose
Lists all files currently in the context (those loaded via Read tool).

## Imports
- **Stdlib**: `path`
- **Internal**: `ToolUseContext` type, `LocalCommandResult` type, `getCwd`, `cacheKeys` (from fileStateCache)

## Logic
`call` extracts file paths from the `context.readFileState` cache (tracking files that have been read), converts each to a relative path from the current working directory, and returns them as a newline-separated list. If no files are in context, returns "No files in context".

## Exports
- `call` - Async function returning LocalCommandResult with file list
