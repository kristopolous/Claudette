## Purpose
Provides access to text selection operations on the Claudette instance in fullscreen mode.

## Imports
- **Stdlib**: none
- **External**: `react` (useContext, useMemo, useSyncExternalStore)
- **Internal**: `components/StdinContext`, `instances`, `selection`

## Logic
Looks up the Claudette instance via the instances map keyed by stdout. Memoizes an object of selection operations so callers can safely use it in dependency arrays. Returns no-op functions when fullscreen mode is disabled. A separate hook uses useSyncExternalStore for reactive selection-exists state that triggers re-renders.

## Exports
- `useSelection` - returns an object with selection operations: copySelection, copySelectionNoClear, clearSelection, hasSelection, getState, subscribe, shiftAnchor, shiftSelection, moveFocus, captureScrolledRows, setSelectionBgColor
- `useHasSelection` - reactive boolean that re-renders when a text selection is created or cleared
