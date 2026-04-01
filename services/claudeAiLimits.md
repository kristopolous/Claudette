# services/claudeAiLimits

## Purpose
Manages Claude.ai rate limits with early warning thresholds and status tracking.

## Imports
- **Stdlib**: (none)
- **External**: `@anthropic-ai/sdk`, `lodash-es/isEqual`
- **Internal**: bootstrap state, auth, betas, config, log, model model, privacyLevel, analytics, API claude/client, rateLimitMocking

## Logic
1. `QuotaStatus` - union: allowed, allowed_warning, rejected
2. `RateLimitType` - five_hour, seven_day, seven_day_opus, seven_day_sonnet, overage
3. `EarlyWarningThreshold` - utilization (0-1), timePct (0-1) for warning triggers
4. `EarlyWarningConfig` - rateLimitType, claimAbbrev (5h/7d), windowSeconds, thresholds
5. `EARLY_WARNING_CONFIGS` - configs in priority order (5h: 90% at 72% time, 7d: 75%/50%/25% at 60%/35%/15% time)
6. `EARLY_WARNING_CLAIM_MAP` - maps claim abbreviations to rate limit types
7. `RATE_LIMIT_DISPLAY_NAMES` - human-readable names (five_hour → session limit)
8. `currentLimits` - current rate limit state
9. `statusListeners` - set of listener callbacks for limit changes
10. Integrates with rate limit mocking for testing
11. Checks isClaudeAISubscriber for eligibility
12. Uses small fast model for limit checks
13. Logs events for analytics

## Exports
- `QuotaStatus` - quota status type
- `RateLimitType` - rate limit type
- `EarlyWarningThreshold` - warning threshold type
- `EarlyWarningConfig` - warning config type
- `currentLimits` - current limits state
- `statusListeners` - status listeners set
- `getRateLimitErrorMessage`, `getRateLimitWarning`, `getUsingOverageText` - re-exported message functions
