# services/api/claude.ts

## Purpose
Core API client for sending messages to Claude API, handling streaming responses, usage tracking, and prompt caching.

## Imports
- **External**: `@anthropic-ai/sdk`, `@anthropic-ai/sdk/resources`, `@anthropic-ai/sdk/streaming`
- **Internal**: Various utility functions from `../../utils/*`, `../analytics`, `../compact`, `../mcp`

## Main API Functions

### queryModelWithoutStreaming(messages, systemPrompt, thinkingConfig, tools, signal, options)
Non-streaming API request that waits for complete response.

**Parameters:**
- `messages: Message[]` - Conversation history
- `systemPrompt: SystemPrompt` - System prompt
- `thinkingConfig: ThinkingConfig` - Thinking configuration
- `tools: Tools` - Available tools
- `signal: AbortSignal` - Abort signal
- `options: Options` - API options

**Returns:** `Promise<AssistantMessage>`

### queryModelWithStreaming(messages, systemPrompt, thinkingConfig, tools, signal, options)
Streaming API request that yields events as they arrive.

**Returns:** `AsyncGenerator<StreamEvent | AssistantMessage | SystemAPIErrorMessage>`

### queryModel(messages, systemPrompt, thinkingConfig, tools, signal, options)
Core implementation that handles tool search, betas, prompt caching, and response streaming.

### executeNonStreamingRequest(clientOptions, retryOptions, paramsFromContext, onAttempt, captureRequest, originatingRequestId)
Non-streaming fallback for when streaming fails.

**Returns:** `AsyncGenerator<SystemAPIErrorMessage, BetaMessage>`

## Options Type

```typescript
type Options = {
  model: string
  maxTokens: number
  temperature?: number
  fetchOverride?: typeof fetch
  source: string
  betaHeaders?: string[]
  extraBodyParams?: JsonObject
  getToolPermissionContext: () => Promise<ToolPermissionContext>
  tools: Tools
  agents: AgentDefinition[]
  querySource: QuerySource
  isNonInteractiveSession: boolean
  hasPendingMcpServers?: boolean
  advisorModel?: string
  addNotification?: (notif: Notification) => void
  taskBudget?: { total: number; remaining?: number }
}
```

## How Messages Are Sent to Claude API

### Message Preparation
1. `normalizeMessagesForAPI()` - Normalizes conversation messages to API format
2. `buildSystemPromptBlocks()` - Builds system prompt with tools and agents
3. `userMessageToMessageParam()` / `assistantMessageToMessageParam()` - Converts messages to API params

### Tool Handling
1. Tools are filtered based on ToolSearch enablement
2. Deferred tools are included with `defer_loading: true`
3. Tool schemas are converted via `toolToAPISchema()`
4. Cache markers are added via `addCacheBreakpoints()`

### Request Flow
1. Check off-switch (blocks on GrowthBook init)
2. Derive previous request ID from message history
3. Resolve model (handles Bedrock inference profiles)
4. Merge beta headers (tool search, advisor, etc.)
5. Check tool search availability
6. Filter tools based on deferred/non-deferred status
7. Add beta headers for cache control
8. Make streaming or non-streaming request
9. Yield events as they arrive
10. Handle errors with retry logic

## Usage Tracking

### updateUsage(usage, partUsage)
Updates usage statistics from streaming API events. Handles cumulative values properly.

**Returns:** `NonNullableUsage`

### accumulateUsage(totalUsage, messageUsage)
Accumulates usage across multiple assistant turns.

**Returns:** `NonNullableUsage`

### Usage Fields
- `input_tokens` - Tokens in prompt
- `cache_creation_input_tokens` - Tokens used creating cache
- `cache_read_input_tokens` - Tokens read from cache
- `output_tokens` - Tokens in response
- `server_tool_use` - Web search/fetch counts
- `cache_creation.ephemeral_1h_input_tokens` - Ephemeral cache tokens
- `cache_creation.ephemeral_5m_input_tokens` - Short-lived cache tokens
- `inference_geo` - Inference location
- `iterations` - Iterations count
- `speed` - Response speed

## Prompt Caching

### getPromptCachingEnabled(model)
Checks if prompt caching is enabled for the model.

### getCacheControl(...)
Determines cache control settings.

### addCacheBreakpoints(messages, enablePromptCaching, ...)
Adds cache breakpoints to messages for prompt caching.

## Error Handling

- `cleanupStream(stream)` - Aborts a stream safely
- `withRetry()` - Handles retries for 529 errors and transient failures
- `getNonstreamingFallbackTimeoutMs()` - Returns timeout for non-streaming fallback

## Other Exported Functions

- `getExtraBodyParams(betaHeaders?)` - Parse CLAUDE_CODE_EXTRA_BODY env var
- `verifyApiKey()` - Verify API key is valid
- `userMessageToMessageParam()` - Convert UserMessage to API format
- `assistantMessageToMessageParam()` - Convert AssistantMessage to API format
- `stripExcessMediaItems()` - Remove excess media from messages
- `buildSystemPromptBlocks()` - Build system prompt
- `queryHaiku()` - Query haiku model
- `queryWithModel()` - Query with specific model
- `adjustParamsForNonStreaming()` - Adjust params for non-streaming
- `getMaxOutputTokensForModel(model)` - Get max output tokens
