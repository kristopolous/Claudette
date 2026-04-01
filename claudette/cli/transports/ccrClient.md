# ccrClient

## Purpose
Implements CCR (Claudette Remote) client for worker registration, heartbeat, state reporting, and event streaming with coalescing.

## Imports
- **Stdlib**: `crypto`
- **External**: (none)
- **Internal**: SDK types, jwtUtils, debug/diag/error/proxy utils, sessionActivity, sessionIngressAuth, sessionState, sleep, userAgent, SerialBatchEventUploader, SSETransport

## Logic
1. `CCRClient` - manages worker lifecycle with session-ingress
2. Worker registration with epoch tracking
3. Heartbeat at 20s interval (server TTL is 60s)
4. Stream event coalescing - batches text_delta events within 100ms window
5. Consecutive auth failure handling (max 10 before giving up)
6. Expired JWT detection - short-circuits retry (deterministic failure)
7. Worker state uploader for requires_action reporting
8. Session activity callback registration
9. Serial batch event uploader for reliable delivery
10. Status tracking (connected/disconnected/reconnecting)
11. Dynamic auth header refresh on reconnection

## Exports
- `CCRInitError` - error class with typed fail reason
- `CCRClient` - class managing CCR worker connection and event streaming
- `DEFAULT_HEARTBEAT_INTERVAL_MS` - 20s heartbeat constant
- `STREAM_EVENT_FLUSH_INTERVAL_MS` - 100ms coalescing window
- `MAX_CONSECUTIVE_AUTH_FAILURES` - 10 failure threshold
