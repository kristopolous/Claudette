## Purpose
Renders a permission request dialog for file write operations, showing a diff preview and options to approve or reject the file creation or overwrite.

## Imports
- **Stdlib**: path
- **External**: REACT, REACT/compiler-runtime, zod/v4
- **Internal**: ink, tools/FileWriteTool, utils/cwd, utils/errors, utils/fileRead, permissions/FilePermissionDialog, permissions/FilePermissionDialog/ideDiffConfig, permissions/PermissionRequest, FileWritePermissionRequest/FileWriteToolDiff

## Logic
1. Parse the file write tool input to extract file path and content
2. Attempt to read the existing file content to determine if the file exists
3. Determine the action text as either overwrite or create based on file existence
4. Compute the relative path and basename for display
5. Build the question text asking whether to proceed with the action
6. Render the FilePermissionDialog with the diff preview, file path, and IDE diff support for applying modified edits

## Exports
- `FileWritePermissionRequest` - component that handles file write permission requests with full diff preview and IDE integration support
