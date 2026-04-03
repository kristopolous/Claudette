## Purpose
Renders a permission request dialog for file edit operations using str_replace, showing a diff preview and options to approve or reject the edit.

## Imports
- **Stdlib**: path
- **External**: REACT, REACT/compiler-runtime, zod/v4
- **Internal**: components/FileEditToolDiff, utils/cwd, ink, tools/FileEditTool, permissions/FilePermissionDialog, permissions/FilePermissionDialog/ideDiffConfig, permissions/PermissionRequest

## Logic
1. Parse the file edit tool input to extract file path, old string, new string, and replace_all flag
2. Compute the relative path and basename for display
3. Build the question text asking whether to make the edit to the target file
4. Assemble the edits array from the parsed input
5. Render the FilePermissionDialog with the diff preview, file path, and IDE diff support for applying modified edits

## Exports
- `FileEditPermissionRequest` - component that handles file edit permission requests with diff preview and IDE integration for str_replace operations
