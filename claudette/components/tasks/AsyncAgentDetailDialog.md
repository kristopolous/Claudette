# components/tasks/AsyncAgentDetailDialog

## Purpose
Provides async agent detail dialog component for viewing local agent task details.

## Imports
- **Stdlib**: (none)
- **External**: REACT, REACT_COMPILER
- **Internal**: types utils, hooks useElapsedTime, ink events keyboard-event, ink, keybindings useKeybinding, Tool, tasks LocalAgentTask, tools, format, messages, design-system Byline/Dialog/KeyboardShortcutHint, messages UserPlanMessage, tasks renderToolActivity/taskStatusUtils

## Logic
1. `Props` - { agent, onDone, onKillAgent?, onBack? }
2. `AsyncAgentDetailDialog` - UI component for async agent detail
3. Uses REACT_COMPILER runtime (_c) for memoization
4. Uses useTheme for theme
5. Gets tools via getTools(getEmptyToolPermissionContext())
6. Uses useElapsedTime for elapsed time calculation
7. Uses useKeybindings for keyboard shortcuts
8. Keybindings: 'confirm:yes' → onDone
9. handleKeyDown: space → onDone, left → onBack, x → onKillAgent (if running)
10. Renders Dialog with agent task details
11. Shows agent status, elapsed time, token count
12. Shows plan messages via UserPlanMessage
13. Shows tool activity via renderToolActivity
14. Shows task status color and icon via getTaskStatusColor, getTaskStatusIcon
15. `DeepImmutable` - deep immutable type
16. `useElapsedTime` - gets elapsed time
17. `KeyboardEvent` - keyboard event type
18. `useTheme` - gets theme
19. `getEmptyToolPermissionContext` - gets empty tool permission context
20. `LocalAgentTaskState` - local agent task state type
21. `getTools` - gets tools
22. `formatNumber` - formats number
23. `extractTag` - extracts tag
24. `Byline`, `Dialog`, `KeyboardShortcutHint` - design system components
25. `UserPlanMessage` - user plan message component
26. `renderToolActivity` - renders tool activity
27. `getTaskStatusColor`, `getTaskStatusIcon` - task status utilities

## Exports
- `Props` - props type
- `AsyncAgentDetailDialog` - async agent detail dialog component
