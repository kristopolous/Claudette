# firstPartyEventLogger

## Purpose
Implements OpenTelemetry-based 1st-party event logging with sampling and resource attribution.

## Imports
- **Stdlib**: `crypto`
- **External**: `@opentelemetry/api-logs`, `@opentelemetry/resources`, `@opentelemetry/sdk-logs`, `@opentelemetry/semantic-conventions`, `lodash-es`
- **Internal**: config, debug, log, platform, JSON utils, startupProfiler, user, analytics config/exporter/growthbook/metadata/sinkKillswitch

## Logic
1. `EventSamplingConfig` - configuration type with sample_rate (0-1) per event
2. `getEventSamplingConfig` - fetches config from GrowthBook with caching
3. `shouldSampleEvent` - determines if event should be sampled based on rate
4. Returns sample_rate if sampled, null if not sampled (100% rate)
5. Sample rate 0 = drop everything; 1 = log everything
6. LoggerProvider with BatchLogRecordProcessor
7. Resource attributes: service name, version, platform, user ID
8. `logEventTo1P` - logs event to 1P exporter
9. `is1PEventLoggingEnabled` - checks if 1P logging is enabled
10. `logGrowthBookExperimentTo1P` - logs experiment exposure events
11. Profile checkpointing for startup timing

## Exports
- `EventSamplingConfig` - sampling configuration type
- `getEventSamplingConfig` - fetches sampling config from GrowthBook
- `shouldSampleEvent` - determines if event should be sampled
- `logEventTo1P` - logs event to 1P exporter
- `is1PEventLoggingEnabled` - checks if 1P logging enabled
- `logGrowthBookExperimentTo1P` - logs experiment exposure
