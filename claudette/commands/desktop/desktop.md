# Desktop Command (`desktop`)

## Purpose
Renders the DesktopHandoff component to continue the current conversation session in Claude Desktop. This command transfers the session to the desktop application.

## Imports
### Stdlib
- REACT

### Internal
- `CommandResultDisplay` type from `.././commands`
- `DesktopHandoff` component from `.././components/DesktopHandoff`

## Logic
The `call` async function simply renders the `DesktopHandoff` component, passing the `onDone` callback. The component handles the handoff logic.

## Exports
- `call` (async function) - Renders the DesktopHandoff component