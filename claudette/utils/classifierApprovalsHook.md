# utils/classifierApprovalsHook

## Purpose
Provides UI hook for classifierApprovals store without pulling React into print.ts.

## Imports
- **Stdlib**: (none)
- **External**: REACT
- **Internal**: classifierApprovals

## Logic
1. Split from classifierApprovals for pure-state importers
2. Importers: permissions, toolExecution, postCompactCleanup
3. Prevents React from being pulled into print module graph
4. `useIsClassifierChecking` - hook using useSyncExternalStore
5. Subscribes to classifier checking state changes
6. Calls isClassifierChecking(toolUseID) for current state
7. Re-renders when classifier checking state changes
8. Enables UI to show classifier checking status for tool uses

## Exports
- `useIsClassifierChecking` - hook for classifier checking state
