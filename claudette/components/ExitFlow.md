## Purpose
Manages the exit flow, optionally showing a worktree dialog before gracefully shutting down the application.

## Imports
- **Stdlib**: none
- **External**: REACT, REACT_COMPILER, `lodash-es/sample`
- **Internal**: `utils/gracefulShutdown`, `components/WorktreeExitDialog`

## Logic
1. Defines a set of random goodbye messages for exit
2. When showWorktree is true, renders a WorktreeExitDialog with exit and cancel handlers
3. On exit, calls the done callback with either a provided message or a random goodbye, then initiates graceful shutdown
4. Returns null when worktree display is not needed

## Exports
- `ExitFlow` - conditionally renders a worktree exit dialog and manages the shutdown sequence
