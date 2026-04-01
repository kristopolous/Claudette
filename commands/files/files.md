## Purpose
List all files currently in context (visible to Claude in this session).

## Imports
- **Internal**: ToolUseContext type, LocalCommandResult type, getCwd utility, cacheKeys from fileStateCache

## Logic
1. Simple local command that reads from readFileState cache
2. Extracts all file paths that have been read/accessed in this session
3. Converts paths to relative from current working directory
4. Joins with newlines
5. Returns text: "Files in context:\n" + list
6. If no files in context, returns "No files in context"
7. Only enabled for Ant users (internal), supports non-interactive mode
8. Useful for debugging what context the model has access to

## Exports
- `call` - async function returning LocalCommandResult (text)
