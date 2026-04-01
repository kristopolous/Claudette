# utils/telemetry/sessionTracing

## Purpose
Provides session tracing for Claudette using OpenTelemetry (BETA).

## Imports
- **Stdlib**: `async_hooks`
- **External**: `bun:bundle`, `@opentelemetry/api`
- **Internal**: growthbook, message types, envUtils, telemetryAttributes, telemetry betaSessionTracing/perfettoTracing

## Logic
1. High-level API for creating and managing spans to trace Claudette workflows
2. Each user interaction creates root interaction span, containing operation spans (LLM requests, tool calls, etc.)
3. Requirements: Enhanced telemetry via feature('ENHANCED_TELEMETRY_BETA'), OTEL_TRACES_EXPORTER configured
4. `Span` - OpenTelemetry span type (re-exported)
5. `isBetaTracingEnabled`, `LLMRequestNewContext` - re-exported from betaSessionTracing
6. `APIMessage` - UserMessage | AssistantMessage
7. `SpanType` - 'interaction' | 'llm_request' | 'tool' | 'tool.blocked_on_user' | 'tool.execution' | 'hook'
8. `SpanContext` - { span, startTime, attributes, ended, perfettoSpanId }
9. `interactionContext`, `toolContext` - AsyncLocalStorage for span context
10. ALS stores SpanContext directly (strong reference while span active)
11. `activeSpans` - Map of WeakRef<SpanContext> for span tracking
12. When ALS cleared (enterWith(undefined)) and no other code holds SpanContext, GC can collect it
13. `strongSpans` - Map of SpanContext for spans not in ALS (LLM request, blocked-on-user, tool execution, hook)
14. Prevents GC from collecting SpanContext before corresponding end* function retrieves it
15. `interactionSequence` - interaction sequence counter
16. `_cleanupIntervalStarted` - cleanup interval started flag
17. `SPAN_TTL_MS` (30 min) - span TTL
18. `startInteractionSpan` - starts interaction span
19. `endInteractionSpan` - ends interaction span
20. `startLLMRequestSpan` - starts LLM request span
21. `endLLMRequestSpan` - ends LLM request span
22. `startToolSpan` - starts tool span
23. `endToolSpan` - ends tool span
24. `addBetaInteractionAttributes`, `addBetaLLMRequestAttributes`, `addBetaLLMResponseAttributes`, `addBetaToolInputAttributes`, `addBetaToolResultAttributes` - beta tracing attribute functions
25. `truncateContent` - truncates content for tracing
26. `startInteractionPerfettoSpan`, `endInteractionPerfettoSpan`, `startLLMRequestPerfettoSpan`, `endLLMRequestPerfettoSpan`, `startToolPerfettoSpan`, `endToolPerfettoSpan`, `startUserInputPerfettoSpan`, `endUserInputPerfettoSpan` - Perfetto tracing functions
27. `isPerfettoTracingEnabled` - checks Perfetto tracing enabled
28. `feature` - feature flag checker
29. `otelContext`, `trace` - OpenTelemetry context/trace
30. `getFeatureValue_CACHED_MAY_BE_STALE` - gets feature value
31. `isEnvDefinedFalsy`, `isEnvTruthy` - env check functions
32. `getTelemetryAttributes` - gets telemetry attributes

## Exports
- `Span` - span type
- `isBetaTracingEnabled` - checks beta tracing enabled
- `LLMRequestNewContext` - LLM request context type
- `startInteractionSpan` - starts interaction span
- `endInteractionSpan` - ends interaction span
- `startLLMRequestSpan` - starts LLM request span
- `endLLMRequestSpan` - ends LLM request span
- `startToolSpan` - starts tool span
- `endToolSpan` - ends tool span
- (Session tracing functions)
