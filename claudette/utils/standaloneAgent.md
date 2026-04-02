# standaloneAgent

## Purpose
Provides utilities for accessing standalone agent context (name and color) for sessions that are NOT part of a swarm team. When a session is part of a swarm, functions return undefined to let swarm context take precedence.

## Imports
- **Internal**: ../state/AppState, ./teammate

## Logic
1. `getStandaloneAgentName(appState)` - returns the standalone agent name if set and not a swarm teammate:
   - Checks `getTeamName()` first — if in a team (swarm), returns `undefined`
   - Otherwise returns `appState.standaloneAgentContext?.name`
   - Uses `getTeamName()` for consistency with `isTeammate()` swarm detection

## Exports
- `getStandaloneAgentName` - returns standalone agent name or undefined if in a swarm team

## Source
`standaloneAgent`
