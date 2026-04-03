## Purpose
Manages the display timing of the fast mode hint shown next to the fast icon, showing it once per session for 5 seconds.

## Imports
- **Stdlib**: none
- **External**: REACT
- **Internal**: none

## Logic
1. Uses a module-level flag to track whether the hint has been shown this session
2. When the fast icon is visible and the hint has not yet been shown, sets the flag and displays the hint
3. Starts a 5-second timer to hide the hint
4. Cleans up the timer on unmount or dependency change
5. Returns a boolean indicating whether the hint should currently be visible

## Exports
- `useShowFastIconHint` - hook that returns true for 5 seconds once per session when the fast icon is visible
