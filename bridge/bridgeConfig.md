# bridgeConfig

## Purpose
Centralizes bridge authentication and URL resolution, consolidating dev overrides and OAuth config access.

## Imports
- **Stdlib**: `process` (env vars)
- **External**: (none)
- **Internal**: `getOauthConfig`, `getClaudeAIOAuthTokens`

## Logic
1. Provides ant-only dev overrides via `CLAUDE_BRIDGE_OAUTH_TOKEN` and `CLAUDE_BRIDGE_BASE_URL` env vars
2. `getBridgeTokenOverride` - returns dev token only for USER_TYPE='ant', otherwise undefined
3. `getBridgeBaseUrlOverride` - returns dev base URL only for USER_TYPE='ant', otherwise undefined
4. `getBridgeAccessToken` - combines override with OAuth keychain (override takes precedence)
5. `getBridgeBaseUrl` - combines override with production OAuth config (override takes precedence)

## Exports
- `getBridgeTokenOverride` - gets ant-only dev override token
- `getBridgeBaseUrlOverride` - gets ant-only dev override base URL
- `getBridgeAccessToken` - gets effective access token (override or OAuth)
- `getBridgeBaseUrl` - gets effective base URL (override or production)
