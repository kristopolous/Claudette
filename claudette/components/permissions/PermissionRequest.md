## Purpose
Routes tool-specific permission requests to their corresponding permission request components and handles notification and keybinding setup.

## Imports
- **Stdlib**: none
- **External**: `react`, BUILDFLAGS, `zod/v4`, `@anthropic-ai/sdk`
- **Internal**: various tool definitions, permission request components, hooks for keybindings and notifications, types for messages and permissions

## Logic
Maps each tool type to its specific permission request component via a switch statement, falling back to a generic handler for unrecognized tools. Sets up interrupt keybindings and system notifications for permission prompts. Renders the appropriate permission component based on the tool being used.

## Exports
- `PermissionRequest` - main component that dispatches to tool-specific permission request UI
- `PermissionRequestProps` - type defining props including tool use confirmation, callbacks, verbosity, and worker badge
- `ToolUseConfirm` - type defining the confirmation object with tool details, permission decision, and callback handlers
