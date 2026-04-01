# Plan Command (`plan`)

## Purpose
Enables plan mode (where a predefined plan guides the session) or displays the current session plan. Supports opening the plan file in an editor for modification.

## Imports
### Stdlib
- `react`

### Internal
- `handlePlanModeTransition` from `../../bootstrap/state.js`
- `LocalJSXCommandContext` type from `../../commands.js`
- `Box`, `Text` from `../../ink.js`
- `LocalJSXCommandOnDone` type from `../../types/command.js`
- `getExternalEditor` from `../../utils/editor.js`
- `toIDEDisplayName` from `../../utils/ide.js`
- `applyPermissionUpdate` from `../../utils/permissions/PermissionUpdate.js`
- `prepareContextForPlanMode` from `../../utils/permissions/permissionSetup.js`
- `getPlan`, `getPlanFilePath` from `../../utils/plans.js`
- `editFileInEditor` from `../../utils/promptEditor.js`
- `renderToString` from `../../utils/staticRender.js`

## Logic
The `call` async function receives `context` and `args`. It dispatches based on current mode:

**If not in plan mode:**
1. Calls `handlePlanModeTransition(currentMode, 'plan')`.
2. Updates app state's `toolPermissionContext` using `applyPermissionUpdate` and `prepareContextForPlanMode` to switch to plan mode with destination 'session'.
3. If `args` has content (and not just 'open'), calls `onDone('Enabled plan mode', { shouldQuery: true })`; otherwise `onDone('Enabled plan mode')`.
4. Returns `null`.

**If already in plan mode:**
1. Retrieves current `planContent` and `planPath` via `getPlan()` and `getPlanFilePath()`.
2. If no plan content: `onDone('Already in plan mode. No plan written yet.')`, return `null`.
3. If `args` starts with 'open': opens `planPath` in editor via `editFileInEditor()`, reports result, returns `null`.
4. Otherwise, determines external editor name (if any) via `getExternalEditor()` and `toIDEDisplayName()`.
5. Renders `<PlanDisplay>` component with plan content, path, and editor name.
6. Converts the React element to string via `renderToString()` and passes to `onDone`.
7. Returns `null`.

`PlanDisplay` component (memoized):
- Shows "Current Plan" (bold), the plan file path (dimmed), the plan content, and if an external editor is configured, a hint mentioning "/plan open" and the editor name.

## Exports
- `call` (async function) - Main command handler
- `PlanDisplay` (React component) - Displays the current plan and metadata