## Purpose
Centralized telemetry for tool permission decisions: logs analytics events, OpenTelemetry traces, code-edit metrics, and records decisions in the tool use context.

## Imports
- **Stdlib**: None
- **External**: BUILDFLAGS (`feature`)
- **Internal** (selected):
  - `services/analytics/index` - `logEvent` and types
  - `services/analytics/metadata` - `sanitizeToolNameForAnalytics`
  - `bootstrap/state` - `getCodeEditToolDecisionCounter`
  - Tool` - `ToolType`, `ToolUseContext`
  - `utils/cliHighlight` - `getLanguageName`
  - `utils/sandbox/sandbox-adapter` - `SandboxManager`
  - `utils/telemetry/events` - `logOTelEvent`
  - `hooks/toolPermission/PermissionContext` - `PermissionApprovalSource`, `PermissionRejectionSource`

## Logic
- Types: `PermissionLogContext` (tool, input, toolUseContext, messageId, toolUseID), `PermissionDecisionArgs` (accept|reject + source).
- `isCodeEditingTool`: recognizes Edit, Write, NotebookEdit.
- `buildCodeEditToolAttributes`: extracts file path via `tool.getPath` if available, determines language, returns attributes for counter.
- `sourceToString`: converts source objects to string labels for analytics (classifier, hook, user_permanent, user_temporary, user_abort, user_reject, unknown). Feature flags for classifier.
- `baseMetadata`: builds common payload (messageID, sanitized toolName, sandbox status, optional wait_ms).
- `logApprovalEvent`: emits distinct events:
  - `tengu_tool_use_granted_in_config` (config allowlist)
  - `tengu_tool_use_granted_by_classifier` (BASH/TRANSCRIPT_CLASSIFIER)
  - `tengu_tool_use_granted_in_prompt_permanent/temporary` (user)
  - `tengu_tool_use_granted_by_permission_hook` (hook with permanent flag)
- `logRejectionEvent`: emits:
  - `tengu_tool_use_denied_in_config` (config denylist)
  - `tengu_tool_use_rejected_in_prompt` with `isHook` for hook rejections or `hasFeedback` for user rejects.
- `logPermissionDecision`: main entry:
  - Computes `waiting_for_user_permission_ms` from prompt start time.
  - Fires the appropriate analytics event.
  - For code editing tools, increments a code edit tool counter with attributes via `buildCodeEditToolAttributes`.
  - Persists decision in `toolUseContext.toolDecisions` Map (key: toolUseID).
  - Sends OTel event `tool_decision` with normalized source string.
- Exports helpers and types.

## Exports
- Functions: `logPermissionDecision`, `isCodeEditingTool`, `buildCodeEditToolAttributes`
- Types: `PermissionLogContext`, `PermissionDecisionArgs`
