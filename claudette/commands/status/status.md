# Status Command (`status`)

## Purpose
Opens the Settings UI with the "Status" tab active, displaying Claudette status information including version, model, account, API connectivity, and tool statuses.

## Imports
### Stdlib
- REACT

### Internal
- `LocalJSXCommandContext` type from `.././commands`
- `Settings` component from `.././components/Settings/Settings`
- `LocalJSXCommandOnDone` type from `.././types/command`

## Logic
The `call` async function receives `onDone` and `context`. It renders the `<Settings>` component with:
- `onClose={onDone}`
- `context={context}`
- `defaultTab="Status"`

This shows the status pane by default.

## Exports
- `call` (async function) - Renders the Settings UI on the Status tab