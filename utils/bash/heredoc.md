# utils/bash/heredoc

## Purpose
Heredoc extraction and restoration utilities for shell-quote parsing compatibility.

## Imports
- **Stdlib**: `crypto`
- **External**: (none)
- **Internal**: (none)

## Logic
1. shell-quote parses `<<` as two separate `<` operators, breaking heredoc syntax
2. Supports: <<WORD, <<'WORD', <<"WORD", <<-WORD, <<-'WORD'
3. `generatePlaceholderSalt` - 8 random bytes as hex (16 chars) for uniqueness
4. `HEREDOC_PLACEHOLDER_PREFIX/SUFFIX` - __HEREDOC_N__ format
5. `HEREDOC_START_PATTERN` - regex for heredoc start syntax
6. Quoted delimiters: backslash inside capture group (<<'\EOF' → \EOF)
7. Unquoted delimiters: backslash outside capture (<<\EOF → EOF)
8. SECURITY: backslash position critical for preventing command smuggling
9. Uses [ \t]* not \s* to avoid matching across newlines
10. `HeredocInfo` - fullText, delimiter, operatorStartIndex, operatorEndIndex
11. `extractHeredocs` - extracts heredocs before parsing
12. `restoreHeredocs` - restores heredocs after parsing
13. When extraction fails, command passes through unchanged (safe fallback)

## Exports
- `HeredocInfo` - heredoc info type
- `extractHeredocs` - extracts heredocs from command
- `restoreHeredocs` - restores heredocs to command
- `HEREDOC_START_PATTERN` - heredoc start regex
