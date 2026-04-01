## Purpose
Checks whether the terminal currently has focus.

## Imports
- **Stdlib**: none
- **External**: `react` (useContext)
- **Internal**: `components/TerminalFocusContext`

## Logic
Reads the `isTerminalFocused` value from TerminalFocusContext, which is populated by DECSET 1004 focus reporting. The terminal sends escape sequences on focus gain/loss, handled automatically by Claudette and filtered from useInput.

## Exports
- `useTerminalFocus` - returns true if the terminal is focused or focus state is unknown
