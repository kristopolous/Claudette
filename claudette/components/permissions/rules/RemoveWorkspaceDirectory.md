## Purpose
Displays a confirmation dialog for removing a directory from the workspace.

## Imports
- **Stdlib**: None
- **External**: REACT
- **Internal**: `components/CustomSelect/select`, `ink`, `Tool`, `utils/permissions/PermissionUpdate`, `design-system/Dialog`

## Logic
1. On confirmation, applies a permission update to remove the specified directory from the session
2. Updates the permission context via the provided callback
3. Renders a dialog with the directory path, a warning message, and a yes/no Select

## Exports
- `RemoveWorkspaceDirectory` - renders a confirmation dialog to remove a directory from the workspace and updates the permission context on confirmation
