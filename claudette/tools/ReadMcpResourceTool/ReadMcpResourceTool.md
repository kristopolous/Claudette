## Purpose
Tool for reading a specific resource from an MCP server by URI, handling both text and binary content.

## Imports
- **External**: `@modelcontextprotocol/sdk/types`, `zod/v4`
- **Internal**: 
  - MCP service: `ensureConnectedClient`
  - Tool: `buildTool`, `ToolDef`
  - Utils: `lazySchema`, `getBinaryBlobSavedMessage`, `persistBinaryContent`, `jsonStringify`, `isOutputLineTruncated`
  - Local: `DESCRIPTION`, `PROMPT`, `renderToolResultMessage`, `renderToolUseMessage`, `userFacingName`

## Logic
1. Finds the specified MCP server by name
2. Validates server is connected and supports resources capability
3. Ensures connection (reconnects if needed)
4. Sends resources/read request with the URI
5. Processes results: text content is returned directly; binary blobs are saved to disk and replaced with file path
6. Returns array of content objects with uri, mimeType, text, and optionally blobSavedTo
7. Checks for result truncation when serializing

## Exports
- `ReadMcpResourceTool` - Main tool definition
- `Input` - Type for input (server, uri)
- `Output` - Type for output (array of content objects)
- `ReadResourceResult`, `ReadResourceResultSchema` - MCP types (re-exported)
