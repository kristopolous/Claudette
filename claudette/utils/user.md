# user

## Purpose
Manages user identity data (device ID, session ID, email, OAuth account info, subscription tier) for analytics providers including GrowthBook and Statsig. Pre-fetches email asynchronously at startup so `getCoreUserData` can remain synchronous.

## Imports
- **Stdlib**: `execa` (via execa package)
- **External**: `lodash-es/memoize`
- **Internal**: `../bootstrap/state` (getSessionId), `./auth` (getOauthAccountInfo, getRateLimitTier, getSubscriptionType), `./config` (getGlobalConfig, getOrCreateUserID), `./cwd` (getCwd), `./env` (getHostPlatformForAnalytics), `./envUtils` (isEnvTruthy)

## Logic
1. Two module-level caches: `cachedEmail` (null = not fetched yet, undefined = no email, string = email) and `emailFetchPromise` (dedupes concurrent fetches)
2. `initUser()` — called early in startup; fetches email via `getEmailAsync()` and stores in `cachedEmail`, clears `getCoreUserData` memoization cache so next call picks up the email
3. `resetUserCache()` — called on auth changes (login/logout/account switch); resets email caches and clears memoization on `getCoreUserData` and `getGitEmail`
4. `getCoreUserData(includeAnalyticsMetadata?)` — memoized; returns `CoreUserData` with deviceId, sessionId, email, appVersion, platform, OAuth account/org UUIDs, userType env var, and optionally subscriptionType, rateLimitTier, firstTokenTime. Also includes GitHub Actions metadata when `GITHUB_ACTIONS` env is truthy
5. `getUserForGrowthBook()` — convenience wrapper calling `getCoreUserData(true)` to include analytics metadata
6. `getEmail()` — synchronous; returns cached email if available, then OAuth email, then Ant-only env fallbacks (`COO_CREATOR@anthropic.com`), otherwise undefined
7. `getEmailAsync()` — async; same as getEmail but falls back to `getGitEmail()` (runs `git config --get user.email`) if no email found via OAuth or env vars
8. `getGitEmail()` — memoized async; spawns `git config --get user.email` in the current working directory, returns trimmed stdout or undefined

## Exports
- `GitHubActionsMetadata` — type for GitHub Actions CI metadata (actor, repository, owner fields)
- `CoreUserData` — type for base analytics user data (deviceId, sessionId, email, platform, OAuth info, subscription info)
- `initUser` — async startup function that pre-fetches email
- `resetUserCache` — resets all user data caches on auth changes
- `getCoreUserData` — memoized function returning CoreUserData
- `getUserForGrowthBook` — returns CoreUserData with analytics metadata included
- `getGitEmail` — memoized async function returning git user.email

## Source
`user`
