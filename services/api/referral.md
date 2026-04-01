# services/api/referral

## Purpose
Manages referral campaign eligibility and redemptions for guest passes.

## Imports
- **Stdlib**: (none)
- **External**: `axios`
- **Internal**: oauth constants, auth, config, debug, log, privacyLevel, teleport API, oauth types

## Logic
1. `CACHE_EXPIRATION_MS` (24h) - eligibility cache expiration
2. `fetchInProgress` - prevents duplicate in-flight fetches
3. `fetchReferralEligibility` - fetches eligibility for campaign
4. Default campaign: 'claude_code_guest_pass'
5. 5-second timeout for background fetch
6. `fetchReferralRedemptions` - fetches referral redemptions
7. 10-second timeout for redemptions fetch
8. `shouldCheckForPasses` - prechecks for guest passes feature
9. Requires org UUID, Claude.ai subscriber, max subscription
10. `checkCachedPassesEligibility` - checks cached eligibility
11. `getCachedReferrerReward` - gets cached referrer reward info
12. `formatCreditAmount` - formats credit amount for display
13. `formatGrantAmount` - formats grant amount for display
14. `getCachedOverageCreditGrant` - gets cached overage credit grant

## Exports
- `CACHE_EXPIRATION_MS` - cache expiration constant
- `fetchReferralEligibility` - fetches referral eligibility
- `fetchReferralRedemptions` - fetches referral redemptions
- `shouldCheckForPasses` - checks if passes feature available
- (Cached eligibility and reward functions)
