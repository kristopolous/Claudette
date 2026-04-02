# telemetryAttributes

## Purpose
Builds OpenTelemetry attributes for metrics, including user ID, session ID, account info, and terminal type, with configurable cardinality via environment variables.

## Imports
- **External**: @opentelemetry/api
- **Internal**: src/bootstrap/state, ./auth, ./config, ./envDynamic, ./envUtils, ./taggedId

## Logic
1. Defines `METRICS_CARDINALITY_DEFAULTS` controlling which attributes are included: session ID (true), version (false), account UUID (true).
2. `shouldIncludeAttribute` checks an env var override; if unset, falls back to the default.
3. `getTelemetryAttributes` constructs an attributes object:
   - Always includes `user.id` from `getOrCreateUserID()`.
   - Conditionally includes `session.id`, `app.version` based on env var / defaults.
   - If OAuth account info is available, adds `organization.id`, `user.email`, `user.account_uuid`, and `user.account_id` (using `CLAUDE_CODE_ACCOUNT_TAGGED_ID` env var or a generated tagged ID).
   - Adds `terminal.type` from `envDynamic.terminal` if available.

## Exports
- `getTelemetryAttributes()` - returns an OpenTelemetry Attributes object with user, session, account, and terminal attributes

## Source
`telemetryAttributes`
