# preflightChecks

## Purpose
UI component that runs connectivity checks against inference provider endpoints on startup, showing a spinner or error message and exiting if checks fail.

## Imports
- **Stdlib**: REACT, REACT_COMPILER
- **External**: `axios`
- **Internal**: `src/services/analytics/index` (logEvent), `../components/Spinner`, `../constants/oauth`, `../hooks/useTimeout`, `../ink` (Box, Text), `../services/api/errorUtils`, `./http`, `./log`

## Logic
1. On mount, `PreflightStep` calls `checkEndpoints()` which hits two URLs in parallel: `{BASE_API_URL}/api/hello` and `{TOKEN_URL origin}/v1/oauth/hello`
2. Each endpoint is fetched via axios GET with a User-Agent header; non-200 status or network errors produce a failure result
3. SSL errors are detected via `getSSLErrorHint()` and surfaced with a helpful hint + docs link
4. Failures are logged to analytics via `logEvent('tengu_preflight_check_failed', ...)`
5. If checks fail, the component shows an error message and calls `process.exit(1)` after a 100ms delay
6. A spinner is shown after a 1-second timeout if checks are still running
7. On success, `onSuccess` callback is invoked to proceed with startup

## Exports
- `PreflightCheckResult` - interface with `success: boolean`, optional `error?: string`, optional `sslHint?: string`
- `PreflightStep({ onSuccess })` - UI component that runs connectivity checks on mount; shows spinner during checks, error with SSL hints on failure, calls `onSuccess` on success