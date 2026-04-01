# mcp/officialRegistry

## Purpose
Fetches and caches official MCP registry URLs for server verification.

## Imports
- **Stdlib**: (none)
- **External**: `axios`
- **Internal**: debug, errors

## Logic
1. `RegistryServer` - type with server.remotes array
2. `RegistryResponse` - response with servers array
3. `officialUrls` - Set of normalized URLs (undefined until fetched)
4. `normalizeUrl` - strips query string and trailing slash
5. `prefetchOfficialMcpUrls` - fire-and-forget fetch from api.anthropic.com/mcp-registry
6. Respects CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC env var
7. 5-second timeout for registry fetch
8. Logs loaded URL count on success, error on failure
9. `isOfficialMcpUrl` - checks if normalized URL in registry (fail-closed if undefined)
10. `resetOfficialMcpUrlsForTesting` - test-only reset function

## Exports
- `prefetchOfficialMcpUrls` - fetches official MCP registry
- `isOfficialMcpUrl` - checks if URL is in official registry
- `resetOfficialMcpUrlsForTesting` - test-only reset function
