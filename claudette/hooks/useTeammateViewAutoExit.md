# useTeammateViewAutoExit

## Purpose
Automatically exits teammate viewing mode when the viewed teammate task is killed, fails, or encounters an error.

## Imports
- **Stdlib**: `useEffect` from 'REACT'
- **External**: None
- **Internal**: `useAppState`, `useSetAppState`, `exitTeammateView`, `isInProcessTeammateTask`

## Logic
1. Monitors the task being viewed via AppState
2. Exits if task is killed, failed, has error, or is no longer running/pending/completed
3. Local agent tasks do not trigger exit (only teammate tasks)
4. Uses selective state subscriptions to avoid unnecessary re-renders

## Exports
- `useTeammateViewAutoExit` - Hook that auto-exits teammate view
