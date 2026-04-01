# mcp/auth

## Purpose
Implements OAuth authentication for MCP servers including discovery, token management, and refresh.

## Imports
- **Stdlib**: `crypto`, `fs/promises`, `http`, `path`, `url`
- **External**: `@modelcontextprotocol/sdk`, `axios`, `xss`
- **Internal**: oauth constants, browser, envUtils, errors, lockfile, log, platform, secureStorage, sleep, JSON utils, analytics, MCP oauthPort/utils/xaa/xaaIdpLogin

## Logic
1. `AUTH_REQUEST_TIMEOUT_MS` (30s) - timeout for OAuth requests
2. `MCPRefreshFailureReason` - analytics failure reasons (metadata_discovery_failed, invalid_grant, etc.)
3. `MCPFlowErrorReason` - flow error reasons for analytics
4. OAuth discovery via discoverAuthorizationServerMetadata
5. Token refresh via sdkRefreshAuthorization with retry logic
6. Handles OAuthError, ServerError, TemporarilyUnavailableError, TooManyRequestsError
7. Secure storage for token persistence
8. Lockfile for concurrent access prevention
9. Browser redirect server for OAuth callback
10. XAA (cross-app access) token exchange support
11. IDP (identity provider) integration for enterprise SSO
12. Analytics event logging for OAuth flows

## Exports
- OAuth authentication functions for MCP servers
- Token refresh and discovery utilities
- XAA and IDP integration functions
