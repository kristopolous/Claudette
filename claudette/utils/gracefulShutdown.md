# utils/gracefulShutdown

## Purpose
Provides graceful shutdown handling with terminal cleanup and session persistence.

## Imports
- **Stdlib**: `fs`
- **External**: STYLER, `lodash-es/memoize`, `signal-exit`
- **Internal**: agentSdkTypes, bootstrap state, ink instances/termio, analytics, state, cleanupRegistry, debug, diagLogs, envUtils, sessionStorage, sleep, startupProfiler

## Logic
1. `cleanupTerminalModes` - sync terminal mode cleanup before exit
2. Unconditionally sends all disable sequences (Kitty keyboard, focus reporting, etc.)
3. Disables mouse tracking FIRST (needs round-trip time)
4. Exits alt screen FIRST so sequences land on main buffer
5. Unmounts Ink directly (avoids double unmount in forceExit)
6. Prevents DECRC cursor jump over resume hint
7. Uses writeSync to ensure writes complete before process.exit
8. `gracefulShutdown` - async graceful shutdown
9. `gracefulShutdownSync` - sync graceful shutdown
10. `forceExit` - forces exit with cleanup
11. `isShuttingDown` - checks if shutdown in progress
12. `registerShutdownHandler` - registers shutdown handler
13. `runCleanupFunctions` - runs registered cleanup functions
14. Shuts down Datadog and 1P event logging
15. Logs shutdown events for analytics
16. Handles session persistence
17. Disables kitty keyboard, modify other keys, mouse tracking
18. Exits alt screen, shows cursor, clears terminal title
19. Clears iTerm2 progress and tab status

## Exports
- `cleanupTerminalModes` - cleans terminal modes
- `gracefulShutdown` - async graceful shutdown
- `gracefulShutdownSync` - sync graceful shutdown
- `forceExit` - forces exit
- `isShuttingDown` - checks shutdown status
- `registerShutdownHandler` - registers shutdown handler
