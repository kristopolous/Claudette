# components/LogoV2/OverageCreditUpsell

## Purpose
Provides overage credit upsell component and utilities.

## Imports
- **Stdlib**: (none)
- **External**: REACT, REACT_COMPILER
- **Internal**: ink, analytics, API overageCreditGrant, config, format, LogoV2 Feed

## Logic
1. `MAX_IMPRESSIONS` (3) - max impressions for upsell
2. `isEligibleForOverageCreditGrant` - checks eligibility for overage credit grant
3. Eligibility comes entirely from backend GET /overage_credit_grant response
4. CLI doesn't replicate tier/threshold/role checks
5. Backend returns available: false for Team members who aren't admins
6. Returns false if !info || !info.available || info.granted
7. Returns false if formatGrantAmount(info) === null
8. `shouldShowOverageCreditUpsell` - checks if should show upsell
9. Returns false if !isEligibleForOverageCreditGrant()
10. Returns false if config.hasVisitedExtraUsage
11. Returns false if (config.overageCreditUpsellSeenCount ?? 0) >= MAX_IMPRESSIONS
12. `maybeRefreshOverageCreditCache` - kicks off background fetch if cache empty
13. Safe to call unconditionally on mount - no-ops if cache fresh
14. `useShowOverageCreditUpsell` - hook for showing upsell
15. Uses useState with maybeRefreshOverageCreditCache + shouldShowOverageCreditUpsell
16. `incrementOverageCreditUpsellSeenCount` - increments seen count
17. Saves to global config, logs tengu_overage_credit_upsell_shown event
18. `getUsageText` - gets usage text: "{amount} in extra usage for third-party apps · /extra-usage"
19. `FEED_SUBTITLE` - "On us. Works on third-party apps · /extra-usage"
20. `getFeedTitle` - gets feed title: "{amount} in extra usage"
21. `OverageCreditUpsell` - UI component for upsell
22. Renders feed with title, subtitle
23. `formatGrantAmount`, `getCachedOverageCreditGrant`, `refreshOverageCreditGrantCache` - overage credit functions
24. `getGlobalConfig`, `saveGlobalConfig` - config functions
25. `truncate` - truncates text
26. `logEvent` - logs analytics event
27. `FeedConfig` - feed config type

## Exports
- `isEligibleForOverageCreditGrant` - checks eligibility
- `shouldShowOverageCreditUpsell` - checks if should show upsell
- `maybeRefreshOverageCreditCache` - refreshes cache
- `useShowOverageCreditUpsell` - hook for showing upsell
- `incrementOverageCreditUpsellSeenCount` - increments seen count
- `OverageCreditUpsell` - overage credit upsell component
- `createOverageCreditFeed` - creates overage credit feed config
