# timeouts

## Purpose
Configurable timeout constants for bash operations, controlled via environment variables.

## Imports
- (none)

## Logic
Provides default (2 min) and max (10 min) bash timeout values. Both can be overridden via environment variables (`BASH_DEFAULT_TIMEOUT_MS`, `BASH_MAX_TIMEOUT_MS`). Invalid or non-positive env values are ignored. The max timeout is always at least as large as the default.

## Exports
- `getDefaultBashTimeoutMs` - `(env?) => number`. Returns `BASH_DEFAULT_TIMEOUT_MS` env value if valid, else 120,000ms (2 minutes).
- `getMaxBashTimeoutMs` - `(env?) => number`. Returns `BASH_MAX_TIMEOUT_MS` env value if valid, else 600,000ms (10 minutes). Always returns at least `getDefaultBashTimeoutMs(env)`.

## Source
`timeouts`
