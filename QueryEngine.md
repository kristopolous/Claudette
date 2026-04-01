# QueryEngine.ts

## Purpose
Orchestrates the query lifecycle and session state for a conversation. Owns the conversation state (messages, usage, permissions) and delegates to the query() loop for actual API calls.

## Items

### QueryEngine Class
**Purpose**: Per-conversation state manager.

**Constructor**:
```typescript
constructor(config: QueryEngineConfig)
```

**Key State**:
- `mutableMessages: Message[]` - conversation history across turns
- `readFileState: FileStateCache` - cache of file contents
- `permissionDenials: SDKPermissionDenial[]` - track denied permissions
- `totalUsage: NonNullableUsage` - cumulative API usage
- `discoveredSkillNames: Set<string>` - skills found during conversation
- `loadedNestedMemoryPaths: Set<string>` - memory paths loaded

**Key Methods**:
- `submitMessage()` - Main entry point, calls query() generator
- `getMessages()` - Return current message history
- `getUsage()` - Return cumulative usage stats

### QueryEngineConfig
**Purpose**: Configuration object for QueryEngine.

**Fields**:
- `cwd` - working directory
- `tools` - tool registry
- `commands` - slash commands
- `mcpClients` - MCP server connections
- `agents` - agent definitions
- `canUseTool` - permission check function
- `getAppState`/`setAppState` - React state access
- `userSpecifiedModel`/`fallbackModel` - model selection
- `thinkingConfig` - thinking mode settings
- `maxTurns` - turn limit
- `snipReplay` - history truncation callback
- `handleElicitation` - URL elicitation handler

### submitMessage() Method
**Purpose**: Process a user message and return streaming events.

**Logic**:
1. Add user message to `mutableMessages`
2. Create `ToolUseContext` with tools, permissions, callbacks
3. Call `query()` generator with all context
4. Stream events back to caller (REPL or SDK)
5. Update `mutableMessages` with assistant responses
6. Track usage and permissions denials

### Snip Replay Feature
**Purpose**: Handle history truncation for long headless sessions.

When HISTORY_SNIP feature is enabled:
- QueryEngine truncates message history to bound memory
- `snipReplay` callback provides summarized version of truncated chunk
- Only used in headless/SDK mode (REPL keeps full history for UI)

## Imports
- **External**: `lodash-es`, `@anthropic-ai/sdk`, `strip-ansi`
- **Internal**: `query` (query.ts), `Tools` (Tool.ts), `accumulateUsage` (services/api/claude), `loadMemoryPrompt` (memdir)

## Insights
- **One QueryEngine per conversation**: Singleton pattern for conversation
- **State persistence**: Messages, usage, and permissions persist across turns
- **Tool use context**: Passed to every tool execution for permission checking
- **Lazy initialization**: Some configs (like snip module) loaded conditionally via feature flags
- **SDK vs REPL**: QueryEngine is used by both - REPL streams to UI, SDK returns structured responses

## Exports
- `QueryEngine` - the class
- `QueryEngineConfig` - config type