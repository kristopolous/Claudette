## Purpose
Exits the REPL, handling background sessions and worktree prompts.

## Imports
- **Stdlib**: `child_process` (spawnSync)
- **External**: `lodash-es/sample`, `react`
- **Internal**: `ExitFlow` component, `LocalJSXCommandOnDone`, `isBgSession`, `gracefulShutdown`, `getCurrentWorktreeSession`

## Logic
`call` checks if running in a background tmux session (BG_SESSIONS feature); if so, detaches instead of killing. If a worktree session is active, shows the `<ExitFlow>` dialog to handle worktree cleanup. Otherwise, displays a random goodbye message and calls `gracefulShutdown`.

## Exports
- `call` - JSX command function
