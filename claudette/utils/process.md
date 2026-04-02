# process

## Purpose
Process utility functions for handling stdout/stderr errors, safe writing, error exits, and stdin detection for piped mode.

## Imports
- **Stdlib**: (none) — uses global `process` and `NodeJS` types

## Logic
1. EPIPE errors (broken pipe, e.g. `claude -p | head -1`) are caught and the stream is destroyed to prevent memory leaks
2. `writeOut` guards against writing to destroyed streams; backpressure is noted but not handled
3. `peekForStdinData` distinguishes a real pipe producer from an inherited-but-idle parent stdin by waiting for data with a timeout; first data cancels the timeout

## Exports
- `registerProcessOutputErrorHandlers()` - attaches EPIPE error handlers to stdout and stderr to prevent memory leaks when pipe is broken
- `writeToStdout(data)` - safely writes to stdout, no-op if stream destroyed
- `writeToStderr(data)` - safely writes to stderr, no-op if stream destroyed
- `exitWithError(message)` - writes error to stderr and exits with code 1; consolidates console.error + process.exit(1) pattern
- `peekForStdinData(stream, ms)` - waits for stdin-like stream to close or timeout; returns true on timeout (no data), false on end; used by -p mode to detect real pipe vs idle parent stdin