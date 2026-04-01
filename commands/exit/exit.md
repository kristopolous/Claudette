## Purpose
Exit the REPL, shutting down Claude Code gracefully.

## Imports
- **External**: `child_process` (spawnSync), `lodash-es/sample`
- **Internal**: ExitFlow component, bg session check, gracefulShutdown, worktree session utilities

## Logic
1. Local-jsx command that handles exiting the application
2. Checks if running in tmux background session (`claude --bg`) and BG_SESSIONS feature enabled:
   - If yes: detaches tmux client instead of shutting down (session persists)
   - Allows reconnection with `claude attach`
3. Checks if worktree session is active (coordination mode):
   - If yes, shows ExitFlow dialog with worktree options
4. Otherwise: shows random goodbye message and calls gracefulShutdown(0, 'prompt_input_exit')
5. Handles /exit, /quit, Ctrl+C, Ctrl+D — all funnel through REPL's handleExit
6. Command type: 'local-jsx'
7. Aliases: ['quit']

## Exports
- `call` - async LocalJSXCommandCall returning null (shuts down)
- `exit` - Command object with aliases and lazy loader
