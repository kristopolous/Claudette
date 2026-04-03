# components/ManagedSettingsSecurityDialog/ManagedSettingsSecurityDialog

## Purpose
Provides security dialog for managed settings requiring approval.

## Imports
- **Stdlib**: (none)
- **External**: REACT, REACT_COMPILER
- **Internal**: hooks useExitOnCtrlCDWithKeybindings, ink (Box, Text), keybindings useKeybinding, settings types (SettingsJson), CustomSelect index (Select), permissions PermissionDialog (PermissionDialog), ManagedSettingsSecurityDialog utils (extractDangerousSettings, formatDangerousSettingsList)

## Logic
1. `Props` - { settings, onAccept, onReject }
2. `ManagedSettingsSecurityDialog` - UI component for managed settings security
3. Uses REACT_COMPILER runtime (_c) for memoization
4. Extracts dangerous settings via extractDangerousSettings
5. Formats dangerous settings list via formatDangerousSettingsList
6. Uses useExitOnCtrlCDWithKeybindings for exit state
7. useKeybinding for "confirm:no" binding
8. onChange handler: 'exit' → onReject(), otherwise → onAccept()
9. Renders PermissionDialog with context "Confirmation"
10. Shows warning about organization-configured managed settings
11. Lists dangerous settings requiring approval
12. Shows Select component for approval decision

## Exports
- `ManagedSettingsSecurityDialog` - managed settings security dialog component
