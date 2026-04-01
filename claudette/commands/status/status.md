# Status Command (`status`)

## Purpose
Opens the Settings UI with the "Status" tab active, displaying Claudette status information including version, model, account, API connectivity, and tool statuses.

## Imports
### Stdlib
- `react`

### Internal
- `LocalJSXCommandContext` type from `../../commands.js`
- `Settings` component from `../../components/Settings/Settings.js`
- `LocalJSXCommandOnDone` type from `../../types/command.js`

## Logic
The `call` async function receives `onDone` and `context`. It renders the `<Settings>` component with:
- `onClose={onDone}`
- `context={context}`
- `defaultTab="Status"`

This shows the status pane by default.

## Exports
- `call` (async function) - Renders the Settings UI on the Status tab