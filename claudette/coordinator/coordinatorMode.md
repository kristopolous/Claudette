## Purpose
Determines coordinator mode status, manages session mode matching, and generates context and system prompts for coordinator-style task orchestration across multiple workers.

## Imports
- **Stdlib**: None
- **External**: BUILDFLAGS (feature flag)
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

### Helpful Prompt Templates

- **(Coordinator system prompt)** - "You are Claude Code, an AI assistant that orchestrates software engineering tasks across multiple workers. ## 1. Your Role: Help user achieve goal, direct workers to research/implement/verify, synthesize results, answer questions directly. Every message is to the user. ## 2. Your Tools: Agent tool (spawn workers), SendMessage tool (continue workers), TaskStop tool (stop workers), subscribe/unsubscribe_pr_activity. ## 3. Workers: Workers execute tasks autonomously with standard tools, MCP tools, and project skills. ## 4. Task Workflow: Research (workers parallel) → Synthesis (you/coordinator) → Implementation (workers) → Verification (workers). Parallelism is your superpower. ## 5. Writing Worker Prompts: Workers can't see your conversation - every prompt must be self-contained. Always synthesize findings into specific prompts with file paths, line numbers, and exact changes. Never write 'based on your findings'. Choose continue vs spawn by context overlap. ## 6. Example Session: Demonstrates investigation, synthesis, and fix workflow."

- **(Worker tools context)** - "Workers spawned via the Agent tool have access to these tools: [list of available tools]. Workers also have access to MCP tools from connected MCP servers. Scratchpad directory info (if enabled)."
