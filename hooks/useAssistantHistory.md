## Purpose
Lazy-loads remote assistant session history on scroll-up for viewer-only sessions.

## Imports
- **External**: `react` (randomUUID, useCallback, useEffect, useLayoutEffect, useRef)
- **Internal**:
  - `../assistant/sessionHistory.js` (createHistoryAuthCtx, fetchLatestEvents, fetchOlderEvents, HistoryAuthCtx, HistoryPage)
  - `../ink/components/ScrollBox.js` (ScrollBoxHandle type)
  - `../remote/RemoteSessionManager.js` (RemoteSessionConfig)
  - `../remote/sdkMessageAdapter.js` (convertSDKMessage)
  - `../types/message.js` (Message, SystemInformationalMessage)
  - `../utils/debug.js` (logForDebugging)

## Logic
- **Enabled only** when `config.viewerOnly === true` (assistant viewer mode)
- **On mount**: Creates auth context via `createHistoryAuthCtx`, fetches newest page with `fetchLatestEvents`, prepends messages
- **Pagination**: Cursor-based; `firstId` token used for next-older page via `fetchOlderEvents`
- **Scroll anchoring**: Captures scroll height before async prepend; after React commit, compensates scrollTop delta to keep viewport stable
- **Sentinels**: Uses stable UUID sentinel message to represent loading state, failed state, or "start of session"
- **Fill-viewport**: After initial load, auto-fetches additional pages (max 10) until content exceeds viewport height
- **Infinite scroll**: `maybeLoadOlder` triggers when scrolled within 40 rows of top; coalesces rapid scroll events
- **State management**: All mutable state in refs (cursorRef, ctxRef, inflightRef, anchorRef, fillBudgetRef, sentinelUuidRef) to avoid stale closures; messages updated via `setMessages`
- **prepend function**: Converts HistoryPage to Message[], updates cursor, optionally snapshots scroll height; replaces sentinel in-place

## Exports
- `useAssistantHistory` - Hook returning `{ maybeLoadOlder: (handle: ScrollBoxHandle) => void }`
- Internal types (not exported for external use): Props, Result, HistoryPage, etc.
