# preventSleep

## Purpose
Prevents macOS from sleeping while Claude is working using caffeinate command.

## Imports
- **Stdlib**: `child_process`
- **External**: (none)
- **Internal**: cleanupRegistry, debug

## Logic
1. Uses `caffeinate` command to create power assertion preventing idle sleep
2. `CAFFEINATE_TIMEOUT_SECONDS` (300/5min) - process auto-exits after this duration
3. `RESTART_INTERVAL_MS` (4min) - restarts before expiry for continuous prevention
4. Reference counting: startPreventSleep increments, stopPreventSleep decrements
5. Spawns caffeinate process when refCount goes from 0 to 1
6. Auto-restarts via setInterval before timeout expires
7. Self-healing: if Node process killed with SIGKILL, orphaned caffeinate exits after timeout
8. macOS only - no-op on other platforms
9. `forceStopPreventSleep` - force stops regardless of refCount (for cleanup on exit)
10. Registers cleanup handler for graceful shutdown

## Exports
- `startPreventSleep` - increments refCount, starts preventing sleep
- `stopPreventSleep` - decrements refCount, allows sleep if no work pending
- `forceStopPreventSleep` - force stops preventing sleep
