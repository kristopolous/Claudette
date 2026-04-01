## Purpose
Displays a list of tasks with status icons, progress indicators, teammate activity, and dependency blockers, with support for truncation and prioritization.

## Imports
- **Stdlib**: none
- **External**: `react`, `react/compiler-runtime`, `figures`
- **Internal**: `hooks/useTerminalSize`, `ink/stringWidth`, `ink`, `state/AppState`, `tasks/InProcessTeammateTask/types`, `tools/AgentTool/agentColorManager`, `utils/agentSwarmsEnabled`, `utils/array`, `utils/collapseReadSearch`, `utils/format`, `utils/tasks`, `utils/theme`, `components/design-system/ThemedText`

## Logic
1. Tracks task completion timestamps to prioritize recently completed tasks within a 30-second window
2. Builds teammate color and activity maps from agent swarms state
3. Counts tasks by status (completed, in-progress, pending) and identifies unresolved task IDs for blocker detection
4. Prioritizes visible tasks when truncation is needed: recent completed, in-progress, pending (unblocked first), older completed
5. Renders each task with a status icon, subject line, owner indicator, blocker info, and activity description
6. Displays a summary count in standalone mode

## Exports
- `TaskListV2` - React component that renders a prioritized and optionally truncated task list with teammate activity and dependency information
