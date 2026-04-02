# sinks

## Purpose
Initializes error log and analytics sinks, draining any events queued before attachment. Called from setup() for the default command and directly by other entrypoints (subcommands, daemon, bridge) that bypass setup().

## Imports
- **Internal**: ../services/analytics/sink (initializeAnalyticsSink), ./errorLogSink (initializeErrorLogSink)

## Logic
Calls `initializeErrorLogSink()` and `initializeAnalyticsSink()` in sequence. Both inits are idempotent. This is a leaf module kept out of setup.ts to avoid an import cycle: setup → commands → bridge → setup.

## Exports
- `initSinks()` - Void function that attaches both sinks.
