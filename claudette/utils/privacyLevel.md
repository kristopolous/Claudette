# privacyLevel

## Purpose
Privacy level controls how much nonessential network traffic and telemetry the application generates, based on environment variables.

## Imports
- **Stdlib**: (none)

## Logic
1. Three ordered levels of restrictiveness: `default` < `no-telemetry` < `essential-traffic`
2. `default` — everything enabled
3. `no-telemetry` — analytics/telemetry disabled (Datadog, 1P events, feedback survey)
4. `essential-traffic` — ALL nonessential network traffic disabled (telemetry + auto-updates, grove, release notes, model capabilities, etc.)
5. Resolution order: `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC` env var → `essential-traffic`, `DISABLE_TELEMETRY` env var → `no-telemetry`, otherwise → `default`

## Exports
- `PrivacyLevel` - type alias: `'default' | 'no-telemetry' | 'essential-traffic'`
- `getPrivacyLevel()` - returns the resolved PrivacyLevel based on env vars
- `isEssentialTrafficOnly()` - true when all nonessential network traffic should be suppressed (equivalent to old `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC` check)
- `isTelemetryDisabled()` - true when telemetry/analytics should be suppressed (true at both `no-telemetry` and `essential-traffic` levels)
- `getEssentialTrafficOnlyReason()` - returns the env var name responsible for essential-traffic restriction, or null if unrestricted; used for user-facing "unset X to re-enable" messages