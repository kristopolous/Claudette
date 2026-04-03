# utils/bash/ShellSnapshot

## Purpose
Creates shell function snapshots for ripgrep and other embedded tools.

## Imports
- **Stdlib**: `child_process`, `fs/promises`, `os`, `path`
- **External**: `execa`
- **Internal**: analytics, cleanupRegistry, cwd, debug, embeddedTools, envUtils, file, fsOperations, log, platform, ripgrep, shellQuote, subprocessEnv

## Logic
1. `LITERAL_BACKSLASH` - '\\' constant
2. `SNAPSHOT_CREATION_TIMEOUT` (10s) - timeout for snapshot creation
3. `createArgv0ShellFunction` - creates shell function with ARGV0 dispatch
4. Uses embedded binary ARGV0 trick for embedded tools (rg, bfs, ugrep)
5. Handles ZSH, Windows (msys/cygwin/win32), bash differently
6. Windows uses ARGV0 env var (exec -a doesn't work)
7. Bash subshell uses exec -a for argv0 setting
8. `createRipgrepShellIntegration` - creates rg alias or function
9. Returns { type: 'alias' | 'function', snippet }
10. For embedded ripgrep: creates function with argv0 dispatch
11. For system ripgrep: creates simple alias
12. `createShellSnapshot` - creates full shell snapshot
13. Writes snapshot to ~/.claude/shell-snapshot.sh
14. Registers cleanup for snapshot removal
15. Logs analytics for snapshot creation

## Exports
- `LITERAL_BACKSLASH` - backslash constant
- `SNAPSHOT_CREATION_TIMEOUT` - timeout constant
- `createArgv0ShellFunction` - creates argv0 shell function
- `createRipgrepShellIntegration` - creates rg integration
- `createShellSnapshot` - creates shell snapshot
