# BashTool/pathValidation.ts

## Purpose

Validates filesystem path access for Bash commands. Enforces that commands operate only within allowed working directories. Provides command-specific path extraction, handles safe wrapper stripping (timeout, nice, env, etc.), validates output redirections, blocks dangerous operations (rm on critical paths, cd then write), and integrates with permission system. Supports both string-based and AST-based (preferred) parsing.

## Imports

- **Stdlib**: `os/homedir`, `path` (`isAbsolute`, `resolve`)
- **External**: `zod/v4` (type `z`)
- **Internal**:
  - Tool: `ToolPermissionContext`, `BashTool` (inputSchema)
  - Bash AST: `Redirect`, `SimpleCommand`
  - Bash utils: `extractOutputRedirections`, `splitCommand_DEPRECATED`, `tryParseShellCommand`
  - Path: `getDirectoryForPath`
  - Permissions filesystem: `allWorkingDirectories`
  - Permission types: `PermissionResult`, `PermissionUpdate`, `PermissionUpdateSchema`
  - Permission helpers: `createReadRuleSuggestion`
  - Path validation utils: `expandTilde`, `FileOperationType`, `formatDirectoryList`, `isDangerousRemovalPath`, `validatePath`
  - Bash permissions: `stripSafeWrappers`
  - Sed validation: `sedCommandIsAllowedByAllowlist`

## Logic

**Type** `PathCommand`: Union of supported path-accessing commands (cd, ls, find, mkdir, touch, rm, rmdir, mv, cp, cat, head, tail, sort, uniq, wc, cut, paste, column, tr, file, stat, diff, awk, strings, hexdump, od, base64, nl, grep, rg, sed, git, jq, sha256sum, sha1sum, md5sum)

**Constants**:
- `SUPPORTED_PATH_COMMANDS`: Object.keys(PATH_EXTRACTORS) as PathCommand[]
- `ACTION_VERBS`: Map from command → human-readable verb phrase (e.g., rm → "remove files from")
- `COMMAND_OPERATION_TYPE`: Maps each command to `FileOperationType` ('read', 'write', 'create')
- `COMMAND_VALIDATOR`: Partial validators; currently blocks mv/cp with any flags (security: some flags bypass path extraction)

**Path Extractors** (`PATH_EXTRACTORS`):
Each command has a function extracting paths from args:
- `cd`: joins all args, defaults to homedir
- `ls`, `mkdir`, `touch`, etc.: `filterOutFlags`, defaults to '.' for ls/find
- `find`: Complex; collects search roots before first non-global flag; also handles path-taking flags (`-newer`, `-path`, etc.); defaults to '.'; handles `--` delimiter
- `tr`: Skips SET1/SET2; if `-d`, skips one more
- `grep`/`rg`/`jq`: Pattern-first commands; use `parsePatternCommand` with command-specific flag sets; defaults vary
- `sed`: Finds script (first non-flag or via `-e`/`-f`); rest are file paths; handles `--`; script files included in paths
- `git`: Only validates `git diff --no-index` (first 2 file paths after `--`); other git commands don't need path validation
- All others: `filterOutFlags`

