# Remote Environment Command (`remote-env`)

## Purpose
Renders a dialog to configure the default remote environment for teleport sessions.

## Imports
### Stdlib
- `react`

### Internal
- `RemoteEnvironmentDialog` component from `../../components/RemoteEnvironmentDialog.js`
- `LocalJSXCommandOnDone` type from `../../types/command.js`

## Logic
The `call` async function returns the `<RemoteEnvironmentDialog>` React component with the `onDone` callback.

## Exports
- `call` (async function) - Renders the remote environment configuration dialog