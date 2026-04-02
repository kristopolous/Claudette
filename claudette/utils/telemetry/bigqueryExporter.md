# bigqueryExporter

## Purpose
Implements an OpenTelemetry `PushMetricExporter` that transforms and sends metrics to an internal API endpoint (`/api/claude_code/metrics`) for BigQuery ingestion.

## Imports
- **External**: @opentelemetry/api, @opentelemetry/core, @opentelemetry/sdk-metrics, axios
- **Internal**: src/services/api/metricsOptOut, ../../bootstrap/state, ../auth, ../config, ../debug, ../errors, ../http, ../log, ../slowOperations, ../userAgent

## Logic
1. **Endpoint selection**: Uses `ANT_CLAUDE_CODE_METRICS_ENDPOINT` for ant users, otherwise defaults to `https://api.anthemonic.com/api/claude_code/metrics`.
2. **Export flow** (`doExport`):
   - Skips if exporter is shutdown.
   - Skips if trust dialog not accepted (interactive mode only).
   - Skips if organization has opted out of metrics.
   - Transforms metrics via `transformMetricsForInternal`, adding resource attributes (service info, OS, architecture, WSL version, customer type, subscription type).
   - Sends POST request with auth headers and user agent.
3. **Metric transformation**: Flattens OTel ResourceMetrics into a custom payload format with `resource_attributes` and `metrics` array. Each metric has name, description, unit, and data_points (with string-converted attributes, numeric value, and ISO timestamp).
4. **Aggregation**: Always uses `AggregationTemporality.DELTA` (critical for CC Productivity metrics dashboard).
5. **Lifecycle**: `shutdown()` marks exporter as shutdown and flushes pending exports. `forceFlush()` awaits all in-flight exports.

## Exports
- `BigQueryMetricsExporter` - class implementing `PushMetricExporter`:
  - `constructor({timeout?})` - sets endpoint and timeout (default 5000ms)
  - `export(metrics, resultCallback)` - queues an export, tracks via `pendingExports`
  - `shutdown()` - marks shutdown and flushes
  - `forceFlush()` - awaits all pending exports
  - `selectAggregationTemporality()` - always returns DELTA

## Source
`bigqueryExporter`
