## Purpose
Renders informational text about MCP server permissions for use in dialog components.

## Imports
- **Stdlib**: none
- **External**: react, react/compiler-runtime
- **Internal**: ../ink.js (Link, Text)

## Logic
Displays a static message informing users that MCP servers may execute code or access system resources, and that all tool calls require approval. Includes a link to the MCP documentation page.

## Exports
- `MCPServerDialogCopy` - Renders a text warning about MCP server code execution and a link to documentation
