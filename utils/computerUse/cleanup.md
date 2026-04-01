# utils/computerUse/cleanup

## Purpose
Provides turn-end cleanup for computer use MCP surface (auto-unhide apps, release lock).

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: Tool, debug, errors, withResolvers, computerUseLock, escHotkey

## Logic
1. `UNHIDE_TIMEOUT_MS` (5s) - timeout for unhide operation
2. `cleanupComputerUseAfterTurn` - main cleanup function
3. Called from: natural turn end, abort during streaming, abort during tool execution
4. Dynamic import gated on feature('CHICAGO_MCP')
5. Gets hiddenDuringTurn set from appState
6. Imports unhideComputerUseApps from executor.js
7. Races unhide with timeout, clears timer on completion
8. Clears hiddenDuringTurn from appState
9. Zero-syscall pre-check: isLockHeldLocally before disk access
10. Unregisters ESC hotkey before lock release (idempotent)
11. Swallows unregister errors to prevent blocking lock release
12. Releases computer use lock via releaseComputerUseLock
13. No-ops cheaply on non-CU turns (both gate checks are zero-syscall)

## Exports
- `UNHIDE_TIMEOUT_MS` - unhide timeout constant
- `cleanupComputerUseAfterTurn` - cleans up after computer use turn
