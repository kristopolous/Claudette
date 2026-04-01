## Purpose
Displays a tab showing recently denied commands from the auto mode classifier with approve/retry options.

## Imports
- **Stdlib**: None
- **External**: `react`
- **Internal**: `ink`, `utils/autoModeDenials`, `CustomSelect/select`, `design-system/StatusIcon`, `design-system/Tabs`

## Logic
1. Loads auto mode denials and tracks approved/retry sets
2. Notifies parent of state changes for exit handling
3. Supports "r" key to toggle retry status on the focused denial
4. Renders each denial with a status icon and optional "(retry)" suffix
5. Shows a placeholder message when there are no recent denials

## Exports
- `RecentDenialsTab` - renders a list of recently denied commands with options to approve or retry them
