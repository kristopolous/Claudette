# compact/microCompact

## Purpose
Implements microcompact for clearing old tool results to reduce context size.

## Imports
- **Stdlib**: (none)
- **External**: `@anthropic-ai/sdk`, `bun:bundle`
- **Internal**: querySource, Tool, tool constants, message types, debug, model, shell utils, JSON utils, analytics, promptCacheBreakDetection, tokenEstimation, compactWarningState, timeBasedMCConfig

## Logic
1. `IMAGE_MAX_TOKEN_SIZE` (2k) - max tokens for image content
2. `COMPACTABLE_TOOLS` - set of tools eligible for microcompact (file read/write, shell, grep, glob, web fetch/search)
3. `TIME_BASED_MC_CLEARED_MESSAGE` - inline marker for cleared content (avoids sessionStorage cycle)
4. Cached microcompact state (ant-only, feature-gated)
5. `getCachedMCModule` - lazy-loads cachedMicrocompact.js for DCE
6. `ensureCachedMCState` - initializes/returns cached state
7. `pendingCacheEdits` - tracks pending edits for batch caching
8. Clears old tool results based on time-based config
9. Notifies cache deletion for break detection
10. Uses roughTokenCountEstimation for size estimation

## Exports
- `TIME_BASED_MC_CLEARED_MESSAGE` - cleared content marker
- `COMPACTABLE_TOOLS` - set of compactable tool names
- `IMAGE_MAX_TOKEN_SIZE` - image token limit constant
- (Microcompact implementation functions)
