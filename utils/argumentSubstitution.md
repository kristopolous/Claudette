# utils/argumentSubstitution

## Purpose
Provides argument substitution for $ARGUMENTS placeholders in skill/command prompts.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: bash shellQuote

## Logic
1. Supports: $ARGUMENTS (full string), $ARGUMENTS[0]/$0 (indexed), $foo (named)
2. `parseArguments` - parses arguments string into array using shell-quote
3. Handles quoted strings properly ("hello world" as single arg)
4. Preserves $KEY variable syntax literally (doesn't expand variables)
5. Falls back to whitespace split if parsing fails
6. Filters to string tokens only (ignores shell operators)
7. `parseArgumentNames` - parses frontmatter 'arguments' field
8. Accepts space-separated string or array of strings
9. Filters empty strings and numeric-only names (conflict with $0, $1)
10. `generateProgressiveArgumentHint` - shows remaining unfilled args
11. Returns "[arg2] [arg3]" format or undefined if all filled
12. `substituteArguments` - substitutes placeholders in prompt
13. Handles $ARGUMENTS, $ARGUMENTS[N], $N, $name patterns
14. `validateArgumentNames` - validates argument names are unique

## Exports
- `parseArguments` - parses arguments string
- `parseArgumentNames` - parses argument names
- `generateProgressiveArgumentHint` - generates argument hint
- `substituteArguments` - substitutes argument placeholders
- `validateArgumentNames` - validates argument names
