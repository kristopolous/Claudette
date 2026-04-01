# services/api/usage

## Purpose
Fetches usage/utilization data from Claude.ai API for rate limit tracking.

## Imports
- **Stdlib**: (none)
- **External**: `axios`
- **Internal**: oauth constants, auth, http, userAgent, oauth client

## Logic
1. `RateLimit` - utilization (0-100%), resets_at (ISO 8601)
2. `ExtraUsage` - is_enabled, monthly_limit, used_credits, utilization
3. `Utilization` - five_hour, seven_day, seven_day_oauth_apps, seven_day_opus, seven_day_sonnet, extra_usage
4. `fetchUtilization` - fetches usage data from /api/oauth/usage
5. Returns empty object if not Claude.ai subscriber or lacks profile scope
6. Skips API call if OAuth token expired (avoids 401 errors)
7. Throws error on auth failure
8. 5-second timeout for API request
9. Includes User-Agent and auth headers
10. Returns Utilization or null on failure

## Exports
- `RateLimit` - rate limit type
- `ExtraUsage` - extra usage type
- `Utilization` - utilization type
- `fetchUtilization` - fetches utilization data
