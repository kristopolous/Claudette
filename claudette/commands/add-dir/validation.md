## Purpose
Validation logic for /add-dir - verifies directory can be added to workspace.

## Imports
- **External**: fs/promises (stat), path (resolve, dirname), STYLER
- **Internal**: PermissionContext, error utils, path expansion, working directory utils

## Logic
Validates a directory path for addition to workspace:
- Checks for empty path
- Stats the path: must exist and be a directory
- Handles ENOENT/ENOTDIR/EACCES/EPERM gracefully
- Checks if path is already within an existing working directory

Returns discriminated union AddDirectoryResult with success or specific failure kinds. Also provides addDirHelpMessage() to generate user-friendly error text.

## Exports
- `validateDirectoryForWorkspace` - Async validation function
- `AddDirectoryResult` - Union type for validation outcomes
- `addDirHelpMessage` - Helper to format errors for display
