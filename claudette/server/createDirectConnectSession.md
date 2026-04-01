## Purpose
Creates a new session on a direct-connect server by posting to the sessions endpoint and returning configuration for the REPL or headless runner.

## Imports
- **Stdlib**: None
- **External**: None
- **Internal**: `utils/errors`, `utils/slowOperations`, `server/directConnectManager`, `server/types`

## Logic
1. Constructs request headers with optional Bearer authentication
2. POSTs to `${serverUrl}/sessions` with cwd and optional permission settings
3. Validates the HTTP response status
4. Parses and validates the JSON response against the connect response schema
5. Returns a DirectConnectConfig with server URL, session ID, WebSocket URL, and auth token

## Exports
- `createDirectConnectSession` - creates a session on a direct-connect server and returns config and optional work directory
- `DirectConnectError` - error class thrown when connection, HTTP, or response parsing fails
