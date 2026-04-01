# WebSearchTool.ts

## Purpose
Implements a web search tool that allows Claude to search the web for current information. Provides up-to-date information for current events, recent data, and information beyond Claude's knowledge cutoff.

## Items

### inputSchema
**Purpose**: Defines the input schema for web search queries.
**Fields**:
- `query` (string, required): The search query to use (minimum 2 characters)
- `allowed_domains` (array of strings, optional): Only include search results from these domains
- `blocked_domains` (array of strings, optional): Never include search results from these domains

### outputSchema
**Purpose**: Defines the output schema for search results.
**Fields**:
- `query` (string): The search query that was executed
- `results` (array): Search results and/or text commentary from the model
- `durationSeconds` (number): Time taken to complete the search operation

### makeToolSchema
**Purpose**: Creates the tool schema for the API call.
**Logic**: Builds a `BetaWebSearchTool20250305` object with `allowed_domains`, `blocked_domains`, and hardcoded `max_uses` of 8 searches maximum.

### makeOutputFromSearchResponse
**Purpose**: Parses the raw API response into structured output.
**Logic**: Iterates through content blocks, accumulating text and extracting `web_search_tool_result` blocks. Maps results to `{ tool_use_id, content: [{ title, url }] }` format. Handles error cases where content is a `WebSearchToolResultError`.

### WebSearchTool
**Purpose**: Main tool definition that satisfies `ToolDef<InputSchema, Output, WebSearchProgress>`.
**Key Methods**:
- `isEnabled`: Returns true for firstParty, vertex (with Claude 4.0+ models), and foundry providers
- `validateInput`: Checks for missing query and validates that `allowed_domains` and `blocked_domains` are not both specified
- `checkPermissions`: Returns passthrough behavior with suggestion to add allow rules
- `call`: Main execution - streams API responses, tracks progress, handles tool_use_id mapping for queries
- `mapToolResultToToolResultBlockParam`: Formats output with "Sources:" section requirement, includes links as markdown hyperlinks

## Imports
- **External**: `@anthropic-ai/sdk/resources/beta/messages/messages.mjs` (BetaContentBlock, BetaWebSearchTool20250305), `zod/v4`
- **Internal**: `src/utils/model/providers.js`, `src/utils/permissions/PermissionResult.js`, `src/services/analytics/growthbook.js`, `src/services/api/claude.js`, `src/Tool.js`, `src/types/tools.js`

## Insights
- Uses `queryModelWithStreaming` to stream search results from the API
- Supports Haiku model for fast, thinking-disabled searches via feature flag `tengu_plum_vx3`
- Progress events track query updates and search results received
- Maximum 8 searches per tool use (hardcoded in `makeToolSchema`)
- Domain filtering allows restricting searches to specific sites or blocking certain domains
- Web search is only available in the US
- Model must include sources in response using markdown hyperlinks

## Exports
- `WebSearchTool` - main tool definition
- `SearchResult` - search result type
- `Output` - output schema type
- `WebSearchProgress` - progress event types (re-exported from centralized types)
