# utils/bash/bashParser

## Purpose
Pure-TypeScript bash parser producing tree-sitter-bash-compatible ASTs.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: (none)

## Logic
1. `TsNode` - type, text, startIndex, endIndex, children
2. startIndex/endIndex are UTF-8 BYTE offsets (not JS string indices)
3. `PARSE_TIMEOUT_MS` (50ms) - wall-clock cap for pathological input
4. `MAX_NODES` (50,000) - node budget cap before OOM
5. `ensureParserInitialized` - no-op for pure-TS parser
6. `getParserModule` - returns parser module
7. Token types: WORD, NUMBER, OP, NEWLINE, COMMENT, DQUOTE, SQUOTE, etc.
8. SPECIAL_VARS - ?, $, @, *, #, -, !, _
9. DECL_KEYWORDS - export, declare, local, etc.
10. Validates against 3449-input golden corpus from WASM parser
11. Handles heredocs, command substitution, variable expansion
12. Supports timeout for adversarial input handling

## Exports
- `TsNode` - AST node type
- `PARSE_TIMEOUT_MS` - parse timeout constant
- `MAX_NODES` - max nodes constant
- `ensureParserInitialized` - ensures parser initialized
- `getParserModule` - gets parser module
- (Parser functions)
