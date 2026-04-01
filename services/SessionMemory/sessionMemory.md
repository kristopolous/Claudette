# SessionMemory/sessionMemory

## Purpose
Implements automatic session memory maintenance via background forked subagent.

## Imports
- **Stdlib**: `fs/promises`
- **External**: `lodash-es/memoize`
- **Internal**: bootstrap state, prompts, context, hooks, Tool, FileEditTool, FileReadTool, message types, array utils, forkedAgent, fsOperations, hooks postSampling, messages, filesystem, sequential, systemPromptType, tokens, analytics, compact autoCompact, SessionMemory prompts/utils

## Logic
1. Automatically maintains markdown notes about current conversation
2. Runs periodically in background using forked subagent
3. `isSessionMemoryGateEnabled` - cached gate check (non-blocking)
4. Uses same token counting as autocompact for consistency
5. `getSessionMemoryConfig` - gets configuration from GrowthBook
6. Thresholds: minimumMessageTokensToInit, minimumTokensBetweenUpdate, toolCallsBetweenUpdates
7. `hasMetInitializationThreshold` - checks if ready to initialize
8. `hasMetUpdateThreshold` - checks if ready for update
9. `isSessionMemoryInitialized` - checks initialization state
10. `markExtractionStarted/Completed` - tracks extraction state
11. `recordExtractionTokenCount` - tracks token usage
12. `setLastSummarizedMessageId` - tracks last summarized message
13. Uses FileReadTool + FileEditTool for memory file updates
14. Logs events for analytics

## Exports
- `isSessionMemoryGateEnabled` - checks feature gate
- `getSessionMemoryConfig` - gets session memory config
- (Session memory extraction and management functions)
