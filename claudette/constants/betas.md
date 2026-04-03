## Purpose
Defines API beta header constants for enabling experimental features across different inference providers.

## Imports
- **Stdlib**: none
- **External**: BUILDFLAGS
- **Internal**: none

## Logic
Declares string constants for various beta feature headers sent with API requests. Some headers are conditionally set based on feature flags or user type. Provides sets for provider-specific handling: Bedrock extra body params and Vertex count tokens allowed betas.

## Exports
- `CLAUDE_CODE_20250219_BETA_HEADER` - base beta header
- `INTERLEAVED_THINKING_BETA_HEADER` - interleaved thinking feature
- `CONTEXT_1M_BETA_HEADER` - 1M context window feature
- `CONTEXT_MANAGEMENT_BETA_HEADER` - context management feature
- `STRUCTURED_OUTPUTS_BETA_HEADER` - structured outputs feature
- `WEB_SEARCH_BETA_HEADER` - web search feature
- `TOOL_SEARCH_BETA_HEADER_1P` - tool search for first-party providers
- `TOOL_SEARCH_BETA_HEADER_3P` - tool search for third-party providers
- `EFFORT_BETA_HEADER` - effort control feature
- `TASK_BUDGETS_BETA_HEADER` - task budgets feature
- `PROMPT_CACHING_SCOPE_BETA_HEADER` - prompt caching scope feature
- `FAST_MODE_BETA_HEADER` - fast mode feature
- `REDACT_THINKING_BETA_HEADER` - thinking redaction feature
- `TOKEN_EFFICIENT_TOOLS_BETA_HEADER` - token efficient tools feature
- `SUMMARIZE_CONNECTOR_TEXT_BETA_HEADER` - connector text summarization (conditional)
- `AFK_MODE_BETA_HEADER` - AFK mode feature (conditional)
- `CLI_INTERNAL_BETA_HEADER` - internal CLI features (ant users only)
- `ADVISOR_BETA_HEADER` - advisor tool feature
- `BEDROCK_EXTRA_PARAMS_HEADERS` - set of betas sent via Bedrock extra body params
- `VERTEX_COUNT_TOKENS_ALLOWED_BETAS` - set of betas allowed on Vertex count tokens API
