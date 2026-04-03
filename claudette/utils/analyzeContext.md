# utils/analyzeContext

## Purpose
Analyzes context window usage for auto-compact and manual compact decisions.

## Imports
- **Stdlib**: `crypto`
- **External**: `@anthropic-ai/sdk`, BUILDFLAGS
- **Internal**: prompts, compact microCompact/autoCompact, bootstrap state, commands, context, growthbook, tokenEstimation, skills loadSkillsDir, Tool, AgentTool, SkillTool, message types, api, claudemd, context, cwd, debug, envUtils, errors, log, messages, model model, settings constants, JSON utils, systemPrompt, theme, tokens

## Logic
1. `TOOL_TOKEN_COUNT_OVERHEAD` (500) - API tool prompt preamble overhead
2. `RESERVED_CATEGORY_NAME` - 'Autocompact buffer'
3. `MANUAL_COMPACT_BUFFER_NAME` - 'Compact buffer'
4. `countTokensWithFallback` - counts tokens with Haiku fallback
5. `AUTOCOMPACT_BUFFER_TOKENS`, `MANUAL_COMPACT_BUFFER_TOKENS` - buffer constants
6. `getEffectiveContextWindowSize` - gets context window minus reserved tokens
7. `isAutoCompactEnabled` - checks if auto-compact enabled
8. `estimateSkillFrontmatterTokens` - estimates skill frontmatter token count
9. `getLimitedSkillToolCommands` - gets limited skill commands for analysis
10. `getSkillToolInfo` - gets skill tool info
11. `toolToAPISchema` - converts tool to API schema
12. `filterInjectedMemoryFiles`, `getMemoryFiles` - memory file handling
13. `getContextWindowForModel` - gets model context window
14. `normalizeMessagesForAPI` - normalizes messages for API
15. `getRuntimeMainLoopModel` - gets runtime model
16. `buildEffectiveSystemPrompt` - builds system prompt
17. `getCurrentUsage` - gets current token usage

## Exports
- `TOOL_TOKEN_COUNT_OVERHEAD` - tool overhead constant
- `countTokensWithFallback` - counts tokens with fallback
- (Context analysis functions)
