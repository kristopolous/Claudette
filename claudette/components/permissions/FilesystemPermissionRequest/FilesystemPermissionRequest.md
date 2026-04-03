## Purpose
Renders a generic permission request dialog for filesystem tool operations, delegating to a fallback when the path cannot be determined.

## Imports
- **Stdlib**: none
- **External**: REACT, REACT/compiler-runtime
- **Internal**: ink, permissions/FallbackPermissionRequest, permissions/FilePermissionDialog, permissions/FilePermissionDialog/useFilePermissionDialog, permissions/PermissionRequest

## Logic
1. Extract the file path from the tool using getPath if available
2. Get the user-facing name and determine if the operation is read-only or write
3. If no path can be extracted, fall back to the generic FallbackPermissionRequest
4. Otherwise, render the tool use message and display it in a FilePermissionDialog with the appropriate operation type and title

## Exports
- `FilesystemPermissionRequest` - component that handles filesystem tool permission requests, routing to FilePermissionDialog when a path is available or FallbackPermissionRequest otherwise
