## Purpose
A list item component for selection UIs with pointer, checkmark, and scroll indicators based on focus and selection state.

## Imports
- **Stdlib**: none
- **External**: REACT, REACT_COMPILER, `figures`
- **Internal**: `useDeclaredCursor`, `Box`, `Text`

## Logic
Determines the indicator to show (pointer for focused, checkmark for selected, arrows for scroll hints, or space for disabled), computes text color based on state, declares cursor position when focused, and renders children with optional description text below.

## Exports
- `ListItem` - renders a list item with state-based indicators and styling for focus, selection, disabled, and scroll states
