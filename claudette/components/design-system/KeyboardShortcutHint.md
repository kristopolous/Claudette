## Purpose
Renders a keyboard shortcut hint string like "ctrl+o to expand" or "(tab to toggle)" for inline help text.

## Imports
- **Stdlib**: none
- **External**: REACT, REACT_COMPILER
- **Internal**: `Text`

## Logic
Composes shortcut and action props into a `<Text>` element with optional bold styling for the shortcut and optional parentheses around the full hint.

## Exports
- `KeyboardShortcutHint` - displays a formatted keyboard shortcut hint with a key and its associated action
