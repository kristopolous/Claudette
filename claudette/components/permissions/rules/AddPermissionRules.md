## Purpose
Provides a dialog for saving new permission rules to a chosen settings destination (local, project, or user settings).

## Imports
- **Stdlib**: None
- **External**: REACT
- **Internal**: `components/CustomSelect/select`, `ink`, `Tool`, `utils/permissions/PermissionRule`, `utils/permissions/PermissionUpdate`, `utils/permissions/permissionRuleParser`, `utils/permissions/shadowedRuleDetection`, `utils/sandbox/sandbox-adapter`, `utils/settings/constants`, `utils/settings/settings`, `utils/stringUtils`, `design-system/Dialog`, `PermissionRuleDescription`

## Logic
Presents a dialog showing the rules to be added with their descriptions, then prompts the user to select a save destination from available settings sources. On selection, applies and persists the permission update to the chosen destination, detects any unreachable or shadowed rules, and reports results to the parent component.

## Exports
- `optionForPermissionSaveDestination` - creates a select option for a given settings save destination with label and file path description
- `AddPermissionRules` - renders a dialog to confirm and save new permission rules to a selected settings location
