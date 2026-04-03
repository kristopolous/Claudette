## Purpose
Displays user-configured keyboard shortcut hints with fallback to default shortcuts.

## Imports
- **Stdlib**: none
- **External**: REACT (React)
- **Internal**: ../keybindings/types (KeybindingAction, KeybindingContextName), ../keybindings/useShortcutDisplay (useShortcutDisplay), ./design-system/KeyboardShortcutHint (KeyboardShortcutHint)

## Logic
Accepts an action, context, and fallback shortcut, then uses useShortcutDisplay to resolve the user-configured shortcut or fall back to the default. Delegates rendering to KeyboardShortcutHint with optional parentheses and bold styling.

## Exports
- `ConfigurableShortcutHint` - renders a keyboard shortcut hint that respects user keybinding configuration
