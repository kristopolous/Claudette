# utils/bash/ParsedCommand

## Purpose
Interface and implementations for parsed bash commands.

## Imports
- **Stdlib**: (none)
- **External**: `lodash-es/memoize`
- **Internal**: commands, parser, treeSitterAnalysis

## Logic
1. `OutputRedirection` - target, operator ('>' | '>>')
2. `IParsedCommand` interface with originalCommand, toString, getPipeSegments
3. `withoutOutputRedirections` - removes output redirections
4. `getOutputRedirections` - gets output redirections
5. `getTreeSitterAnalysis` - returns tree-sitter analysis or null
6. `RegexParsedCommand_DEPRECATED` - legacy regex/shell-quote fallback
7. Only used when tree-sitter unavailable
8. `splitCommandWithOperators` - splits at | operators for pipe segments
9. `extractOutputRedirections` - extracts > and >> redirections
10. Primary gate is parseForSecurity (ast.ts)
11. Exported for testing purposes
12. Falls back to original command on parse errors

## Exports
- `OutputRedirection` - output redirection type
- `IParsedCommand` - parsed command interface
- `RegexParsedCommand_DEPRECATED` - legacy regex implementation
