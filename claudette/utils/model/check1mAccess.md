# utils/model/check1mAccess

## Purpose
Provides 1M context access checks for Opus and Sonnet models.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: claudeAiLimits, auth, config, context

## Logic
1. `isExtraUsageEnabled` - checks if extra usage enabled from cached reason
2. undefined = no cache yet, treat as not enabled (conservative)
3. null = no disabled reason from API, extra usage enabled
4. Checks OverageDisabledReason enum values:
   - 'out_of_credits' = provisioned but depleted (enabled)
   - 'overage_not_provisioned', 'org_level_disabled', etc. = not enabled
5. `checkOpus1mAccess` - checks if Opus 1M context access allowed
6. Returns false if 1M context disabled via env var
7. Subscribers: access if extra usage enabled
8. Non-subscribers (API/PAYG): always have access
9. `checkSonnet1mAccess` - checks if Sonnet 1M context access allowed
10. Same logic as Opus check

## Exports
- `isExtraUsageEnabled` - checks extra usage enabled
- `checkOpus1mAccess` - checks Opus 1M access
- `checkSonnet1mAccess` - checks Sonnet 1M access
