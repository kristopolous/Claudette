# rateLimitMessages

## Purpose
Provides centralized rate limit message generation for all rate limit scenarios.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: auth, billing, format, claudeAiLimits types

## Logic
1. `RATE_LIMIT_ERROR_PREFIXES` - array of all rate limit error prefixes
2. `isRateLimitErrorMessage` - checks if message is rate limit error
3. `RateLimitMessage` - type with message and severity (error/warning)
4. `getRateLimitMessage` - generates appropriate message based on limit state
5. Overage scenarios: allowed_warning shows spending limit warning
6. ERROR STATES (status=rejected): getLimitReachedText with model info
7. WARNING STATES (status=allowed_warning): shows when utilization > 70%
8. Prevents false warnings after week reset with stale data
9. Doesn't warn non-billing Team/Enterprise users about plan limits
10. `FEEDBACK_CHANNEL_ANT` - #briarpatch-cc for ant feedback
11. `formatResetTime` - formats reset time for display

## Exports
- `RATE_LIMIT_ERROR_PREFIXES` - array of rate limit error prefixes
- `isRateLimitErrorMessage` - checks if message is rate limit error
- `RateLimitMessage` - rate limit message type
- `getRateLimitMessage` - generates rate limit message based on state
