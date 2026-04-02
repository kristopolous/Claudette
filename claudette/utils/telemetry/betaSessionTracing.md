# betaSessionTracing

## Purpose
Beta detailed tracing features that log system prompts, tool schemas, conversation context, tool I/O, and model responses to OpenTelemetry spans. Enabled via `ENABLE_BETA_TRACING_DETAILED=1` and `BETA_TRACING_ENDPOINT`.

## Imports
- **Stdlib**: crypto
- **External**: @opentelemetry/api
- **Internal**: ../../bootstrap/state, ../../services/analytics/growthbook, ../../services/analytics/metadata, ../../types/message, ../envUtils, ../slowOperations, ./events

## Logic
1. **Enablement**: `isBetaTracingEnabled()` requires both env vars set. For external users, also requires non-interactive mode OR allowlist via `tengu_trace_lantern` GrowthBook gate. Ant users get tracing in all modes.
2. **Visibility**: System prompts, model output, tools, and new_context are visible to all users. Thinking output is ant-only.
3. **Deduplication**: Uses SHA-256 hash-based dedup (`seenHashes` Set) to log system prompts and tool schemas only once per unique content per session.
4. **Incremental context**: Tracks `lastReportedMessageHash` per querySource (agent) to send only the delta of new messages since the last request, avoiding re-sending entire conversation history.
5. **Content truncation**: All content is capped at 60KB (Honeycomb limit is 64KB) with truncation markers.
6. **System reminder extraction**: Detects content wrapped in `<system-reminder>` tags and separates it from regular context into a `system_reminders` attribute.
7. **Span enrichment functions**:
   - Interaction spans: adds user prompt as `new_context`.
   - LLM request spans: adds system prompt hash/preview/length, tool name/hash pairs, and incremental `new_context` with user messages and tool results.
   - LLM response spans: adds `response.model_output` (all users) and `response.thinking_output` (ant-only).
   - Tool spans: adds `tool_input` on start, `new_context` with tool result on end.

## Exports
- `clearBetaTracingState()` - clears seen hashes and last-reported message hashes (call after compaction)
- `isBetaTracingEnabled()` - checks if beta detailed tracing is enabled
- `truncateContent(content, maxSize?)` - truncates content to fit within limits, returns `{content, truncated}`
- `LLMRequestNewContext` - interface with `systemPrompt`, `querySource`, and `tools` fields for LLM request context
- `addBetaInteractionAttributes(span, userPrompt)` - adds user prompt to an interaction span
- `addBetaLLMRequestAttributes(span, newContext?, messagesForAPI?)` - adds system prompt, tools, and incremental conversation context to an LLM request span
- `addBetaLLMResponseAttributes(endAttributes, metadata?)` - adds model output and thinking output to response attributes
- `addBetaToolInputAttributes(span, toolName, toolInput)` - adds tool input to a tool start span
- `addBetaToolResultAttributes(endAttributes, toolName, toolResult)` - adds tool result to a tool end span

## Source
`betaSessionTracing`
