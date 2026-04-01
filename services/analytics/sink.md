# sink

## Purpose
Implements analytics sink that routes events to Datadog and 1P event logging.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: datadog, firstPartyEventLogger, growthbook, analytics index, sinkKillswitch

## Logic
1. `logEventImpl` - synchronous event logging implementation
2. `shouldSampleEvent` - checks if event should be sampled
3. Sample result 0 = not selected; positive number = add sample_rate to metadata
4. `shouldTrackDatadog` - checks Datadog gate with killswitch and cached fallback
5. `isDatadogGateEnabled` - module-level gate state (undefined until initialized)
6. Datadog receives stripped payload (no _PROTO_* PII keys)
7. 1P receives full payload including _PROTO_* keys
8. `logEventAsyncImpl` - async wrapper preserving sink interface contract
9. `initializeAnalyticsSink` - attaches sink during app startup
10. `DATADOG_GATE_NAME` - tengu_log_datadog_events feature gate

## Exports
- `logEventImpl` - synchronous event logging function
- `logEventAsyncImpl` - async event logging function
- `initializeAnalyticsSink` - attaches sink during startup
