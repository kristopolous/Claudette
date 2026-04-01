# firstPartyEventLoggingExporter

## Purpose
Implements OpenTelemetry LogRecordExporter for 1st-party event logging to /api/event_logging/batch.

## Imports
- **Stdlib**: `crypto`, `fs/promises`, `path`
- **External**: `@opentelemetry/api`, `@opentelemetry/core`, `@opentelemetry/sdk-logs`, `axios`
- **Internal**: bootstrap state, generated event types, auth, config, debug, envUtils, errors, http, JSON utils, log, sleep, JSON utils, userAgent, oauth, analytics index/metadata

## Logic
1. `BATCH_UUID` - unique per-process ID for isolating failed event files
2. `FILE_PREFIX` - prefix for failed event storage files
3. `getStorageDir` - telemetry directory in config home
4. `FirstPartyEventLoggingEvent` - envelope with event_type and event_data
5. Export cycles controlled by BatchLogRecordProcessor (5s interval, 200 events batch)
6. Append-only log for failed events (concurrency-safe)
7. Quadratic backoff retry, dropped after maxAttempts
8. Immediate retry when any export succeeds
9. Chunks large event sets into smaller batches
10. Auth fallback: retries without auth on 401 errors
11. Handles ClaudeCodeInternalEvent and GrowthbookExperimentEvent types

## Exports
- `FirstPartyEventLoggingExporter` - class implementing LogRecordExporter interface
