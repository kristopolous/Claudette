# state/selectors

## Purpose
Provides pure selectors for deriving computed state from AppState.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: InProcessTeammateTask types, LocalAgentTask types, AppState

## Logic
1. `getViewedTeammateTask` - gets currently viewed teammate task
2. Returns undefined if: no teammate viewed, task ID doesn't exist, not in-process teammate
3. `ActiveAgentForInput` - discriminated union: leader, viewed, named_agent
4. `getActiveAgentForInput` - determines where user input should be routed
5. Returns { type: 'leader' } when not viewing teammate
6. Returns { type: 'viewed', task } when viewing agent
7. Returns { type: 'named_agent', task } for local agent tasks
8. Used by input routing logic to direct messages to correct agent
9. Selectors are pure - data extraction only, no side effects

## Exports
- `ActiveAgentForInput` - discriminated union for input routing
- `getViewedTeammateTask` - gets viewed teammate task
- `getActiveAgentForInput` - determines input routing destination
