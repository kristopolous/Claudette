# utils/execFileNoThrow

## Purpose
Provides execa-based command execution wrappers with error handling and cross-platform compatibility.

## Imports
- **Stdlib**: (none)
- **External**: `execa`
- **Internal**: cwd, log, execFileNoThrowPortable

## Logic
1. `MS_IN_SECOND` (1000), `SECONDS_IN_MINUTE` (60) - time constants
2. `ExecFileOptions` - abortSignal, timeout, preserveOutputOnError, useCwd, env, stdin, input
3. Default timeout: 10 minutes
4. `execFileNoThrow` - executes command without throwing
5. Uses execFileNoThrowWithCwd with default options
6. `ExecFileWithCwdOptions` - extended options with maxBuffer, cwd, shell
7. `execFileNoThrowWithCwd` - executes with cwd support
8. Uses execa with abort signal, timeout, cwd, env
9. Handles stdin inheritance or pipe with input
10. `getErrorMessage` - extracts human-readable error from execa result
11. Priority: shortMessage, signal, errorCode
12. `execSyncWithDefaults_DEPRECATED` - deprecated sync wrapper
13. Preserves output on error for debugging
14. Handles Windows BAT/CMD files automatically via execa
15. Cross-platform shell escaping

## Exports
- `execFileNoThrow` - executes command without throwing
- `execFileNoThrowWithCwd` - executes with cwd support
- `execSyncWithDefaults_DEPRECATED` - deprecated sync wrapper
- (Execution option types)
