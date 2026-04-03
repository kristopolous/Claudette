## Purpose
Renders the title section of a permission request dialog with optional subtitle, color, and worker badge.

## Imports
- **Stdlib**: none
- **External**: REACT
- **Internal**: `ink`, `utils/theme`, `WorkerBadge`

## Logic
Displays the title in bold with a configurable color (defaulting to "permission"), optionally appends the worker badge name with a dimmed separator, and renders the subtitle below with start-truncation wrapping if it is a string.

## Exports
- `PermissionRequestTitle` - component rendering the title, optional subtitle, and worker badge for permission dialogs
