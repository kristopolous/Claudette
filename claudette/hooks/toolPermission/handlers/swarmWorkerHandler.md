## Purpose
For swarm workers, forwards tool permission requests to the leader via mailbox, with optional classifier auto-approval; returns a decision when the leader responds or on classifier success, or null to fall back to local interactive handling.

## Imports
- **Stdlib**: None
- **External**: BUILDFLAGS (`feature`), `@anthropic-ai/sdk` (`ContentBlockParam`)
- **Internal**:
  - `types/permissions` - `PendingClassifierCheck`
  - `utils/agentSwarmsEnabled` - `isAgentSwarmsEnabled`
  - `utils/errors` - `toError`
  - `utils/log` - `logError`
  - `utils/permissions/PermissionResult` - `PermissionDecision`
  - `utils/permissions/PermissionUpdateSchema` - `PermissionUpdate`
  - `utils/swarm/permissionSync` - `createPermissionRequest`, `isSwarmWorker`, `sendPermissionRequestViaMailbox`
  - `hooks/useSwarmPermissionPoller` - `registerPermissionCallback`
  - `hooks/toolPermission/PermissionContext` - `PermissionContext`, `createResolveOnce`

## Logic
- Guard: returns `null` unless `isAgentSwarmsEnabled()` and `isSwarmWorker()`.
- If `BASH_CLASSIFIER`, await `ctx.tryClassifier`; if returns decision, return it.
- Otherwise, create a promise and register callbacks with `registerPermissionCallback` *before* sending the request to avoid races.
  - `onAllow`: merges input, calls `ctx.handleUserAllow`, resolves.
  - `onReject`: logs, calls `ctx.cancelAndAbort`, resolves.
- Send the permission request via `sendPermissionRequestViaMailbox`.
- Set `toolUseContext` AppState `pendingWorkerRequest` to show a waiting indicator.
- Abort listener: if the operation is cancelled, resolve with `cancelAndAbort`.
- On error: log with `toError`, return `null` to let the caller fall back to interactive.
- Returns `PermissionDecision | null`.

## Exports
- `handleSwarmWorkerPermission` - async function
- `SwarmWorkerPermissionParams` - type
