# components/tasks/BackgroundTask

## Purpose
Provides background task component for displaying individual background task status.

## Imports
- **Stdlib**: (none)
- **External**: REACT, REACT_COMPILER
- **Internal**: ink, tasks types, types utils, format, ink, stringUtils, constants figures, tasks RemoteSessionProgress/ShellProgress/taskStatusUtils

## Logic
1. `Props` - { task, maxActivityWidth? }
2. `BackgroundTask` - UI component for background task display
3. Uses REACT_COMPILER runtime (_c) for memoization
4. activityLimit = maxActivityWidth ?? 40
5. Switches on task.type:
   - local_bash: shows command/description truncated to activityLimit, ShellProgress
   - remote_agent: if isRemoteReview shows RemoteSessionProgress, else shows diamond icon (DIAMOND_OPEN/DIAMOND_FILLED) and title
   - local_agent: shows agent color diamond and title
   - in_process_teammate: shows teammate activity description via describeTeammateActivity
   - dream: shows dream description
   - local_workflow: shows workflow description
   - monitor_mcp: shows MCP server name
6. Uses truncate for text truncation
7. Uses toInkColor for color conversion
8. Uses plural for pluralization
9. `DIAMOND_FILLED`, `DIAMOND_OPEN` - diamond figure constants
10. `RemoteSessionProgress` - remote session progress component
11. `ShellProgress`, `TaskStatusText` - shell progress components
12. `describeTeammateActivity` - describes teammate activity
13. `BackgroundTaskState` - background task state type
14. `DeepImmutable` - deep immutable type

## Exports
- `Props` - props type
- `BackgroundTask` - background task component
