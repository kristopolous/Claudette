## Purpose
Navigates command history with arrow keys, supporting mode filtering, batched disk reads, and draft preservation.

## Imports
- **External**: `react` (useCallback, useRef, useState)
- **Internal**:
  - `src/components/PromptInput/inputModes.js` (getModeFromInput)
  - `src/context/notifications.js` (useNotifications)
  - `../components/ConfigurableShortcutHint.js`
  - `../components/PromptInput/Notifications.js` (FOOTER_TEMPORARY_STATUS_TIMEOUT)
  - `../history.js` (getHistory)
  - `../ink.js` (Text)
  - `../types/textInputTypes.js` (PromptInputMode)
  - `../utils/config.js` (HistoryEntry, PastedContent)

## Logic
- **Shared batched loading**: Module-level state batches concurrent history loads into single disk read; loads in chunks (10 entries)
- **Mode filtering**: History can be filtered by mode (e.g., 'bash' vs 'prompt'); cache keyed by filter
- **State**: `historyIndex` (current position), `lastShownHistoryEntry` (draft to restore), `hasShownSearchHint`
- **Refs**: Keep sync across async boundaries (historyIndexRef, currentInputRef, pastedContentsRef, currentModeRef, etc.)
- **onHistoryUp**:
  - Increments index ref synchronously; saves draft on first press
  - Loads additional entries if needed (batched async)
  - Restores entry from cache; shows search hint after navigating 2+ entries
- **onHistoryDown**:
  - Decrements index; restores draft when reaching 0
  - Clears input or restores with saved mode when going back down
- **resetHistory**: Clears cache, resets indices, removes hint notification
- **dismissSearchHint**: Removes search hint notification

## Exports
- `useArrowKeyHistory` - Hook returning navigation API: `{ historyIndex, setHistoryIndex, onHistoryUp, onHistoryDown, resetHistory, dismissSearchHint }`
- `HistoryMode` - Alias for `PromptInputMode`
- `PastedContent` - Type for pasted content tracking
