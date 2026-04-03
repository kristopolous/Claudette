# components/tasks/InProcessTeammateDetailDialog

## Purpose
Provides in-process teammate detail dialog component for viewing teammate task details.

## Imports
- **Stdlib**: (none)
- **External**: REACT, REACT_COMPILER
- **Internal**: types utils, hooks useElapsedTime, ink events keyboard-event, ink, keybindings useKeybinding, Tool, tasks InProcessTeammateTask types, tools, format, ink, design-system Byline/Dialog/KeyboardShortcutHint, tasks renderToolActivity/taskStatusUtils

## Logic
1. `Props` - { teammate, onDone, onKill?, onBack?, onForeground? }
2. `InProcessTeammateDetailDialog` - UI component for teammate detail
3. Uses REACT_COMPILER runtime (_c) for memoization
4. Uses useTheme for theme
5. Gets tools via getTools(getEmptyToolPermissionContext())
6. Uses useElapsedTime for elapsed time calculation
7. Uses useKeybindings for keyboard shortcuts
8. Keybindings: 'confirm:yes' → onDone
9. handleKeyDown: space → onDone, left → onBack, x → onKill (if running), f → onForeground (if running)
10. Renders Dialog with teammate task details
11. Shows teammate status, elapsed time, token count
12. Shows tool activity via renderToolActivity
13. Shows teammate activity description via describeTeammateActivity
14. Uses truncateToWidth for text truncation
15. Uses formatNumber for number formatting
16. Uses toInkColor for color conversion
17. `DeepImmutable` - deep immutable type
18. `useElapsedTime` - gets elapsed time
19. `KeyboardEvent` - keyboard event type
20. `useTheme` - gets theme
21. `getEmptyToolPermissionContext` - gets empty tool permission context
22. `InProcessTeammateTaskState` - teammate task state type
23. `getTools` - gets tools
24. `formatNumber`, `truncateToWidth` - format functions
25. `toInkColor` - converts to ink color
26. `Byline`, `Dialog`, `KeyboardShortcutHint` - design system components
27. `renderToolActivity` - renders tool activity
28. `describeTeammateActivity` - describes teammate activity

## Exports
- `Props` - props type
- `InProcessTeammateDetailDialog` - teammate detail dialog component
