# bridgeMessaging

## Purpose
Provides shared transport-layer utilities for bridge message handling, including ingress parsing and control request/response routing.

## Imports
- **Stdlib**: `crypto`
- **External**: (none)
- **Internal**: SDK types, analytics, message utils, permission types

## Logic
1. Type predicates for SDK messages, control requests, and control responses
2. `isEligibleBridgeMessage` - filters messages for bridge forwarding (user/assistant turns, slash commands)
3. `extractTitleText` - extracts session title text from user messages, filtering meta/tool results
4. `handleIngressMessage` - parses WebSocket messages and routes to appropriate handlers
5. Deduplicates echoes using UUID tracking sets
6. Normalizes control message keys for compatibility

## Exports
- `isSDKMessage` - type guard for SDK messages
- `isSDKControlResponse` - type guard for control responses
- `isSDKControlRequest` - type guard for control requests
- `isEligibleBridgeMessage` - checks if message should be forwarded to bridge
- `extractTitleText` - extracts title-worthy text from messages
- `handleIngressMessage` - parses and routes ingress WebSocket messages
