# utils/sleep

## Purpose
Provides abort-responsive sleep and timeout utilities.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: (none)

## Logic
1. `sleep` - abort-responsive sleep function
2. Resolves after ms milliseconds, or immediately when signal aborts
3. So backoff loops don't block shutdown
4. By default, abort resolves silently - caller should check signal.aborted after await
5. throwOnAbort: true - abort rejects (useful for retry loops)
6. abortError - customize rejection error (implies throwOnAbort: true)
7. Checks aborted state BEFORE setting up timer (avoids Temporal Dead Zone)
8. Sets up timer with setTimeout
9. onAbort function clears timer and resolves/rejects based on options
10. Adds abort event listener with once: true
11. unref option - timer.unref() so it doesn't block process exit
12. `rejectWithTimeout` - rejects with timeout error
13. `withTimeout` - races promise against timeout
14. Rejects with Error(message) if promise doesn't settle within ms
15. Timeout timer cleared when promise settles (no dangling timer)
16. Timer unref'd so it doesn't block process exit
17. Doesn't cancel underlying work - just returns control to caller

## Exports
- `sleep` - abort-responsive sleep
- `rejectWithTimeout` - rejects with timeout
- `withTimeout` - races promise against timeout
