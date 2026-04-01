# tools/AgentTool/agentToolUtils

## Purpose
Provides utility functions for agent tool execution and result handling.

## Imports
- **Stdlib**: (none)
- **External**: `bun:bundle`, `zod/v4`
- **Internal**: bootstrap state, constants tools, AgentSummary, analytics, API, AppState, Tool types, LocalAgentTask, ids, message types, agentSwarmsEnabled, debug, envUtils, errors, forkedAgent, lazySchema, messages, permissions, teammateContext, task sdkProgress, tokens, ExitPlanModeTool, AgentTool constants/types

## Logic
1. `ResolvedAgentTools` - hasWildcard, validTools, invalidTools, resolvedTools, allowedAgentTypes
2. `filterToolsForAgent` - filters tools based on agent type and permissions
3. Uses ALL_AGENT_DISALLOWED_TOOLS, ASYNC_AGENT_ALLOWED_TOOLS, etc.
4. `agentToolResultSchema` - schema for agent tool results
5. `classifyHandoffIfNeeded` - classifies if handoff needed
6. `emitTaskProgress` - emits progress event
7. `extractPartialResult` - extracts partial result from agent messages
8. `finalizeAgentTool` - finalizes agent tool execution
9. `getLastToolUseName` - gets last tool use name from messages
10. `runAsyncAgentLifecycle` - runs full async agent lifecycle
11. `createProgressTracker` - creates progress tracker
12. `getTokenCountFromTracker` - gets token count from tracker
13. `updateProgressFromMessage` - updates progress from message
14. `createActivityDescriptionResolver` - creates activity description resolver
15. `enqueueAgentNotification` - enqueues agent notification
16. `completeAgentTask`, `failAgentTask`, `killAsyncAgent` - task lifecycle functions
17. `registerAgentForeground`, `unregisterAgentForeground` - foreground registration
18. `isLocalAgentTask` - type guard for local agent tasks

## Exports
- `ResolvedAgentTools` - resolved agent tools type
- `filterToolsForAgent` - filters tools for agent
- `agentToolResultSchema` - agent result schema
- `AgentToolResult` - agent result type
- `classifyHandoffIfNeeded` - classifies handoff need
- `emitTaskProgress` - emits task progress
- `extractPartialResult` - extracts partial result
- `finalizeAgentTool` - finalizes agent tool
- `getLastToolUseName` - gets last tool use name
- `runAsyncAgentLifecycle` - runs agent lifecycle
- `countToolUses` - counts tool uses in messages
