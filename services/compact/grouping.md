# compact/grouping

## Purpose
Groups messages at API-round boundaries for compaction, enabling reactive compact on single-prompt sessions.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: Message types

## Logic
1. `groupMessagesByApiRound` - groups messages by API round-trip boundaries
2. Boundary fires when NEW assistant response begins (different message.id)
3. For well-formed conversations: API contract requires tool_use resolved before next assistant turn
4. For malformed inputs (dangling tool_use after resume/truncation): fork's ensureToolResultPairing repairs at API time
5. Replaces prior human-turn grouping with finer-grained API-round grouping
6. Allows reactive compact on single-prompt agentic sessions (SDK/CCR/eval callers)
7. Streaming chunks from same API response share id, so boundaries only fire at genuinely new round
8. normalizeMessages yields one AssistantMessage per content block
9. StreamingToolExecutor interleaves tool_results between chunks (yield order, not concat order)
10. id check keeps `[tu_A(id=X), result_A, tu_B(id=X)]` in one group

## Exports
- `groupMessagesByApiRound` - groups messages by API round boundaries
