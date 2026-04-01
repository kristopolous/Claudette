# utils/bash/shellQuoting

## Purpose
Quotes shell commands appropriately, preserving heredocs and multiline strings.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: shellQuote

## Logic
1. `containsHeredoc` - detects heredoc patterns (<<EOF, <<'EOF', <<"EOF", <<-EOF, etc.)
2. Excludes bit-shift operators (<< in numeric contexts)
3. `containsMultilineString` - detects multiline strings in quotes
4. Handles escaped quotes within multiline strings
5. `quoteShellCommand` - quotes command with heredoc/multiline awareness
6. For heredocs/multilines: uses single quotes with escaped single quotes
7. Escaped single quote: ' → '"'"'
8. Doesn't add stdin redirect for heredocs (they provide own input)
9. For regular commands: uses shell-quote library
10. Optional stdin redirect (< /dev/null) for non-heredoc commands
11. `hasStdinRedirect` - checks if command already has stdin redirect
12. Excludes heredoc (<<), bit-shift (<<), process substitution (<()

## Exports
- `containsHeredoc` - detects heredoc patterns
- `containsMultilineString` - detects multiline strings
- `quoteShellCommand` - quotes shell command appropriately
- `hasStdinRedirect` - checks for existing stdin redirect
