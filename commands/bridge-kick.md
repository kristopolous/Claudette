## Purpose
Inject bridge failure states for manual testing of recovery paths in Remote Control.

## Imports
- **Internal**: `getBridgeDebugHandle` (from bridge/bridgeDebug.js), Command types

## Logic
1. Gets bridge debug handle (only available for Ant users with Remote Control connected)
2. Parses subcommand arguments:
   - `close <code>`: fire WebSocket closed event with exit code
   - `poll <status> [type]`: make next poll throw BridgeFatalError
   - `poll transient`: next poll throws transient axios rejection
   - `register fail [N]`: next N register attempts transient-fail
   - `register fatal`: next register returns 403 (terminal)
   - `reconnect-session fail`: reconnect POST fails (tests Strategy 2)
   - `heartbeat <status>`: next heartbeat throws error
   - `reconnect`: call reconnectEnvironmentWithSession directly
   - `status`: print current bridge state
3. Returns text confirmation and instructions for watching debug.log

## Exports
- `call` - async LocalCommandCall function
- `bridgeKick` - local Command object (Ant-only)
