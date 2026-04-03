# services/extractMemories/extractMemories

## Purpose
Extracts durable memories from session transcript and writes to auto-memory directory.

## Imports
- **Stdlib**: `path`
- **External**: BUILDFLAGS
- **Internal**: bootstrap state, hooks, memdir, memoryScan/paths, Tool, BashTool, FileEditTool, FileReadTool, FileWriteTool, GlobTool, GrepTool, REPLTool, message types, abortController, array utils, debug, forkedAgent, hooks postSampling, messages, growthbook, analytics metadata, extractMemories prompts

## Logic
1. Runs once at end of each complete query loop (final response, no tool calls)
2. Uses forked agent pattern - perfect fork sharing parent's prompt cache
3. State closure-scoped inside initExtractMemories (fresh closure per test)
4. `isModelVisibleMessage` - checks if message visible to model (user/assistant only)
5. Excludes progress, system, attachment messages
6. Uses ENTRYPOINT_NAME for memory manifest
7. Formats memory manifest, scans memory files
8. Checks isAutoMemoryEnabled, isAutoMemPath
9. Uses BASH_TOOL_NAME, FILE_EDIT_TOOL_NAME, FILE_READ_TOOL_NAME, etc.
10. Creates abort controller for cancellation
11. Creates cache-safe params for forked agent
12. Creates memory-saved message after extraction
13. Logs events for analytics with sanitized tool names
14. TEAMMEM feature-gated team memory support

## Exports
- `isModelVisibleMessage` - checks if message visible to model
- `initExtractMemories` - initializes memory extraction
- `extractMemories` - extracts memories from session
