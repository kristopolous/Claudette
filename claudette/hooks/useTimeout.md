## Purpose
Returns a boolean indicating whether a specified delay has elapsed, with an optional reset trigger to restart the timer.

## Imports
- **Stdlib**: None
- **External**: REACT (`useEffect`, `useState`)
- **Internal**: None

## Logic
- State `isElapsed` starts `false`; effect resets it to `false` whenever `delay` or `resetTrigger` changes.
- Starts a `setTimeout` that sets `isElapsed` to `true` after `delay` ms.
- Cleanup clears the timeout on unmount or when deps change.
- Returns current `isElapsed`.

## Exports
- `useTimeout` - hook `(delay: number, resetTrigger?: number) => boolean`
