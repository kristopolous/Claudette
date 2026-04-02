# utils/queryContext

## Purpose
Shared helpers for building the API cache-key prefix (systemPrompt, userContext, systemContext) for query() calls. Isolated in its own file to avoid import cycles with context.ts and constants/prompts.ts.

## Imports
- **Internal**: `../commands` (Command), `../constants/prompts` (getSystemPrompt), `../context` (getSystemContext, getUserContext), `../services/mcp/types` (MCPServerConnection), `../state/AppStateStore` (AppState), `../Tool` (Tools, ToolUseContext), `../tools/AgentTool/loadAgentsDir` (AgentDefinition), `../types/message` (Message), `./abortController`, `./fileStateCache` (FileStateCache), `./forkedAgent` (CacheSafeParams), `./model/model` (getMainLoopModel), `./systemPromptType` (asSystemPrompt), `./thinking` (shouldEnableThinkingByDefault, ThinkingConfig)

## Logic
1. File is isolated because it imports from context.ts and constants/prompts.ts which are high in the dependency graph — putting these in systemPrompt.ts or sideQuestion.ts would create cycles
2. Only entrypoint-layer files import from here (QueryEngine.ts, cli/print.ts)
3. `fetchSystemPromptParts` fetches systemPrompt parts, userContext, and systemContext in parallel via Promise.all; when customSystemPrompt is set, default systemPrompt and systemContext are skipped entirely
4. `buildSideQuestionFallbackParams` reconstructs CacheSafeParams from raw inputs for the SDK side_question handler on resume before a turn completes (no stopHooks snapshot yet)
5. Strips in-progress assistant messages (stop_reason === null) since the SDK can fire side_question mid-turn
6. Builds ToolUseContext with thinking config (adaptive if enabled, disabled otherwise), abort controller, and no-op state setters

## Exports
- `fetchSystemPromptParts({ tools, mainLoopModel, additionalWorkingDirectories, mcpClients, customSystemPrompt })` - returns `{ defaultSystemPrompt: string[], userContext, systemContext }`; skips default prompt/context when customSystemPrompt is provided
- `buildSideQuestionFallbackParams({ tools, commands, mcpClients, messages, readFileState, getAppState, setAppState, customSystemPrompt, appendSystemPrompt, thinkingConfig, agents })` - builds CacheSafeParams for SDK side_question handler on resume; mirrors QueryEngine.ts:ask() system prompt assembly
