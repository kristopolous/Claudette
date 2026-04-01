# utils/bash/commands

## Purpose
Provides bash command parsing and placeholder generation for security.

## Imports
- **Stdlib**: `crypto`
- **External**: `shell-quote`
- **Internal**: shell/prefix, heredoc, shellQuote

## Logic
1. `generatePlaceholders` - generates salted placeholders to prevent injection
2. Salt prevents malicious commands containing literal placeholder strings
3. Placeholders: SINGLE_QUOTE, DOUBLE_QUOTE, NEW_LINE, ESCAPED_OPEN/CLOSE_PAREN
4. ALLOWED_FILE_DESCRIPTORS - 0, 1, 2 (stdin, stdout, stderr)
5. `isStaticRedirectTarget` - checks if redirect target is safe to strip
6. Rejects targets with whitespace/quotes (merged args signal)
7. Rejects empty string (path.resolve returns cwd, always allowed)
8. Rejects # prefix (shell-quote comment vs bash comment differential)
9. Rejects ! (history expansion), = (Zsh equals expansion)
10. Rejects $, `, *, ?, [, {, ~, (, <, & (dynamic content)
11. `parseCommandForSecurity` - parses command for security classification
12. `extractOutputRedirections` - extracts output redirections from command
13. `splitCommandWithOperators` - splits command at operators
14. `quoteWithEvalStdinRedirect` - quotes command with eval stdin redirect

## Exports
- `generatePlaceholders` - generates salted placeholders
- `ALLOWED_FILE_DESCRIPTORS` - allowed file descriptors set
- `isStaticRedirectTarget` - checks static redirect target
- `parseCommandForSecurity` - parses command for security
- `extractOutputRedirections` - extracts output redirections
- `splitCommandWithOperators` - splits command at operators
- `quoteWithEvalStdinRedirect` - quotes with eval stdin redirect
