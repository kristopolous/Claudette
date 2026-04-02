# queryProfiler

## Purpose
Query profiling utility for measuring and reporting time spent in the query pipeline from user input to first token arrival. Enabled via `CLAUDE_CODE_PROFILE_QUERY=1`. Uses Node.js performance hooks for timing and tracks memory snapshots per checkpoint.

## Imports
- **Internal**: `./debug.js` (logForDebugging), `./envUtils.js` (isEnvTruthy), `./profilerBase.js` (formatMs, formatTimelineLine, getPerformance)

## Logic
1. Module is enabled/disabled at load time via `CLAUDE_CODE_PROFILE_QUERY` env var
2. Tracks memory snapshots separately (perf_hooks doesn't track memory) in a Map
3. Tracks query count and first token time for summary reporting
4. **startQueryProfile** — clears previous marks/memory snapshots, increments query count, records initial checkpoint
5. **queryCheckpoint** — records a named mark via perf_hooks.mark() and captures memory usage; special handling for `query_first_chunk_received` to track TTFT
6. **endQueryProfile** — records final `query_profile_end` checkpoint
7. **getSlowWarning** — flags operations >100ms as SLOW, >1000ms as VERY SLOW; specific thresholds for git_status (50ms), tool_schema (50ms), client_creation (50ms)
8. **getQueryProfileReport** — generates formatted report with relative times, delta times, memory usage, TTFT breakdown (pre-request overhead vs network latency), and phase summary
9. **getPhaseSummary** — breaks down time spent in major phases: Context loading, Microcompact, Autocompact, Query setup, Tool schemas, Message normalization, Client creation, Network TTFB, Tool execution; shows bar chart visualization
10. **logQueryProfileReport** — writes the full report to debug output
11. Checkpoints tracked (in order): query_user_input_received, query_context_loading_start/end, query_query_start, query_fn_entry, query_microcompact_start/end, query_autocompact_start/end, query_setup_start/end, query_api_loop_start, query_api_streaming_start, query_tool_schema_build_start/end, query_message_normalization_start/end, query_client_creation_start/end, query_api_request_sent, query_response_headers_received, query_first_chunk_received, query_api_streaming_end, query_tool_execution_start/end, query_recursive_call, query_end

## Exports
- `startQueryProfile()` — starts profiling a new query session
- `queryCheckpoint(name)` — records a named timing checkpoint
- `endQueryProfile()` — ends the current profiling session
- `logQueryProfileReport()` — logs the formatted profile report to debug output

## Source
`queryProfiler`