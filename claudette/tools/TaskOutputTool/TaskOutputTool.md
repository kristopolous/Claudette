# tools/TaskOutputTool/TaskOutputTool

## Purpose
Retrieves output/logs from background tasks (shell commands, agents, remote sessions). Deprecated in favor of using Read on the task's output file path directly.

## Imports
- **External**: `ajv`, REACT, `zod/v4`
- **Internal**:
  - Tool: `buildTool`, `ToolDef`, `Tool`
  - Components: `FallbackToolUseErrorMessage`, `FallbackToolUseRejectedMessage`, `MessageResponse`
  - UI: `Box`, `Text`, `useShortcutDisplay`
  - Types: `TaskType`, `Task`, `LocalAgentTaskState`, `LocalShellTaskState`, `RemoteAgentTaskState`, `TaskState`, `ThemeName`
  - Utils: `AbortError`, `lazySchema`, `extractTextContent`, `semanticBoolean`, `sleep`, `jsonParse`, `countCharInString`, `getTaskOutput`, `updateTaskState`, `formatTaskOutput`
  - Other tools: `AgentPromptDisplay`, `AgentResponseDisplay`, `BashToolResultMessage`
  - Local: `TASK_OUTPUT_TOOL_NAME`

## Logic
1. Input: task_id (required), block (default true), timeout (default 30000ms).
2. Validates task exists in appState.
3. If block=false: returns current status (success if completed, not_ready if running).
4. If block=true: polls for completion up to timeout, yielding progress events.
5. getTaskOutputData() fetches output based on task type:
   - local_bash: gets stdout/stderr from taskOutput or disk.
   - local_agent: prefers in-memory clean result over transcript.
   - remote_agent: includes prompt.
6. Marks task as notified when output is retrieved.
7. UI renders different displays based on task type.
8. Supports verbose mode for expanded output.
9. mapToolResultToToolResultBlockParam formats XML-like output.

## Exports
- `TaskOutputTool` - main tool definition (deprecated)
- `Progress` - TaskOutputProgress type (re-exported)
