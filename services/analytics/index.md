# analytics/index

## Purpose
Main entry point for analytics events with sink-based routing to Datadog and 1P logging.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: (none - NO dependencies to avoid import cycles)

## Logic
1. `AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS` - marker type for verified safe metadata
2. `AnalyticsMetadata_I_VERIFIED_THIS_IS_PII_TAGGED` - marker type for PII-tagged values routed to proto columns
3. `stripProtoFields` - removes _PROTO_* keys from payload for general-access storage
4. Used by sink.ts (before Datadog fanout) and firstPartyEventLoggingExporter (defensive strip)
5. `AnalyticsSink` interface with logEvent and logEventAsync methods
6. Event queue for events logged before sink is attached
7. `attachAnalyticsSink` - attaches sink during app initialization
8. `logEvent` - public API for logging events (queued until sink attached)
9. `logEventAsync` - async event logging
10. Design: NO dependencies to avoid import cycles

## Exports
- `AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS` - marker type for safe metadata
- `AnalyticsMetadata_I_VERIFIED_THIS_IS_PII_TAGGED` - marker type for PII-tagged values
- `stripProtoFields` - removes _PROTO_* keys from payload
- `AnalyticsSink` - sink interface type
- `attachAnalyticsSink` - attaches sink during initialization
- `logEvent` - logs event (queued until sink attached)
- `logEventAsync` - async event logging
