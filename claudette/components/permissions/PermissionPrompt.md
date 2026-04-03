## Purpose
Shared component for permission prompts with optional feedback input, handling option selection, feedback mode toggling, and analytics.

## Imports
- **Stdlib**: none
- **External**: REACT
- **Internal**: `ink`, `keybindings/types`, `keybindings/useKeybinding`, `services/analytics`, `state/AppState`, `CustomSelect/select`

## Logic
Manages separate accept/reject feedback input modes and state. Transforms options into Select-compatible format, handling input mode expansion with placeholders. Tracks whether the user entered feedback mode for analytics. Maps keybindings to option selections and handles escape to cancel with attribution tracking.

## Exports
- `PermissionPrompt` - renders a selectable list of permission options with optional inline feedback input
- `FeedbackType` - type for accept or reject feedback
- `PermissionPromptOption` - type defining option value, label, feedback config, and optional keybinding
- `ToolAnalyticsContext` - type for tool name and MCP flag used in analytics
- `PermissionPromptProps` - type defining options, callbacks, question text, and analytics context
