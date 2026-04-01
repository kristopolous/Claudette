# Agents Command (`agents`)

## Purpose
Renders the AgentsMenu component to manage agent configurations. Allows users to select and configure available agents based on their permissions.

## Imports
### Stdlib
- `react` (as namespace)

### Internal
- `AgentsMenu` from `../../components/agents/AgentsMenu.js`
- `ToolUseContext` type from `../../Tool.js`
- `getTools` from `../../tools.js`
- `LocalJSXCommandOnDone` type from `../../types/command.js`

## Logic
The `call` function is the entry point for this command. It:
1. Extracts the app state from the tool use context.
2. Gets the permission context from the app state.
3. Retrieves the list of available tools using `getTools(permissionContext)`.
4. Returns the `AgentsMenu` React component, passing the tools and an `onExit` callback.

## Exports
- `call` (async function) - Main command handler that renders the agents menu interface