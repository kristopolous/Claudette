## Purpose
Determines if a tool can be used, handling allow/deny/ask decisions with auto-mode classifier, speculation, and interactive permission flows.

## Imports
- **External**: `react` (useCallback), `@anthropic-ai/sdk` (APIUserAbortError)
- **Internal**:
  - `src/services/analytics/index.js` (logEvent, AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS)
  - `src/services/analytics/metadata.js` (sanitizeToolNameForAnalytics)
  - `../components/permissions/PermissionRequest.js` (ToolUseConfirm type)
  - `../ink.js` (Text)
  - `../Tool.js` (ToolPermissionContext, Tool, ToolUseContext)
  - `../tools/BashTool/bashPermissions.js` (consumeSpeculativeClassifierCheck, peekSpeculativeClassifierCheck)
  - `../tools/BashTool/toolName.js` (BASH_TOOL_NAME)
  - `../types/message.js` (AssistantMessage)
  - `../utils/autoModeDenials.js` (recordAutoModeDenial)
  - `../utils/classifierApprovals.js` (clearClassifierChecking, setClassifierApproval, setYoloClassifierApproval)
  - `../utils/debug.js` (logForDebugging)
  - `../utils/errors.js` (AbortError)
  - `../utils/log.js` (logError)
  - `../utils/permissions/PermissionResult.js` (PermissionDecision)
  - `../utils/permissions/permissions.js` (hasPermissionsToUseTool)
  - `../utils/slowOperations.js` (jsonStringify)
  - `./toolPermission/handlers/coordinatorHandler.js`
  - `./toolPermission/handlers/interactiveHandler.js`
  - `./toolPermission/handlers/swarmWorkerHandler.js`
  - `./toolPermission/PermissionContext.js` (createPermissionContext, createPermissionQueueOps)
  - `./toolPermission/permissionLogging.js` (logPermissionDecision)

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

Uses React compiler cache (`_c`) to memoize returned function across deps (`setToolPermissionContext`, `setToolUseConfirmQueue`).

## Exports
- `useCanUseTool` - Hook returning `CanUseToolFn`
- `CanUseToolFn` type: `(tool: Tool, input: Input, toolUseContext: ToolUseContext, assistantMessage: AssistantMessage, toolUseID: string, forceDecision?: PermissionDecision<Input>) => Promise<PermissionDecision<Input>>`
