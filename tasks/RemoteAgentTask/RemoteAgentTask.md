# tasks/RemoteAgentTask/RemoteAgentTask

## Purpose
Manages remote agent task execution with polling and metadata handling.

## Imports
- **Stdlib**: (none)
- **External**: `@anthropic-ai/sdk`
- **Internal**: product constants, xml constants, agentSdkTypes, Task types, TodoWriteTool, background remote, debug, log, messageQueueManager, messages, sdkEventQueue, sessionStorage, JSON utils, task diskOutput/framework, teleport API, todo types, ultraplan types

## Logic
1. `RemoteAgentTaskState` - extends TaskStateBase with remote-specific fields
2. remoteTaskType, remoteTaskMetadata, sessionId, command, title
3. todoList, log (SDKMessage[]), isLongRunning
4. pollStartedAt - tracks when local poller started (for timeout clock)
5. isRemoteReview - true for teleported /ultrareview commands
6. reviewProgress - stage (finding/verifying/synthesizing), bugs found/verified/refuted
7. isUltraplan, ultraplanPhase (needs_input, plan_ready, undefined=running)
8. `REMOTE_TASK_TYPES` - remote-agent, ultraplan, ultrareview, autofix-pr, background-pr
9. `RemoteTaskCompletionChecker` - callback for completion checking
10. completionCheckers map by task type
11. Handles SDK message parsing and output file management
12. Polls remote session events via pollRemoteSessionEvents
13. Archives remote sessions on completion
14. Emits task terminated events to SDK

## Exports
- `RemoteAgentTaskState` - remote agent task state type
- `RemoteTaskType` - remote task type union
- `AutofixPrRemoteTaskMetadata` - autofix PR metadata type
- `RemoteTaskMetadata` - remote task metadata type
- `RemoteTaskCompletionChecker` - completion checker type
- `RemoteAgentTask` - task definition for remote agents
