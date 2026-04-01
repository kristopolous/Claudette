## Purpose
Handles Shift+Up/Down keyboard navigation for teammate (swarm) selection and background task interactions.

## Imports
- **External**: `react` (useEffect, useRef)
- **Internal**:
  - `../ink/events/keyboard-event.js` (KeyboardEvent)
  - `../ink.js` (useInput)
  - `../state/AppState.js` (AppState type, useAppState, useSetAppState)
  - `../state/teammateViewHelpers.js` (enterTeammateView, exitTeammateView)
  - `../tasks/InProcessTeammateTask/InProcessTeammateTask.js` (getRunningTeammatesSorted, InProcessTeammateTask)
  - `../tasks/InProcessTeammateTask/types.js` (InProcessTeammateTaskState, isInProcessTeammateTask)
  - `../tasks/types.js` (isBackgroundTask)

## Logic
- Filters and sorts running teammates; also detects non-teammate background tasks
- `stepTeammateSelection(delta, setAppState)`: increments/decrements `selectedIPAgentIndex` with wrapping (-1 for leader, 0..n-1 for teammates, n for hide row); expands tree on first selection
- `useEffect` clamps selection when teammate count changes; resets when count drops to 0
- `handleKeyDown(e)` responds to:
  - `escape`: viewing mode → abort running teammate's current work; else exit view; selecting mode → exit selection
  - `shift+up/down`: step selection through teammates; if no teammates and non-teammate tasks exist, calls `onOpenBackgroundTasks`
  - `f`: enters teammate view for selected teammate
  - `return`: leader (-1) → exit view; teammate → view; hide row → collapse tree
  - `k`: kills selected running teammate
- Backward-compat bridge: uses `useInput` to adapt InputEvent to KeyboardEvent until REPL migration

## Exports
- `useBackgroundTaskNavigation` - Hook returning `{ handleKeyDown: (e: KeyboardEvent) => void }`
- Options: `{ onOpenBackgroundTasks?: () => void }`
