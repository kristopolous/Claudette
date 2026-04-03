## Purpose
Displays detailed debug information about permission decisions including behavior, reason, suggestions, and unreachable rules.

## Imports
- **Stdlib**: none
- **External**: BUILDFLAGS, STYLER, `figures`, REACT
- **Internal**: `ink`, `state/AppState`, `utils/permissions/PermissionMode`, `utils/permissions/PermissionResult`, `utils/permissions/PermissionUpdate`, `utils/permissions/permissionRuleParser`, `utils/permissions/shadowedRuleDetection`, `utils/sandbox/sandbox-adapter`, `utils/settings/constants`

## Logic
Formats and displays permission decision reasons with icons for subcommand results, renders suggested rules with ANSI formatting, extracts and displays directories and mode from permission updates, and detects unreachable rules that shadow the suggested ones. Presents behavior, message, reason, suggestions, and unreachable rules in a labeled column layout.

## Exports
- `PermissionDecisionDebugInfo` - component showing comprehensive debug info for a permission decision
- `PermissionDecisionInfoItem` - internal component for formatting individual decision reasons
- `SuggestedRules` - internal component for rendering suggested permission rules
- `SuggestionDisplay` - internal component for displaying suggestions including rules, directories, and mode
