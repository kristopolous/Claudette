# services/api/grove

## Purpose
Manages Grove privacy feature settings and eligibility.

## Imports
- **Stdlib**: (none)
- **External**: `axios`, `lodash-es/memoize`
- **Internal**: analytics, auth, debug, gracefulShutdown, privacyLevel, process, oauth constants, config, http, log, userAgent

## Logic
1. `GROVE_CACHE_EXPIRATION_MS` (24h) - settings cache expiration
2. `AccountSettings` - grove_enabled, grove_notice_viewed_at
3. `GroveConfig` - grove_enabled, domain_excluded, notice_is_grace_period, notice_reminder_frequency
4. `ApiResult<T>` - discriminated union: { success: true, data: T } | { success: false }
5. `getGroveSettings` - memoized fetch of account settings
6. Returns failure on essential-traffic-only mode
7. Uses withOAuth401Retry for auth retry
8. Doesn't cache failures (prevents deadlock on transient issues)
9. `updateGroveSettings` - updates account settings
10. Invalidates cache on successful update
11. `isGroveEligible` - checks user eligibility for Grove
12. `shouldShowGroveNotice` - checks if notice should be shown
13. `markGroveNoticeViewed` - marks notice as viewed
14. Logs events for analytics tracking

## Exports
- `AccountSettings` - account settings type
- `GroveConfig` - grove config type
- `ApiResult<T>` - API result type
- `getGroveSettings` - gets grove settings (memoized)
- `updateGroveSettings` - updates grove settings
- `isGroveEligible` - checks grove eligibility
- `shouldShowGroveNotice` - checks if notice should show
- `markGroveNoticeViewed` - marks notice viewed
