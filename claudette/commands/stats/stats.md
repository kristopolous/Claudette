# Stats Command (`stats`)

## Purpose
Displays usage statistics and activity information for the current user. Shows an interactive stats dashboard.

## Imports
### Stdlib
- `react`

### Internal
- `Stats` component from `../../components/Stats.js`
- `LocalJSXCommandCall` type from `../../types/command.js`

## Logic
The `call` async function receives `onDone` and renders the `<Stats>` component, passing `onClose={onDone}`.

## Exports
- `call` (async function) - Renders the stats dashboard