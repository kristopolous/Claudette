## Purpose
Provides reactive access to the persistent v2 task list (todos), with automatic file watching, debouncing, fallback polling, and auto-hide after 5s when all tasks are completed. Shared singleton store avoids multiple watchers.

## Imports
- **External**: `fs` (watch), REACT (useEffect, useSyncExternalStore)
- **Internal**:
  - `./state/AppState` (useAppState, useSetAppState)
  - `./utils/signal` (createSignal)
  - `./utils/tasks` (Task type, getTaskListId, getTasksDir, isTodoV2Enabled, listTasks, onTasksUpdated, resetTaskList)
  - `./utils/teammate` (isTeamLead)

## Logic
- Store class (`TasksV2Store`) implements useSyncExternalStore contract:
  - `getSnapshot`: returns `Task[]` or `undefined` (when hidden)
  - `subscribe`: lazy-start on first subscriber; registers `onTasksUpdated` callback and does initial fetch; increments subscriber count; `#stop()` when last unsubscribes
- File watching: `watch(tasksDir, #debouncedFetch)`; on rename/change dir, `#rewatch` updates watcher
- Debounce: 50ms to coalesce rapid events
- Fetch: `listTasks(taskListId)` → filters internal tasks; updates `#tasks`; decides hide state:
  - Incomplete or empty → show; reset hide timer
  - All completed and timer not set → schedule hide after 5s
- Fallback poll: every 5s while there are incomplete tasks (in case fs.watch misses cross-process changes)
- Hide-on-clear: after all tasks complete, 5s timer fires → verifies still all completed → `resetTaskList` clears file and hides
- Two exported hooks:
  - `useTasksV2()`: returns tasks array when enabled (TodoV2 feature + team lead), else undefined
  - `useTasksV2WithCollapseEffect()`: same, but also collapses `expandedView` to 'none' when tasks become hidden (called from always-mounted REPL)

## Exports
- `useTasksV2` - Hook `() => Task[] | undefined`
- `useTasksV2WithCollapseEffect` - Hook `() => Task[] | undefined`
