# slackChannelSuggestions

## Purpose
Fetches Slack channel names via an MCP server tool call and provides them as autocomplete suggestions in the prompt input. Caches results with prefix-matching to minimize MCP calls while typing.

## Imports
- **External**: zod
- **Internal**: ../../components/PromptInput/PromptInputFooterSuggestions.js, ../../services/mcp/types.js, ../debug.js, ../lazySchema.js, ../signal.js, ../slowOperations.js

## Logic
1. Finds a connected MCP client whose name includes "slack" via `findSlackClient`
2. Calls the `slack_search_channels` MCP tool with the query (limit 20, public + private channels)
3. Parses the response: unwraps a JSON envelope (`{"results": "..."}`) if present, then extracts channel names from `Name: #channel` lines
4. Cache is a plain `Map<string, string[]>` keyed by the MCP query string. `findReusableCacheEntry` finds the longest cached prefix key that still matches the current search token
5. Inflight deduplication: if the same query is already in-flight, awaiters share the same promise
6. `knownChannels` set tracks every channel ever returned; `findSlackChannelPositions` uses it to highlight confirmed-real channels in the prompt text
7. MCP query optimization: `mcpQueryFor` strips trailing partial segments (split on `-`/`_`) so Slack's whole-word search doesn't return 0 results
8. Cache evicts oldest entry when size exceeds 50

## Exports
- `subscribeKnownChannels` - signal subscriber for when the known channels set changes
- `hasSlackMcpServer(clients)` - returns true if a connected Slack MCP client exists
- `getKnownChannelsVersion()` - returns the current version number of the known channels set (increments on change)
- `findSlackChannelPositions(text)` - returns start/end positions of all `#channel` mentions in text that match known channels
- `getSlackChannelSuggestions(clients, searchToken)` - async; returns up to 10 `SuggestionItem` objects for channels matching the search token prefix
- `clearSlackChannelCache()` - clears all caches, known channels, and inflight state

## Source
`slackChannelSuggestions`
