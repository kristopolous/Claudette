## Purpose
Tool for updating the session's task checklist (todo list), replacing the entire list. Designed for tracking progress during a session.

## Imports
- **External**: `zod/v4`
- **Internal**: 
  - State: `getSessionId`
  - Analytics: `getFeatureValue_CACHED_MAY_BE_STALE`
  - Tool: `buildTool`, `ToolDef`
  - Utils: `lazySchema`, `isTodoV2Enabled`
  - Types: `TodoListSchema`
  - Other: `VERIFICATION_AGENT_TYPE`
  - Local: `TODO_WRITE_TOOL_NAME`, `DESCRIPTION`, `PROMPT`

## Logic
1. Replaces entire todo list for the current session (or agent context)
2. If all todos have status 'completed', the list is cleared (empty array)
3. Todos are stored in appState.todos keyed by sessionId or agentId
4. Enabled only when Todo V2 is NOT enabled (isTodoV2Enabled() returns false)
5. Permission: always allow (no permission checks)
6. Structural nudge: if completing 3+ tasks and none contain "verif" (verification), adds reminder to spawn verification agent
7. Returns oldTodos, newTodos (as provided), and optional verificationNudgeNeeded flag
8. UI message indicates success and prompts to continue using todo list

## Exports
- `TodoWriteTool` - Main tool definition
- `Output` - Type with oldTodos, newTodos, verificationNudgeNeeded?
