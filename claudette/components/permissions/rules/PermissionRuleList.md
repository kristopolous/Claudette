## Purpose
Main component for managing permission rules with tabs for allow, ask, deny, workspace, and recent denials.

## Imports
- **Stdlib**: None
- **External**: STYLER, `figures`, REACT
- **Internal**: `state/AppState`, `utils/permissions/PermissionUpdate`, `utils/permissions/PermissionUpdateSchema`, `commands`, `components/CustomSelect/select`, `hooks/useExitOnCtrlCDWithKeybindings`, `hooks/useSearchInput`, `ink/events/keyboard-event`, `ink`, `keybindings/useKeybinding`, `utils/autoModeDenials`, `utils/permissions/PermissionRule`, `utils/permissions/permissionRuleParser`, `utils/permissions/permissions`, `utils/permissions/shadowedRuleDetection`, `utils/slowOperations`, `design-system/Pane`, `design-system/Tabs`, `SearchBox`, `ui/option`, `AddPermissionRules`, `AddWorkspaceDirectory`, `PermissionRuleDescription`, `PermissionRuleInput`, `RecentDenialsTab`, `RemoveWorkspaceDirectory`, `WorkspaceTab`

## Logic
1. Initializes state for rules, search, selected rule, and various sub-dialogs (adding, removing, validating)
2. Builds maps of allow/deny/ask rules keyed by JSON string for efficient lookup
3. Provides search functionality with "/" key activation and filtering
4. Manages tab navigation between recent denials, allow, ask, deny, and workspace tabs
5. Handles rule deletion with confirmation dialog and state updates
6. Routes to sub-components for adding rules, adding/removing workspace directories, and rule input
7. On exit, reports changes and handles retry of denied commands

## Exports
- `PermissionRuleList` - renders the full permissions management interface with tabs, search, rule editing, and workspace directory management
