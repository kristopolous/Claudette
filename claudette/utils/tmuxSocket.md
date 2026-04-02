# tmuxSocket

## Purpose
Manages an isolated tmux socket (`claude-<PID>`) for Claude's operations, preventing interference with the user's tmux sessions.

## Imports
- **Stdlib**: path (posix)
- **Internal**: ./cleanupRegistry, ./debug, ./errors, ./execFileNoThrow, ./log, ./platform

## Logic
**Why this exists**: Without isolation, Claude running `tmux kill-session` via Bash would kill the user's current session if they started Claude from within tmux.

**How it works**:
1. Claude creates its own tmux socket: `claude-<PID>`
2. ALL tmux tool commands use this socket via `-L` flag
3. ALL Bash tool commands inherit `TMUX` env var pointing to this socket (set in Shell.ts via `getClaudeTmuxEnv()`)
4. The user's original `TMUX` env var is overridden in all child processes

**Initialization**: Lazy — triggered when Tmux tool is first used or a command includes "tmux". Safe to call multiple times (concurrent calls wait). Graceful degradation if tmux is not installed.

**Windows support**: Routes tmux commands through `wsl -e tmux`. Pins `WSL_INTEROP=/run/WSL/1_interop` to prevent interop socket timeout after the spawning wsl.exe exits.

**Cleanup**: Registered via cleanupRegistry; kills the tmux server on graceful shutdown.

## Exports
- `getClaudeSocketName` - `() => string`. Returns `claude-<PID>` format socket name.
- `getClaudeSocketPath` - `() => string | null`. Returns the resolved socket path, or null if not yet initialized.
- `setClaudeSocketInfo` - `(path, pid) => void`. Sets socket path and server PID after initialization.
- `isSocketInitialized` - `() => boolean`. Returns true if both socketPath and serverPid are set.
- `getClaudeTmuxEnv` - `() => string | null`. Returns `TMUX` env var value: `"socket_path,server_pid,0"`. Used by Shell.ts to override TMUX in child processes.
- `checkTmuxAvailable` - `() => Promise<boolean>`. Checks if tmux is installed (cached after first check). On Windows, checks via `wsl -e tmux -V`.
- `isTmuxAvailable` - `() => boolean`. Returns cached availability status (false if not yet checked).
- `markTmuxToolUsed` - `() => void`. Marks that the Tmux tool has been used; triggers socket initialization for subsequent Bash commands.
- `hasTmuxToolBeenUsed` - `() => boolean`. Returns whether Tmux tool has been used at least once.
- `ensureSocketInitialized` - `() => Promise<void>`. Creates tmux session on Claude's socket. Sets `CLAUDE_CODE_SKIP_PROMPT_HISTORY` globally. Safe to call multiple times. Graceful degradation on failure.
- `resetSocketState` - `() => void`. Resets all module state for testing purposes.

## Source
`tmuxSocket`
