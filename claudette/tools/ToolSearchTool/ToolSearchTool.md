## Purpose
Tool for searching deferred tools (lazy-loaded tools) by name or description, with support for direct selection via `select:` prefix. Helps models discover and enable tools on demand.

## Imports
- **External**: `@anthropic-ai/sdk`, `lodash-es/memoize`, `zod/v4`
- **Internal**: 
  - Analytics: `logEvent`, type
  - Tool: `buildTool`, `findToolByName`, `Tool`, `ToolDef`, `Tools`
  - Utils: `logForDebugging`, `lazySchema`, `escapeRegExp`, `isToolSearchEnabledOptimistic`
  - Local: `getPrompt`, `isDeferredTool`, `TOOL_SEARCH_TOOL_NAME`

## Logic
1. Enabled via isToolSearchEnabledOptimistic (feature flag / settings)
2. Accepts query (string) and max_results (default 5)
3. Works on deferredTools (lazy-loaded) subset; also searches full tools for exact matches
4. Two query modes:
   - `select:<tool_name>`: direct selection (comma-separated multi-select). Returns matches as tool_reference blocks.
   - keyword search: splits terms, supports required (+term) and optional; scores by name parts, searchHint, description
5. Parsing tool names: MCP tools (mcp__server__action) split on __ and _; regular tools split CamelCase and underscores
6. getToolDescriptionMemoized fetches tool prompts for scoring (includes permission context)
7. maybeInvalidateCache clears description memoization when deferredTools set changes
8. Scoring weights: MCP server exact part (12), regular exact part (10), MCP substring (6), regular substring (5), full name (3), searchHint (4), description (2)
9. Sorts by score, applies max_results
10. When no matches, includes pending MCP servers info if any
11. Logs analytics with query type, match count, etc.
12. Returns matches array, query, total_deferred_tools, pending_mcp_servers?

## Exports
- `ToolSearchTool` - Main tool definition
- `Input` - Type (query, max_results?)
- `Output` - Type (matches[], query, total_deferred_tools, pending_mcp_servers?)
- `clearToolSearchDescriptionCache` - Clears memoization cache
- Helper: `getDeferredToolsCacheKey`
- Helper: `parseToolName`
- Helper: `compileTermPatterns`
- Helper: `searchToolsWithKeywords`
- Helper: `buildSearchResult`
