# useSwarmInitialization

## Purpose
Initializes swarm features including teammate hooks and context when ENABLE_AGENT_SWARMS is true.

## Imports
- **Stdlib**: `useEffect` from 'react'
- **External**: None
- **Internal**: `getSessionId`, `AppState`, `Message`, `isAgentSwarmsEnabled`, `initializeTeammateContextFromSession`, `readTeamFile`, `initializeTeammateHooks`, `getDynamicTeamContext`

## Logic
1. Checks if isAgentSwarmsEnabled() before doing any work
2. Handles two scenarios:
   - Resumed teammate sessions (from --resume or /resume): reads teamName/agentName from first message
   - Fresh spawns: reads context from getDynamicTeamContext()
3. Initializes teammate hooks with session ID and agent info
4. Reads team file to get agentId for hook initialization

## Exports
- `useSwarmInitialization` - Hook that initializes swarm features
