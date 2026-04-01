# BashTool/readOnlyValidation.ts

## Purpose

Provides unified allowlist-based validation for read-only commands and flags. Determines if a command is safe to execute without elevated permissions by checking against a large configuration table (`COMMAND_ALLOWLIST`) and regex patterns (`READONLY_COMMAND_REGEXES`). Used by BashTool's permission system to enforce read-only operations and block dangerous actions (writes, command execution, network access).

## Imports

- **Stdlib**: None
- **External**: `zod/v4` (for `z.infer`)
- **Internal** (abbreviated):
  - Bash: shell parsing utilities
  - Git: `isCurrentDirectoryBareGitRepo`
  - Permissions: `PermissionResult`
  - Shell validation: `containsVulnerableUncPath`, `*_READ_ONLY_COMMANDS` maps, `validateFlags`
  - Path validation: `PATH_EXTRACTORS`, `PathCommand`
  - Sed validation: `sedCommandIsAllowedByAllowlist`

## Logic

**Type** `CommandConfig`:
- `safeFlags: Record<string, FlagArgType>` — allowed flags and argument types ('none', 'number', 'string', or specific like 'EOF')
- `regex?`: additional regex for whole command
- `additionalCommandIsDangerousCallback?`: custom rejection logic
- `respectsDoubleDash?`: default true

**Allowlist Tables**:
- `COMMAND_ALLOWLIST`: config for 20+ commands (xargs, git, file, sed, sort, man, help, netstat, ps, base64, grep, rg, checksums, tree, date, hostname, info, lsof, pgrep, tput, ss, fd) plus shared imports (Ripgrep, Pyright, Docker)
- `ANT_ONLY_COMMAND_ALLOWLIST`: for `USER_TYPE=ant`; adds gh and aki
- `getCommandAllowlist()`: merges based on USER_TYPE; removes xargs on Windows (UNC risk)

**Safe Xargs Targets**:
- `SAFE_TARGET_COMMANDS_FOR_XARGS`: echo, printf, wc, grep, head, tail — purely read-only

**Legacy Regex Allowlist**:
- `READONLY_COMMANDS`: simple command names (cat, head, tail, id, uname, etc.)
- `READONLY_COMMAND_REGEXES`: patterns built via `makeRegexForSafeCommand` plus specific patterns for echo, claude -h, uniq, pwd, whoami, history, alias, arch, ip addr, ifconfig, jq

**Main Validator** `isCommandSafeViaFlagParsing`:
  1. Parse with `tryParseShellCommand`; reject operators
  2. Match command prefix in allowlist
  3. Special: git ls-remote rejects URLs/SSH/vars
  4. Pre-flag rejections: any `$` in tokens; brace expansion with `{,` or `{..`
  5. `validateFlags` against `safeFlags`, respecting `--` and xargs targets
  6. Optional `regex` test; reject backticks; reject newlines in grep/rg
  7. Run `additionalCommandIsDangerousCallback` (sed, date, hostname, info, lsof, tput)
  8. Return boolean

**Helper**:
- `makeRegexForSafeCommand(command)`: `/^command(?:\s|$)[^<>()$`|{}&;\n\r]*$/` blocks metacharacters

## Exports

- `isCommandSafeViaFlagParsing(command: string): boolean`
