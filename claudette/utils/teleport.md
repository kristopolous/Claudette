# teleport

## Purpose
Manages remote session creation, resumption, and synchronization between local Claude Code instances and remote CCR (Claude Code Remote) sessions.

## Imports
- **Stdlib**: axios, chalk, crypto, react, zod/v4
- **External**: growthbook (feature flags), analytics
- **Internal**: TeleportError component, oauth constants, agentSdkTypes, ink, keybindings, api/claude (queryHaiku), api/sessionIngress, oauth/client, AppState, message types, auth, background/preconditions, conversationRecovery, cwd, debug, detectRepository, envUtils, errors, execFileNoThrow, format, git, json, log, messages, model, sessionStorage, settings, systemPromptType, teleport/api, teleport/environments, teleport/gitBundle

## Logic
Two main workflows:

**Teleport TO remote** (`teleportToRemote`): Creates a new remote session via `/v1/sessions` API. Source selection ladder: GitHub clone (if CCR has auth token) → git bundle fallback (if .git exists) → empty sandbox. Generates title/branch via Haiku model. Selects environment (prefers anthropic_cloud over BYOC). Supports bundle seeding, outcome branch reuse, GitHub PR attachment, and permission mode injection via control_request events.

**Teleport FROM remote** (`teleportResumeCodeSession`, `teleportFromSessionsAPI`): Resumes an existing remote session by fetching logs/events, validating repository match, checking out the session branch, and processing messages for resume (removes incomplete tool_use blocks, adds teleport notice messages).

## Exports
- `TeleportResult` - `{ messages: Message[], branchName: string }`
- `TeleportProgressStep` - Union: `'validating' | 'fetching_logs' | 'fetching_branch' | 'checking_out' | 'done'`
- `TeleportProgressCallback` - `(step: TeleportProgressStep) => void`
- `TeleportToRemoteResponse` - `{ id: string, title: string }`
- `TitleAndBranch` - `{ title: string, branchName: string }`
- `RepoValidationResult` - `{ status, sessionRepo?, currentRepo?, sessionHost?, currentHost?, errorMessage? }` where status is `'match' | 'mismatch' | 'not_in_repo' | 'no_repo_required' | 'error'`
- `PollRemoteSessionResponse` - `{ newEvents: SDKMessage[], lastEventId: string | null, branch?, sessionStatus? }`
- `validateGitState` - Validates git working directory is clean (ignoring untracked); throws TeleportOperationError if dirty
- `processMessagesForTeleportResume` - Deserializes messages, adds teleport resume user/system messages
- `checkOutTeleportedSessionBranch` - Fetches and checks out session branch; returns `{ branchName, branchError }`
- `validateSessionRepository` - Validates current repo matches session's repo; returns result object (does not throw)
- `teleportResumeCodeSession` - Resumes a code session by ID; validates auth, org, repo match; fetches logs
- `teleportToRemoteWithErrorHandling` - Wrapper that shows TeleportError dialog for prerequisites before calling teleportToRemote
- `teleportFromSessionsAPI` - Fetches session logs via session ingress API (tries v2 endpoint first, falls back); filters to transcript messages
- `pollRemoteSessionEvents` - Polls `/v1/sessions/{id}/events` with pagination; optionally fetches session metadata (branch, status)
- `teleportToRemote` - Creates remote session; handles GitHub preflight, bundle fallback, environment selection, permission mode, title/branch generation
- `archiveRemoteSession` - Best-effort POST to `/v1/sessions/{id}/archive`; fire-and-forget; 409 treated as success

## Source
`teleport`
