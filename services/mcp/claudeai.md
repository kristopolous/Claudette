# mcp/claudeai

## Purpose
Fetches MCP server configurations from Claude.ai org configs for organization-managed servers.

## Imports
- **Stdlib**: (none)
- **External**: `axios`, `lodash-es/memoize`
- **Internal**: oauth constants, analytics, auth, config, debug, envUtils, MCP client/normalization/types

## Logic
1. `ClaudeAIMcpServer` - type with id, display_name, url, created_at
2. `ClaudeAIMcpServersResponse` - paginated response with data, has_more, next_page
3. `FETCH_TIMEOUT_MS` (5s), `MCP_SERVERS_BETA_HEADER` (mcp-servers-2025-12-04)
4. `fetchClaudeAIMcpConfigsIfEligible` - memoized (fetch once per session)
5. Checks ENABLE_CLAUDEAI_MCP_SERVERS env var (can disable)
6. Requires OAuth access token with user:mcp_servers scope
7. Direct scope check (not isClaudeAISubscriber) for non-interactive mode compatibility
8. Fetches from /v1/mcp_servers?limit=1000
9. Normalizes server names via normalizeNameForMCP
10. Converts to ScopedMcpServerConfig format
11. Logs eligibility events for analytics (disabled_env_var, no_oauth_token, missing_scope)
12. Clears MCP auth cache on fetch

## Exports
- `fetchClaudeAIMcpConfigsIfEligible` - memoized function fetching org-managed MCP configs
