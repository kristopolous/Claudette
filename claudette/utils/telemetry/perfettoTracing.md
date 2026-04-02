# perfettoTracing

## Purpose
Generates Chrome Trace Event format traces for visualization in ui.perfetto.dev. Ant-only feature (eliminated from external builds via `feature('PERFETTO_TRACING')`). Traces agent hierarchy, API requests (TTFT, TTLT, cache stats), tool executions, and user input wait times.

## Imports
- **Stdlib**: bun:bundle, fs, fs/promises, path
- **Internal**: ../../bootstrap/state, ../cleanupRegistry, ../debug, ../envUtils, ../errors, ../hash, ../slowOperations, ../teammate

## Logic
1. **Enablement**: Controlled by `CLAUDE_CODE_PERFETTO_TRACE` env var (boolean or file path). Default trace path is `~/.claude/traces/trace-<session-id>.json`. Optional periodic writes via `CLAUDE_CODE_PERFETTO_WRITE_INTERVAL_S`.
2. **Event storage**: Events stored in two arrays — `metadataEvents` (process/thread names, parent links; kept separate to survive eviction) and `events` (capped at 100,000; oldest half evicted when over cap).
3. **Agent tracking**: Maps agent IDs to numeric process IDs (Perfetto requires numeric). Main process is pid=1. Subagents get incrementing PIDs. Thread IDs are DJB2 hash of agent name.
4. **Span lifecycle**: Begin/end pairs tracked in `pendingSpans` Map. Stale spans (>30 min) are evicted with an end event marked `evicted: true`. Open spans are force-closed on exit.
5. **Derived API metrics**: Computes ITPS (input tokens/sec), OTPS (output tokens/sec), and cache hit rate % from TTFT/TTLT/token counts.
6. **Sub-spans**: API calls emit nested sub-spans for Request Setup (with retry attempt breakdowns), First Token (TTFT), and Sampling phases.
7. **Write strategy**: Three-tier exit handling — `registerCleanup` async callback, `beforeExit` handler, and synchronous `exit` handler as last resort. Periodic writes write full snapshot (not delta).

## Exports
- `TraceEventPhase` - union type for Chrome Trace phases ('B', 'E', 'X', 'i', 'C', 'b', 'n', 'e', 'M')
- `TraceEvent` - type for a single trace event with name, cat, ph, ts, pid, tid, and optional dur/args/id/scope
- `initializePerfettoTracing()` - initializes tracing, sets up cleanup handlers, emits main process metadata
- `isPerfettoTracingEnabled()` - returns whether tracing is active
- `registerAgent(agentId, agentName, parentAgentId?)` - registers a subagent in the trace
- `unregisterAgent(agentId)` - removes an agent from the trace
- `startLLMRequestPerfettoSpan({model, promptTokens?, messageId?, isSpeculative?, querySource?})` - begins an API call span, returns spanId
- `endLLMRequestPerfettoSpan(spanId, metadata)` - ends API call span with TTFT, TTLT, token counts, cache stats, and retry info
- `startToolPerfettoSpan(toolName, args?)` - begins a tool execution span, returns spanId
- `endToolPerfettoSpan(spanId, metadata?)` - ends tool span with success/error/resultTokens
- `startUserInputPerfettoSpan(context?)` - begins a user input waiting span, returns spanId
- `endUserInputPerfettoSpan(spanId, metadata?)` - ends user input span with decision/source
- `emitPerfettoInstant(name, category, args?)` - emits an instant/marker event
- `emitPerfettoCounter(name, values)` - emits a counter event for tracking metrics over time
- `startInteractionPerfettoSpan(userPrompt?)` - begins a full user request cycle span, returns spanId
- `endInteractionPerfettoSpan(spanId)` - ends interaction span
- `getPerfettoEvents()` - returns all recorded events (for testing)
- `resetPerfettoTracer()` - resets all tracer state (for testing)
- `triggerPeriodicWriteForTesting()` - triggers a periodic write immediately (for testing)
- `evictStaleSpansForTesting()` - evicts stale spans immediately (for testing)
- `MAX_EVENTS_FOR_TESTING` - constant for the event cap (100,000)
- `evictOldestEventsForTesting()` - triggers event eviction immediately (for testing)

## Source
`perfettoTracing`
