## Purpose
Renders a permission request dialog for entering plan mode, explaining what plan mode does and offering yes/no options.

## Imports
- **Stdlib**: none
- **External**: REACT, REACT/compiler-runtime
- **Internal**: bootstrap/state, ink, services/analytics/index, state/AppState, utils/planModeV2, CustomSelect/index, permissions/PermissionDialog, permissions/PermissionRequest

## Logic
1. Get the current tool permission context mode from app state
2. Build options for entering plan mode or declining to start implementing immediately
3. On yes, log the plan enter event, transition to plan mode via handlePlanModeTransition, and call onAllow with a setMode permission update
4. On no, call onDone, onReject, and toolUseConfirm.onReject to stay in the current mode
5. Render the PermissionDialog with an explanation of what plan mode will do, including exploring the codebase, identifying patterns, designing an implementation strategy, and presenting a plan for approval

## Exports
- `EnterPlanModePermissionRequest` - component that handles the permission request to enter plan mode with explanation of plan mode behavior
