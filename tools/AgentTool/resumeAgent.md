# tools/AgentTool/resumeAgent

## Purpose
Provides agent resumption from saved transcript and metadata.

## Imports
- **Stdlib**: `fs/promises`
- **External**: (none)
- **Internal**: bootstrap state, prompts, coordinatorMode, hooks, Tool, LocalAgentTask, tools, ids, agentContext, cwd, debug, messages, model agent, promptCategory, sessionStorage, systemPrompt, task diskOutput, teammate, toolResultStorage, agentToolUtils, built-in agents, forkSubagent, loadAgentsDir, runAgent

## Logic
1. `ResumeAgentResult` - agentId, description, outputFile
2. `resumeAgentBackground` - main resumption function
3. Fetches transcript and metadata in parallel
4. Filters messages: whitespace-only assistants, orphaned thinking, unresolved tool uses
5. `reconstructForSubagentResume` - reconstructs content replacement state
6. Falls back if original worktree removed externally
7. Registers async agent with task framework
8. Runs agent lifecycle with resumed context
9. Uses parent session ID for context
10. Handles fork subagent and general-purpose agent types
11. Checks if built-in agent for special handling
12. Writes output to task output file
13. Returns resume result with agent ID and output path

## Exports
- `ResumeAgentResult` - resume result type
- `resumeAgentBackground` - resumes agent from saved state
