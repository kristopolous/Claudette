# SessionMemory/sessionMemoryUtils

## Purpose
Provides session memory utility functions without circular dependencies.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: errors, fsOperations, permissions filesystem, sleep, analytics

## Logic
1. `EXTRACTION_WAIT_TIMEOUT_MS` (15s), `EXTRACTION_STALE_THRESHOLD_MS` (1min)
2. `SessionMemoryConfig` - configuration type with thresholds
3. `DEFAULT_SESSION_MEMORY_CONFIG` - defaults: 10k tokens to init, 5k between updates, 3 tool calls
4. `sessionMemoryConfig` - current configuration
5. `lastSummarizedMessageId` - tracks last summarized message
6. `extractionStartedAt` - tracks extraction start timestamp
7. `tokensAtLastExtraction` - context size at last extraction
8. `sessionMemoryInitialized` - tracks initialization state
9. `getLastSummarizedMessageId` - gets last summarized message ID
10. `setLastSummarizedMessageId` - sets last summarized message ID
11. `markExtractionStarted` - marks extraction start with timestamp
12. `markExtractionCompleted` - marks extraction completion
13. `hasMetInitializationThreshold` - checks if initialization threshold met
14. `hasMetUpdateThreshold` - checks if update threshold met
15. `getToolCallsBetweenUpdates` - gets tool call threshold

## Exports
- `SessionMemoryConfig` - configuration type
- `DEFAULT_SESSION_MEMORY_CONFIG` - default configuration
- `getLastSummarizedMessageId` - gets last summarized message ID
- `setLastSummarizedMessageId` - sets last summarized message ID
- `markExtractionStarted` - marks extraction start
- `markExtractionCompleted` - marks extraction completion
- (Additional threshold and state management functions)
