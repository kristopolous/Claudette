# streamJsonStdoutGuard

## Purpose
Protects NDJSON stdout streams from corruption by intercepting non-JSON writes to `process.stdout` and diverting them to stderr. Critical for `--output-format=stream-json` mode where any stray console.log would break client parsers.

## Imports
- **Stdlib**: none
- **External**: none
- **Internal**: `./cleanupRegistry`, `./debug`

## Logic
1. **Guard installation**: `installStreamJsonStdoutGuard()` wraps `process.stdout.write` with a buffering interceptor. Installing twice is a no-op.
2. **Line buffering**: Writes are accumulated in a buffer until a newline arrives. Each complete line is tested with `JSON.parse()`.
3. **Routing**: Lines that parse as valid JSON (or are empty) pass through to the real stdout. Lines that fail JSON parsing are diverted to stderr, prefixed with `STDOUT_GUARD_MARKER` (`[stdout-guard]`), and logged for debugging.
4. **Cleanup**: Registered via `cleanupRegistry` — on shutdown, flushes any remaining buffered content (diverting non-JSON fragments to stderr) and restores the original `stdout.write`.
5. **Empty line tolerance**: Empty lines are treated as valid JSON to avoid tripping on trailing newlines or blank separators in NDJSON streams.

## Exports
- `STDOUT_GUARD_MARKER` - string `[stdout-guard]` prepended to diverted stderr lines
- `installStreamJsonStdoutGuard` - wraps stdout.write to filter non-JSON lines to stderr
- `_resetStreamJsonStdoutGuardForTesting` - testing-only reset that restores stdout and clears state

## Source
`streamJsonStdoutGuard`
