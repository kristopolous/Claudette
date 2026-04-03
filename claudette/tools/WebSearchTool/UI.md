## Purpose
UI components for rendering WebSearch tool usage and result messages.

## Imports
- **Stdlib**: REACT
- **External**: None
- **Internal**:
  - `MessageResponse` component
  - `TOOL_SUMMARY_MAX_LENGTH` constant
  - `Box`, `Text` from ink
  - `ProgressMessage` type
  - `WebSearchProgress` type (from WebSearchTool)
  - `Output`, `SearchResult` types from WebSearchTool
  - `truncate` utility

## Logic
Exports:
- `renderToolUseMessage(input, options)`: Shows query string in quotes; in verbose also shows allowed_domains and blocked_domains if present. Returns null if no query.
- `renderToolUseProgressMessage(progressMessages)`: Shows progress updates from last progress message:
  - `query_update`: "Searching: {query}" dim
  - `search_results_received`: "Found X results for "query"" dim
- `renderToolResultMessage(output)`: Displays summary: "Did X searches in Ys" or "Did X search in Ys" (pluralization). Uses `getSearchSummary` helper to count searches and total result content length.
- `getToolUseSummary(input)`: Returns truncated query for summary.
- `getSearchSummary(results)`: Internal helper computes searchCount (non-string results) and totalResultCount (sum of content lengths).

## Exports
- `renderToolUseMessage(input, options)`
- `renderToolUseProgressMessage(progressMessages)`
- `renderToolResultMessage(output)`
- `getToolUseSummary(input)`
