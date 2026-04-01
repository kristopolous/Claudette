# mcp/oauthPort

## Purpose
Provides OAuth redirect port helpers for MCP OAuth authentication flow.

## Imports
- **Stdlib**: `http`
- **External**: (none)
- **Internal**: platform utils

## Logic
1. `REDIRECT_PORT_RANGE` - Windows: 39152-49151 (dynamic range reserved), others: 49152-65535
2. `REDIRECT_PORT_FALLBACK` - 3118 as fallback port
3. `buildRedirectUri` - builds "http://localhost:{port}/callback" per RFC 8252 Section 7.3
4. RFC 8252: loopback redirect URIs match any port if path matches
5. `getMcpOAuthCallbackPort` - reads MCP_OAUTH_CALLBACK_PORT env var
6. `findAvailablePort` - finds available port via random selection in range
7. First tries configured port if specified
8. Makes up to 100 random attempts in range
9. Falls back to REDIRECT_PORT_FALLBACK if random selection fails
10. Throws error if no port available

## Exports
- `buildRedirectUri` - builds localhost redirect URI
- `findAvailablePort` - finds available port for OAuth redirect
- `REDIRECT_PORT_RANGE` - port range constants
- `REDIRECT_PORT_FALLBACK` - fallback port constant
