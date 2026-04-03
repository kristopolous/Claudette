## Purpose
Factory for creating the permission context object used during tool use authorization; also provides queue operations bridge and a one-time resolver utility.

## Imports
- **Stdlib**: None
- **External**: `@anthropic-ai/sdk` (type only), BUILDFLAGS (`feature`)
- **Internal** (selected):
  - `services/analytics/*` - `logEvent`, `sanitizeToolNameForAnalytics`
  - `components/permissions/PermissionRequest` - `ToolUseConfirm` type
  - Tool` - `ToolPermissionContext`, `Tool`, `ToolUseContext`
  - `tools/BashTool/bashPermissions` - `awaitClassifierAutoApproval`
  - tools/BashTool/toolName` - `BASH_TOOL_NAME`
  - `types/message` - `AssistantMessage`
  - `types/permissions` - decision and reason types
  - `utils/classifierApprovals` - `setClassifierApproval`
  - `utils/debug` - `logForDebugging`
  - utils/hooks` - `executePermissionRequestHooks`
  - utils/messages` - reject message constants, `withMemoryCorrectionHint`
  - `utils/permissions/PermissionResult` - `PermissionDecision` type
  - `utils/permissions/PermissionUpdate*` - update/persist helpers
  - hooks/toolPermission/permissionLogging` - `logPermissionDecision`

## Logic
- `createResolveOnce<T>`: Returns a wrapper with `resolve`, `isResolved`, and `claim` to guarantee a single resolution across async callers.
- `createPermissionQueueOps(setToolUseConfirmQueue)`: Adapts a React state setter to a generic queue interface (`push`, `remove`, `update`) used by the permission context.
- `createPermissionContext(...)`: Constructs a frozen context object implementing the permission lifecycle:
  - `logDecision(...)`: Delegates to `logPermissionDecision` with metadata.
  - `logCancelled()`: Logs `tengu_tool_use_cancelled` when a tool use is aborted.
  - `persistPermissions(updates)`: Persists permission updates, updates AppState's toolPermissionContext, returns whether any updates support persistence.
  - `resolveIfAborted(resolve)`: If abort signal is set, logs cancellation and returns a `cancelAndAbort` decision.
  - `cancelAndAbort(...)`: Builds a deny decision with appropriate user message (constants vary by subagent/rejection-with-reason), optionally aborts the controller and includes content blocks.
  - `tryClassifier(...)` (BASH_CLASSIFIER): For Bash tool, runs `awaitClassifierAutoApproval`; on allow, logs decision and returns `{ behavior: 'allow', ... }`. May record classifier approval in app state.
  - `runHooks(...)`: Iterates async results from `executePermissionRequestHooks`. On hook allow, calls `handleHookAllow` (persists, logs, builds allow). On deny, logs (`decision: reject, source: hook`), interrupts if requested, returns deny decision.
  - `buildAllow(...)` and `buildDeny(...)`: Constructors for decision shapes.
  - `handleUserAllow(...)`: Persists permission updates, logs user acceptance, computes `userModified` via `tool.inputsEquivalent`, returns allow decision with optional feedback/contentBlocks.
  - `handleHookAllow(...)`: Similar, with source `{ type: 'hook' }`.
  - Queue helpers (`pushToQueue`, `removeFromQueue`, `updateQueueItem`) delegate to `queueOps`.
- Exports functions and the `PermissionContext` type.

## Exports
- `createPermissionContext`
- `createPermissionQueueOps`
- `createResolveOnce`
- Types: `PermissionContext`, `PermissionApprovalSource`, `PermissionQueueOps`, `PermissionRejectionSource`, `ResolveOnce`
