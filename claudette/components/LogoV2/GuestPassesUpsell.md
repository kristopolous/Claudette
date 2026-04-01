# components/LogoV2/GuestPassesUpsell

## Purpose
Provides guest passes upsell component and utilities.

## Imports
- **Stdlib**: (none)
- **External**: `react`, `react/compiler-runtime`
- **Internal**: ink, analytics, API referral, config

## Logic
1. `resetIfPassesRefreshed` - resets upsell counters if passes refreshed
2. Gets remaining passes via getCachedRemainingPasses
3. Returns if remaining == null or remaining <= 0
4. Gets config via getGlobalConfig
5. Gets lastSeen from config.passesLastSeenRemaining ?? 0
6. If remaining > lastSeen: saves config with passesUpsellSeenCount: 0, hasVisitedPasses: false, passesLastSeenRemaining: remaining
7. `shouldShowGuestPassesUpsell` - checks if should show guest passes upsell
8. Gets eligible, hasCache from checkCachedPassesEligibility
9. Only shows if eligible and cache exists (doesn't block on fetch)
10. Calls resetIfPassesRefreshed
11. Gets config via getGlobalConfig
12. Returns false if (config.passesUpsellSeenCount ?? 0) >= 3
13. Returns false if config.hasVisitedPasses
14. `useShowGuestPassesUpsell` - hook for showing guest passes upsell
15. Uses useState with shouldShowGuestPassesUpsell
16. `incrementGuestPassesSeenCount` - increments guest passes seen count
17. Saves to global config, logs tengu_guest_passes_upsell_shown event
18. `GuestPassesUpsell` - React component for guest passes upsell
19. Gets referrer reward via getCachedReferrerReward
20. Renders Text with dimColor
21. Shows "[✻] [✻] [✻] · Share Claudette and earn {amount} of extra usage · /passes" or "3 guest passes at /passes"
22. `useState` - React hook
23. `Text` - ink text component
24. `logEvent` - logs analytics event
25. `checkCachedPassesEligibility`, `formatCreditAmount`, `getCachedReferrerReward`, `getCachedRemainingPasses` - referral functions
26. `getGlobalConfig`, `saveGlobalConfig` - config functions

## Exports
- `useShowGuestPassesUpsell` - hook for showing upsell
- `incrementGuestPassesSeenCount` - increments seen count
- `GuestPassesUpsell` - guest passes upsell component
