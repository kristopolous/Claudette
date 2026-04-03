# utils/bash/parser

## Purpose
Parses bash commands using tree-sitter with fallback to null on failure.

## Imports
- **Stdlib**: (none)
- **External**: BUILDFLAGS
- **Internal**: analytics, debug, bashParser

## Logic
1. `Node` - alias for TsNode from bashParser
2. `ParsedCommandData` - rootNode, envVars, commandNode, originalCommand
3. `MAX_COMMAND_LENGTH` (10000) - max command length for parsing
4. `DECLARATION_COMMANDS` - export, declare, typeset, readonly, local, unset, unsetenv
5. `ARGUMENT_TYPES` - word, string, raw_string, number
6. `SUBSTITUTION_TYPES` - command_substitution, process_substitution
7. `COMMAND_TYPES` - command, declaration_command
8. `ensureInitialized` - awaits WASM init (Parser.init + Language.load)
9. Feature-gated with TREE_SITTER_BASH/TREE_SITTER_BASH_SHADOW
10. `parseCommand` - parses command, returns null on failure
11. Logs tengu_tree_sitter_load event for telemetry
12. Extracts env vars and finds command node
13. `findCommandNode` - finds command node in AST
14. `extractEnvVars` - extracts environment variable assignments
15. Ant-only until pentest, external builds use legacy fallback

## Exports
- `Node` - AST node type
- `ParsedCommandData` - parsed command data type
- `ensureInitialized` - ensures parser initialized
- `parseCommand` - parses bash command
- (AST traversal functions)
