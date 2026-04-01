# mcp/normalization

## Purpose
Provides MCP name normalization utilities with no dependencies to avoid circular imports.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: (none)

## Logic
1. `CLAUDEAI_SERVER_PREFIX` - "claude.ai " prefix for Claude.ai servers
2. `normalizeNameForMCP` - normalizes names to API pattern ^[a-zA-Z0-9_-]{1,64}$
3. Replaces invalid characters (dots, spaces) with underscores
4. For claude.ai servers: collapses consecutive underscores, strips leading/trailing
5. Prevents interference with "__" delimiter used in MCP tool names

## Exports
- `normalizeNameForMCP` - normalizes server/tool names for MCP API compatibility
