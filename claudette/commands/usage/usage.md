# Usage Command (`usage`)

## Purpose
Opens the Settings UI with the "Usage" tab active, displaying the current plan's usage limits and consumption metrics.

## Imports
### Stdlib
- REACT

### Internal
- `Settings` component from `.././components/Settings/Settings`
- `LocalJSXCommandCall` type from `.././types/command`

## Logic
The `call` async function receives `onDone` and `context`. It renders the `<Settings>` component with:
- `onClose={onDone}`
- `context={context}`
- `defaultTab="Usage"`

This shows the usage pane by default.

## Exports
- `call` (async function) - Renders the Settings UI on the Usage tab