# services/api/sessionIngress

## Purpose
Handles session ingress logging with retry logic and sequential write guarantees.

## Imports
- **Stdlib**: `crypto`
- **External**: `axios`
- **Internal**: oauth constants, logs types, debug, diagLogs, envUtils, log, sequential, sessionIngressAuth, sleep, JSON utils, teleport API

## Logic
1. `SessionIngressError` - error type with message and type
2. `lastUuidMap` - Map tracking last UUID per session for ordering
3. `MAX_RETRIES` (10), `BASE_DELAY_MS` (500) - retry configuration
4. `sequentialAppendBySession` - per-session sequential wrappers
5. `getOrCreateSequentialAppend` - gets/creates sequential wrapper for session
6. Ensures log appends processed one at a time per session
7. `appendSessionLogImpl` - internal implementation with retry logic
8. Retries on transient errors (network, 5xx, 429)
9. On 409 conflict: adopts server's last UUID and retries
10. Handles stale state from killed process's in-flight requests
11. Fails immediately on 401 unauthorized
12. Sets Last-Uuid header for ordering
13. Validates status < 500 for success
14. `appendSessionLog` - public API for appending log entries
15. Uses sequential wrapper for ordered writes

## Exports
- `SessionIngressError` - session ingress error type
- `appendSessionLog` - appends log entry to session
- `MAX_RETRIES`, `BASE_DELAY_MS` - retry constants
