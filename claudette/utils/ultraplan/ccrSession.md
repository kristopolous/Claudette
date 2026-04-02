# ccrSession

## Purpose
CCR (Cloud Code Runner) session polling for `/ultraplan`. Waits for an approved `ExitPlanMode` tool_result from the remote session, then extracts the plan text. Uses `pollRemoteSessionEvents` (shared with RemoteAgentTask) for pagination and typed SDKMessage arrays.

## Imports
- **External**: `@anthropic-ai/sdk/resources` (ToolResultBlockParam, ToolUseBlock)
- **Internal**: `../../entrypoints/agentSdkTypes`, `../../tools/ExitPlanModeTool/constants`, `../debug`, `../sleep`, `../teleport/api`, `../teleport`

## Logic
1. **ExitPlanModeScanner** — pure stateful classifier that ingests SDKMessage batches and tracks ExitPlanMode calls/results. Maintains `exitPlanCalls` (tool_use IDs), `results` (tool_result map), `rejectedIds`, and `terminated` state. Precedence: approved > terminated > rejected > pending > unchanged. Handles batches containing both an approved tool_result AND a subsequent `{type:'result'}` (remote crash after approval).
2. **Phase transitions**: `running` → `needs_input` (turn ends without ExitPlanMode) → `running` (user replies in browser) → `plan_ready` (ExitPlanMode emitted, no result yet) → resolves (approved) or back to `running` (rejected).
3. **pollForApprovedExitPlanMode** — polling loop with 3s interval, max 5 consecutive failures. Checks `shouldStop()` callback each iteration. Derives phase from scanner state and session status (`idle`/`requires_action` with no new events = `needs_input`). Throws `UltraplanPollError` on termination, timeout, or network failure.
4. **Plan extraction**: `extractApprovedPlan` looks for `## Approved Plan:` or `## Approved Plan (edited by user):` markers. `extractTeleportPlan` looks for `__ULTRAPLAN_TELEPORT_LOCAL__` sentinel (user clicked "teleport back to terminal").
5. **Execution target**: `'remote'` = user approved in-CCR execution (don't archive remote). `'local'` = user clicked teleport (execute here, archive remote).

## Exports
- `PollFailReason` — type: `'terminated' | 'timeout_pending' | 'timeout_no_plan' | 'extract_marker_missing' | 'network_or_unknown' | 'stopped'`
- `UltraplanPollError` — Error subclass with `reason: PollFailReason` and `rejectCount: number`
- `ULTRAPLAN_TELEPORT_SENTINEL` — constant: `'__ULTRAPLAN_TELEPORT_LOCAL__'`
- `ScanResult` — type: discriminated union `{kind: 'approved'|'teleport'|'rejected'|'pending'|'terminated'|'unchanged'}`
- `UltraplanPhase` — type: `'running' | 'needs_input' | 'plan_ready'`
- `ExitPlanModeScanner` — class: stateful classifier for CCR event streams. Methods: `ingest(newEvents)`, getters: `rejectCount`, `hasPendingPlan`, `everSeenPending`
- `PollResult` — type: `{plan, rejectCount, executionTarget: 'local'|'remote'}`
- `pollForApprovedExitPlanMode(sessionId, timeoutMs, onPhaseChange?, shouldStop?)` — async poll loop returning PollResult
