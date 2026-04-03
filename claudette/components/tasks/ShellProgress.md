# components/tasks/ShellProgress

## Purpose
Provides shell progress component for displaying shell task status.

## Imports
- **Stdlib**: (none)
- **External**: REACT, REACT_COMPILER
- **Internal**: ink, Task, tasks LocalShellTask guards, types utils

## Logic
1. `TaskStatusTextProps` - { status, label?, suffix? }
2. `TaskStatusText` - renders task status text with color
3. Uses REACT_COMPILER runtime (_c) for memoization
4. displayLabel = label ?? status
5. color: completed → success, failed → error, killed → warning, else undefined
6. Renders Text with color, dimColor={true}, ({displayLabel}{suffix})
7. `ShellProgress` - renders shell task progress
8. Switches on shell.status:
   - completed: <TaskStatusText status="completed" label="done" />
   - failed: <TaskStatusText status="failed" label="error" />
   - killed: <TaskStatusText status="killed" label="stopped" />
   - running/pending: <TaskStatusText status="running" />
9. `ReactNode` - React node type
10. `Text` - ink text component
11. `TaskStatus` - task status type
12. `LocalShellTaskState` - local shell task state type
13. `DeepImmutable` - deep immutable type

## Exports
- `TaskStatusTextProps` - task status text props type
- `TaskStatusText` - task status text component
- `ShellProgress` - shell progress component
