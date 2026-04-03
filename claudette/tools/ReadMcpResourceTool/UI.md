# tools/ReadMcpResourceTool/UI.tsx

## Purpose
Renders the user-facing UI messages for the Read MCP Resource tool, displaying tool use and result information in the terminal interface.

## Imports
- **Stdlib**: None
- **External**: REACT, `zod/v4`
- **Internal**: `components/MessageResponse`, `components/shell/OutputLine`, `ink`, `ToolProgressData`, `types/message`, `utils/slowOperations`, `ReadMcpResourceTool/ReadMcpResourceTool`

## Logic
Renders tool use messages showing the resource URI and server name being read. Renders tool result messages by formatting output as JSON when content exists, or displaying a dimmed "No content" placeholder when empty. Uses OutputLine component for verbose display of formatted results.

## Exports
- `renderToolUseMessage` - renders the tool invocation message showing URI and server
- `userFacingName` - returns the user-facing tool name string
- `renderToolResultMessage` - renders the tool result as formatted JSON or empty state
