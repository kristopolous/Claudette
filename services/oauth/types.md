# oauth/types

## Purpose
Provides OAuth type definitions for tokens, profiles, and related data.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: (none - type definitions only)

## Logic
1. `OAuthTokens` - access_token, refresh_token, scope, token_type, expires_in
2. `OAuthTokenExchangeResponse` - token exchange response structure
3. `OAuthProfileResponse` - profile response with account/org info
4. `AccountInfo` - account UUID, email, display_name, created_at
5. `OrganizationInfo` - org UUID, name, billing_type, subscription info
6. `SubscriptionType` - subscription tier classification
7. `BillingType` - billing classification
8. `RateLimitTier` - rate limit tier classification
9. `UserRolesResponse` - user roles from API

## Exports
- `OAuthTokens` - OAuth token structure
- `OAuthTokenExchangeResponse` - token exchange response type
- `OAuthProfileResponse` - profile response type
- `AccountInfo` - account information type
- `OrganizationInfo` - organization information type
- `SubscriptionType` - subscription type enum
- `BillingType` - billing type enum
- `RateLimitTier` - rate limit tier type
- `UserRolesResponse` - user roles response type
