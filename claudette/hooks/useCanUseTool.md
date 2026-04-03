## Purpose
Determines if a tool can be used, handling allow/deny/ask decisions with auto-mode classifier, speculation, and interactive permission flows.

## Imports
- **External**: REACT (useCallback), `@anthropic-ai/sdk` (APIUserAbortError)
- **Internal**:
  - src/services/analytics/index` (logEvent, AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS)
  - src/services/analytics/metadata` (sanitizeToolNameForAnalytics)
  - `./components/permissions/PermissionRequest` (ToolUseConfirm type)
  - `./ink` (Text)
  - `./Tool` (ToolPermissionContext, Tool, ToolUseContext)
  - `./tools/BashTool/bashPermissions` (consumeSpeculativeClassifierCheck, peekSpeculativeClassifierCheck)
  - `./tools/BashTool/toolName` (BASH_TOOL_NAME)
  - `./types/message` (AssistantMessage)
  - `./utils/autoModeDenials` (recordAutoModeDenial)
  - `./utils/classifierApprovals` (clearClassifierChecking, setClassifierApproval, setYoloClassifierApproval)
  - `./utils/debug` (logForDebugging)
  - `./utils/errors` (AbortError)
  - `./utils/log` (logError)
  - `./utils/permissions/PermissionResult` (PermissionDecision)
  - `./utils/permissions/permissions` (hasPermissionsToUseTool)
  - `./utils/slowOperations` (jsonStringify)
  - `/toolPermission/handlers/coordinatorHandler`
  - `/toolPermission/handlers/interactiveHandler`
  - `/toolPermission/handlers/swarmWorkerHandler`
  - `/toolPermission/PermissionContext` (createPermissionContext, createPermissionQueueOps)
  - `/toolPermission/permissionLogging` (logPermissionDecision)

## Logic
Returns `CanUseToolFn` function that:
1. Creates permission context; aborts early if context already cancelled
2. Computes decision from `hasPermissionsToUseTool` or uses `forceDecision`
3. **Allow**: logs decision, returns buildAllow with updated input
4. **Deny**: logs permission decision, records auto-mode denial with notification if applicable; returns deny
5. **Ask**: multi-stage:
   - If `awaitAutomatedChecksBeforeDialog`, try coordinator handler (may resolve)
   - Try swarm worker handler (may resolve)
   - If BASH_CLASSIFIER feature and not awaiting, attempt speculative classifier (2s race)
   - Finally, interactive handler (shows permission dialog)
6. **Error/Abort**: catches AbortError/APIUserAbortError → cancelAndAbort; others → log + cancel
7. `finally`: clears classifier checking state

Uses REACT_COMPILER cache (`_c`) to memoize returned function across deps (`setToolPermissionContext`, `setToolUseConfirmQueue`).

## Exports
- `useCanUseTool` - Hook returning `CanUseToolFn`
- `CanUseToolFn` type: `(tool: Tool, input: Input, toolUseContext: ToolUseContext, assistantMessage: AssistantMessage, toolUseID: string, forceDecision?: PermissionDecision<Input>) => Promise<PermissionDecision<Input>>`
