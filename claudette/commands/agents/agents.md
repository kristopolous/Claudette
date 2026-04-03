# Agents Command (`agents`)

## Purpose
Renders the AgentsMenu component to manage agent configurations. Allows users to select and configure available agents based on their permissions.

## Imports
### Stdlib
- REACT (as namespace)

### Internal
- `AgentsMenu` from `.././components/agents/AgentsMenu`
- `ToolUseContext` type from `.././Tool`
- `getTools` from `.././tools`
- `LocalJSXCommandOnDone` type from `.././types/command`

## Logic
The `call` function is the entry point for this command. It:
1. Extracts the app state from the tool use context.
2. Gets the permission context from the app state.
3. Retrieves the list of available tools using `getTools(permissionContext)`.
4. Returns the `AgentsMenu` UI component, passing the tools and an `onExit` callback.

## Exports
- `call` (async function) - Main command handler that renders the agents menu interface