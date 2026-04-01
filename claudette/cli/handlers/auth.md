# auth

## Purpose
Implements OAuth authentication flow for CLI including login, logout, token management, and account status.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: logout commands, analytics, API error utils, oauth services, auth utils, config, debug/env/error/log utils, model providers, settings, status utils

## Logic
1. `installOAuthTokens` - shared post-token-acquisition logic
2. Clears old auth state before saving new credentials
3. Fetches and stores profile/roles (gracefully handles limited-scope tokens)
4. Saves tokens to secure storage, clears cache
5. Logs storage warnings to analytics
6. Fetches first-token-date for ClaudeAI auth
7. Creates API key for Console users (critical - lets it throw)
8. Handles SSL errors with hint suggestions
9. Supports force-login org validation
10. Builds account properties for status display

## Exports
- `installOAuthTokens` - saves tokens, fetches profile, sets up local auth state
- (Additional auth handler functions for login/logout flows)
