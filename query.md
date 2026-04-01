# query.ts

## Purpose
The core query loop - sends messages to LLM API, processes streaming responses, executes tools, and manages conversation turns.

## Items

### query() AsyncGenerator Function
**Purpose**: Main entry point - takes messages, returns streaming events.

**Signature**:
```typescript
async function* query(params: QueryParams): AsyncGenerator<StreamEvent | Message | TombstoneMessage>
```

**Logic** (the main loop):
```
1. Build system prompt from parts (user context + system context + memories)
2. FOR each turn (maxTurns limit):
   a. Yield stream_request_start event
   b. Call API with messages (streaming response)
   c. For each streaming event:
      - Yield token (for immediate display)
      - If tool_use block: execute tool, add result to messages, continue
      - If error: handle (retry if recoverable)
   d. If final assistant message without tools: break
3. Return terminal state
```

### queryLoop() Internal Generator
**Purpose**: The actual loop implementation with all the state management.

**State carried across turns**:
- `messages[]` - conversation history (grows each turn)
- `toolUseContext` - tool registry and execution context
- `autoCompactTracking` - context window management
- `pendingToolUseSummary` - summarization of tool calls
- `turnCount` - for maxTurns enforcement

### Tool Execution Flow
```
1. Model outputs tool_use block with {name, input_json}
2. Check permissions (dangerous tools need user approval)
3. Lookup tool in registry by name
4. Execute tool with input (may spawn subprocess, read files, etc.)
5. Capture result
6. Yield tool_result message
7. Append to messages, continue loop
```

### Context Management
- **System prompt construction**: Build from parts (prompts.ts constants)
- **Auto-compact**: When nearing token limit, summarize old messages
- **Snip**: HISTORY_SNIP feature truncates middle of conversation
- **Memory prefetch**: Load relevant memories async while model is thinking

### Error Handling
- **Rate limits**: Retry with exponential backoff
- **Max output tokens**: Recovery loop tries to continue
- **Permission denials**: Track denials, potentially halt
- **API errors**: Classify as retryable or fatal

## Imports
- **External**: `@anthropic-ai/sdk`
- **Internal**: `createMessage` (services/api/claude), `Tools` registry, `createUserMessage`, `createAssistantMessage`, `accumulateUsage`

## Insights
- **AsyncGenerator pattern**: Yields events as they happen (streaming)
- **Turn-based loop**: Each user message can result in multiple API calls (tool use cycles)
- **Message mutation**: messages array grows each turn - careful token counting needed
- **Feature flags**: `TOKEN_BUDGET`, `REACTIVE_COMPACT`, `CONTEXT_COLLAPSE` gates
- **Tool use as loop**: tool_use → execute → result → model sees result → another tool_use

## Exports
- `query` - the main async generator function
- `QueryParams` - type for query configuration
- `QuerySource` - enum/category for how query was triggered (repl, sdk, agent, etc.)