# api

## Purpose
Client for the Teleport/Sessions API (`/v1/sessions`), providing session listing, fetching, event sending, and title updates with automatic retry for transient errors.

## Imports
- **Stdlib**: axios, crypto, zod/v4
- **Internal**: src/constants/oauth, src/services/oauth/client, ../auth, ../debug, ../detectRepository, ../errors, ../lazySchema, ../log, ../sleep, ../slowOperations

## Logic
1. **Retry**: `axiosGetWithRetry` implements exponential backoff (2s, 4s, 8s, 16s — 4 retries, 5 total attempts). Retries on network errors (no response) and 5xx server errors. Does not retry 4xx client errors.
2. **Authentication**: `prepareApiRequest` validates that OAuth access tokens are present (API key is insufficient) and retrieves the organization UUID.
3. **Session listing**: `fetchCodeSessionsFromSessionsAPI` fetches all sessions, transforms `SessionResource[]` to `CodeSession[]` format by parsing GitHub URLs into repo info.
4. **Session fetching**: `fetchSession` fetches a single session by ID with specific error handling for 404 (not found) and 401 (expired).
5. **Event sending**: `sendEventToRemoteSession` posts a user message event to a running remote session. Uses caller-provided UUID if available for echo deduplication. 30s timeout for cold-start containers.
6. **Title updates**: `updateSessionTitle` PATCHes a session's title.
7. **Branch extraction**: `getBranchFromSession` extracts the first branch name from a session's git repository outcomes.
8. **Schema validation**: `CodeSessionSchema` is a lazy Zod schema for validating code session responses.

## Exports
- `CCR_BYOC_BETA` - constant beta header value `'ccr-byoc-2025-07-29'`
- `isTransientNetworkError(error)` - checks if an axios error is retryable (no response or 5xx)
- `axiosGetWithRetry<T>(url, config?)` - GET request with exponential backoff retry
- `SessionStatus` - type: 'requires_action' | 'running' | 'idle' | 'archived'
- `GitSource` - type for git repository context source
- `KnowledgeBaseSource` - type for knowledge base context source
- `SessionContextSource` - union: GitSource | KnowledgeBaseSource
- `OutcomeGitInfo` - type for git outcome info (type, repo, branches)
- `GitRepositoryOutcome` - type for git repository outcome
- `Outcome` - alias for GitRepositoryOutcome
- `SessionContext` - type for session context (sources, cwd, outcomes, prompts, model, etc.)
- `SessionResource` - type for a full session resource from the API
- `ListSessionsResponse` - type for paginated session list response
- `CodeSessionSchema` - lazy Zod schema for code session validation
- `CodeSession` - inferred type from CodeSessionSchema
- `prepareApiRequest()` - validates auth and returns `{accessToken, orgUUID}`
- `fetchCodeSessionsFromSessionsAPI()` - fetches and transforms all code sessions
- `getOAuthHeaders(accessToken)` - creates Authorization/Content-Type/anthropic-version headers
- `fetchSession(sessionId)` - fetches a single session by ID
- `getBranchFromSession(session)` - extracts first branch name from session outcomes
- `RemoteMessageContent` - type: string or array of content blocks for remote messages
- `sendEventToRemoteSession(sessionId, messageContent, opts?)` - sends a user event to a remote session
- `updateSessionTitle(sessionId, title)` - updates a session's title

## Source
`api`
