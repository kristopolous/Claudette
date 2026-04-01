# extractMemories/extractMemories

## Purpose
Extracts durable memories from session transcript and writes them to auto-memory directory using forked agent pattern.

## Imports
- **Stdlib**: `path`
- **External**: `bun:bundle`
- **Internal**: bootstrap state, hooks, memdir, memoryScan, paths, Tool, tool constants, message types, abortController, array utils, debug, forkedAgent, messages, GrowthBook, analytics, extractMemories prompts

## Logic
1. Runs once at end of each complete query loop (no tool calls) via handleStopHooks
2. Uses forked agent pattern (runForkedAgent) - perfect fork sharing parent's prompt cache
3. State closure-scoped inside initExtractMemories (tests call in beforeEach for fresh closure)
4. `isModelVisibleMessage` - filters to user/assistant messages only (excludes progress/system/attachment)
5. Checks isAutoMemoryEnabled before running
6. Supports TEAMMEM feature for team memory (conditional require)
7. Uses canUseTool callback for permission context
8. Counts model-visible messages for extraction scope
9. Builds extract prompt (auto-only or combined with team memory)
10. Runs forked agent with cache-safe params
11. Creates memory-saved message after successful extraction
12. Logs extraction events for analytics with sanitized tool names

## Exports
- `initExtractMemories` - initializes extraction with closure-scoped state
- `extractMemories` - runs memory extraction for session
- `isModelVisibleMessage` - checks if message visible to model
