## Purpose
Tool for creating a multi-agent swarm team, initializing team file, task list, and leader agent context.

## Imports
- **External**: `zod/v4`
- **Internal**: 
  - State: `getSessionId`
  - Analytics: `logEvent`, type
  - Tool: `buildTool`, `ToolDef`, `Tool`
  - Agent: `formatAgentId`
  - Swarm: `isAgentSwarmsEnabled`, `getResolvedTeammateMode`, `TEAM_LEAD_NAME`, `getTeamFilePath`, `readTeamFile`, `registerTeamForSessionCleanup`, `sanitizeName`, `writeTeamFileAsync`, `assignTeammateColor`
  - Tasks: `ensureTasksDir`, `resetTaskList`, `setLeaderTeamName`
  - Utils: `getCwd`, `lazySchema`, `getDefaultMainLoopModel`, `parseUserSpecifiedModel`, `jsonStringify`
  - Types: `TeamFile`
  - Local: `TEAM_CREATE_TOOL_NAME`, `getPrompt`, `renderToolUseMessage`

## Logic
1. Enabled only when agent swarms are enabled
2. Validates team_name is provided and non-empty
3. Prevents creating a team if already leading a team (one team per leader)
4. Generates unique team name if provided name already exists
5. Creates lead agent ID: team-lead@teamName
6. Determines lead model from session or default
7. Creates team file with lead member entry
8. Registers team for session cleanup
9. Creates/resets task list directory for the team (sanitized name)
10. Sets leader team name for task list coordination
11. Updates AppState.teamContext with team info and lead teammate
12. Logs analytics event
13. Returns team_name, team_file_path, lead_agent_id

## Exports
- `TeamCreateTool` - Main tool definition
- `Input` - Type (team_name, description?, agent_type?)
- `Output` - Type (team_name, team_file_path, lead_agent_id)
- Helper: `generateUniqueTeamName` (returns provided name or new slug if exists)
