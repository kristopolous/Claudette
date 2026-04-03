# components/tasks/BackgroundTasksDialog

## Purpose
Provides background tasks dialog component for viewing and managing background tasks.

## Imports
- **Stdlib**: (none)
- **External**: BUILDFLAGS, `figures`, REACT, REACT_COMPILER
- **Internal**: coordinator coordinatorMode, hooks useTerminalSize, state AppState/teammateViewHelpers, Tool, tasks DreamTask/InProcessTeammateTask/LocalAgentTask/LocalShellTask/LocalWorkflowTask/MonitorMcpTask/RemoteAgentTask/types, types utils, array, swarm constants, commands ultraplan, commands, context overlayContext, hooks useExitOnCtrlCDWithKeybindings, ink events keyboard-event, ink, keybindings useKeybinding/useShortcutDisplay, design-system Byline/Dialog/KeyboardShortcutHint, tasks AsyncAgentDetailDialog/BackgroundTask/DreamDetailDialog/InProcessTeammateDetailDialog/RemoteSessionDetailDialog/ShellDetailDialog

## Logic
1. `ViewState` - { mode: 'list' } | { mode: 'detail', itemId }
2. `Props` - { onDone, toolUseContext, initialDetailTaskId? }
3. `ListItem` - union type for different task types
4. Types: local_bash, remote_agent, local_agent, in_process_teammate, dream, local_workflow, monitor_mcp
5. Each has id, type, label, status, task (DeepImmutable<TaskState>)
6. `BackgroundTasksDialog` - UI component for background tasks
7. Uses REACT_COMPILER runtime (_c) for memoization
8. Uses useTerminalSize for columns
9. Uses useAppState, useSetAppState for state management
10. Uses enterTeammateView, exitTeammateView for teammate view
11. Uses useRegisterOverlay for overlay context
12. Uses useKeybindings for keyboard shortcuts
13. Uses useShortcutDisplay for shortcut display
14. Filters background tasks via isBackgroundTask
15. Renders Dialog with task list or detail view
16. Shows task status, label, duration
17. Handles task selection and detail view
18. Handles task killing via stopUltraplan
19. `isCoordinatorMode` - checks coordinator mode
20. `DreamTask`, `DreamTaskState` - dream task types
21. `InProcessTeammateTask`, `InProcessTeammateTaskState` - teammate task types
22. `LocalAgentTask`, `LocalAgentTaskState` - local agent task types
23. `LocalShellTask`, `LocalShellTaskState` - local shell task types
24. `LocalWorkflowTask`, `LocalWorkflowTaskState` - local workflow task types
25. `MonitorMcpTask`, `MonitorMcpTaskState` - monitor MCP task types
26. `RemoteAgentTask`, `RemoteAgentTaskState` - remote agent task types
27. `BackgroundTaskState`, `isBackgroundTask`, `TaskState` - task types/functions
28. `DeepImmutable` - deep immutable type
29. `intersperse`, `count` - array utilities
30. `TEAM_LEAD_NAME` - team lead name constant
31. `stopUltraplan` - stops ultraplan
32. `CommandResultDisplay` - command result display type
33. `ExitState` - exit state type
34. `KeyboardEvent` - keyboard event type
35. `Byline`, `Dialog`, `KeyboardShortcutHint` - design system components

## Exports
- `ViewState` - view state type
- `Props` - props type
- `ListItem` - list item type
- `BackgroundTasksDialog` - background tasks dialog component
