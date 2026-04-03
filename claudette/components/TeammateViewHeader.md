## Purpose
Displays a header when viewing a teammate's transcript, showing their name, task description, and an exit hint.

## Imports
- **Stdlib**: None
- **External**: REACT, REACT/compiler-runtime
- **Internal**: ink (Box, Text), state/AppState (useAppState), state/selectors (getViewedTeammateTask), utils/ink (toInkColor), design-system/KeyboardShortcutHint (KeyboardShortcutHint), OffscreenFreeze (OffscreenFreeze)

## Logic
1. Retrieves the viewed teammate task from app state using a selector
2. Returns null if no teammate is being viewed
3. Converts the teammate's identity color to an ink-compatible color
4. Renders the teammate name in their assigned color, followed by a keyboard shortcut hint for returning
5. Displays the teammate's prompt/task description in dimmed text
6. Wraps content in OffscreenFreeze to prevent rendering issues

## Exports
- `TeammateViewHeader` - UI component showing the header for teammate transcript view
