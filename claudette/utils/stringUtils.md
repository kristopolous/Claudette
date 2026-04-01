# utils/stringUtils

## Purpose
Provides general string utility functions and classes for safe string accumulation.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: (none)

## Logic
1. `escapeRegExp` - escapes special regex characters for literal pattern use
2. `capitalize` - uppercases first character, leaves rest unchanged
3. Unlike lodash capitalize, does NOT lowercase remaining characters
4. `plural` - returns singular or plural form based on count
5. Replaces inline `word${n === 1 ? '' : 's'}` idiom
6. `firstLineOf` - returns first line without allocating split array
7. Used for shebang detection in diff rendering
8. `countCharInString` - counts occurrences of char in str using indexOf jumps
9. Structurally typed so Buffer works too (Buffer.indexOf accepts string needles)
10. `normalizeFullWidthDigits` - normalizes full-width (zenkaku) digits to half-width
11. Useful for accepting input from Japanese/CJK IMEs
12. `normalizeFullWidthSpace` - normalizes full-width space to half-width space
13. Useful for accepting input from Japanese/CJK IMEs (U+3000 → U+0020)
14. `truncate` - truncates string to max length with ellipsis
15. `padLeft`, `padRight` - pads string to length
16. `stripAnsi` - strips ANSI escape codes from string
17. `wordWrap` - wraps text to specified width
18. `indent` - indents each line of string
19. `dedent` - removes common leading whitespace
20. `camelCase`, `kebabCase`, `snakeCase` - case conversion functions
21. `startsWithIgnoreCase` - case-insensitive startsWith
22. `endsWithIgnoreCase` - case-insensitive endsWith
23. `containsIgnoreCase` - case-insensitive contains

## Exports
- `escapeRegExp` - escapes regex characters
- `capitalize` - capitalizes first character
- `plural` - returns plural form
- `firstLineOf` - gets first line
- `countCharInString` - counts char occurrences
- `normalizeFullWidthDigits` - normalizes full-width digits
- `normalizeFullWidthSpace` - normalizes full-width space
- `truncate` - truncates string
- `padLeft`, `padRight` - pads string
- `stripAnsi` - strips ANSI codes
- `wordWrap` - wraps text
- `indent` - indents lines
- `dedent` - removes common whitespace
- `camelCase`, `kebabCase`, `snakeCase` - case conversion
- `startsWithIgnoreCase` - case-insensitive startsWith
- `endsWithIgnoreCase` - case-insensitive endsWith
- `containsIgnoreCase` - case-insensitive contains
