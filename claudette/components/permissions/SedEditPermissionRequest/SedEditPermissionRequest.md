## Purpose
Renders a permission request dialog for sed edit commands executed via bash, showing a diff preview of the substitution result.

## Imports
- **Stdlib**: path
- **External**: REACT, REACT/compiler-runtime
- **Internal**: components/FileEditToolDiff, utils/cwd, utils/errors, utils/fileRead, utils/fsOperations, ink, tools/BashTool, tools/BashTool/sedEditParser, permissions/FilePermissionDialog, permissions/PermissionRequest

## Logic
1. Extract the file path from the sed info and asynchronously read the file content with encoding detection
2. Use Suspense with a promise-based content fetch, falling back to empty content on ENOENT errors
3. In the inner component, apply the sed substitution to compute the new content
4. Build an edits array from the old and new content, or show a no-changes message if the substitution produced no diff
5. Render the FilePermissionDialog with the diff preview and a custom parseInput that simulates the sed edit result

## Exports
- `SedEditPermissionRequest` - component that handles sed edit permission requests by reading the target file, applying the substitution, and showing a diff preview
