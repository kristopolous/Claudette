# compact/compactWarningHook

## Purpose
Provides React hook for subscribing to compact warning suppression state.

## Imports
- **Stdlib**: (none)
- **External**: `react` (useSyncExternalStore)
- **Internal**: compactWarningState

## Logic
1. `useCompactWarningSuppression` - React hook subscribing to compact warning store
2. Uses useSyncExternalStore pattern for reactive state
3. Lives in separate file to keep compactWarningState.ts React-free
4. microCompact.ts imports pure state functions without pulling React into print-mode startup path
5. Returns boolean indicating if warning should be suppressed

## Exports
- `useCompactWarningSuppression` - hook returning suppression state
