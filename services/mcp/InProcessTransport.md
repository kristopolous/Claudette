# mcp/InProcessTransport

## Purpose
Provides in-process linked transport pair for running MCP server and client without subprocess.

## Imports
- **Stdlib**: (none)
- **External**: `@modelcontextprotocol/sdk`
- **Internal**: (none)

## Logic
1. `InProcessTransport` - implements Transport interface for in-process communication
2. `peer` - reference to linked transport for message delivery
3. `closed` - tracks transport closed state
4. `onclose`, `onerror`, `onmessage` - event handlers
5. `_setPeer` - internal method linking transport pairs
6. `send` - delivers message to peer's onmessage via queueMicrotask (async to avoid stack depth issues)
7. `close` - closes both transports, calls onclose on both
8. `createLinkedTransportPair` - factory creating [clientTransport, serverTransport] pair
9. Messages sent on one side delivered to other's onmessage
10. Close on either side calls onclose on both

## Exports
- `InProcessTransport` - transport class for in-process communication
- `createLinkedTransportPair` - factory creating linked transport pair
