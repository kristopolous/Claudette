# useIdeLogging

## Purpose
Registers a handler for IDE log events from MCP clients and forwards them to analytics.

## Imports
- **Stdlib**: `useEffect` from 'REACT'
- **External**: `z` from 'zod/v4'
- **Internal**: `logEvent`, `MCPServerConnection`, `getConnectedIdeClient`, `lazySchema`

## Logic
1. Skip if no MCP clients are connected
2. Find the IDE client from the MCP clients list
3. Register a notification handler for 'log_event' method
4. Forward eventName and eventData to analytics via logEvent

## Exports
- `useIdeLogging` - Hook that registers IDE log event handler
