## Purpose
Defines size limits for tool results to prevent excessive context consumption from large tool outputs.

## Imports
- **Stdlib**: none
- **External**: none
- **Internal**: none

## Logic
Establishes per-tool and per-message character/token budgets for tool results. When limits are exceeded, results are persisted to disk and replaced with previews. Derives byte limits from token estimates and provides a truncation length for tool summaries in compact views.

## Exports
- `DEFAULT_MAX_RESULT_SIZE_CHARS` - default maximum characters for a single tool result before persisting to disk
- `MAX_TOOL_RESULT_TOKENS` - maximum tool result size in tokens
- `BYTES_PER_TOKEN` - conservative bytes-per-token estimate for size calculations
- `MAX_TOOL_RESULT_BYTES` - maximum tool result size in bytes derived from token limit
- `MAX_TOOL_RESULTS_PER_MESSAGE_CHARS` - maximum aggregate characters for all tool results in a single user message
- `TOOL_SUMMARY_MAX_LENGTH` - maximum character length for tool summary strings in compact views
