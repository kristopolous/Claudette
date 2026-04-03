# Stats Command (`stats`)

## Purpose
Displays usage statistics and activity information for the current user. Shows an interactive stats dashboard.

## Imports
### Stdlib
- REACT

### Internal
- `Stats` component from `.././components/Stats`
- `LocalJSXCommandCall` type from `.././types/command`

## Logic
The `call` async function receives `onDone` and renders the `<Stats>` component, passing `onClose={onDone}`.

## Exports
- `call` (async function) - Renders the stats dashboard