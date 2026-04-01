## Purpose
Renders a progress UI with animated spinner and step indicators for session teleportation operations.

## Imports
- **Stdlib**: none
- **External**: `react`, `react/compiler-runtime`, `figures`
- **Internal**: `ink`, `state/AppState`, `utils/teleport`

## Logic
1. Displays a spinning animation with a list of teleport steps (validating, fetching logs, getting branch info, checking out branch)
2. Marks each step as complete (green tick), current (spinning icon), or pending (circle)
3. The `teleportWithProgress` function renders the progress UI into an existing root, drives the step state through the teleport resume process, checks out the branch, and returns processed messages with the branch name

## Exports
- `TeleportProgress` - React component that shows the current teleport step with a spinner and step list
- `teleportWithProgress` - async function that orchestrates the full teleport flow with progress UI, returning messages and branch name
