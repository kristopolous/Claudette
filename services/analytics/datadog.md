# datadog

## Purpose
Routes analytics events to Datadog HTTP intake API with batching and memoization.

## Imports
- **Stdlib**: `crypto`
- **External**: `axios`, `lodash-es/memoize`
- **Internal**: config, log, model utils, modelCost, analytics config/metadata

## Logic
1. `DATADOG_LOGS_ENDPOINT` - US5 Datadog HTTP intake URL
2. `DATADOG_CLIENT_TOKEN` - public client token for logs API
3. `DEFAULT_FLUSH_INTERVAL_MS` (15s), `MAX_BATCH_SIZE` (100)
4. `NETWORK_TIMEOUT_MS` (5s) for API requests
5. `DATADOG_ALLOWED_EVENTS` - allowlist of event names (chrome_bridge, tengu_*, voice, team_mem)
6. `TAG_FIELDS` - fields extracted as Datadog tags (arch, platform, model, provider, etc.)
7. `trackDatadogEvent` - sends event to Datadog with metadata
8. Memoized functions for performance
9. `getEventMetadata` - enriches events with system/user context
10. `getCanonicalName` - normalizes model names for consistent tagging
11. `MODEL_COSTS` - cost data for usage events
12. `isAnalyticsDisabled` - checks analytics disable flag

## Exports
- `trackDatadogEvent` - function to send event to Datadog
- `DATADOG_ALLOWED_EVENTS` - set of allowed event names
- `TAG_FIELDS` - array of tag field names
- Constants: DATADOG_*, DEFAULT_FLUSH_INTERVAL_MS, MAX_BATCH_SIZE, NETWORK_TIMEOUT_MS
