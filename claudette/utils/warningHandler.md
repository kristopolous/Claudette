# warningHandler

## Purpose
Intercepts Node.js process warnings, suppresses them from stderr output, logs them to analytics (Statsig), and optionally shows them in debug mode. Prevents warning spam by bounding the tracking map.

## Imports
- **Stdlib**: `path` (posix, win32)
- **Internal**: `src/services/analytics/index` (logEvent, AnalyticsMetadata type), `./debug` (logForDebugging), `./envUtils` (isEnvTruthy), `./platform` (getPlatform)

## Logic
1. `MAX_WARNING_KEYS` (1000) — bound on the warningCounts map to prevent unbounded memory growth
2. `warningCounts` — Map tracking occurrence count per warning key (name + first 50 chars of message)
3. `isRunningFromBuildDirectory()` — sync check if process.argv[1] or execPath contains `/build-ant/`, `/build-external/`, `/build-external-native/`, or `/build-ant-native/`; handles Windows path separators
4. `INTERNAL_WARNINGS` — regex patterns for known internal warnings to suppress: `MaxListenersExceededWarning` with `AbortSignal` or `EventTarget`
5. `isInternalWarning(warning)` — checks if warning matches any INTERNAL_WARNINGS pattern
6. `resetWarningHandler()` — removes the handler from process, clears state; for testing only
7. `initializeWarningHandler()` — sets up the warning handler once (idempotent check). In non-development mode, removes all default Node.js warning listeners to suppress stderr output. Development mode = `NODE_ENV === 'development'` or running from build directory. The handler:
   - Bounds warningCounts map to MAX_WARNING_KEYS (new unique keys beyond cap are not tracked, occurrence_count reported as 1)
   - Logs all warnings to analytics via `logEvent('tengu_node_warning', ...)` with is_internal flag, occurrence_count, classname, and full message for ant users only
   - In `CLAUDE_DEBUG` mode, logs warnings to debug output with `[Internal Warning]` or `[Warning]` prefix
   - Silently catches all errors to prevent the handler itself from causing issues
8. Handler reference stored in module-level `warningHandler` variable for idempotency check

## Exports
- `MAX_WARNING_KEYS` — constant (1000), bound on warning tracking map
- `resetWarningHandler` — resets handler state (for testing)
- `initializeWarningHandler` — installs the warning interceptor

## Source
`warningHandler`