**Core Functions**:
- `filterOutFlags(args)`: Returns positional args only, respecting `--` delimiter. Critical security: prevents bypass when paths start with `-`.
- `checkDangerousRemovalPaths(command, args, cwd)`: For rm/rmdir, expands and resolves each path; calls `isDangerousRemovalPath` (critical system directories); returns 'ask' if dangerous, else 'passthrough'.
- `validateCommandPaths(command, args, cwd, context, compoundCommandHasCd?, operationTypeOverride?)`:
  - Gets extractor and paths
  - Runs COMMAND_VALIDATOR if present (e.g., mv/cp with flags → 'ask')
  - Blocks compound write after 'cd' (security: can't track final cwd)
  - For each path, calls `validatePath` with operationType; aggregates first non-passthrough result; adds suggestions for ask results
- `createPathChecker(command, operationTypeOverride?)`: Returns function that:
  - Calls `validateCommandPaths`
  - For rm/rmdir, also runs `checkDangerousRemovalPaths` after explicit denies but before other results
  - Adds suggestions (read: directory rule; write/create: addDirectories + acceptEdits mode suggestion)
- `parseCommandArguments(cmd)`: Uses `tryParseShellCommand` (with `$$env` custom env); converts glob objects to strings; returns string[]; empty on parse failure.
- `validateSinglePathCommand(cmd, cwd, context, compoundCommandHasCd?)`:
  - Strips safe wrappers (timeout, nice, stdbuf, env, nohup, time)
  - Parses args; extracts base command; if not supported → passthrough
  - For sed: if `sedCommandIsAllowedByAllowlist` (read-only pattern) → override operationType to 'read'
  - Calls `createPathChecker` pathChecker
- `validateSinglePathCommandArgv(argv, ...)`: AST version; strips wrappers from argv; same logic without shell-quote parsing
- `validateOutputRedirections(redirections, cwd, context, compoundCommandHasCd?)`:
  - Blocks if redirection with cd in compound command
  - Validates each redirection target (except /dev/null) with `validatePath` (operationType 'create')
  - Returns deny/ask with suggestions; passthrough if all safe
- `checkPathConstraints(input, cwd, context, compoundCommandHasCd?, astRedirects?, astCommands?)`:
  - Detects process substitution `>(...)` or `<(...)` → 'ask'
  - Gets redirections (prefer AST; else `extractOutputRedirections`); if dangerous shell expansion syntax → 'ask'
  - Validates redirections first
  - Iterates commands: if AST commands available use `validateSinglePathCommandArgv`, else `validateSinglePathCommand` via `splitCommand_DEPRECATED`
  - Returns first 'ask' or 'deny'; else 'passthrough'
- `astRedirectsToOutputRedirections(redirects)`: Converts AST Redirect[] to {target, operator} array; filters input redirects; fd duplications skipped; hasDangerousRedirection always false (AST already validated)
- `stripWrappersFromArgv(argv)`: Strips wrapper commands from AST argv; handles:
  - `time`/`nohup`: simple prefix strip
  - `timeout`: parses flags (`--foreground`, `--preserve-status`, `--verbose`, `--kill-after=`, `--signal=`, `--`, `-k`, `-s`, `-[ks]value`, `-[v]`); rejects unknown flags; returns unchanged on parse failure; extracts duration token; slices past it
  - `nice`: handles `nice -n N`, `nice -N`, `nice cmd`, `nice -- cmd`
  - `stdbuf`: parses `-i|-o|-e` (space or fused), `--input=`, `--output=`, `--error=`, `--`; rejects unknown flags
  - `env`: parses `VAR=val` pairs, `-i`, `-0`, `-v`, `-u NAME`; rejects `-S`, `-C`, `-P`; returns command after flags
  - Returns the innermost command after stripping all layers iteratively

**Security Critical**:
- Handles `--` end-of-options delimiter correctly throughout to avoid bypass
- Wrapper stripping ensures wrapped dangerous commands are still validated
- Process substitution blocked
- Shell expansion in redirection targets blocked
- Compound command with `cd` then write blocked
- sed command allowlist ensures only safe edits are treated as read; else default write

## Exports

- `PathCommand` type
- `checkPathConstraints(input: z.infer<typeof BashTool.inputSchema>, cwd: string, toolPermissionContext: ToolPermissionContext, compoundCommandHasCd?: boolean, astRedirects?: Redirect[], astCommands?: SimpleCommand[]): PermissionResult`
- `stripWrappersFromArgv(argv: string[]): string[]`
- (internal) `PATH_EXTRACTORS`, `COMMAND_OPERATION_TYPE`, `COMMAND_VALIDATOR`, `createPathChecker`, `validateSinglePathCommand`, `validateSinglePathCommandArgv`, `validateOutputRedirections`, etc.
