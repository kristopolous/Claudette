# inProcessRunner

## Purpose
Pass through allow/deny decisions directly

## Imports
- **Stdlib**: BUILDFLAGS
- **External**: @anthropic-ai/sdk/resources/messages.mjs
- **Internal**: ../../constants/prompts, .././constants/xml, .././hooks/useCanUseTool, .././services/compact/autoCompact, .././services/compact/microCompact, .././state/AppState, .././Tool, ../../tasks/InProcessTeammateTask/InProcessTeammateTask, ../../tasks/InProcessTeammateTask/types, ../../tools/AgentTool/loadAgentsDir...

## Items

### createInProcessCanUseTool
**Type**: Function

### cleanup
**Type**: Function

### formatAsTeammateMessage
**Type**: Function

### updateTaskState
**Type**: Function

### sendMessageToLeader
**Type**: Function

### sendIdleNotification
**Type**: Function

### findAvailableTask
**Type**: Function

### formatTaskAsPrompt
**Type**: Function

### tryClaimNextTask
**Type**: Function

### waitForNextPromptOrShutdown
**Type**: Function

### runInProcessTeammate
**Type**: Function

### startInProcessTeammate
**Type**: Function

### SetAppStateFn
**Type**: Type alias

### InProcessRunnerConfig
**Type**: Type alias

### InProcessRunnerResult
**Type**: Type alias

### WaitResult
**Type**: Type alias

## Exports
- InProcessRunnerConfig
- InProcessRunnerResult
- runInProcessTeammate
- startInProcessTeammate

## Source
`inProcessRunner`