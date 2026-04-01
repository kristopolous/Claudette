# tasks/InProcessTeammateTask/types

## Purpose
Defines types for in-process teammate task state and identity.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: Task types, agent types, message types, permissions, LocalAgentTask types

## Logic
1. `TeammateIdentity` - agentId, agentName, teamName, color, planModeRequired, parentSessionId
2. Stored in task state (matches TeammateContext shape for AsyncLocalStorage)
3. `InProcessTeammateTaskState` - extends TaskStateBase with teammate-specific fields
4. identity - teammate identity sub-object
5. prompt, model, selectedAgent - execution configuration
6. abortController, currentWorkAbortController - runtime abort controls
7. awaitingPlanApproval - plan mode approval tracking
8. permissionMode - independent permission mode cycling via Shift+Tab
9. error, result, progress - execution state
10. messages - conversation history for zoomed view (NOT mailbox)
11. inProgressToolUseIDs - tool IDs for animation
12. pendingUserMessages - queue for typed messages when viewing
13. spinnerVerb, pastTenseVerb - UI spinner verbs (stable across re-renders)
14. isIdle, shutdownRequested - lifecycle state
15. onIdleCallbacks - runtime callbacks for leader wait
16. lastReportedToolCount, lastReportedTokenCount - progress tracking
17. `isInProcessTeammateTask` - type guard

## Exports
- `TeammateIdentity` - teammate identity type
- `InProcessTeammateTaskState` - teammate task state type
- `isInProcessTeammateTask` - type guard for teammate tasks
- `appendCappedMessage` - appends message with cap
