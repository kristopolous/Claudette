## Purpose
Tool for retrieving output/logs from background tasks (shell commands, agents, remote sessions). Deprecated in favor of using Read on the task's output file path directly.

## Imports
- **Internal**: 
  - Components: `FallbackToolUseErrorMessage`, `FallbackToolUseRejectedMessage`, `MessageResponse`
  - UI: `Box`, `Text` (ink), `useShortcutDisplay`
  - Types: `TaskType`, `Task`, `LocalAgentTaskState`, `LocalShellTaskState`, `RemoteAgentTaskState`, `TaskState`
  - Utils: `AbortError`, `lazySchema`, `extractTextContent`, `semanticBoolean`, `sleep`, `jsonParse`, `countCharInString`, `getTaskOutput`, `updateTaskState`, `formatTaskOutput`, `ThemeName`
  - Other tools: `AgentPromptDisplay`, `AgentResponseDisplay`, `BashToolResultMessage`
  - Local: `TASK_OUTPUT_TOOL_NAME`

## Logic
1. Input: task_id (required), block (default true), timeout (default 30000ms)
2. Validates task exists in appState.tasks
3. If block=false: returns current status (success if completed, not_ready if still running)
4. If block=true: polls for completion up to timeout, yielding progress events
5. getTaskOutputData() fetches output based on task type:
   - local_bash: gets stdout/stderr from taskOutput or disk
   - local_agent: prefers in-memory clean result over transcript
   - remote_agent: includes prompt
6. Marks task as notified when output is retrieved
7. UI renders different displays based on task type (bash, agent, remote)
8. Supports verbose mode for expanded output
9. mapToolResultToToolResultBlockParam formats XML-like output with optional formatter

## Exports
- `TaskOutputTool` - Main tool definition (deprecated)
- `TaskOutput` - Unified output type (task_id, task_type, status, description, output, exitCode?, error?, prompt?, result?)
- `TaskOutputToolOutput` - Wrapper type (retrieval_status, task?)
- `Progress` - TaskOutputProgress (re-exported)
- Aliases: `AgentOutputTool`, `BashOutputTool` (backward compatibility)
