# tools/AgentTool/agentToolUtils

## Purpose
Provides utility functions for agent tool execution and result handling.

## Imports
- **Stdlib**: (none)
- **External**: BUILDFLAGS, `zod/v4`
- **Internal**: bootstrap state, constants tools, AgentSummary, analytics, API, AppState, Tool types, LocalAgentTask, ids, message types, agentSwarmsEnabled, debug, envUtils, errors, forkedAgent, lazySchema, messages, permissions, teammateContext, task sdkProgress, tokens, ExitPlanModeTool, AgentTool constants/types

## Logic
1. Defines `ResolvedAgentTools` type with fields: hasWildcard, validTools, invalidTools, resolvedTools, allowedAgentTypes.
2. `filterToolsForAgent` filters tools based on agent type (built-in vs custom), async status, and permission mode. Uses disallowed tool lists from constants.
3. `resolveAgentTools` resolves and validates agent tools, handling wildcard expansion, disallowed tools, and special handling for Agent tool (extracting allowedAgentTypes). Returns ResolvedAgentTools.
4. `agentToolResultSchema` - Zod schema for agent tool results (agentId, agentType, content, totalToolUseCount, totalDurationMs, totalTokens, usage).
5. `AgentToolResult` - TypeScript type derived from the schema.
6. `countToolUses` counts tool_use blocks in assistant messages.
7. `finalizeAgentTool` constructs the final AgentToolResult from agent messages, metadata, and token count.
8. `getLastToolUseName` extracts the name of the last tool_use from a message.
9. `emitTaskProgress` emits progress events using progress tracker and last tool name.
10. `classifyHandoffIfNeeded` classifies handoff safety using the transcript classifier (if enabled) and returns warning message if needed.
11. `extractPartialResult` extracts text content from agent messages (used for killed async agents).
12. `runAsyncAgentLifecycle` runs the full lifecycle of an async agent: iterates messages, tracks progress, classifies handoff, sends notifications on completion/failure/kill, and handles cleanup.

## Exports
- `ResolvedAgentTools` - resolved agent tools type
- `filterToolsForAgent` - filters tools for agent
- `resolveAgentTools` - resolves and validates agent tools
- `agentToolResultSchema` - agent result schema
- `AgentToolResult` - agent result type
- `classifyHandoffIfNeeded` - classifies handoff need
- `emitTaskProgress` - emits task progress
- `extractPartialResult` - extracts partial result
- `finalizeAgentTool` - finalizes agent tool
- `getLastToolUseName` - gets last tool use name
- `runAsyncAgentLifecycle` - runs agent lifecycle
- `countToolUses` - counts tool uses in messages
