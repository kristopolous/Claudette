# Upgrade Command (`upgrade`)

## Purpose
Upgrades the user to the Max subscription plan for higher rate limits and more Opus access. Checks if user is already on the highest Max tier (20x), then opens the upgrade page in the browser and optionally initiates a login flow.

## Imports
### Stdlib
- REACT

### Internal
- `LocalJSXCommandContext` type from `.././commands`
- `getOauthProfileFromOauthToken` from `.././services/oauth/getOauthProfile`
- `LocalJSXCommandOnDone` type from `.././types/command`
- `getClaudeAIOAuthTokens`, `isClaudeAISubscriber` from `.././utils/auth`
- `openBrowser` from `.././utils/browser`
- `logError` from `.././utils/log`
- `Login` component from `./login/login`

## Logic
The `call` async function receives `onDone` and `context`:

1. If user is a Claude AI subscriber:
   - Determines if already on Max 20x:
     - If OAuth tokens present with `subscriptionType === 'max'` and `rateLimitTier === 'default_claude_max_20x'`.
     - Or, fetches OAuth profile via `getOauthProfileFromOauthToken` and checks `organization.organization_type === 'claude_max'` and `rate_limit_tier === 'default_claude_max_20x'`.
   - If Max 20x: messages user to run `/login` to switch to API usage-billed account; returns `null`.
2. If not Max 20x:
   - Opens `https://claude.ai/upgrade/max` in browser via `openBrowser`.
   - Renders the `<Login>` component with a starting message, providing `onDone` that:
     - Calls `context.onChangeAPIKey()` to refresh credentials.
     - Reports 'Login successful' or 'Login interrupted'.
   - Returns the JSX (or null on error).
3. If any error occurs, logs it and returns a fallback message via `onDone` and `null`.

## Exports
- `call` (async function) - Handles upgrade flow and optional login

### Helpful Prompt Templates

_No prompt templates found in this file. The file contains JSX UI logic only._