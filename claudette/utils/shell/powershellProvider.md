# powershellProvider

## Purpose
Provides a `ShellProvider` implementation for PowerShell, handling command execution, sandbox support, cwd tracking, and environment variable propagation.

## Imports
- **Stdlib**: os, path, path/posix
- **External**: (none)
- **Internal**: ../sessionEnvVars, ./shellProvider

## Logic
1. `buildPowerShellArgs(cmd)` - returns `['-NoProfile', '-NonInteractive', '-Command', cmd]` for spawning pwsh
2. `encodePowerShellCommand(psCommand)` - base64-encodes a string as UTF-16LE for PowerShell's `-EncodedCommand`; avoids shell-quoting corruption (e.g. `!$?` becoming `\!$?` in sandbox's shellquote.quote)
3. `createPowerShellProvider(shellPath)` - returns a `ShellProvider` with:
   - `type: 'powershell'`, `detached: false`
   - `buildExecCommand(command, opts)` - builds the command string and cwd tracking file path. In sandbox mode, invokes pwsh with `-EncodedCommand` (base64) inside `/bin/sh -c` because the sandbox hardcodes `-c`. Out of sandbox, returns the raw PS command. Appends cwd-tracking + exit-code capture suffix (`$LASTEXITCODE` fallback to `$?`) to every command.
   - `getSpawnArgs(commandString)` - wraps command with `buildPowerShellArgs()`
   - `getEnvironmentOverrides()` - applies session env vars (from `/env`) first, then sets `TMPDIR`/`CLAUDE_CODE_TMPDIR` to sandbox tmp dir if sandboxed. Session vars are applied first so sandbox isolation can't be overridden by `/env TMPDIR=...`.
4. Exit-code capture uses `$LASTEXITCODE` (native exe) with fallback to `$?` (cmdlets), avoiding false positives from stderr-redirected native commands on PS 5.1

## Exports
- `buildPowerShellArgs` - builds PowerShell invocation flags array
- `createPowerShellProvider` - creates a PowerShell ShellProvider instance

## Source
`powershellProvider`
