# components/Spinner/TeammateSpinnerTree

## Purpose
Provides teammate spinner tree component for displaying teammate status.

## Imports
- **Stdlib**: (none)
- **External**: `figures`, REACT, REACT_COMPILER
- **Internal**: ink, state AppState, tasks InProcessTeammateTask, format, Spinner TeammateSpinnerLine/teammateSelectHint

## Logic
1. `Props` - { selectedIndex?, isInSelectionMode?, allIdle?, leaderVerb?, leaderTokenCount?, leaderIdleText? }
2. `TeammateSpinnerTree` - UI component for teammate spinner tree
3. Uses REACT_COMPILER runtime (_c) for memoization
4. Gets tasks, viewingAgentTaskId, showTeammateMessagePreview via useAppState
5. Gets running teammates sorted via getRunningTeammatesSorted
6. Returns null if no teammate tasks
7. Calculates isLeaderForegrounded (viewingAgentTaskId === undefined)
8. Calculates isLeaderSelected (isInSelectionMode && selectedIndex === -1)
9. Calculates isLeaderHighlighted (isLeaderForegrounded || isLeaderSelected)
10. Calculates isHideSelected (isInSelectionMode === true && selectedIndex === teammateTasks.length)
11. Renders Box with flexDirection="column", marginTop={1}
12. Renders leader line with pointer figure if selected
13. Renders teammate lines via TeammateSpinnerLine
14. Shows TEAMMATE_SELECT_HINT for selection mode
15. Uses formatNumber for token count formatting
16. `figures` - figures library for Unicode symbols
17. `useAppState` - gets app state
18. `getRunningTeammatesSorted` - gets sorted running teammates
19. `formatNumber` - formats number
20. `TeammateSpinnerLine` - teammate spinner line component
21. `TEAMMATE_SELECT_HINT` - teammate select hint constant

## Exports
- `TeammateSpinnerTree` - teammate spinner tree component
