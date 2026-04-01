# services/api/claude

## Purpose
Main API client for Anthropic Claude API with streaming support.

## Imports
- **Stdlib**: `crypto`
- **External**: `@anthropic-ai/sdk`, `@anthropic-ai/sdk/streaming.mjs`
- **Internal**: model providers, system constants, Tool, AgentTool, connectorText, message types, api utils, auth, betas, config, context, effort, envUtils, errors, fingerprint, log, messages, model model/aliases, permissions, platform, proxy, sequential, settings, slowOperations, systemPromptType, telemetry, thinking, tokens, utils, xml, analytics, rateLimitMocking, errors/errorUtils

## Logic
1. Imports Beta SDK types for messages, content blocks, tools, usage
2. `queryModel` - main query function with streaming
3. Handles tool choice, cache control, prompt caching
4. Normalizes messages for API format
5. Ensures tool result pairing
6. Computes fingerprint for cache key
7. Handles effort levels and model-specific options
8. Supports Bedrock, Vertex, first-party providers
9. Handles connector text blocks for streaming
10. Tracks API usage and costs
11. Logs events for analytics
12. Handles rate limit mocking for testing
13. Extracts connection error details
14. Classifies API errors for appropriate handling
15. Supports global cache strategies (tool_based, system_prompt, none)

## Exports
- `queryModel` - main query function
- `queryModelWithoutStreaming` - non-streaming query
- `getAPIMetadata` - gets API metadata
- `getExtraBodyParams` - gets extra body params
- `getAnthropicClient` - gets Anthropic client instance
- (API client functions and types)
