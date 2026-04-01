# bridgePermissionCallbacks

## Purpose
Defines the interface and types for handling permission request/response callbacks over the bridge transport.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: `PermissionUpdate` type

## Logic
1. Defines `BridgePermissionResponse` type with behavior (allow/deny), optional input updates, and permission suggestions
2. `BridgePermissionCallbacks` interface provides sendRequest, sendResponse, cancelRequest, and onResponse subscription
3. `isBridgePermissionResponse` type predicate validates the behavior discriminant

## Exports
- `BridgePermissionResponse` - type for permission response payloads
- `BridgePermissionCallbacks` - interface for permission callback handlers
- `isBridgePermissionResponse` - type guard for validating permission responses
