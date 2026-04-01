## Purpose
CLI subcommand: `claude mcp add` - adds an MCP server to configuration.

## Imports
- **External**: Commander.js, axios
- **Internal**: Config utils, auth services, MCP config, xaaIdpLogin

## Logic
Registers 'mcp add <name> <commandOrUrl> [args...]' commander command with options:
- -s/--scope: config scope (local/user/project)
- -t/--transport: stdio/http/sse
- -e/--env: environment variables
- -H/--header: WebSocket headers
- --client-id/--client-secret/--callback-port: OAuth for HTTP/SSE
- --xaa: Enable XAA (SEP-990) authentication

Validates options, constructs server config, and writes to appropriate mcp.json file. Handles stdio, SSE, and HTTP transports differently. Shows warnings for URL-shaped commands without explicit transport.

## Exports
- `registerMcpAddCommand` - Registers the command on a Commander command
