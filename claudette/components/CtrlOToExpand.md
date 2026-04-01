## Purpose
Displays a keyboard shortcut hint for expanding transcript view, with context-aware suppression in sub-agents and virtual lists.

## Imports
- **Stdlib**: none
- **External**: chalk, react, react/compiler-runtime
- **Internal**: ../ink.js (Text), ../keybindings/shortcutFormat.js (getShortcutDisplay), ../keybindings/useShortcutDisplay.js (useShortcutDisplay), ./design-system/KeyboardShortcutHint.js (KeyboardShortcutHint), ./messageActions.js (InVirtualListContext)

## Logic
Uses React context to track whether rendering inside a sub-agent or virtual list. Returns null when in either context to avoid showing redundant expand hints. Otherwise renders a dimmed KeyboardShortcutHint component displaying the configured shortcut for toggling transcript view. Also exports a non-React function that returns the formatted hint as a chalk-styled string.

## Exports
- `SubAgentProvider` - Context provider that marks descendants as being inside a sub-agent
- `CtrlOToExpand` - React component that renders the expand shortcut hint when appropriate
- `ctrlOToExpand` - Returns the expand shortcut hint as a chalk-formatted string
