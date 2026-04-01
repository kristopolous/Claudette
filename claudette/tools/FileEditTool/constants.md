## Purpose
Defines constant values used by the file edit tool including the tool name, permission patterns, and error messages.

## Imports
- **Stdlib**: none
- **External**: none
- **Internal**: none

## Logic
Defines named constants for the file edit tool name, permission patterns for project and global configuration folders, and an error message for unexpected file modifications.

## Exports
- `FILE_EDIT_TOOL_NAME` - the name identifier for the file edit tool
- `CLAUDE_FOLDER_PERMISSION_PATTERN` - permission pattern for the project configuration folder
- `GLOBAL_CLAUDE_FOLDER_PERMISSION_PATTERN` - permission pattern for the global configuration folder
- `FILE_UNEXPECTEDLY_MODIFIED_ERROR` - error message shown when a file was modified externally
