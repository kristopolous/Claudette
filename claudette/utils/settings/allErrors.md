# utils/settings/allErrors

## Purpose
Combines settings validation errors with MCP configuration errors to break circular dependency.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: services mcp config, settings settings, settings validation

## Logic
1. Breaks circular dependency: settings.ts → mcp/config.ts → settings.ts
2. This module is a leaf that imports both settings.ts and mcp/config.ts
3. But is imported by neither, eliminating the cycle
4. `getSettingsWithAllErrors` - gets merged settings with all validation errors
5. Includes both settings errors and MCP config errors
6. Use this instead of getSettingsWithErrors() when full error set needed
7. getSettingsWithErrors() no longer includes MCP errors to avoid circular dependency
8. Scopes: 'user', 'project', 'local' (dynamic scope does not have errors returned, throws and is set on CLI startup)
9. Uses getMcpConfigsByScope to get MCP errors per scope
10. Returns { settings, errors: [...result.errors, ...mcpErrors] }

## Exports
- `getSettingsWithAllErrors` - gets settings with all errors including MCP
