# utils/bash/ParsedCommand

## Purpose
Parses shell command strings into structured representations using tree-sitter (primary) or regex fallbacks (deprecated). Provides methods to extract pipe segments, output redirections, and tree-sitter analysis data.

## Imports
- **External**: `lodash-es/memoize`
- **Internal**: `./commands` (extractOutputRedirections, splitCommandWithOperators), `./parser` (Node type, parseCommand), `./treeSitterAnalysis` (analyzeCommand, TreeSitterAnalysis)

## Logic
1. `OutputRedirection` type — `{ target: string, operator: '>' | '>>' }`
2. `IParsedCommand` interface — common API for both implementations: `originalCommand`, `toString()`, `getPipeSegments()`, `withoutOutputRedirections()`, `getOutputRedirections()`, `getTreeSitterAnalysis()`
3. `RegexParsedCommand_DEPRECATED` — legacy regex/shell-quote fallback; used only when tree-sitter is unavailable. `getTreeSitterAnalysis()` always returns null. `getPipeSegments()` splits on `|` via `splitCommandWithOperators`. `withoutOutputRedirections()` and `getOutputRedirections()` delegate to `extractOutputRedirections`. Falls back to original command on parse errors
4. `TreeSitterParsedCommand` — primary implementation using tree-sitter AST. Stores command as UTF-8 Buffer because tree-sitter's `startIndex`/`endIndex` are UTF-8 byte offsets (diverge from JS string indices for multi-byte code points like `—`). `getPipeSegments()` extracts segments between `|` nodes using Buffer.subarray. `withoutOutputRedirections()` removes `file_redirect` nodes by slicing Buffer in reverse order. `getOutputRedirections()` maps redirection nodes to `OutputRedirection` objects
5. `visitNodes(node, visitor)` — depth-first tree traversal helper
6. `extractPipePositions(rootNode)` — finds all `|` nodes within `pipeline` nodes, returns sorted byte offsets
7. `extractRedirectionNodes(rootNode)` — finds all `file_redirect` nodes, extracts operator (`>` or `>>`) and target (`word` node text)
8. `getTreeSitterAvailable()` — memoized async check: tries to import `./parser.js` and parse `'echo test'`; returns false on failure
9. `buildParsedCommandFromRoot(command, root)` — builds a TreeSitterParsedCommand from a pre-parsed AST root, skipping redundant parse. Extracts pipe positions, redirection nodes, and tree-sitter analysis
10. `doParse(command)` — internal parse logic: if tree-sitter available, uses native parser; otherwise falls back to RegexParsedCommand_DEPRECATED
11. `ParsedCommand.parse(command)` — public API with single-entry cache (lastCmd/lastResult) to avoid redundant parsing when legacy callers invoke repeatedly with the same command string. Size-1 bound prevents leaking TreeSitterParsedCommand instances

## Exports
- `OutputRedirection` — type for shell output redirection ({ target, operator })
- `IParsedCommand` — interface for parsed command implementations
- `RegexParsedCommand_DEPRECATED` — legacy regex-based fallback implementation
- `buildParsedCommandFromRoot` — builds ParsedCommand from pre-parsed AST root
- `ParsedCommand` — namespace with `parse(command)` method (single-entry cached)

## Source
`utils/bash/ParsedCommand`
