# compact/sessionMemoryCompact

## Purpose
Implements session memory compaction for reducing context size while preserving key information.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: ids, message types, debug, envUtils, errors, messages, model, filesystem, sessionStart, sessionStorage, tokens, toolSearch, GrowthBook, analytics, SessionMemory prompts/utils, compact types/prompt

## Logic
1. `SessionMemoryCompactConfig` - configuration with minTokens, minTextBlockMessages, maxTokens
2. `DEFAULT_SM_COMPACT_CONFIG` - defaults: minTokens (10k), minTextBlockMessages (5), maxTokens (40k)
3. `setSessionMemoryCompactConfig` - updates configuration with partial override
4. `configInitialized` - tracks remote config initialization
5. `trySessionMemoryCompact` - main compaction function
6. Uses tokenCountFromLastAPIResponse for size estimation
7. `annotateBoundaryWithPreservedSegment` - marks compaction boundary
8. `buildPostCompactMessages` - constructs post-compaction message sequence
9. `createPlanAttachmentIfNeeded` - adds plan attachment for continuity
10. `getCompactUserSummaryMessage` - generates user-facing summary
11. Truncates session memory for compact via truncateSessionMemoryForCompact
12. Extracts discovered tool names for schema preservation
13. Logs compaction events for analytics

## Exports
- `SessionMemoryCompactConfig` - configuration type
- `DEFAULT_SM_COMPACT_CONFIG` - default configuration values
- `setSessionMemoryCompactConfig` - configuration setter
- `trySessionMemoryCompact` - main compaction function
