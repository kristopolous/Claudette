## Purpose
For coordinator workers, runs automated permission checks (hooks then classifier) sequentially and returns a decision if resolved; otherwise returns null to fall through to the interactive dialog.

## Imports
- **Stdlib**: None
- **External**: BUILDFLAGS (`feature`)
- **Internal**:
  - `types/permissions` - `PendingClassifierCheck` type
  - `utils/log` - `logError`
  - `utils/permissions/PermissionResult` - `PermissionDecision`
  - `utils/permissions/PermissionUpdateSchema` - `PermissionUpdate`
  - `hooks/toolPermission/PermissionContext` - `PermissionContext`

## Logic
- `handleCoordinatorPermission(params)` where params include `ctx`, `pendingClassifierCheck`, `updatedInput`, `suggestions`, `permissionMode`.
- Step 1: Call `ctx.runHooks(permissionMode, suggestions, updatedInput)`. If a decision is returned (allow/deny), return it immediately.
- Step 2: If feature `BASH_CLASSIFIER` is on, call `ctx.tryClassifier(pendingClassifierCheck, updatedInput)`. If it returns a decision, return it.
- Errors during these checks are logged (`logError`), with a generic prefix for non-Error throws. Errors do not crash; the function falls through to return `null`.
- Return `null` if no automated path produced a decision, indicating the caller should present the interactive permission dialog.

## Exports
- `handleCoordinatorPermission` - function
- `CoordinatorPermissionParams` - type
