# Remote Environment Command (`remote-env`)

## Purpose
Renders a dialog to configure the default remote environment for teleport sessions.

## Imports
### Stdlib
- REACT

### Internal
- `RemoteEnvironmentDialog` component from `.././components/RemoteEnvironmentDialog`
- `LocalJSXCommandOnDone` type from `.././types/command`

## Logic
The `call` async function returns the `<RemoteEnvironmentDialog>` UI component with the `onDone` callback.

## Exports
- `call` (async function) - Renders the remote environment configuration dialog