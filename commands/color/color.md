## Purpose
Set the prompt bar color for this session (agent identity customization).

## Imports
- **External**: `crypto` (UUID type)
- **Internal**: Session state, agent color manager, transcript path utilities, session storage, teammate check

## Logic
1. Takes single argument: color name or 'default/reset/none/gray/grey'
2. Checks if session is a swarm teammate (teammates cannot set color — assigned by leader)
3. Without argument: shows available colors from AGENT_COLORS
4. If reset alias: saves 'default' to transcript, clears standaloneAgentContext.color in AppState
5. Validates color against AGENT_COLORS list
6. If valid color: saves to transcript (persistence), updates AppState standaloneAgentContext.color
7. Returns text confirmation
8. Command type: 'local-jsx' (requires context for setAppState)

## Exports
- `call` - async LocalJSXCommandCall returning null (updates state, shows message)
- Color choices managed by AgentColorManager
