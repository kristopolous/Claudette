## Purpose
Manages a WebSocket connection to a direct-connect server, handling message routing, permission requests, and session lifecycle.

## Imports
- **Stdlib**: None
- **External**: None
- **Internal**: `entrypoints/agentSdkTypes`, `entrypoints/sdk/controlTypes`, `remote/RemoteSessionManager`, `utils/debug`, `utils/slowOperations`, `utils/teleport/api`

## Logic
1. Establishes a WebSocket connection to the server with optional Bearer authentication
2. Parses incoming newline-delimited JSON messages, filtering out control responses, keep-alives, and streamlined text
3. Routes control requests (permission requests) to the onPermissionRequest callback
4. Forwards SDK messages (assistant, result, system) to the onMessage callback
5. Serializes and sends user messages, permission responses, and interrupt signals over the WebSocket
6. Sends error responses for unrecognized control request subtypes to prevent server hangs

## Exports
- `DirectConnectSessionManager` - class managing the WebSocket session lifecycle with connect, disconnect, message sending, and permission response methods
- `DirectConnectConfig` - type defining server URL, session ID, WebSocket URL, and optional auth token
- `DirectConnectCallbacks` - type defining callbacks for messages, permission requests, connection state, and errors
