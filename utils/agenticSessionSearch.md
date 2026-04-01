# utils/agenticSessionSearch

## Purpose
Provides agentic search across session transcripts using AI model.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: logs types, array, debug, log, model model, sessionStorage, sideQuery, JSON utils

## Logic
1. `MAX_TRANSCRIPT_CHARS` (2000) - max chars per session
2. `MAX_MESSAGES_TO_SCAN` (100) - max messages to scan
3. `MAX_SESSIONS_TO_SEARCH` (100) - max sessions to API
4. `SESSION_SEARCH_SYSTEM_PROMPT` - system prompt for session search
5. Prioritizes: exact tag matches, partial tag matches, title, branch, summary, transcript
6. Be inclusive - better too many results than too few
7. `AgenticSearchResult` - { relevant_indices: number[] }
8. `extractMessageText` - extracts text from serialized message
9. Handles string content and content block arrays
10. Filters non-text blocks, joins with spaces
11. `searchSessions` - searches sessions with query
12. Loads lite logs, extracts searchable content
13. Uses sideQuery with small fast model
14. Returns relevant session indices ordered by relevance

## Exports
- `AgenticSearchResult` - search result type
- `extractMessageText` - extracts message text
- `searchSessions` - searches sessions agentially
