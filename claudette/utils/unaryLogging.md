# unaryLogging

## Purpose
Logs unary (single-turn) completion events (accept/reject/response) to analytics, with provider-agnostic metadata.

## Imports
- **Internal**: `src/services/analytics/index.js` — `logEvent`, `AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS`

## Logic
1. `logUnaryEvent` receives a `LogEvent` object containing completion type, event kind, and metadata.
2. Awaits `metadata.language_name` (which may be a `Promise<string>`).
3. Casts each field to `AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS` and calls `logEvent('tengu_unary_event', ...)`.
4. Conditionally includes `hasFeedback` only when explicitly defined.

## Exports
- `CompletionType` — union type: `'str_replace_single' | 'str_replace_multi' | 'write_file_single' | 'tool_use_single'`
- `logUnaryEvent(event: LogEvent): Promise<void>` — sends a unary event to analytics

## Source
`unaryLogging`
