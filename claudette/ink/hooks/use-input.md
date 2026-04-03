## Purpose
Handles user keyboard input with convenient character and key event handling.

## Imports
- **Stdlib**: none
- **External**: REACT (useEffect, useLayoutEffect), `usehooks-ts` (useEventCallback)
- **Internal**: `events/input-event`, `hooks/use-stdin`

## Logic
Enables raw mode via useLayoutEffect during React's commit phase to avoid keystroke echo and cursor visibility delays. Registers a stable event listener on the stdin event emitter using useEventCallback to maintain reference stability while reading latest handler and isActive values from closure. Filters Ctrl+C handling based on the internal_exitOnCtrlC flag. Supports an isActive option to enable/disable capturing for avoiding duplicate input handling across multiple hooks.

## Exports
- `useInput` - registers a handler called for each character or pasted text input, with key metadata
