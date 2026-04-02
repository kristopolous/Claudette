# teammateContext

## Purpose
Provides AsyncLocalStorage-based runtime context for in-process teammates, enabling concurrent teammate execution without global state conflicts.

## Imports
- **Stdlib**: async_hooks

## Logic
1. Uses Node.js `AsyncLocalStorage<TeammateContext>` to isolate context per concurrent teammate execution
2. `getTeammateContext` returns the current context or undefined if not running within an in-process teammate
3. `runWithTeammateContext` establishes context for a function call — used when spawning in-process teammates
4. `isInProcessTeammate` is a fast boolean check (faster than `getTeammateContext() !== undefined`)
5. `createTeammateContext` builds a complete context object from config, always setting `isInProcess: true`
6. The abortController is caller-provided; for in-process teammates it's typically independent (not linked to parent) so teammates continue when the leader's query is interrupted

Relationship with other identity mechanisms:
- Env vars (`CLAUDE_CODE_AGENT_ID`): process-based teammates spawned via tmux
- `dynamicTeamContext` (teammate.ts): process-based teammates joining at runtime
- `TeammateContext` (this file): in-process teammates via AsyncLocalStorage

## Exports
- `TeammateContext` - type with agentId, agentName, teamName, color?, planModeRequired, parentSessionId, isInProcess (always true), abortController
- `getTeammateContext()` - returns current in-process teammate context or undefined
- `runWithTeammateContext(context, fn)` - runs `fn` with the given context established; returns fn's return value
- `isInProcessTeammate()` - returns true if currently executing within an in-process teammate context
- `createTeammateContext(config)` - creates a TeammateContext from configuration

## Source
`teammateContext`
