## Purpose
Displays a development-only status bar showing slow synchronous operations for debugging purposes.

## Imports
- **Stdlib**: none
- **External**: `react`, `react/compiler-runtime`
- **Internal**: `bootstrap/state`, `ink`

## Logic
1. Checks if the build is development or an external ant build to determine visibility
2. Polls for slow operations at 500ms intervals when visible
3. Formats and displays the 3 most recent slow operations with their duration in milliseconds
4. Renders null when not in dev mode or when no slow operations exist

## Exports
- `DevBar` - React component that renders a warning-colored text line showing recent slow sync operations
