## Purpose
Renders a permission request dialog for notebook cell edit operations, showing a diff preview and options to approve or reject the edit.

## Imports
- **Stdlib**: path
- **External**: REACT, REACT/compiler-runtime, zod/v4
- **Internal**: ink, tools/NotebookEditTool, utils/log, permissions/FilePermissionDialog, permissions/PermissionRequest, NotebookEditPermissionRequest/NotebookEditToolDiff

## Logic
1. Parse the notebook edit tool input to extract notebook path, cell_id, edit_mode, cell_type, and new_source
2. Determine the language as markdown or python based on cell type
3. Build the edit type text as insert, delete, or make this edit based on edit_mode
4. Construct the question text asking whether to proceed with the edit
5. Render the FilePermissionDialog with the notebook diff preview, notebook path, and language name for syntax highlighting

## Exports
- `NotebookEditPermissionRequest` - component that handles notebook edit permission requests with diff preview and cell-level edit information
