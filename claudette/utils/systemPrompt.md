# utils/systemPrompt

## Purpose
Provides system prompt building utilities based on priority rules.

## Imports
- **Stdlib**: (none)
- **External**: `bun:bundle`
- **Internal**: analytics, Tool, AgentTool loadAgentsDir, envUtils, systemPromptType, proactive index

## Logic
1. `asSystemPrompt`, `SystemPrompt` - re-exported from systemPromptType
2. `proactiveModule` - conditional import for proactive mode (feature-gated)
3. `isProactiveActive_SAFE_TO_CALL_ANYWHERE` - checks if proactive active
4. `buildEffectiveSystemPrompt` - builds effective system prompt array based on priority
5. Priority order:
   - 0. Override system prompt (if set, e.g., via loop mode - REPLACES all other prompts)
   - 1. Coordinator system prompt (if coordinator mode active)
   - 2. Agent system prompt (if mainThreadAgentDefinition set)
     - Proactive mode: agent prompt APPENDED to default
     - Otherwise: agent prompt REPLACES default
   - 3. Custom system prompt (if specified via --system-prompt)
   - 4. Default system prompt (standard Claudette prompt)
6. appendSystemPrompt always added at end (except when override set)
7. Coordinator mode: uses getCoordinatorSystemPrompt from coordinatorMode.js
8. Lazy require to avoid circular dependency at module load time
9. Built-in agents use getSystemPrompt method
10. Custom agents use systemPrompt property
11. `isBuiltInAgent` - checks if agent is built-in
12. `isEnvTruthy` - checks env var truthy
13. `logEvent`, `AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS` - analytics types
14. `ToolUseContext`, `AgentDefinition` - context/definition types

## Exports
- `asSystemPrompt`, `SystemPrompt` - re-exported types/functions
- `buildEffectiveSystemPrompt` - builds effective system prompt
- `isProactiveActive_SAFE_TO_CALL_ANYWHERE` - checks proactive active
