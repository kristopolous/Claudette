# utils/model/providers

## Purpose
Provides API provider detection and configuration.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: analytics, envUtils

## Logic
1. `APIProvider` - 'firstParty' | 'bedrock' | 'vertex' | 'foundry'
2. `getAPIProvider` - detects API provider from env vars
3. Checks: CLAUDE_CODE_USE_BEDROCK, CLAUDE_CODE_USE_VERTEX, CLAUDE_CODE_USE_FOUNDRY
4. Defaults to 'firstParty' if none set
5. `getAPIProviderForStatsig` - gets provider for Statsig analytics
6. `isFirstPartyAnthropicBaseUrl` - checks if ANTHROPIC_BASE_URL is first-party
7. Returns true if not set (default API) or points to api.anthropic.com
8. For ant users: also allows api-staging.anthropic.com
9. Parses URL host and checks against allowed hosts list

## Exports
- `APIProvider` - API provider type
- `getAPIProvider` - detects API provider
- `getAPIProviderForStatsig` - gets provider for Statsig
- `isFirstPartyAnthropicBaseUrl` - checks first-party base URL
