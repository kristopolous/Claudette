## Purpose
Registers an MCP notification handler to detect when the user "@" mentions the assistant in the IDE, reporting file path and line range.

## Imports
- **External**: `react` (useEffect, useRef), `zod/v4` (z)
- **Internal**:
  - `src/utils/log.js` (logError)
  - `../services/mcp/types.js` (MCPServerConnection, ConnectedMCPServer)
  - `../utils/ide.js` (getConnectedIdeClient)
  - `../utils/lazySchema.js` (lazySchema)

## Logic
- Defines `IDEAtMentioned` type: `{ filePath: string, lineStart?: number, lineEnd?: number }`
- Creates `AtMentionedSchema` using lazySchema: validates MCP notification with `method: 'at_mentioned'` and params with filePath and optional lineStart/lineEnd
- Effect watches `mcpClients` and `onAtMentioned`:
  - Finds connected IDE client from MCP clients
  - If found, registers handler via `ideClient.client.setNotificationHandler(AtMentionedSchema(), handler)`
  - Handler:
    - Verifies current ideClientRef still matches (guard against stale)
    - Parses params, converts lineStart/lineEnd from 0-based to 1-based
    - Calls `onAtMentioned({ filePath, lineStart, lineEnd })`
    - Errors caught and logged
- No cleanup; MCP client manages handlers (re-registration overwrites)

## Exports
- `useIdeAtMentioned` - Hook `(mcpClients: MCPServerConnection[], onAtMentioned: (atMentioned: IDEAtMentioned) => void) => void`
- `IDEAtMentioned` type
