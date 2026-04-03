# analytics/metadata

## Purpose
Provides shared event metadata enrichment for all analytics systems (Datadog, 1P).

## Imports
- **Stdlib**: `path`
- **External**: `lodash-es/memoize`
- **Internal**: env, envDynamic, betas, model, bootstrap state, envUtils, MCP, auth, git, platform, user, agentContext, generated event types, teammate, BUILDFLAGS

## Logic
1. `AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS` - marker type for verified safe metadata
2. `sanitizeToolNameForAnalytics` - redacts MCP tool names (mcp__server__tool → mcp_tool) to avoid PII
3. Built-in tools (Bash, Read, Write) preserved; MCP tools redacted
4. `isDetailedToolNameLoggingEnabled` - checks if detailed tool logging enabled for OTLP
5. `getEventMetadata` - enriches events with system/user context
6. Collects: platform, arch, node version, terminal, package managers, runtimes
7. Boolean flags: is_running_with_bun, is_ci, is_github_action, etc.
8. GitHub Actions metadata: actor_id, repository_id, owner_id
9. WSL version, Linux distro/version, VCS detection
10. Session context: sessionId, agentId, teamName, parentSessionId
11. Model context: mainLoopModel, betas, effort, skillMode
12. Auth context: userType, subscriptionType, organizationUUID, accountUUID

## Exports
- `AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS` - marker type
- `sanitizeToolNameForAnalytics` - sanitizes tool names for analytics
- `isDetailedToolNameLoggingEnabled` - checks detailed logging flag
- `getEventMetadata` - enriches events with metadata
- `getEnvironmentMetadata` - collects environment info
- `getAuthMetadata` - collects auth context
