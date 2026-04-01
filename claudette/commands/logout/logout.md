## Purpose
Performs user logout by clearing credentials, secure storage, and related caches.

## Imports
- **Stdlib**: none
- **External**: `react`
- **Internal**: `clearTrustedDeviceTokenCache`, `Text` (ink), `refreshGrowthBookAfterAuthChange`, `getGroveNoticeConfig`, `getGroveSettings`, `clearPolicyLimitsCache`, `clearRemoteManagedSettingsCache`, `getClaudeAIOAuthTokens`, `removeApiKey`, `clearBetasCaches`, `saveGlobalConfig`, `gracefulShutdownSync`, `getSecureStorage`, `clearToolSchemaCache`, `resetUserCache`

## Logic
`performLogout` flushes telemetry (to prevent org data leakage), removes API key, wipes secure storage, clears authentication-related caches, and optionally resets onboarding state. `clearAuthRelatedCaches` clears memoized data including OAuth tokens, beta flags, tool schemas, user cache, GrowthBook config, Grove caches, remote settings, and policy limits. `call` executes logout with `clearOnboarding: true`, shows success message, and schedules graceful shutdown.

## Exports
- `performLogout` - Main logout function that clears credentials and config
- `clearAuthRelatedCaches` - Clears all caches affected by auth changes
- `call` - Command entry point that displays UI and triggers logout
