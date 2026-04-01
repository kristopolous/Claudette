# remoteIO

## Purpose
Provides bidirectional streaming IO for SDK mode with session tracking and WebSocket transport support.

## Imports
- **Stdlib**: `stream`, `url`
- **External**: (none)
- **Internal**: SDK types, bootstrap state, pollConfig, cleanupRegistry, commandLifecycle, debug/diag/env/error/gracefulShutdown/log utils, sessionIngressAuth, sessionState, sessionStorage, ndjsonSafeStringify, structuredIO, transports

## Logic
1. Extends StructuredIO with remote transport capabilities
2. Creates PassThrough stream for input piping
3. Parses stream URL and sets up appropriate transport (WebSocket/SSE)
4. Dynamically refreshes session ingress auth token on reconnection
5. Includes environment runner version in headers
6. Bridge mode detection via CLAUDE_CODE_ENVIRONMENT_KIND
7. Debug logging for bridge traffic
8. Keeps session state/metadata change listeners registered
9. Internal event reader/writer for session storage integration
10. Cleanup registration for graceful shutdown

## Exports
- `RemoteIO` - class extending StructuredIO with remote transport support
