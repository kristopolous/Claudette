## Purpose
Merges initial commands with MCP-provided commands, deduplicating by name, to produce the final command set available to the user.

## Imports
- **External**: `lodashes/uniqBy` (uniqBy)
- **Internal**: `../commands` (Command type)
- **External**: REACT (useMemo)

## Logic
- Hook parameters: `initialCommands: Command[]`, `mcpCommands: Command[]`
- If `mcpCommands` is non-empty, concatenates `initialCommands` and `mcpCommands`, then deduplicates using `uniqBy(..., 'name')` (keeps first occurrence by name)
- If no MCP commands, returns `initialCommands` as-is
- Memoized based on `initialCommands` and `mcpCommands` identity

## Exports
- `useMergedCommands` - Hook `(initialCommands: Command[], mcpCommands: Command[]) => Command[]`
