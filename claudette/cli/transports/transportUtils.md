# transportUtils

## Purpose
Provides factory function for selecting appropriate transport based on URL protocol and environment flags.

## Imports
- **Stdlib**: `url`
- **External**: (none)
- **Internal**: envUtils, HybridTransport, SSETransport, WebSocketTransport, Transport interface

## Logic
1. Transport selection priority based on environment flags:
   - CLAUDE_CODE_USE_CCR_V2 → SSETransport (SSE reads + POST writes)
   - CLAUDE_CODE_POST_FOR_SESSION_INGRESS_V2 → HybridTransport (WS reads + POST writes)
   - Default → WebSocketTransport (WS reads + WS writes)
2. For SSE transport, converts ws:// → http:// and appends /worker/events/stream
3. Validates URL protocol (ws:// or wss:// required)
4. Passes headers, sessionId, and refreshHeaders to transport constructor

## Exports
- `getTransportForUrl` - factory function returning appropriate Transport implementation
