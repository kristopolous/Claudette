# services/api/ultrareviewQuota

## Purpose
Fetches ultrareview quota for display and nudge decisions.

## Imports
- **Stdlib**: (none)
- **External**: `axios`
- **Internal**: oauth constants, auth, debug, teleport API

## Logic
1. `UltrareviewQuotaResponse` - reviews_used, reviews_limit, reviews_remaining, is_overage
2. `fetchUltrareviewQuota` - fetches quota from /v1/ultrareview/quota
3. Returns null if not Claude.ai subscriber
4. Returns null on API error (non-blocking)
5. 5-second timeout for API request
6. Uses OAuth headers with org UUID
7. Consume happens server-side at session creation
8. Used for display and nudge decisions in UI

## Exports
- `UltrareviewQuotaResponse` - quota response type
- `fetchUltrareviewQuota` - fetches ultrareview quota
