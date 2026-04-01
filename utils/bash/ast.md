# utils/bash/ast

## Purpose
AST-based bash command analysis using tree-sitter for security classification.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: bashParser, parser types

## Logic
1. FAIL-CLOSED design: never interprets structure not explicitly allowlisted
2. `Redirect` - op, target, fd for bash redirects
3. `SimpleCommand` - argv, envVars, redirects, text span
4. `ParseForSecurityResult` - simple, too-complex, parse-unavailable
5. STRUCTURAL_TYPES - program, list, pipeline, redirected_statement
6. SEPARATOR_TYPES - &&, ||, |, ;, &, |&, \n
7. CMDSUB_PLACEHOLDER - placeholder for $() output in argv
8. Recursively extracts $() commands for separate permission checking
9. Handles variable assignments and substitutions
10. Returns 'too-complex' for unallowlisted node types
11. Returns 'parse-unavailable' when tree-sitter unavailable
12. NOT a sandbox - answers "can we produce trustworthy argv?"

## Exports
- `Redirect` - redirect type
- `SimpleCommand` - simple command type
- `ParseForSecurityResult` - parse result type
- (AST analysis functions)
