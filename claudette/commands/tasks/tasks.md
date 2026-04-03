# Tasks Command (`tasks`)

## Purpose
Opens a dialog to list and manage background tasks, including running subprocesses and MCP servers. Provides visibility and control over asynchronous operations.

## Imports
### Stdlib
- REACT

### Internal
- `LocalJSXCommandContext` type from `.././commands`
- `BackgroundTasksDialog` component from `.././components/tasks/BackgroundTasksDialog`
- `LocalJSXCommandOnDone` type from `.././types/command`

## Logic
The `call` async function receives `onDone` and `context`. It renders the `<BackgroundTasksDialog>` component, passing:
- `toolUseContext={context}`
- `onDone={onDone}`

## Exports
- `call` (async function) - Renders the background tasks management dialog