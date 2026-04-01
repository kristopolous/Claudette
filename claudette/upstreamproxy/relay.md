## Purpose
Implements a CONNECT-over-WebSocket relay that tunnels TCP connections through WebSocket to the CCR upstream proxy endpoint.

## Imports
- **Stdlib**: `node:net` (createServer)
- **External**: `ws` (WebSocket library for Node.js runtime)
- **Internal**: `utils/debug`, `utils/mtls`, `utils/proxy`

## Logic
1. Listens on localhost TCP and accepts HTTP CONNECT requests from clients like curl or kubectl
2. Parses the CONNECT request header (accumulates until CRLF CRLF delimiter)
3. Opens a WebSocket tunnel to the server, wrapping bytes in UpstreamProxyChunk protobuf messages
4. Forwards client bytes over WebSocket in chunks (max 512KB per chunk)
5. Sends keepalive pings every 30 seconds to prevent idle timeout
6. Handles both Bun (native TCP sockets) and Node.js (net.createServer) runtimes
7. Manages connection state including pending buffers, WebSocket readiness, and cleanup

## Exports
- `startUpstreamProxyRelay` - starts the relay server; returns port and stop function
- `startNodeRelay` - starts the relay using Node.js net.createServer (exported for testing)
- `encodeChunk` - encodes data into UpstreamProxyChunk protobuf wire format
- `decodeChunk` - decodes an UpstreamProxyChunk message, returning the data payload or null
- `UpstreamProxyRelay` - type describing the relay interface (port and stop function)
