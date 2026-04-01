# bridgeDebug

## Purpose
Provides fault injection and debug handles for testing bridge recovery paths during development.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: `logForDebugging`, `BridgeFatalError`, bridge types

## Logic
1. Defines `BridgeFault` type for injecting fatal or transient errors into specific API methods
2. Maintains a fault queue that decrements on each matching API call
3. `wrapApiForFaultInjection` - wraps API client to intercept calls and inject faults (ant-only)
4. Debug handle provides `fireClose`, `forceReconnect`, `injectFault`, `wakePollLoop`, and `describe` methods
5. Targets real failure modes: poll 404, ws_closed 1002/1006, register transient failures

## Exports
- `BridgeFault` - type for fault injection configuration
- `BridgeDebugHandle` - interface for debug operations
- `registerBridgeDebugHandle` - registers the debug handle
- `clearBridgeDebugHandle` - clears handle and fault queue
- `getBridgeDebugHandle` - retrieves current debug handle
- `injectBridgeFault` - queues a fault for injection
- `wrapApiForFaultInjection` - wraps API client for fault injection (ant-only)
