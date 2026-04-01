# useIdeSelection

## Purpose
Tracks IDE text selection by registering notification handlers with the connected IDE MCP client.

## Imports
- **Stdlib**: `useEffect`, `useRef` from 'react'
- **External**: `z` from 'zod/v4'
- **Internal**: `logError`, `MCPServerConnection`, `getConnectedIdeClient`, `lazySchema`

## Logic
1. Finds IDE client from MCP clients list via getConnectedIdeClient
2. Registers notification handler for selection_changed events
3. Parses selection data (start/end line/character, text, filePath)
4. Calculates lineCount from selection range
5. Calls onSelect callback with selection data
6. Resets selection when IDE client changes

## Exports
- `useIdeSelection` - Hook that tracks IDE selection
- `SelectionPoint` - Type for {line, character}
- `SelectionData` - Type for selection notification data
- `IDESelection` - Type for processed selection info
