# sessionHistory

## Purpose
Provides pagination utilities for fetching session event history from an inference provider's API.

## Imports
- **Stdlib**: (none)
- **External**: `axios`
- **Internal**: `getOauthConfig`, `SDKMessage`, `logForDebugging`, `getOAuthHeaders`, `prepareApiRequest`

## Logic
1. Defines `HistoryPage` type for paginated session events with cursors
2. `createHistoryAuthCtx` - prepares auth headers and base URL once for reuse across pages
3. `fetchPage` - generic paginator that handles HTTP requests with error handling
4. `fetchLatestEvents` - fetches newest events using `anchor_to_latest=true`
5. `fetchOlderEvents` - fetches older events using `before_id` cursor for backward pagination

## Exports
- `HISTORY_PAGE_SIZE` - default page size constant (100)
- `HistoryPage` - type for paginated event results
- `HistoryAuthCtx` - type for auth context
- `createHistoryAuthCtx` - creates authenticated context for session history requests
- `fetchLatestEvents` - fetches the most recent page of events
- `fetchOlderEvents` - fetches the previous page of events using cursor
