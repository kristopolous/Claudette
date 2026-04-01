# teleport

## Purpose
Extract text from the response

## Imports
- **Stdlib**: axios, chalk, crypto, react, src/bootstrap/state.js, src/services/analytics/growthbook.js, src/services/analytics/index.js, src/services/policyLimits/index.js, zod/v4
- **Internal**: ../components/TeleportError.js, ../constants/oauth.js, ../entrypoints/agentSdkTypes.js, ../ink.js, ../keybindings/KeybindingProviderSetup.js, ../services/api/claude.js, ../services/api/sessionIngress.js, ../services/oauth/client.js, ../state/AppState.js, ../types/message.js...

## Items

### createTeleportResumeSystemMessage
**Type**: Function

### createTeleportResumeUserMessage
**Type**: Function

### generateTitleAndBranch
**Type**: Function

### validateGitState
**Type**: Function

### fetchFromOrigin
**Type**: Function

### ensureUpstreamIsSet
**Type**: Function

### checkoutBranch
**Type**: Function

### getCurrentBranch
**Type**: Function

### processMessagesForTeleportResume
**Type**: Function

### checkOutTeleportedSessionBranch
**Type**: Function

### validateSessionRepository
**Type**: Function

### teleportResumeCodeSession
**Type**: Function

### handleTeleportPrerequisites
**Type**: Function

### teleportToRemoteWithErrorHandling
**Type**: Function

### teleportFromSessionsAPI
**Type**: Function

### pollRemoteSessionEvents
**Type**: Function

### teleportToRemote
**Type**: Function

### archiveRemoteSession
**Type**: Function

### TeleportResult
**Type**: Type alias

### TeleportProgressStep
**Type**: Type alias

### TeleportProgressCallback
**Type**: Type alias

### TeleportToRemoteResponse
**Type**: Type alias

### TitleAndBranch
**Type**: Type alias

### RepoValidationResult
**Type**: Type alias

### PollRemoteSessionResponse
**Type**: Type alias

### EventsResponse
**Type**: Type alias

## Exports
- TeleportResult
- TeleportProgressStep
- TeleportProgressCallback
- validateGitState
- processMessagesForTeleportResume
- checkOutTeleportedSessionBranch
- RepoValidationResult
- validateSessionRepository
- teleportResumeCodeSession
- teleportToRemoteWithErrorHandling
- teleportFromSessionsAPI
- PollRemoteSessionResponse
- pollRemoteSessionEvents
- teleportToRemote
- archiveRemoteSession

## Source
`teleport.tsx`