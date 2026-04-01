## Purpose
Sign out from your Anthropic account and clear all credentials.

## Imports
- **External**: React
- **Internal**: Trusted device cache, GrowthBook refresh, Grove settings, policy limits, remote managed settings, OAuth tokens, API key removal, betas cache, global config, graceful shutdown, secure storage, tool schema cache, user cache, performLogout, clearAuthRelatedCaches

## Logic
1. Local-jsx command that performs comprehensive logout
2. `call` function invokes `performLogout({ clearOnboarding: true })`:
   - Flushes telemetry BEFORE clearing credentials (prevents data leakage)
   - Removes API key
   - Wipes secure storage
   - Calls clearAuthRelatedCaches():
     - Clears OAuth token cache
     - Clears trusted device token
     - Clears betas, tool schema caches
     - Resets user cache and refreshes GrowthBook
     - Clears Grove config cache
     - Clears remote managed settings cache
     - Clears policy limits cache
   - Optionally resets onboarding state in global config (clears hasCompletedOnboarding, subscription notices, etc.)
   - Removes oauthAccount from config
3. Renders confirmation message: "Successfully logged out from your Anthropic account."
4. Calls gracefulShutdownSync(0, 'logout') after 200ms delay to exit
5. Command type: 'local-jsx'

## Exports
- `call` - async LocalJSXCommandCall returning Text component (null after shutdown)
- `performLogout` - main logout function (also used elsewhere)
- `clearAuthRelatedCaches` - helper to clear all auth-related caches
