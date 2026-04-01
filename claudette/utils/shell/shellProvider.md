# utils/shell/shellProvider

## Purpose
Provides shell provider abstraction for bash and PowerShell.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: (none)

## Logic
1. `SHELL_TYPES` - ['bash', 'powershell']
2. `ShellType` - 'bash' | 'powershell'
3. `DEFAULT_HOOK_SHELL` - 'bash'
4. `ShellProvider` - interface for shell providers
5. `type` - ShellType
6. `shellPath` - path to shell executable
7. `detached` - whether shell is detached
8. `buildExecCommand` - builds full command string including shell-specific setup
9. For bash: source snapshot, session env, disable extglob, eval-wrap, pwd tracking
10. Takes command, opts (id, sandboxTmpDir, useSandbox)
11. Returns { commandString, cwdFilePath }
12. `getSpawnArgs` - gets shell args for spawn (e.g., ['-c', '-l', cmd] for bash)
13. `getEnvironmentOverrides` - gets extra env vars for shell type
14. May perform async initialization (e.g., tmux socket setup for bash)
15. Returns Promise<Record<string, string>>

## Exports
- `SHELL_TYPES` - shell types array
- `ShellType` - shell type
- `DEFAULT_HOOK_SHELL` - default hook shell
- `ShellProvider` - shell provider interface
