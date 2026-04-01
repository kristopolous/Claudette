## Purpose
Sets the prompt bar color for the current session, with reset to default.

## Imports
- **Stdlib**: `crypto` (UUID)
- **Internal**: `getSessionId`, `ToolUseContext`, `AGENT_COLORS`, `AgentColorName`, `getTranscriptPath`, `saveAgentColor`, `isTeammate`

## Logic
`call` first checks if the session is a swarm teammate (color cannot be set). If no argument or a reset alias (default/reset/none/gray/grey), saves 'default' to session storage and clears AppState color. If a color argument is provided, validates against `AGENT_COLORS`; on success, saves to transcript storage and updates AppState. Provides user feedback via `onDone`.

## Exports
- `call` - Async function returning null (updates state)
