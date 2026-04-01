## Purpose
Main command entry for /mcp - manages MCP server configuration.

## Imports
- **External**: React
- **Internal**: MCPSettings, MCPReconnect, MCPToggle, PluginSettings (for ant redirect)

## Logic
Routes /mcp subcommands:
- No args: Shows MCP settings UI (MCPSettings)
- 'no-redirect': Bypasses ant redirect
- 'reconnect <server>': Shows MCPReconnect dialog
- 'enable'/'disable [target]': Shows MCP toggle UI
- For ant users: Redirects base /mcp to /plugins installed tab

## Exports
- `call` - LocalJSXCommandCall that routes to appropriate MCP UI component
