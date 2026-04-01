# tokenEstimation

## Purpose
Provides token estimation utilities for various inference providers (Anthropic, Bedrock, Vertex).

## Imports
- **Stdlib**: (none)
- **External**: `@anthropic-ai/sdk`, `@aws-sdk/client-bedrock-runtime`
- **Internal**: model providers, betas, attachments, envUtils, log, messages, model bedrock/model, slowOperations, toolSearch, API claude/client, vcr

## Logic
1. `TOKEN_COUNT_THINKING_BUDGET` (1024), `TOKEN_COUNT_MAX_TOKENS` (2048) - minimal values for counting with thinking
2. `hasThinkingBlocks` - checks if messages contain thinking/redacted_thinking blocks
3. `stripToolSearchFieldsFromMessages` - removes tool search beta fields (caller, tool_reference)
4. Dynamically imports AWS SDK to defer 279KB until Bedrock call made
5. `countTokensWithBedrock` - counts tokens via Bedrock CountTokens API
6. `countTokensWithVertex` - counts tokens via Vertex AI API
7. `countTokensWithAnthropic` - counts tokens via Anthropic count_tokens API
8. `roughTokenCountEstimation` - estimates tokens without API call
9. `tokenCountWithEstimation` - combines estimation with API counting
10. Handles attachments, normalizes for API format
11. Uses VCR for caching token count results

## Exports
- `roughTokenCountEstimation` - rough token estimation
- `tokenCountWithEstimation` - token counting with estimation fallback
- (Provider-specific token counting functions)
