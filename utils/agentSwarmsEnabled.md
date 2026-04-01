# utils/agentSwarmsEnabled

## Purpose
Provides centralized runtime check for agent teams/teammate features.

## Imports
- **Stdlib**: `process`
- **External**: (none)
- **Internal**: growthbook, envUtils

## Logic
1. `isAgentTeamsFlagSet` - checks if --agent-teams flag in process.argv
2. Avoids import cycles with bootstrap/state
3. Flag only shown in help for ant users, but works for external users too
4. `isAgentSwarmsEnabled` - central gate for teammate features
5. Ant builds: always enabled
6. External builds require both:
   - Opt-in via CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS env var OR --agent-teams flag
   - GrowthBook gate 'tengu_amber_flint' enabled (killswitch)
7. Killswitch always respected for external users
8. Should be checked everywhere teammates referenced (prompts, code, tools, UI)
9. Single gate for consistent feature enablement

## Exports
- `isAgentTeamsFlagSet` - checks CLI flag
- `isAgentSwarmsEnabled` - checks if agent swarms enabled
