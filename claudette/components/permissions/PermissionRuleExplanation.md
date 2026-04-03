## Purpose
Displays the reason why a permission decision requires user confirmation, including rule, classifier, hook, or safety check explanations.

## Imports
- **Stdlib**: none
- **External**: BUILDFLAGS, `chalk`, `react`
- **Internal**: `ink`, `state/AppState`, `utils/permissions/PermissionResult`, `utils/permissions/permissionRuleParser`, `utils/theme`, `design-system/ThemedText`

## Logic
Converts permission decision reasons into display strings based on the reason type (rule, classifier, hook, safety check, working directory, etc.). Formats the reason with chalk styling and provides optional config hints for how to update the relevant settings. Renders with theme-aware coloring for auto-mode classifier reasons.

## Exports
- `PermissionRuleExplanation` - component that renders the decision reason and optional configuration hint
- `PermissionRuleExplanationProps` - type defining the permission result and tool type
