# components/teams/TeamStatus

## Purpose
Provides team status footer component showing teammate count.

## Imports
- **Stdlib**: (none)
- **External**: REACT, REACT_COMPILER
- **Internal**: ink, state AppState

## Logic
1. `Props` - { teamsSelected, showHint }
2. `TeamStatus` - UI component for team status footer
3. Similar to BackgroundTaskStatus but for teammates
4. Uses REACT_COMPILER runtime (_c) for memoization
5. Gets teamContext via useAppState
6. Derives teammate count from teamContext (no filesystem I/O needed)
7. Filters out team-lead from count
8. Returns null if totalTeammates === 0
9. Shows hint if showHint && teamsSelected: "· Enter to view"
10. Shows statusText: "{totalTeammates} teammate(s)"
11. Uses key={teamsSelected ? 'selected' : 'normal'} for color switching
12. Uses color="background", inverse={teamsSelected} for styling
13. `Text` - ink text component
14. `useAppState` - gets app state

## Exports
- `TeamStatus` - team status component
