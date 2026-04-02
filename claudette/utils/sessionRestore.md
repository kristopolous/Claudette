# sessionRestore

## Purpose
Handles session resume/continue: restores file history, attribution, todos, agent settings, worktree state, and coordinator mode from a saved transcript. Called by both CLI (`--resume`/`--continue`) and interactive (`/resume`) paths.

## Imports
- **Stdlib**: `bun:bundle`, `crypto` (UUID), `path` (dirname)
- **External**: (none)
- **Internal**: `../bootstrap/state.js`, `../constants/systemPromptSections.js`, `../cost-tracker.js`, `../state/AppState.js`, `../tools/AgentTool/agentColorManager.js`, `../tools/AgentTool/loadAgentsDir.js`, `../tools/TodoWriteTool/constants.js`, `../types/ids.js`, `../types/logs.js`, `../types/message.js`, `./asciicast.js`, `./claudemd.js`, `./commitAttribution.js`, `./concurrentSessions.js`, `./cwd.js`, `./debug.js`, `./fileHistory.js`, `./messages.js`, `./model/model.js`, `./plans.js`, `./Shell.js`, `./sessionStorage.js`, `./tasks.js`, `./todo/types.js`, `./toolResultStorage.js`, `./worktree.js`

## Logic
1. **extractTodosFromTranscript** — scans transcript backwards for last TodoWrite tool_use block, parses todos via Zod schema
2. **restoreSessionStateFromLog** — restores file history, attribution (ant-only, feature-gated), context collapse, and todo state into AppState via setter callback
3. **computeRestoredAttributionState** — returns AttributionState from log snapshots (feature-gated)
4. **computeStandaloneAgentContext** — builds `{name, color}` context from session metadata
5. **restoreAgentFromSession** — re-applies agent type and model override from resumed session; clears stale state if no agent; skips if CLI `--agent` was provided
6. **refreshAgentDefinitionsForModeSwitch** — re-derives agent definitions after coordinator↔normal mode switch, merges CLI agents back in
7. **restoreWorktreeForResume** — cds into worktree if session was inside one; handles missing directories gracefully; clears caches
8. **exitRestoredWorktree** — undoes restoreWorktreeForResume before mid-session `/resume` to another session
9. **processResumedConversation** — orchestrates full resume: mode matching, session ID setup (or fork), agent restoration, worktree restore, metadata restoration, initial state computation

## Exports
- `restoreSessionStateFromLog(result, setAppState)` — restores file history, attribution, context collapse, and todos from log into AppState
- `computeRestoredAttributionState(result)` — returns AttributionState or undefined (feature-gated)
- `computeStandaloneAgentContext(agentName, agentColor)` — returns `{name, color}` or undefined
- `restoreAgentFromSession(agentSetting, currentAgentDefinition, agentDefinitions)` — returns `{agentDefinition, agentType}` or undefined
- `refreshAgentDefinitionsForModeSwitch(modeWasSwitched, currentCwd, cliAgents, currentAgentDefinitions)` — returns refreshed AgentDefinitionsResult
- `restoreWorktreeForResume(worktreeSession)` — cds into worktree directory, clears caches
- `exitRestoredWorktree()` — exits restored worktree, restores original cwd
- `processResumedConversation(result, opts, context)` — async; returns ProcessedResume with messages, agent info, and initial state
- `ResumeResult` — type: `{messages?, fileHistorySnapshots?, attributionSnapshots?, contextCollapseCommits?, contextCollapseSnapshot?}`
- `ProcessedResume` — type: `{messages, fileHistorySnapshots?, contentReplacements?, agentName, agentColor, restoredAgentDef, initialState}`
- `CoordinatorModeApi` — type: `{matchSessionMode, isCoordinatorMode}`
- `ResumeLoadResult` — type: full conversation load result including messages, metadata, agent info, mode, worktree, PR info

## Source
`sessionRestore`
