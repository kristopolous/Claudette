# SSETransport

## Purpose
Implements Server-Sent Events (SSE) transport for session-ingress with automatic reconnection and frame parsing.

## Imports
- **Stdlib**: (none)
- **External**: `axios`
- **Internal**: SDK types, debug/diag/error/sessionIngressAuth/sleep/JSON/userAgent utils, Transport interface

## Logic
1. `parseSSEFrames` - incrementally parses SSE frames from text buffer
2. Handles event/id/data fields per SSE spec
3. Skips comment lines (starting with `:`)
4. Reconnection with exponential backoff (base 1s, max 30s, give up 10min)
5. Liveness timeout (45s) for dead connection detection
6. Permanent failure on 401/403/404 without retry
7. POST retry with max 10 retries, 500ms base, 8s max
8. Stream decoder with TextDecodeOptions for chunked responses
9. Maintains last event ID for resume capability

## Exports
- `parseSSEFrames` - parses SSE frames from buffer, returns frames and remaining
- `SSETransport` - class implementing SSE transport with auto-reconnect
- Constants: RECONNECT_*, LIVENESS_TIMEOUT_MS, PERMANENT_HTTP_CODES
