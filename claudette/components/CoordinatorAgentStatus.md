## Purpose
Renders a panel showing the status of background agent tasks with selection and navigation support.

## Imports
- **Stdlib**: none
- **External**: `figures`, `react`, `react/compiler-runtime`
- **Internal**: `BLACK_CIRCLE`, `PAUSE_ICON`, `PLAY_ICON` (constants/figures), `useTerminalSize` (hooks), `stringWidth` (ink), `Box`, `Text`, `wrapText` (ink), `AppState`, `useAppState`, `useSetAppState` (state/AppState), `enterTeammateView`, `exitTeammateView` (state/teammateViewHelpers), `isPanelAgentTask`, `LocalAgentTaskState` (tasks/LocalAgentTask), `formatDuration`, `formatNumber` (utils/format), `evictTerminalTask` (utils/task/framework), `isTerminalStatus` (tasks/taskStatusUtils)

## Logic
Filters visible agent tasks from app state (excluding evicted ones), runs a 1-second interval tick to update elapsed times and evict tasks past their deadline. Renders a main line and individual agent lines with bullet indicators, elapsed time, token counts, queued message counts, and truncated descriptions. Supports selection, hover highlighting, and clicking to enter/exit teammate view. Builds a reverse mapping from agent IDs to names.

## Exports
- `getVisibleAgentTasks` - filters and sorts agent tasks that should be visible in the panel
- `CoordinatorTaskPanel` - renders the full coordinator task panel with main line and agent lines
- `useCoordinatorTaskCount` - hook returning the count of visible coordinator tasks
