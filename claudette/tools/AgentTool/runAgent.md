# tools/AgentTool/runAgent

## Purpose
Implements core agent execution with query loop and tool orchestration.

## Imports
- **Stdlib**: `crypto`
- **External**: `bun:bundle`, `lodash-es/uniqBy`
- **Internal**: debug, bootstrap state, commands, prompts, querySource, context, hooks, query, growthbook, API dumpPrompts/promptCacheBreakDetection, MCP client/config/types, Tool, LocalShellTask killShellTasks, command/ids/message types, attachments, errors, file, fileStateCache, forkedAgent, hooks registerFrontmatter/sessionHooks, messages, model agent/aliases, sessionStorage, settings pluginOnlyPolicy, systemPromptType, perfettoTracing, toolResultStorage

## Logic
1. Creates file state cache with size limit (READ_FILE_STATE_CACHE_SIZE)
2. Clones file state cache for agent isolation
3. Creates subagent context with cache-safe params
4. Registers frontmatter hooks from agent definition
5. Executes subagent start hooks
6. Assembles tool pool with MCP tools
7. Fetches MCP tools for client if servers configured
8. Connects to MCP servers
9. Runs query loop with agent-specific system prompt
10. Handles stream events: request_start, tool_use, progress, compact boundary, tombstone
11. Records sidechain transcript for agent
12. Writes agent metadata (model, tokens, timing)
13. Cleans up agent tracking on completion
14. Kills shell tasks for agent on exit (prevents orphans)
15. Handles Perfetto tracing registration
16. Supports coordinator mode with special handling

## Exports
- `runAgent` - core agent execution function
- `filterIncompleteToolCalls` - filters incomplete tool calls from messages
