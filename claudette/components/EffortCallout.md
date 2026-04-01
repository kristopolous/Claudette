## Purpose
Displays a dialog prompting users to select an effort level for the inference provider model, with auto-dismiss and subscription-based visibility logic.

## Imports
- **Stdlib**: none
- **External**: `react`, `react/compiler-runtime`
- **Internal**: `ink`, `utils/auth`, `utils/config`, `utils/effort`, `utils/model/model`, `utils/settings/settings`, `components/CustomSelect/select`, `components/EffortIndicator`, `components/permissions/PermissionDialog`

## Logic
1. Determines default effort level based on the specified model
2. Presents a selection dialog with low, medium, and high effort options
3. Auto-dismisses after 30 seconds and persists the dismissal state
4. Updates user settings when an effort level is selected
5. Controls visibility based on subscription tier (Pro, Max, Team), model type, and prior dismissal state

## Exports
- `EffortCallout` - React component that renders an effort level selection dialog for Opus 4.6 model users
- `shouldShowEffortCallout` - function that determines whether the effort callout should be displayed based on user subscription and config state
