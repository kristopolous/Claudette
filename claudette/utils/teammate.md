# utils/teammate

## Purpose
Provides utilities for agent swarm coordination: identity resolution, team membership checks, and lifecycle management for both in-process and tmux-spawned teammates.

## Imports
- **Internal**: ../state/AppState.js, ./envUtils.js, ./teammateContext.js

## Logic
1. Re-exports in-process teammate utilities from teammateContext.ts
2. Identity resolution follows priority: AsyncLocalStorage (in-process) > dynamicTeamContext (tmux via CLI args) > env vars / AppState
3. `dynamicTeamContext` is a module-level variable set when a tmux-spawned teammate joins at runtime; cleared when leaving
4. `isTeammate()` requires both agentId AND teamName for tmux teammates (in-process teammates always return true)
5. `isTeamLead()` checks if the session matches the team's leadAgentId, with backwards compat for sessions created before agent IDs were standardized (no agent ID set = lead)
6. `isPlanModeRequired()` falls back to `CLAUDE_CODE_PLAN_MODE_REQUIRED` env var when no context is set
7. `hasActiveInProcessTeammates` and `hasWorkingInProcessTeammates` scan AppState.tasks for running in-process teammate tasks
8. `waitForTeammatesToBecomeIdle` registers onIdle callbacks on working teammate tasks and returns a promise that resolves when all become idle; handles race conditions by checking current isIdle state at registration time

## Exports
- `createTeammateContext`, `getTeammateContext`, `isInProcessTeammate`, `runWithTeammateContext`, `TeammateContext` - re-exported from teammateContext; in-process teammate context management
- `getParentSessionId()` - returns the leader's session ID; undefined if not a teammate
- `setDynamicTeamContext(context)` - sets the dynamic team context (called when joining a team at runtime)
- `clearDynamicTeamContext()` - clears the dynamic team context (called when leaving a team)
- `getDynamicTeamContext()` - returns the current dynamic team context for inspection
- `getAgentId()` - returns the agent ID if running as a teammate
- `getAgentName()` - returns the agent name if running as a teammate
- `getTeamName(teamContext?)` - returns the team name; accepts optional AppState teamContext for leaders
- `getTeammateColor()` - returns the teammate's assigned color
- `isTeammate()` - returns true if running as a teammate in a swarm
- `isPlanModeRequired()` - returns true if this teammate must enter plan mode before implementing
- `isTeamLead(teamContext?)` - returns true if this session is the team lead
- `hasActiveInProcessTeammates(appState)` - returns true if any in-process teammate tasks are running
- `hasWorkingInProcessTeammates(appState)` - returns true if any in-process teammate is running and not idle
- `waitForTeammatesToBecomeIdle(setAppState, appState)` - returns a promise that resolves when all working in-process teammates become idle
