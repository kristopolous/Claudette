# utils/api

## Purpose
Provides API utilities for tool schema conversion, cache control, and system prompt handling.

## Imports
- **Stdlib**: `crypto`
- **External**: `@anthropic-ai/sdk`, `zod/v4`
- **Internal**: prompts, context, analytics config/growthbook/index, MCP client/types, BashTool, FileEditTool/utils, FileWriteTool, tools, ids, AgentTool constants/types, ExitPlanModeTool, TaskOutputTool, message types, agentSwarmsEnabled, betas, cwd, debug, envUtils, messages, model providers, permissions filesystem, plans, platform, ripgrep, JSON utils, systemPromptType, toolSchemaCache, windowsPaths, zodToJsonSchema

## Logic
1. `BetaToolWithExtras` - extended tool type with strict, defer_loading, cache_control, eager_input_streaming
2. `CacheScope` - 'global' | 'org' for prompt caching
3. `toolToAPISchema` - converts Tool to BetaTool API schema
4. Handles cache control with ephemeral type, scope, ttl
5. `splitSysPromptPrefix` - splits system prompt at dynamic boundary
6. `logAPIPrefix` - logs API prefix for debugging
7. `shouldUseGlobalCacheScope` - checks if global cache scope should be used
8. `modelSupportsStructuredOutputs` - checks model structured output support
9. `getAPIMetadata` - gets API metadata for requests
10. Handles MCP resource prefetching
11. Handles file read ignore patterns
12. Handles plan file persistence for remote sessions
13. Counts files with ripgrep for context estimation
14. Converts Zod schemas to JSON Schema
15. Handles Windows path to POSIX conversion

## Exports
- `BetaToolWithExtras` - extended tool type
- `CacheScope` - cache scope type
- `toolToAPISchema` - converts tool to API schema
- `splitSysPromptPrefix` - splits system prompt
- `logAPIPrefix` - logs API prefix
- `shouldUseGlobalCacheScope` - checks global cache scope
- `modelSupportsStructuredOutputs` - checks structured outputs
- `getAPIMetadata` - gets API metadata
