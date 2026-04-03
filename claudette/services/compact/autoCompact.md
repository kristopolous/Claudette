# compact/autoCompact

## Purpose
Implements automatic conversation compaction when context approaches model limits.

## Imports
- **Stdlib**: `process`
- **External**: BUILDFLAGS
- **Internal**: bootstrap state, querySource, Tool, message types, config, context, debug, envUtils, errors, forkedAgent, log, tokens, GrowthBook, API claude/promptCacheBreakDetection, SessionMemory, compact types

## Logic
1. `MAX_OUTPUT_TOKENS_FOR_SUMMARY` (20k) - reserves tokens for compaction summary (p99.99 = 17,387)
2. `getEffectiveContextWindowSize` - context window minus reserved output tokens
3. Respects CLAUDE_CODE_AUTO_COMPACT_WINDOW env override
4. `AutoCompactTrackingState` - tracks compacted flag, turn counter, turnId, consecutiveFailures
5. Buffer constants: AUTOCOMPACT (13k), WARNING (20k), ERROR (20k), MANUAL_COMPACT (3k)
6. `MAX_CONSECUTIVE_AUTOCOMPACT_FAILURES` (3) - circuit breaker (BQ: up to 3,272 failures observed)
7. `getAutoCompactThreshold` - effective context window minus buffer
8. Respects CLAUDE_AUTOCOMPACT_PCT_OVERRIDE env for testing
9. `shouldAutoCompact` - checks if compaction needed based on token count
10. `runAutoCompact` - executes compaction with failure tracking
11. Handles user abort, prompt_too_long errors
12. Marks post-compaction state, notifies break detection
13. Runs post-compact cleanup

## Exports
- `AutoCompactTrackingState` - tracking state type
- `getEffectiveContextWindowSize` - calculates effective context window
- `getAutoCompactThreshold` - gets auto-compact threshold
- `shouldAutoCompact` - checks if compaction needed
- `runAutoCompact` - executes auto-compaction
- Constants: AUTOCOMPACT_BUFFER_TOKENS, WARNING_THRESHOLD_BUFFER_TOKENS, etc.
