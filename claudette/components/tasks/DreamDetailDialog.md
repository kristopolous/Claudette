# components/tasks/DreamDetailDialog

## Purpose
Provides dream detail dialog component for viewing dream task details.

## Imports
- **Stdlib**: (none)
- **External**: REACT, REACT_COMPILER
- **Internal**: types utils, hooks useElapsedTime, ink events keyboard-event, ink, keybindings useKeybinding, tasks DreamTask, stringUtils, design-system Byline/Dialog/KeyboardShortcutHint

## Logic
1. `Props` - { task, onDone, onBack?, onKill? }
2. `VISIBLE_TURNS` (6) - number of recent turns to render
3. Earlier turns collapse to a count
4. `DreamDetailDialog` - UI component for dream detail dialog
5. Uses REACT_COMPILER runtime (_c) for memoization
6. Uses useElapsedTime for elapsed time calculation
7. Uses useKeybindings for keyboard shortcuts
8. Keybindings: 'confirm:yes' → onDone
9. handleKeyDown: space → onDone, left → onBack, x → onKill (if running)
10. Renders Dialog with dream task details
11. Shows elapsed time, task status
12. Shows recent turns (last VISIBLE_TURNS)
13. Shows collapsed count for earlier turns
14. `DeepImmutable` - deep immutable type
15. `useElapsedTime` - gets elapsed time
16. `KeyboardEvent` - keyboard event type
17. `DreamTaskState` - dream task state type
18. `plural` - pluralizes string
19. `Byline`, `Dialog`, `KeyboardShortcutHint` - design system components

## Exports
- `Props` - props type
- `VISIBLE_TURNS` - visible turns constant
- `DreamDetailDialog` - dream detail dialog component
