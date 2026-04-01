## Purpose
Polls teammate/team-lead mailbox for messages, submitting them as turns when idle or queuing when busy; manages permission flows, shutdowns, mode changes, and plan approvals.

## Imports
- **External**: `react` (useCallback, useEffect, useRef), `usehooks-ts` (useInterval)
- **Internal**:
  - `../components/permissions/PermissionRequest.js` (ToolUseConfirm type)
  - `../constants/xml.js` (TEAMMATE_MESSAGE_TAG)
  - `../ink/useTerminalNotification.js` (useTerminalNotification)
  - `../services/notifier.js` (sendNotification)
  - `../state/AppState.js` (useAppState, useAppStateStore, useSetAppState)
  - `../Tool.js` (findToolByName)
  - `../tasks/InProcessTeammateTask/types.js` (isInProcessTeammateTask)
  - `../tools.js` (getAllBaseTools)
  - `../types/permissions.js` (PermissionUpdate type)
  - `../utils/debug.js` (logForDebugging)
  - `../utils/inProcessTeammateHelpers.js` (findInProcessTeammateTaskId, handlePlanApprovalResponse)
  - `../utils/messages.js` (createAssistantMessage)
  - `../utils/permissions/PermissionMode.js` (permissionModeFromString, toExternalPermissionMode)
  - `../utils/permissions/PermissionUpdate.js` (applyPermissionUpdate)
  - `../utils/slowOperations.js` (jsonStringify)
  - `../utils/swarm/backends/detection.js` (isInsideTmux)
  - `../utils/swarm/backends/registry.js` (ensureBackendsRegistered, getBackendByType)
  - `../utils/swarm/constants.js` (TEAM_LEAD_NAME)
  - `../utils/swarm/leaderPermissionBridge.js` (getLeaderToolUseConfirmQueue)
  - `../utils/swarm/permissionSync.js` (sendPermissionResponseViaMailbox)
  - `../utils/swarm/teamHelpers.js` (removeTeammateFromTeamFile, setMemberMode)
  - `../utils/tasks.js` (unassignTeammateTasks)
  - `../utils/teammate.js` (getAgentName, isPlanModeRequired, isTeamLead, isTeammate)
  - `../utils/teammateContext.js` (isInProcessTeammate)
  - `../utils/teammateMailbox.js` (various is* parsing functions, readUnreadMessages, markMessagesAsRead, writeToMailbox, TeammateMessage, etc.)
  - `./useSwarmPermissionPoller.js` (hasPermissionCallback, hasSandboxPermissionCallback, processMailboxPermissionResponse, processSandboxPermissionResponse)

## Logic
- Props: `{ enabled, isLoading, focusedInputDialog, onSubmitMessage }`
- Determines polling agent name via `getAgentNameToPoll`:
  - Returns agent name for out-of-process teammates, team leads; undefined for in-process teammates or standalone sessions
- Polls every 1 second (INBOX_POLL_INTERVAL_MS) if shouldPoll
- Reads unread messages from mailbox; classifies into many categories:
  - permissionRequests, permissionResponses, sandboxPermissionRequests, sandboxPermissionResponses
  - shutdownRequests, shutdownApprovals, teamPermissionUpdates, modeSetRequests, planApprovalRequests, regularMessages
- Actions:
  - **Permission requests** (leader side): queue in ToolUseConfirmQueue; send desktop notification; dedup by toolUseID
  - **Permission responses** (worker side): invoke registered callbacks via processMailboxPermissionResponse
  - **Sandbox permission requests** (leader): add to workerSandboxPermissions.queue; desktop notification
  - **Sandbox permission responses** (worker): invoke callback; clear pendingSandboxRequest
  - **Team permission updates** (teammate): apply rules via applyPermissionUpdate to session context
  - **Mode set requests** (teammate): change session mode; write to config.json for leader visibility
  - **Plan approval requests** (leader): auto-approve, write response, update in-process task state
  - **Shutdown requests** (teammate): pass through as regular message
  - **Shutdown approvals** (leader): kill pane (if tmux), remove teammate from team file, unassign tasks, mark task completed, add System message to inbox
- Regular messages:
  - If idle (not loading, no focused dialog): `onSubmitMessage(formatted)` to turn
    - If rejected (query running): queue messages into AppState.inbox for later
  - If busy: queue messages directly (AppState.inbox)
  - Mark messages as read after successful submit or queuing
- Effect on idle change: attempts to deliver pending queued messages
- Initial poll on mount (once)
- Heavy use of appState stores to avoid stale closures; many helpers from teammateMailbox system

## Exports
- `useInboxPoller` - Hook `(props: { enabled: boolean, isLoading: boolean, focusedInputDialog: string | undefined, onSubmitMessage: (formatted: string) => boolean }) => void`
