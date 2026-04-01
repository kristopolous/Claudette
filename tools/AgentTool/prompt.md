# tools/AgentTool/prompt

## Purpose
Provides prompt generation for agent tool with dynamic agent listing.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: growthbook, auth, embeddedTools, envUtils, teammate, teammateContext, FileRead/WriteTool, GlobTool, SendMessageTool, AgentTool constants, forkSubagent, loadAgentsDir

## Logic
1. `getToolsDescription` - formats tools/denied tools for agent
2. Handles allowlist, denylist, both, or neither cases
3. `formatAgentLine` - formats single agent line for attachment
4. Format: `- type: whenToUse (Tools: ...)`
5. `shouldInjectAgentListInMessages` - checks if agent list in attachment
6. Dynamic list was ~10.2% of fleet cache_creation tokens
7. MCP async connect, /reload-plugins, permission-mode changes mutate list → cache bust
8. Override via CLAUDE_CODE_AGENT_LIST_IN_MESSAGES env var
9. GrowthBook gate: tengu_agent_list_attach (default false)
10. `getPrompt` - generates full agent tool prompt
11. Filters agents by allowedAgentTypes when Agent(x,y) restricts spawning
12. Fork subagent feature: inserts "When to fork" section when enabled
13. Includes tool descriptions, examples, and agent listing

## Exports
- `getToolsDescription` - formats tools description for agent
- `formatAgentLine` - formats agent line for attachment
- `shouldInjectAgentListInMessages` - checks attachment injection
- `getPrompt` - generates agent tool prompt
