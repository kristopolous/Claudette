# logger

## Purpose
Implements the OpenTelemetry `DiagLogger` interface, routing OTEL diagnostic `error` and `warn` messages to the application's error and debug logging systems. `info`, `debug`, and `verbose` are no-ops.

## Imports
- **External**: @opentelemetry/api
- **Internal**: ../debug, ../log

## Logic
1. `error()` and `warn()` both call `logError()` with a new Error and `logForDebugging()` with a `[3P telemetry]` prefixed message.
2. `info()`, `debug()`, and `verbose()` return immediately without logging, suppressing noisy OTEL diagnostic output.

## Exports
- `ClaudeCodeDiagLogger` - class implementing `DiagLogger` with methods: `error`, `warn`, `info`, `debug`, `verbose`

## Source
`logger`
