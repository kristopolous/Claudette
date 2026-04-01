# mcp/envExpansion

## Purpose
Provides environment variable expansion utilities for MCP server configurations.

## Imports
- **Stdlib**: `process`
- **External**: (none)
- **Internal**: (none)

## Logic
1. `expandEnvVarsInString` - expands ${VAR} and ${VAR:-default} syntax
2. Uses regex /\$\{([^}]+)\}/g for variable detection
3. Splits on :- to support default values (limit 2 parts to preserve :- in defaults)
4. Returns expanded string and list of missing variables
5. Missing variables tracked for error reporting
6. Returns original if not found (allows debugging but reported as error)
7. Used for expanding environment variables in MCP server configs

## Exports
- `expandEnvVarsInString` - function expanding env vars with default support
