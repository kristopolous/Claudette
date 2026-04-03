# tools/AgentTool/AgentTool

## Purpose
Implements the Agent tool for spawning subagents with isolated execution.

## Imports
- **Stdlib**: (none)
- **External**: BUILDFLAGS, REACT, `zod/v4`
- **Internal**: Tool, message types, promptCategory, bootstrap state, prompts, coordinatorMode, AgentSummary, analytics, API, LocalAgentTask, RemoteAgentTask, tools, ids, agentContext, agentSwarmsEnabled, cwd, debug, envUtils, errors, forkedAgent, messages, model agent, permissions, sdkEventQueue, sessionStorage, sleep, systemPrompt, task diskOutput, teammate, teammateContext, teleport, tokens, uuid, worktree, BashTool, FileReadTool, spawnMultiAgent, agentColorManager, agentToolUtils, built-in agents, forkSubagent, loadAgentsDir, prompt, runAgent, UI

## Logic
1. `PROGRESS_THRESHOLD_MS` (2s) - show background hint after delay
2. `isBackgroundTasksDisabled` - env var check at module load
3. `getAutoBackgroundMs` - returns 120s if enabled via env/GrowthBook
4. Builds tool with input schema for agent spawning
5. Handles built-in agents (general-purpose, etc.) and custom agents
6. Filters agents by MCP requirements
7. Spawns async agents via runAsyncAgentLifecycle
8. Handles remote agents via teleportToRemote
9. Handles in-process teammates via spawnTeammate
10. Manages worktree creation for isolated execution
11. Progress tracking with activity descriptions
12. Skill invocation tracking per agent
13. Agent summarization for long-running agents
14. Permission mode handling and deny rules
15. SDK event emission for agent lifecycle

## Exports
- `AgentTool` - agent tool definition
- `inputSchema` - input Zod schema
- `outputSchema` - output Zod schema
- `Progress` - type for progress events (AgentToolProgress | ShellProgress)
- `RemoteLaunchedOutput` - type for remote agent launch result
