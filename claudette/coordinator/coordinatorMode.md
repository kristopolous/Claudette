## Purpose
Determines coordinator mode status, manages session mode matching, and generates context and system prompts for coordinator-style task orchestration across multiple workers.

## Imports
- **Stdlib**: None
- **External**: `bun:bundle` (feature flag)
- **Internal**: `constants/tools`, `services/analytics/growthbook`, `services/analytics/index`, various tool name constants (AgentTool, BashTool, FileEditTool, FileReadTool, SendMessageTool, SyntheticOutputTool, TaskStopTool, TeamCreateTool, TeamDeleteTool), `utils/envUtils`

## Logic
1. Checks coordinator mode via feature flag and environment variable
2. Matches resumed session mode by flipping the environment variable if mismatched
3. Generates worker tool context listing available tools and MCP servers for worker prompts
4. Constructs a comprehensive system prompt that defines the coordinator role, available tools, task workflow phases, concurrency guidelines, verification standards, worker prompt writing guidelines, and example sessions

## Exports
- `isCoordinatorMode` - returns whether coordinator mode is enabled
- `matchSessionMode` - aligns current mode with a resumed session's stored mode, returning a warning message if switched
- `getCoordinatorUserContext` - generates worker tool context including available tools, MCP servers, and scratchpad directory
- `getCoordinatorSystemPrompt` - returns the full system prompt defining coordinator behavior, tool usage, task workflow, and worker management guidelines
