## Purpose
Command entry for /mcp - registers the MCP management interface.

## Imports
- **External**: Command type
- **Internal**: mcp.jsx (lazy-loaded UI)

## Logic
Defines the 'mcp' command as a local-jsx type with:
- immediate: true (shows UI instantly)
- argumentHint: '[enable|disable [server-name]]'
- Dynamic loader that imports './mcp.js'

For ant users, base /mcp redirects to /plugins installed tab to avoid confusion.

## Exports
- `default` - Command object for /mcp
