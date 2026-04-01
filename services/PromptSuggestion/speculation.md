# PromptSuggestion/speculation

## Purpose
Implements speculative execution for prompt suggestions with overlay file system.

## Imports
- **Stdlib**: `crypto`, `fs`, `fs/promises`, `path`
- **External**: (none)
- **Internal**: bootstrap state, AppStateStore, BashTool, logs, message types, abortController, array utils, config, debug, errors, fileStateCache, forkedAgent, format, hooks, log, messageQueueManager, messages, filesystem, queryHelpers, sessionStorage, JSON utils, analytics, PromptSuggestion promptSuggestion

## Logic
1. `MAX_SPECULATION_TURNS` (20), `MAX_SPECULATION_MESSAGES` (100) - limits
2. `WRITE_TOOLS` - Edit, Write, NotebookEdit
3. `SAFE_READ_ONLY_TOOLS` - Read, Glob, Grep, ToolSearch, LSP, TaskGet, TaskList
4. `safeRemoveOverlay` - removes overlay directory with retry logic
5. `getOverlayPath` - generates overlay path from ID
6. Uses forked agent pattern for speculation execution
7. Creates child abort controller for cancellation
8. Merges file state caches for speculation context
9. Creates system/user messages for speculation turns
10. Handles interrupt messages for tool use
11. Logs speculation events for analytics
12. Integrates with prompt suggestion for generating suggestions

## Exports
- `MAX_SPECULATION_TURNS`, `MAX_SPECULATION_MESSAGES` - speculation limits
- `WRITE_TOOLS`, `SAFE_READ_ONLY_TOOLS` - tool sets
- `safeRemoveOverlay` - removes overlay directory
- `getOverlayPath` - gets overlay path from ID
- (Speculation execution functions)
