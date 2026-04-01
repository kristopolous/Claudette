## Purpose
Security validation layer for bash commands: detects dangerous patterns, command injection, shell metacharacters, obfuscation, and parser differentials between shell-quote and bash.

## Imports
- **Stdlib**: None
- **External**: None
- **Internal**:
  - `services/analytics/index` - `logEvent`
  - `utils/bash/heredoc` - `extractHeredocs`
  - `utils/bash/ParsedCommand` - `ParsedCommand`
  - `utils/bash/shellQuote` - `hasMalformedTokens`, `hasShellQuoteSingleQuoteBug`, `tryParseShellCommand`
  - `utils/bash/treeSitterAnalysis` - `TreeSitterAnalysis` type
  - `utils/permissions/PermissionResult` - `PermissionResult`
  - `tools/BashTool/bashPermissions` - `bashCommandIsSafe_DEPRECATED` (deprecated sync validator)

## Logic
The module provides both sync (`bashCommandIsSafe_DEPRECATED`) and async (`bashCommandIsSafeAsync_DEPRECATED`) validators that run a comprehensive suite of checks:

**Core approach:**
- Extract quote contexts (with/without quotes) and process heredocs.
- Build a `ValidationContext` containing the original command and parsed variants.
- Run validators in order: early allow (empty, safe heredoc, git commit with simple message) → misparsing checks → other validators.
- Misparsing validators (e.g., CR, backslash-escaped operators, brace expansion) return `ask` with `isBashSecurityCheckForMisparsing` flag, causing early block in `bashPermissions`. Non-misparsing asks are deferred and may be overridden by a later misparsing ask.
- Tree-sitter analysis, when available, enriches quote context and can short-circuit some checks (e.g., no operator nodes → skip backslash-escaped operator check).

**Key validators:**
- `validateEmpty`: allows empty commands.
- `validateIncompleteCommands`: detects fragments (leading tab, starting with `-`, starting with operator).
- `validateSafeCommandSubstitution`: early-allow for `$(cat <<'DELIM'...)` with strict requirements; rejects unsafe.
- `validateGitCommit`: allows simple `git commit -m "msg"`; rejects command substitutions, redirects, and backslashes in message; checks for obfuscated flags.
- `validateJqCommand`: blocks `jq.system()` and flags (`-f`, `--from-file`, etc.).
- `validateShellMetacharacters`: finds `;`, `|`, `&` in arguments (including inside single quotes in glob patterns).
- `validateDangerousVariables`: flags variables in redirection/pipe contexts (`< $VAR`, `$VAR |`).
- `validateDangerousPatterns`: detects backticks, `$()`, `${}`, `$[]`, process substitution `<()`, `>()`, Zsh features, PowerShell comments.
- `validateRedirections`: asks on `<` or `>` (input/output redirection).
- `validateObfuscatedFlags`: complex logic to block flag obfuscation via ANSI-C quoting `$'...'`, locale quoting `$"..."`, empty quote pairs, consecutive quotes, and quote-adjacent dash patterns. Handles `cut -d` exception.
- `validateBackslashEscapedWhitespace`: flags `\ ` or `\\t` outside quotes (tokenization differential).
- `validateBackslashEscapedOperators`: flags `\;`, `\|`, `\&`, `\<`, `\>` outside quotes — exploits splitCommand double-parse bug. Tree-sitter can skip if no operator nodes.
- `validateBraceExpansion`: detects `{a,b}` or `{1..5}` after considering quote stripping and backslash escapes; includes mismatch detection (excess `}` after stripping) and quoted-brace-in-brace-context check.
- `validateZshDangerousCommands`: blocks `zmodload`, `emulate -c`, and dangerous Zsh builtins (`sysopen`, `sysread`, `syswrite`, `sysseek`, `zpty`, `ztcp`, `zsocket`, `mapfile`, `zf_*`).
- `validateUnicodeWhitespace`: asks on Unicode whitespace (e.g., `\u00A0`) that shell-quote splits but bash treats as literal.
- `validateMidWordHash`: finds `#` preceded by non-whitespace (mid-word comment start) — parser differential.
- `validateCommentQuoteDesync`: detects quotes inside `#` comments that desync quote trackers.
- `validateQuotedNewline`: finds newline inside quotes where next line starts with `#` (comment-stripping bypass).
- `validateProcEnvironAccess`: asks on access to `/proc/*/environ`.
- `validateIFSInjection`: asks on `$IFS` or `${...IFS...}`.
- `validateMalformedTokenInjection`: asks when malformed tokens (unbalanced delimiters) appear alongside command separators.

**Analytics:** Each check logs `tengu_bash_security_check_triggered` with a numeric `checkId` and optional `subId`.

**Deprecation:** These functions are legacy; the primary path uses tree-sitter via `parseForSecurity` (`ast.ts`). However, they remain critical fallbacks and for components still on the sync path.

## Exports
- `bashCommandIsSafeAsync_DEPRECATED` - async function `(command: string, onDivergence?: () => void) => Promise<PermissionResult>`
- `bashCommandIsSafe_DEPRECATED` - sync function `(command: string) => PermissionResult` (deprecated)
- `stripSafeHeredocSubstitutions` - strips safe heredoc substitutions, returns `string | null`
- `hasSafeHeredocSubstitution` - boolean check for safe heredoc substitution
