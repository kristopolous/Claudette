# useHistorySearch

## Purpose
Provides incremental history search with fuzzy matching, navigating through command history entries.

## Imports
- **Stdlib**: `useCallback`, `useEffect`, `useMemo`, `useRef`, `useState` from 'REACT'
- **External**: `feature` from 'BUILDFLAGS'
- **Internal**: `getModeFromInput`, `getValueFromInput`, `makeHistoryReader`, `KeyboardEvent`, `useInput`, `useKeybinding`, `useKeybindings`, `PromptInputMode`, `HistoryEntry`

## Logic
1. Uses async history reader (makeHistoryReader) to scan history in reverse
2. Maintains search state: query, match, original input/mode/cursor
3. Handles keybindings: history:search (ctrl+r), historySearch:next/accept/cancel/execute
4. Supports backspace on empty query to cancel search
5. Restores original input/mode on cancel
6. Filters out duplicate prompts from history

## Exports
- `useHistorySearch` - Hook returning historyQuery, historyMatch, handleKeyDown, and related functions
