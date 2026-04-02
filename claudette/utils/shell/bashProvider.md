# bashProvider

## Purpose
Creates a bash-based `ShellProvider` that builds shell commands, manages shell snapshots for fast startup, handles sandboxing, and provides environment overrides for tmux isolation and session variables.

## Imports
- **Stdlib**: `bun:bundle` (feature), `fs/promises` (access), `os` (tmpdir), `path` (join, posix join)
- **External**: (none)
- **Internal**: bashPipeCommand, ShellSnapshot, shellPrefix, shellQuote, shellQuoting, debug, platform, sessionEnvironment, sessionEnvVars, tmuxSocket, windowsPaths, shellProvider

## Logic
`createBashShellProvider(shellPath, options?)` returns a `ShellProvider` object with:

**Shell snapshot**: Creates a shell environment snapshot via `createAndSaveSnapshot()` at provider creation time. The snapshot file is sourced before each command to avoid login shell init overhead. If the snapshot disappears (tmpdir cleanup), falls back to login shell (`-l` flag).

**Command building** (`buildExecCommand`):
1. Checks snapshot file existence (guards against mid-session disappearance)
2. Computes POSIX and native cwd file paths (differs on Windows for Git Bash)
3. Normalizes command: rewrites Windows `2>nul` redirects, adds stdin redirect if needed
4. Handles pipe commands specially — moves stdin redirect after first command
5. Assembles command chain: `source snapshot && source session env && disable extglob && eval quotedCommand && pwd -P > cwdFile`
6. Applies `CLAUDE_CODE_SHELL_PREFIX` if set
7. Disables extended glob patterns (bash `extglob`, zsh `EXTENDED_GLOB`) for security against malicious filenames

**Spawn args** (`getSpawnArgs`): Returns `['-c', commandString]` or `['-c', '-l', commandString]` depending on whether a snapshot is available.

**Environment overrides** (`getEnvironmentOverrides`):
- TMUX isolation: sets `TMUX` env var to Claude's isolated socket (deferred until Tmux tool is used)
- Sandbox: sets `TMPDIR`, `CLAUDE_CODE_TMPDIR`, `TMPPREFIX` (for zsh heredocs)
- Session env vars: applies vars set via `/env` command

**Security**: `getDisableExtglobCommand()` disables bash extglob and zsh EXTENDED_GLOB to prevent exploitation via malicious filenames. When `CLAUDE_CODE_SHELL_PREFIX` is set, includes commands for both shells since the wrapper shell may differ from `shellPath`.

## Exports
- `createBashShellProvider(shellPath, options?)` — async factory returning a `ShellProvider` with `type: 'bash'`, `buildExecCommand`, `getSpawnArgs`, and `getEnvironmentOverrides` methods
