## Purpose
Merges initial commands with MCP-provided commands, deduplicating by name, to produce the final command set available to the user.

## Imports
- **External**: `lodash-es/uniqBy.js` (uniqBy)
- **Internal**: `../commands.js` (Command type)
- **External**: `react` (useMemo)

## Logic
- Hook parameters: `initialCommands: Command[]`, `mcpCommands: Command[]`
- If `mcpCommands` is non-empty, concatenates `initialCommands` and `mcpCommands`, then deduplicates using `uniqBy(..., 'name')` (keeps first occurrence by name)
- If no MCP commands, returns `initialCommands` as-is
- Memoized based on `initialCommands` and `mcpCommands` identity

## Exports
- `useMergedCommands` - Hook `(initialCommands: Command[], mcpCommands: Command[]) => Command[]`
