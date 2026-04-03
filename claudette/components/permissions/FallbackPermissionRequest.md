## Purpose
Provides a generic permission request UI for tools that do not have a specialized permission component.

## Imports
- **Stdlib**: none
- **External**: REACT
- **Internal**: `bootstrap/state`, `ink`, `services/analytics/metadata`, `utils/env`, `utils/permissions/permissionsLoader`, `utils/stringUtils`, `utils/unaryLogging`, `hooks`, `PermissionDialog`, `PermissionPrompt`, `PermissionRequest`, `PermissionRuleExplanation`

## Logic
Determines the user-facing tool name, strips MCP suffix if present, and builds yes/no options with optional "don't ask again" variant. Logs unary events for accept/reject decisions and handles permission rule updates when the user chooses to always allow. Renders the tool description truncated to three lines alongside the permission rule explanation and selection prompt.

## Exports
- `FallbackPermissionRequest` - generic permission request component for unhandled tool types
