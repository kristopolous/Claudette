# useSearchInput

## Purpose
Text input handler for search-like interfaces (ctrl+r history, grep, etc.) with vim-style editing keys and cursor navigation.

## Imports
- **Stdlib**: `useCallback`, `useState` from 'react'
- **External**: None
- **Internal**: `KeyboardEvent`, `useInput`, `Cursor`, `getLastKill`, `pushToKillRing`, `recordYank`, `resetKillAccumulation`, `resetYankState`, `updateYankLength`, `yankPop`, `useTerminalSize`

## Logic
1. Manages query string and cursor offset state
2. Handles vim-style text editing: backspace, delete, word operations
3. Supports Ctrl+A/E/B/F/H/K/U/W/Y for cursor and kill ring
4. Supports Meta+B/F for word navigation, Meta+D/Y for word delete/yank-pop
5. Arrow keys for cursor movement
6. Return/down to exit, up to go to previous item
7. Esc to cancel (with optional two-press pattern)
8. Backspace on empty to cancel (when backspaceExitsOnEmpty)

## Exports
- `useSearchInput` - Hook returning query, setQuery, cursorOffset, handleKeyDown
