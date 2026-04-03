# compact/compactWarningHook

## Purpose
Provides UI hook for subscribing to compact warning suppression state.

## Imports
- **Stdlib**: (none)
- **External**: REACT (useSyncExternalStore)
- **Internal**: compactWarningState

## Logic
1. `useCompactWarningSuppression` - UI hook subscribing to compact warning store
2. Uses useSyncExternalStore pattern for reactive state
3. Lives in separate file to keep compactWarningState React-free
4. microCompact imports pure state functions without pulling React into print-mode startup path
5. Returns boolean indicating if warning should be suppressed

## Exports
- `useCompactWarningSuppression` - hook returning suppression state
