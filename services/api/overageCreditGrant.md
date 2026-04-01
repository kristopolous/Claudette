# services/api/overageCreditGrant

## Purpose
Manages overage credit grant eligibility caching and fetching.

## Imports
- **Stdlib**: (none)
- **External**: `axios`
- **Internal**: oauth constants, auth, config, log, privacyLevel, teleport API

## Logic
1. `OverageCreditGrantInfo` - available, eligible, granted, amount_minor_units, currency
2. `CachedGrantEntry` - info, timestamp
3. `CACHE_TTL_MS` (1h) - cache expiration
4. `fetchOverageCreditGrant` - fetches eligibility from backend
5. Backend resolves tier-specific amounts and role-based claim permission
6. CLI just reads response without replicating logic
7. 404/403 handled gracefully, returns null
8. `getCachedOverageCreditGrant` - gets cached grant info
9. Returns null if no cache, stale, or no org ID
10. Callers should render nothing (not block) when null
11. `invalidateOverageCreditGrantCache` - drops current org's cached entry
12. Leaves other orgs' entries intact
13. `refreshOverageCreditGrantCache` - fetches and caches grant info
14. Fire-and-forget, call when upsell surface about to render
15. Skips on essential-traffic-only mode
16. `formatCreditAmount` - formats amount for display
17. `formatGrantAmount` - formats grant amount for display

## Exports
- `OverageCreditGrantInfo` - grant info type
- `getCachedOverageCreditGrant` - gets cached grant info
- `invalidateOverageCreditGrantCache` - invalidates cache
- `refreshOverageCreditGrantCache` - refreshes cache
- `formatCreditAmount`, `formatGrantAmount` - formatting functions
