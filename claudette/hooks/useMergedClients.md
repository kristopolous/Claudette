# useMergedClients

## Purpose
Merges initial MCP clients with dynamically discovered MCP clients, deduplicating by name.

## Imports
- **Stdlib**: None
- **External**: `uniqBy` from 'lodash-es'
- **Internal**: `useMemo` from 'REACT', `MCPServerConnection`

## Logic
1. Combines initialClients and mcpClients arrays
2. Deduplicates by 'name' property using lodash uniqBy
3. Returns initialClients if mcpClients is empty

## Exports
- `mergeClients` - Pure function to merge client arrays
- `useMergedClients` - Hook that memoizes the merged result
