# useCanUseTool

## Purpose
React hook that determines whether a tool can be used by checking permissions and coordinating through various permission handlers (coordinator, swarm worker, interactive dialog).

## Imports
- **Stdlib**: `React`, `useCallback`
- **External**: `@anthropic-ai/sdk` (APIUserAbortError), `react/compiler-runtime`
- **Internal**: 
  - Tool/types: `ToolUseConfirm`, `ToolPermissionContext`, `Tool as ToolType`, `ToolUseContext`, `AssistantMessage`
  - Permissions: `hasPermissionsToUseTool`, `PermissionDecision`, `createPermissionContext`, `createPermissionQueueOps`, `handleCoordinatorPermission`, `handleInteractivePermission`, `handleSwarmWorkerPermission`, `logPermissionDecision`
  - Utils: `recordAutoModeDenial`, `clearClassifierChecking`, `setClassifierApproval`, `setYoloClassifierApproval`, `logForDebugging`, `AbortError`, `logError`, `jsonStringify`
  - Bash: `consumeSpeculativeClassifierCheck`, `peekSpeculativeClassifierCheck`, `BASH_TOOL_NAME`
  - Other: `Text` (ink), `logEvent`, `sanitizeToolNameForAnalytics`

## Logic
1. Creates a memoized async permission-checking function using React compiler runtime
2. Creates a `PermissionContext` with tool details, input, and queue operations
3. Checks permissions via `hasPermissionsToUseTool()` or uses `forceDecision` if provided
4. **Behavior "allow"**: Logs acceptance, sets yolo classifier approval if auto-mode classifier, resolves with allow decision
5. **Behavior "deny"**: Logs rejection, records auto-mode denial with notification if applicable, resolves with deny decision
6. **Behavior "ask"**: 
   - Tries `handleCoordinatorPermission()` first if `awaitAutomatedChecksBeforeDialog` is enabled
   - Falls back to `handleSwarmWorkerPermission()`
   - For bash tool with `BASH_CLASSIFIER`: races speculative classifier check against 2-second timeout
   - On high-confidence classifier match: auto-approves and logs classifier decision
   - Finally calls `handleInteractivePermission()` for user dialog
7. Error handling: catches `AbortError` and `APIUserAbortError`, logs and resolves with cancel/abort
8. Finally block: clears classifier checking state via `clearClassifierChecking()`

## Exports
- `useCanUseTool` - default export, React hook that returns a `CanUseToolFn`
- `CanUseToolFn<Input>` - type for the permission checking function with signature: `(tool, input, toolUseContext, assistantMessage, toolUseID, forceDecision?) => Promise<PermissionDecision<Input>>`
