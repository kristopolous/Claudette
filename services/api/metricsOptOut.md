# services/api/metricsOptOut

## Purpose
Checks if metrics logging is enabled for the organization (opt-out feature).

## Imports
- **Stdlib**: (none)
- **External**: `axios`
- **Internal**: auth, config, debug, errors, http, log, memoize, privacyLevel, userAgent

## Logic
1. `MetricsEnabledResponse` - { metrics_logging_enabled: boolean }
2. `MetricsStatus` - { enabled: boolean, hasError: boolean }
3. `CACHE_TTL_MS` (1h) - in-memory cache TTL
4. `DISK_CACHE_TTL_MS` (24h) - disk cache TTL for org settings
5. `_fetchMetricsEnabled` - calls API to check metrics status
6. Uses getAuthHeaders for authentication
7. 5-second timeout for API request
8. `_checkMetricsEnabledAPI` - wraps fetch with error handling
9. Returns { enabled: false, hasError: false } on essential-traffic-only
10. Uses withOAuth401Retry with also403Revoked option
11. Logs API response and errors
12. `isMetricsEnabled` - memoized check with TTL caching
13. `refreshMetricsCache` - refreshes cache in background
14. `getMetricsStatus` - gets current metrics status

## Exports
- `MetricsEnabledResponse` - metrics response type
- `MetricsStatus` - metrics status type
- `isMetricsEnabled` - checks if metrics enabled (memoized)
- `refreshMetricsCache` - refreshes metrics cache
- `getMetricsStatus` - gets current metrics status
