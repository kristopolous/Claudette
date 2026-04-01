# utils/bash/bashPipeCommand

## Purpose
Rearranges piped commands to place stdin redirect after first command.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: shellQuote

## Logic
1. Fixes eval treating entire piped command as single unit
2. Skips backticks - shell-quote doesn't handle them well
3. Skips $() - shell-quote parses incorrectly as separate operators
4. Skips $VAR/${VAR} - shell-quote expands to empty, silently dropping
5. Skips control structures (for/while/until/if/case/select)
6. Joins continuation lines (shell-quote doesn't handle \<newline>)
7. Skips commands with newlines (real separators, not whitespace)
8. SECURITY: shell-quote treats \' inside single quotes as escape
9. Bash treats \' as literal \ followed by closing quote
10. Pattern '\'' <payload> '\'' hides operators like ; from token stream
11. Falls back to quoteWithEvalStdinRedirect for all skip cases
12. Handles unbalanced delimiters signaling shell-quote misparse

## Exports
- `rearrangePipeCommand` - rearranges piped command with stdin redirect
