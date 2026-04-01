# BashTool/sedValidation.ts

## Purpose

Provides strict allowlist/denylist validation for `sed` commands used in BashTool. Allows only two safe patterns: line printing (`sed -n 'Np'`) and substitution (`sed 's/old/new/flags'`) with limited flags. Blocks dangerous operations (file writes, command execution, complex addressing). Used by permission system to determine if sed requires user approval.

## Imports

- **Stdlib**: None
- **External**: None
- **Internal**:
  - Tool: `ToolPermissionContext`
  - Bash utils: `splitCommand_DEPRECATED`, `tryParseShellCommand`, `bashPermissionRule`, `matchWildcardPattern`
  - Permissions: `PermissionResult`

## Logic

**Helper**:
- `validateFlagsAgainstAllowlist(flags, allowedFlags)`: Checks each flag, including combined short flags (e.g., `-nE` splits into `-n`, `-E`)

**Allowlist Patterns**:
- **Pattern 1: Line Printing** (`isLinePrintingCommand`):
  - Command starts with `sed`
  - Flags allowlist: `-n`, `--quiet`, `--silent`, `-E`, `--regexp-extended`, `-r`, `-z`, `--zero-terminated`, `--posix`
  - Must include `-n` (or `--quiet`/`--silent`) to suppress default output
  - Expressions must all be print commands (`isPrintCommand`): `p`, `Np`, `N,Mp`
  - Semicolons allowed to separate multiple print commands
- **Pattern 2: Substitution** (`isSubstitutionCommand`):
  - Must have exactly one expression starting with `s`
  - Parses `s/pattern/replacement/flags` with `/` delimiter only
  - Requires exactly 2 delimiters in substitution part
  - Flags limited to `g`, `p`, `i`, `I`, `m`, `M`, and optionally one digit `1-9`
  - When `allowFileWrites=true` (acceptEdits mode), also allows `-i` or `--in-place` flag
  - File arguments allowed only when `allowFileWrites`

**Dangerous Operations Denylist** (`containsDangerousOperations`):
Rejects if expression contains:
- Non-ASCII characters (homoglyphs)
- Curly braces `{}`
- Newlines
- Comments `#` (unless immediately after `s` as delimiter)
- Negation operator `!` in various positions
- GNU tilde `~` address
- Leading comma or comma with `+/-`
- Backslash alternate delimiters (`s\|`, `\#`, etc.)
- Escaped slash followed by `w/W`
- Malformed substitution patterns
- Write commands `w`/`W` in any address context
- Execute commands `e`/`E` in any context
- `y` command with `w/W/e/E`
- Any `s` command ending with `w/W/e/E` in flags (for non-slash delimiters)

**Main Export**:
- `sedCommandIsAllowedByAllowlist(command, options?)`: Extracts expressions, checks file args, tests Pattern1 or Pattern2, ensures no semicolons in Pattern2, runs denylist. Returns boolean.
- `checkSedConstraints(input, toolPermissionContext)`: Used by permission system. Splits compound commands, checks each `sed` command. In `acceptEdits` mode allows file writes. Returns `{behavior: 'ask'}` if not allowed; else `{behavior: 'passthrough'}`.

## Exports

- `validateFlagsAgainstAllowlist(flags: string[], allowedFlags: string[]): boolean`
- `isLinePrintingCommand(command: string, expressions: string[]): boolean`
- `isPrintCommand(cmd: string): boolean`
- `isSubstitutionCommand(command: string, expressions: string[], hasFileArguments: boolean, options?: {allowFileWrites?: boolean}): boolean`
- `sedCommandIsAllowedByAllowlist(command: string, options?: {allowFileWrites?: boolean}): boolean`
- `hasFileArgs(command: string): boolean`
- `extractSedExpressions(command: string): string[]`
- `containsDangerousOperations(expression: string): boolean`
- `checkSedConstraints(input: {command: string}, toolPermissionContext: ToolPermissionContext): PermissionResult`
