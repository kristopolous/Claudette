# remoteBridgeCore

## Purpose
Implements the env-less Remote Control bridge core that connects directly to session-ingress without the Environments API work-dispatch layer.

## Imports
- **Stdlib**: (none)
- **External**: BUILDFLAGS, `axios`
- **Internal**: replBridgeTransport, workSecret, sessionIdCompat, flushGate, jwtUtils, trustedDevice, envLessBridgeConfig, bridgeMessaging, debugUtils, analytics, utils

## Logic
1. `initEnvLessBridgeCore` - creates session, fetches worker JWT, connects v2 transport
2. Flow: POST /v1/code/sessions → POST /v1/code/sessions/{id}/bridge → createV2ReplTransport
3. Each /bridge call bumps worker_epoch (serves as register heartbeat)
4. Proactive token refresh scheduler re-calls /bridge before JWT expiry
5. 401 on SSE triggers transport rebuild with fresh credentials (same seq-num)
6. No register/poll/ack/stop/heartbeat/deregister environment lifecycle
7. Supports outbound-only mode (CCR mirror mode) and custom tags

## Exports
- `EnvLessBridgeParams` - configuration interface for env-less bridge
- `initEnvLessBridgeCore` - main entry point returning ReplBridgeHandle or null
