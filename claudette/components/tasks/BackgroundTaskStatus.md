# components/tasks/BackgroundTaskStatus

## Purpose
Provides background task status component for displaying running task status.

## Imports
- **Stdlib**: (none)
- **External**: `figures`, REACT, REACT_COMPILER
- **Internal**: hooks useTerminalSize, ink stringWidth, state AppState/teammateViewHelpers, tasks LocalAgentTask/pillLabel/types, utils horizontalScroll, ink, AgentTool agentColorManager, theme, design-system KeyboardShortcutHint, tasks taskStatusUtils

## Logic
1. `Props` - { tasksSelected, isViewingTeammate?, teammateFooterIndex?, isLeaderIdle?, onOpenDialog? }
2. `BackgroundTaskStatus` - UI component for background task status
3. Uses REACT_COMPILER runtime (_c) for memoization
4. Uses useTerminalSize for columns
5. Uses useAppState, useSetAppState for state management
6. Uses enterTeammateView, exitTeammateView for teammate view
7. Gets tasks from app state
8. Filters running tasks via isBackgroundTask
9. Gets expandedView state for spinner tree display
10. Calculates showSpinnerTree = expandedView === "teammates"
11. Calculates allTeammates if all running tasks are teammate tasks
12. Filters teammate entries via isPanelAgentTask
13. Creates mainPill for leader status
14. Maps teammate entries to pills with color, name, status
15. Uses getPillLabel for pill label generation
16. Uses pillNeedsCta to check if pill needs CTA
17. Uses AGENT_COLOR_TO_THEME_COLOR, AGENT_COLORS for agent colors
18. Uses calculateHorizontalScrollWindow for horizontal scrolling
19. Uses shouldHideTasksFooter to check if footer should be hidden
20. Renders Box with task pills
21. Shows KeyboardShortcutHint for dialog opening
22. `useTerminalSize` - gets terminal size
23. `stringWidth` - gets string width
24. `isPanelAgentTask` - checks if panel agent task
25. `getPillLabel`, `pillNeedsCta` - pill utilities
26. `isBackgroundTask`, `TaskState`, `BackgroundTaskState` - task types/functions
27. `calculateHorizontalScrollWindow` - calculates scroll window
28. `AGENT_COLOR_TO_THEME_COLOR`, `AGENT_COLORS`, `AgentColorName` - agent color utilities
29. `Theme` - theme type
30. `KeyboardShortcutHint` - keyboard shortcut hint component
31. `shouldHideTasksFooter` - checks if footer should be hidden

## Exports
- `Props` - props type
- `BackgroundTaskStatus` - background task status component
