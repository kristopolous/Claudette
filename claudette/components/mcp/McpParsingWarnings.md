## Purpose
Displays parsing errors and warnings for MCP configurations across all scopes (user, project, local, enterprise).

## Imports
- **Stdlib**: None
- **External**: REACT (useMemo), REACT_COMPILER
- **Internal**: `services/mcp/config` (getMcpConfigsByScope), `services/mcp/types` (ConfigScope), `services/mcp/utils` (describeMcpConfigFilePath, getScopeLabel), `utils/settings/validation` (ValidationError), `ink` (Box, Link, Text)

## Logic
1. Collects MCP configs from all four scopes (user, project, local, enterprise)
2. Filters errors and warnings by severity (fatal vs warning) using filterErrors
3. Renders a "MCP Config Diagnostics" section when any errors or warnings exist
4. Displays each scope's errors and warnings with server names, paths, and messages
5. Shows config file location and a link to MCP documentation for help

## Exports
- `McpParsingWarnings` - renders diagnostic information for MCP configuration parsing issues
