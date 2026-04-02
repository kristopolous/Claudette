# teammateMailbox

## Purpose
File-based messaging system for agent swarms. Each teammate has an inbox at `.claude/teams/{team_name}/inboxes/{agent_name}.json`. Supports multiple message types: idle notifications, permission requests/responses, shutdown requests, plan approval, sandbox permissions, task assignments, team permission updates, and mode set requests.

## Imports
- **Stdlib**: fs/promises, path
- **External**: zod/v4
- **Internal**: ../constants/xml.js, ../entrypoints/sdk/coreSchemas.js, ../tools/SendMessageTool/constants.js, ../types/message.js, ./agentId.js, ./array.js, ./debug.js, ./envUtils.js, ./errors.js, ./lazySchema.js, ./lockfile.js, ./log.js, ./slowOperations.js, ./swarm/backends/types.js, ./swarm/constants.js, ./tasks.js, ./teammate.js

## Logic
1. Inbox files are JSON arrays of `TeammateMessage` objects, keyed by agent name within a team
2. All write operations use `proper-lockfile` with retry backoff (10 retries, 5–100ms) to serialize concurrent writes from multiple agents
3. Read operations are lock-free; write operations re-read after acquiring the lock for latest state
4. Message types are identified by parsing JSON and checking the `type` field
5. `isStructuredProtocolMessage` identifies messages that should be routed by `useInboxPoller` rather than consumed as raw LLM context
6. `getLastPeerDmSummary` extracts a `[to {name}] {summary}` string from the last assistant message that ended with a SendMessage tool_use targeting a peer

## Exports
- `TeammateMessage` - type: { from, text, timestamp, read, color?, summary? }
- `getInboxPath(agentName, teamName?)` - returns the inbox file path
- `readMailbox(agentName, teamName?)` - async; returns all messages from an inbox (empty array if file missing)
- `readUnreadMessages(agentName, teamName?)` - async; returns only unread messages
- `writeToMailbox(recipientName, message, teamName?)` - async; appends a message with file locking
- `markMessageAsReadByIndex(agentName, teamName?, messageIndex)` - async; marks a single message as read with locking
- `markMessagesAsRead(agentName, teamName?)` - async; marks all messages as read with locking
- `markMessagesAsReadByPredicate(agentName, predicate, teamName?)` - async; marks only matching messages as read with locking
- `clearMailbox(agentName, teamName?)` - async; truncates inbox to empty array (no-op if file missing)
- `formatTeammateMessages(messages)` - formats messages as XML using `TEAMMATE_MESSAGE_TAG`

### Idle Notifications
- `IdleNotificationMessage` - type: { type: 'idle_notification', from, timestamp, idleReason?, summary?, completedTaskId?, completedStatus?, failureReason? }
- `createIdleNotification(agentId, options?)` - creates an idle notification message
- `isIdleNotification(messageText)` - parses and returns the message or null

### Permission Requests/Responses
- `PermissionRequestMessage` - type: { type: 'permission_request', request_id, agent_id, tool_name, tool_use_id, description, input, permission_suggestions }
- `PermissionResponseMessage` - discriminated union: success subtype with optional updated_input/permission_updates, or error subtype with error string
- `createPermissionRequestMessage(params)` - creates a permission request
- `createPermissionResponseMessage(params)` - creates a permission response
- `isPermissionRequest(messageText)` - parses and returns or null
- `isPermissionResponse(messageText)` - parses and returns or null

### Sandbox Permission Requests/Responses
- `SandboxPermissionRequestMessage` - type: { type: 'sandbox_permission_request', requestId, workerId, workerName, workerColor?, hostPattern: { host }, createdAt }
- `SandboxPermissionResponseMessage` - type: { type: 'sandbox_permission_response', requestId, host, allow, timestamp }
- `createSandboxPermissionRequestMessage(params)` - creates a sandbox permission request
- `createSandboxPermissionResponseMessage(params)` - creates a sandbox permission response
- `isSandboxPermissionRequest(messageText)` - parses and returns or null
- `isSandboxPermissionResponse(messageText)` - parses and returns or null

### Plan Approval
- `PlanApprovalRequestMessageSchema` / `PlanApprovalRequestMessage` - zod schema and inferred type for plan approval requests
- `PlanApprovalResponseMessageSchema` / `PlanApprovalResponseMessage` - zod schema and inferred type for plan approval responses
- `isPlanApprovalRequest(messageText)` - validates and returns or null
- `isPlanApprovalResponse(messageText)` - validates and returns or null

### Shutdown
- `ShutdownRequestMessageSchema` / `ShutdownRequestMessage` - zod schema and inferred type for shutdown requests
- `ShutdownApprovedMessageSchema` / `ShutdownApprovedMessage` - zod schema and inferred type for shutdown approved messages
- `ShutdownRejectedMessageSchema` / `ShutdownRejectedMessage` - zod schema and inferred type for shutdown rejected messages
- `createShutdownRequestMessage(params)` - creates a shutdown request
- `createShutdownApprovedMessage(params)` - creates a shutdown approved message
- `createShutdownRejectedMessage(params)` - creates a shutdown rejected message
- `sendShutdownRequestToMailbox(targetName, teamName?, reason?)` - async; creates and sends a shutdown request; returns { requestId, target }
- `isShutdownRequest(messageText)` - validates and returns or null
- `isShutdownApproved(messageText)` - validates and returns or null
- `isShutdownRejected(messageText)` - validates and returns or null

### Other Message Types
- `TaskAssignmentMessage` - type: { type: 'task_assignment', taskId, subject, description, assignedBy, timestamp }
- `isTaskAssignment(messageText)` - parses and returns or null
- `TeamPermissionUpdateMessage` - type: { type: 'team_permission_update', permissionUpdate, directoryPath, toolName }
- `isTeamPermissionUpdate(messageText)` - parses and returns or null
- `ModeSetRequestMessageSchema` / `ModeSetRequestMessage` - zod schema and inferred type for mode set requests
- `createModeSetRequestMessage(params)` - creates a mode set request
- `isModeSetRequest(messageText)` - validates and returns or null

### Protocol Routing
- `isStructuredProtocolMessage(messageText)` - returns true if the message is a protocol message that should be routed by useInboxPoller (permission_request, permission_response, sandbox_permission_request, sandbox_permission_response, shutdown_request, shutdown_approved, team_permission_update, mode_set_request, plan_approval_request, plan_approval_response)
- `getLastPeerDmSummary(messages)` - extracts a "[to {name}] {summary}" string from the last assistant message ending with a peer-directed SendMessage tool_use

## Source
`teammateMailbox`
