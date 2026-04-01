# WebSocketTransport

## Purpose
Implements WebSocket transport for session-ingress with automatic reconnection, ping/keepalive, and activity tracking.

## Imports
- **Stdlib**: (none)
- **External**: `ws` types
- **Internal**: SDK types, analytics, CircularBuffer, debug/diag/env/mtls/proxy/sessionActivity/JSON utils, Transport interface

## Logic
1. Maintains WebSocket connection with auto-reconnect on disconnect
2. Reconnection with exponential backoff (1s base, 30s max, 10min give up)
3. Sleep detection: resets reconnection budget after gap > 60s
4. Permanent close on codes 1002/4001/4003 (protocol error, expired, unauthorized)
5. Ping interval (10s) for connection health checks
6. Keepalive interval (5min) to prevent proxy idle timeout
7. Circular buffer (1k default) for message history
8. Activity tracking excludes ping/pong (for proxy timeout diagnosis)
9. TLS options for mTLS support
10. Proxy agent support via getWebSocketProxyAgent
11. Session activity callback registration

## Exports
- `WebSocketTransportOptions` - configuration interface
- `WebSocketTransportState` - state type (idle/connected/reconnecting/closing/closed)
- `WebSocketTransport` - class implementing WebSocket transport with auto-reconnect
- Constants: PERMANENT_CLOSE_CODES, SLEEP_DETECTION_THRESHOLD_MS, defaults
