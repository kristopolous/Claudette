## Purpose
Defines placeholder prompt and description constants for MCP tools, which are overridden at runtime by the MCP client.

## Imports
- **Stdlib**: None
- **External**: None
- **Internal**: None

## Logic
Exports empty string constants for PROMPT and DESCRIPTION as placeholders. The actual prompt and description values are dynamically overridden in the MCP client implementation, allowing MCP tools to provide their own tool-specific documentation at runtime.

## Exports
- `PROMPT` - Empty string placeholder for the MCP tool prompt, overridden by mcpClient
- `DESCRIPTION` - Empty string placeholder for the MCP tool description, overridden by mcpClient
