# sessionActivity

## Purpose
Session activity tracking with refcount-based heartbeat timer. Keeps remote containers alive during API calls and tool execution by sending periodic keep-alive signals.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: `./cleanupRegistry` (registerCleanup), `./diagLogs` (logForDiagnosticsNoPII), `./envUtils` (isEnvTruthy)

## Logic
1. `SESSION_ACTIVITY_INTERVAL_MS` (30000) - heartbeat interval
2. Refcount-based activity tracking: callers bracket work with startSessionActivity()/stopSessionActivity(); when refcount > 0, periodic timer fires callback every 30s
3. Keep-alives gated behind CLAUDE_CODE_REMOTE_SEND_KEEPALIVES env var; diagnostic logging always fires
4. `activeReasons` - Map tracking refcount per reason ('api_call' | 'tool_exec'); tracks oldest activity start time
5. `startHeartbeatTimer()` - clears idle timer, starts 30s interval that logs debug heartbeat and fires callback if keepalives enabled
6. `startIdleTimer()` - starts 30s timeout that logs 'session_idle_30s' diagnostic when no activity
7. `registerSessionActivityCallback(cb)` - sets the keep-alive callback; restarts heartbeat timer if work already in progress (e.g. reconnect during streaming)
8. `unregisterSessionActivityCallback()` - clears callback and stops heartbeat/idle timers
9. `sendSessionActivitySignal()` - immediately fires callback if keepalives enabled
10. `startSessionActivity(reason)` - increments refcount; starts heartbeat on 0→1 transition; registers cleanup handler on first call (logs session_activity_at_shutdown with refcount, active reasons, oldest activity age)
11. `stopSessionActivity(reason)` - decrements refcount; stops heartbeat and starts idle timer on 1→0 transition

## Exports
- `SessionActivityReason` - type alias: 'api_call' | 'tool_exec'
- `registerSessionActivityCallback(cb: () => void)` - registers keep-alive callback
- `unregisterSessionActivityCallback()` - removes callback and stops timers
- `sendSessionActivitySignal()` - immediately fires keep-alive
- `isSessionActivityTrackingActive()` - returns true if callback is registered
- `startSessionActivity(reason: SessionActivityReason)` - increments activity refcount
- `stopSessionActivity(reason: SessionActivityReason)` - decrements activity refcount
