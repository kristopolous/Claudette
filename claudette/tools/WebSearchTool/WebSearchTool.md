## Purpose
Tool for performing web searches using Claude's native web search capability, returning current information and sources.

## Imports
- **External**: `@anthropic-ai/sdk` (BetaContentBlock, BetaWebSearchTool20250305), `zod/v4`
- **Internal**: 
  - Model: `getAPIProvider`, `getMainLoopModel`, `getSmallFastModel`
  - Analytics: `getFeatureValue_CACHED_MAY_BE_STALE`
  - API: `queryModelWithStreaming`
  - Tool: `buildTool`, `ToolDef`
  - Utils: `lazySchema`, `logError`, `createUserMessage`, `jsonParse`, `jsonStringify`, `asSystemPrompt`
  - Local: `getWebSearchPrompt`, `WEB_SEARCH_TOOL_NAME`, `getToolUseSummary`, `renderToolResultMessage`, `renderToolUseMessage`, `renderToolUseProgressMessage`
  - Types: `WebSearchProgress` (re-exported)

## Logic
1. Creates BetaWebSearchTool20250305 schema with max_uses=8 and optional domain filters
2. Streams API calls via queryModelWithStreaming (optionally using Haiku model for fast searches)
3. Tracks progress: query updates and search results received
4. Parses streaming response: extracts server_tool_use blocks, web_search_tool_result blocks, and text commentary
5. Handles errors from web_search_tool_result blocks
6. Maps results to SearchResult objects with title/url
7. Builds output with query, results array, and duration
8. Formats tool result with reminder to include sources as markdown links

## Exports
- `WebSearchTool` - Main tool definition
- `SearchResult` - Type for individual search hit (title, url)
- `Output` - Type for output (query, results array, durationSeconds)
- `WebSearchProgress` - Progress type (re-exported)
- Helper: `makeToolSchema` (builds Beta tool schema)
- Helper: `makeOutputFromSearchResponse` (parses API response)
