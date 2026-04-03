## Purpose
Wraps permission request content in a styled dialog box with a title header and rounded border.

## Imports
- **Stdlib**: none
- **External**: REACT
- **Internal**: `ink`, `utils/theme`, `PermissionRequestTitle`, `WorkerBadge`

## Logic
Renders a column layout with a rounded border on the top only, containing a title section (via PermissionRequestTitle) with optional right-aligned content, followed by the children content with configurable horizontal padding.

## Exports
- `PermissionDialog` - container component providing consistent dialog styling for all permission request types
