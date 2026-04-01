# utils/agentId

## Purpose
Provides deterministic agent ID formatting and parsing for swarm/teammate system.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: (none)

## Logic
1. Agent ID format: `agentName@teamName`
2. Examples: `team-lead@my-project`, `researcher@my-project`
3. @ symbol is separator between agent name and team name
4. Request ID format: `{requestType}-{timestamp}@{agentId}`
5. Examples: `shutdown-1702500000000@researcher@my-project`
6. Used for shutdown requests, plan approvals, etc.
7. Benefits:
   - Reproducibility: same agent/team gets same ID
   - Human-readable: meaningful and debuggable
   - Predictable: team leads can compute teammate ID without lookup
8. Constraints: agent names must NOT contain @ (it's the separator)
9. `formatAgentId` - formats agent ID from name and team
10. `parseAgentId` - parses agent ID into components
11. Returns null if ID doesn't contain @ separator
12. `formatRequestId` - formats request ID with timestamp
13. `parseRequestId` - parses request ID into components

## Exports
- `formatAgentId` - formats agent ID
- `parseAgentId` - parses agent ID
- `formatRequestId` - formats request ID
- `parseRequestId` - parses request ID
