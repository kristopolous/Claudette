# useTaskListWatcher

## Purpose
Watches a task list directory and automatically picks up open, unowned tasks to work on.

## Imports
- **Stdlib**: `useEffect`, `useRef` from 'REACT'
- **External**: None
- **Internal**: `FSWatcher`, `watch` from 'fs', `logForDebugging`, `claimTask`, `DEFAULT_TASKS_MODE_TASK_LIST_ID`, `ensureTasksDir`, `getTasksDir`, `listTasks`, `Task`, `updateTask`

## Logic
1. Watches tasks directory with fs.watch (debounced 1s)
2. On each check: finds pending task with no owner not blocked by unresolved tasks
3. Claims task using claimTask before working
4. Formats task as prompt and calls onSubmitTask
5. Releases claim if submission fails
6. Uses refs to avoid effect re-runs on isLoading changes (prevents Bun PathWatcherManager deadlock)

## Exports
- `useTaskListWatcher` - Hook that watches and automatically processes tasks
