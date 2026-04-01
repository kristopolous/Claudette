# utils/sideQuery

## Purpose
Provides side query utilities for making API calls outside the main query loop.

## Imports
- **Stdlib**: (none)
- **External**: `@anthropic-ai/sdk`
- **Internal**: bootstrap state, constants betas/system, analytics, analytics metadata, API claude/client, betas, fingerprint, model model

## Logic
1. `SideQueryOptions` - options for side query
2. model - model to use for query
3. system - system prompt (string or TextBlockParam array, prefixed with CLI attribution)
4. Attribution header placed in its own TextBlockParam block for correct server-side parsing
5. messages - messages to send (supports cache_control on content blocks)
6. tools - optional tools (Tool[] or BetaToolUnion[])
7. tool_choice - optional tool choice ({ type: 'tool', name: 'x' } for forced output)
8. output_format - optional JSON output format for structured responses
9. max_tokens - max tokens (default: 1024)
10. maxRetries - max retries (default: 2)
11. signal - abort signal
12. skipSystemPromptPrefix - skip CLI system prompt prefix (for internal classifiers)
13. temperature - temperature override
14. thinking - thinking budget (enables thinking), or false to send { type: 'disabled' }
15. stop_sequences - generation stops when any string emitted
16. querySource - attributes call in tengu_api_success for COGS joining
17. `extractFirstUserMessageText` - extracts text from first user message for fingerprint
18. `sideQuery` - makes side query to API
19. Uses getAttributionHeader, getCLISyspromptPrefix for system prompt
20. Uses getAPIMetadata, getAnthropicClient for API call
21. Uses getModelBetas, modelSupportsStructuredOutputs for model capabilities
22. Uses computeFingerprint for fingerprint computation
23. Uses normalizeModelStringForAPI for model string normalization
24. Uses getLastApiCompletionTimestamp, setLastApiCompletionTimestamp for timestamp tracking
25. Uses logEvent for analytics logging
26. Uses STRUCTURED_OUTPUTS_BETA_HEADER for structured outputs beta

## Exports
- `SideQueryOptions` - side query options type
- `extractFirstUserMessageText` - extracts first user message text
- `sideQuery` - makes side query
