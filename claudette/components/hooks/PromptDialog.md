## Purpose
Displays a dialog that prompts the user to select from a set of response options for a hook request.

## Imports
- **Stdlib**: none
- **External**: REACT, REACT/compiler-runtime
- **Internal**: ink, keybindings/useKeybinding, types/hooks, components/CustomSelect/select, components/permissions/PermissionDialog

## Logic
1. Registers an interrupt keybinding to trigger abort
2. Maps request options into Select-compatible option objects with label, value, and description
3. Optionally renders a dimmed tool input summary on the right side of the title
4. Renders options within a PermissionDialog, calling onRespond with the selected key

## Exports
- `PromptDialog` - renders a permission-style dialog with selectable response options for hook prompts
