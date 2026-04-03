# utils/auth

## Purpose
Provides authentication utilities for API keys, OAuth tokens, and AWS/GCP credentials.

## Imports
- **Stdlib**: `child_process`, `fs/promises`, `path`
- **External**: STYLER, `execa`, `lodash-es/memoize`
- **Internal**: oauth constants, analytics, bootstrap state, mockRateLimits, oauth client/types/getOauthProfile, authFileDescriptor, authPortable, aws/awsAuthStatusManager, betas, config, debug, envUtils, errors, execFileNoThrow, lockfile, log, memoize, secureStorage index/keychainPrefetch/macOsKeychainHelpers, settings, sleep, JSON utils, toolSchemaCache

## Logic
1. Default TTL for API key helper cache (5 minutes)
2. `getAnthropicApiKey` - gets API key from config or keychain
3. `getAnthropicApiKeyWithSource` - gets API key with source tracking
4. `getClaudeAIOAuthTokens` - gets OAuth tokens from storage
5. `isClaudeAISubscriber` - checks if user has Claude.ai subscription
6. `hasProfileScope` - checks if OAuth has user:profile scope
7. `refreshOAuthToken` - refreshes expired OAuth token
8. `isOAuthTokenExpired` - checks if OAuth token expired
9. `shouldUseClaudeAIAuth` - checks if Claude.ai auth should be used
10. `getOauthAccountInfo` - gets account info from OAuth
11. `getSubscriptionType` - gets subscription type (max, team, enterprise)
12. `saveApiKey` - saves API key to keychain
13. `clearAuthCaches` - clears all auth-related caches
14. Handles AWS STS credentials and GCP credentials
15. Handles file descriptor-based auth for SDK mode
16. Mock subscription support for testing

## Exports
- `getAnthropicApiKey` - gets API key
- `getAnthropicApiKeyWithSource` - gets API key with source
- `getClaudeAIOAuthTokens` - gets OAuth tokens
- `isClaudeAISubscriber` - checks subscription status
- `hasProfileScope` - checks profile scope
- `refreshOAuthToken` - refreshes OAuth token
- `isOAuthTokenExpired` - checks token expiry
- `shouldUseClaudeAIAuth` - checks Claude.ai auth
- `getOauthAccountInfo` - gets account info
- `getSubscriptionType` - gets subscription type
- `saveApiKey` - saves API key
- `clearAuthCaches` - clears auth caches
