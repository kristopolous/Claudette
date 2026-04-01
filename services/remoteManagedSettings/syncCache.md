# remoteManagedSettings/syncCache

## Purpose
Provides eligibility check for remote managed settings with auth dependency isolation.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: oauth constants, auth utils, model providers, syncCacheState

## Logic
1. Keeps isRemoteManagedSettingsEligible (auth-touching) separate from leaf cache state
2. `cached` - module-level eligibility cache
3. `resetSyncCache` - clears cached eligibility and leaf cache
4. Eligibility rules:
   - Console users (API key): All eligible (must have actual key)
   - OAuth with subscriptionType: Enterprise/C4E/Team only
   - OAuth with null subscriptionType (externally-injected tokens): Eligible (API decides)
5. Pre-check to determine if API query worthwhile
6. API returns empty settings for ineligible users
7. Checks 3p provider (not eligible)
8. Checks custom base URL (not eligible)
9. Checks CLAUDE_CODE_ENTRYPOINT === 'local-agent' (Cowork VM, not eligible)
10. Checks OAuth tokens first (short-circuits security subprocess for common case)

## Exports
- `resetSyncCache` - resets eligibility and leaf cache
- `isRemoteManagedSettingsEligible` - checks user eligibility for remote settings
