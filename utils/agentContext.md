# utils/agentContext

## Purpose
Provides agent context tracking for analytics attribution using AsyncLocalStorage.

## Imports
- **Stdlib**: `async_hooks`
- **External**: (none)
- **Internal**: analytics, agentSwarmsEnabled

## Logic
1. Uses AsyncLocalStorage for async execution chain isolation
2. Supports two agent types: subagents (Agent tool) and in-process teammates
3. Subagents: run in-process for quick delegated tasks
4. Teammates: part of swarm with team coordination
5. For separate process teammates: use env vars (CLAUDE_CODE_AGENT_ID, etc.)
6. WHY AsyncLocalStorage: AppState is shared, would be overwritten by concurrent agents
7. `SubagentContext` - agentId, parentSessionId, agentType:'subagent', subagentName, isBuiltIn
8. invokingRequestId, invocationKind (spawn/resume), invocationEmitted
9. `TeammateAgentContext` - agentId, agentName, teamName, agentColor, planModeRequired
10. parentSessionId, isTeamLead, agentType:'teammate', invokingRequestId
11. `AgentContext` - union of SubagentContext and TeammateAgentContext
12. `agentContextStorage` - AsyncLocalStorage instance
13. `runWithAgentContext` - runs callback with agent context
14. `getAgentContext` - gets current agent context
15. `consumeInvokingRequestId` - consumes and marks emitted

## Exports
- `SubagentContext` - subagent context type
- `TeammateAgentContext` - teammate context type
- `AgentContext` - agent context union type
- `agentContextStorage` - AsyncLocalStorage instance
- `runWithAgentContext` - runs with agent context
- `getAgentContext` - gets current context
- `consumeInvokingRequestId` - consumes invoking request ID
