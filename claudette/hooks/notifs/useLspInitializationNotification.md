## Purpose
Polls LSP manager and server status; shows error notifications and accumulates errors in appState.plugins.errors for /doctor.

## Imports
- **External**: REACT (useState), `usehooks-ts` (useInterval)
- **Internal**:
  - `.././bootstrap/state` (getIsRemoteMode, getIsScrollDraining)
  - `.././context/notifications` (useNotifications)
  - `.././ink` (Text)
  - `.././services/lsp/manager` (getInitializationStatus, getLspServerManager)
  - `.././state/AppState` (useSetAppState)
  - `.././utils/debug` (logForDebugging)
  - `.././utils/envUtils` (isEnvTruthy)

## Logic
- Polling enabled only if `ENABLE_LSP_TOOL` env var is truthy (checked on mount via `isEnvTruthy`)
- `shouldPoll` state starts based on feature flag; can be disabled after manager failure
- `notifiedErrorsRef`: Set of dedup keys (`source:message`)
- `addError(source, message)`:
  - Dedup check; logs; appends to appState.plugins.errors as `{ type: "generic-error", source, error: message }`
  - Shows notification "LSP for <name> failed · /plugin for details" (medium, 8s); displayName for plugin: sources strips prefix
- `poll()` function:
  - Skips if remote mode or scroll draining
  - If manager status === 'failed': addError('lsp-manager', status.error.message), setShouldPoll(false)
  - If manager pending/not-started: return
  - If manager ok: iterate servers; any server in 'error' with lastError → addError(serverName, message)
- `useInterval(poll, shouldPoll ? 5000 : null)`
- Immediate poll on mount (effect) if shouldPoll

## Exports
- `useLspInitializationNotification` - Hook with no parameters
