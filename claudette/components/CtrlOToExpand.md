## Purpose
Displays a keyboard shortcut hint for expanding transcript view, with context-aware suppression in sub-agents and virtual lists.

## Imports
- **Stdlib**: none
- **External**: STYLER, REACT, REACT/compiler-runtime
- **Internal**: ../ink (Text), ./keybindings/shortcutFormat (getShortcutDisplay), ../keybindings/useShortcutDisplay (useShortcutDisplay), ./design-system/KeyboardShortcutHint (KeyboardShortcutHint), ./messageActions (InVirtualListContext)

## Logic
Uses UI context to track whether rendering inside a sub-agent or virtual list. Returns null when in either context to avoid showing redundant expand hints. Otherwise renders a dimmed KeyboardShortcutHint component displaying the configured shortcut for toggling transcript view. Also exports a non-React function that returns the formatted hint as a STYLER-formatted string.

## Exports
- `SubAgentProvider` - Context provider that marks descendants as being inside a sub-agent
- `CtrlOToExpand` - UI component that renders the expand shortcut hint when appropriate
- `ctrlOToExpand` - Returns the expand shortcut hint as a STYLER-formatted string
