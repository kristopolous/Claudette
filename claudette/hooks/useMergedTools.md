# useMergedTools

## Purpose
Assembles the full tool pool for the REPL by combining built-in tools with MCP tools.

## Imports
- **Stdlib**: `useMemo` from 'REACT'
- **External**: None
- **Internal**: `Tools`, `ToolPermissionContext`, `assembleToolPool`, `useAppState`, `mergeAndFilterTools`

## Logic
1. Uses assembleToolPool() to get base tools with MCP deny-rule filtering and deduplication
2. Merges initialTools (extra tools from props) with assembled pool
3. Applies permission context filtering via mergeAndFilterTools
4. Result is memoized to prevent unnecessary recalculation

## Exports
- `useMergedTools` - Hook returning the fully assembled and filtered Tools
