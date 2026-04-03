## Purpose
Displays hook configuration menu for tool events.

## Imports
- **External**: REACT
- **Internal**: `HooksConfigMenu` component, `logEvent` (analytics), `getTools`, `LocalJSXCommandCall` type

## Logic
`call` logs an analytics event, retrieves the list of tool names from the current tool permission context, and renders the `<HooksConfigMenu>` component with those tool names and an `onExit` callback.

## Exports
- `call` - Async JSX command function that renders the hooks configuration UI
