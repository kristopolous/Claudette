# renderOptions

## Purpose
Provides base render options for Ink, including a cached /dev/tty stdin override that enables interactive rendering even when stdin is piped.

## Imports
- **Stdlib**: `fs` (openSync), `tty` (ReadStream)
- **External**: (none)
- **Internal**: `../ink` (RenderOptions type), `./envUtils` (isEnvTruthy), `./log` (logError)

## Logic
1. `cachedStdinOverride` - module-level cache (ReadStream | undefined | null); null means not yet computed
2. `getStdinOverride()` - opens /dev/tty as a ReadStream when stdin is piped; returns cached result after first computation; skips if stdin is already a TTY, in CI environments, when MCP is active (argv includes 'mcp'), or on Windows; explicitly sets `isTTY = true` on the stream (needed for Bun compiled binaries)
3. `getBaseRenderOptions(exitOnCtrlC)` - returns Ink RenderOptions with stdin override when needed; should be used for all render() calls to ensure piped input works correctly

## Exports
- `getBaseRenderOptions(exitOnCtrlC?: boolean)` - returns RenderOptions with stdin override; default exitOnCtrlC is false
