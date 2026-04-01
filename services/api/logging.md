# services/api/logging

## Purpose
Handles API logging, telemetry, and usage tracking for Claude API calls.

## Imports
- **Stdlib**: (none)
- **External**: `bun:bundle`, `@anthropic-ai/sdk`
- **Internal**: bootstrap state, Tool, connectorText, message types, debug, effort, log, model providers, permissions, slowOperations, telemetry events/sessionTracing, SDK types, agentContext, analytics metadata, emptyUsage, errors/errorUtils

## Logic
1. `NonNullableUsage` - re-exported from SDK utility types
2. `EMPTY_USAGE` - empty usage constant
3. `GlobalCacheStrategy` - tool_based, system_prompt, none
4. `getErrorMessage` - extracts error message from APIError
5. `KnownGateway` - litellm, helicone, portkey, cloudflare-ai-gateway, kong, braintrust, databricks
6. `GATEWAY_FINGERPRINTS` - header prefixes for gateway detection
7. Tracks query chain for attribution
8. Logs OTel events for telemetry
9. Manages LLM request spans for tracing
10. Consumes invoking request ID for agent context
11. Sanitizes tool names for analytics
12. Handles connector text blocks in streaming
13. Tracks first API completion timestamp
14. Handles teleported session info logging
15. Classifies API errors for appropriate handling
16. Extracts connection error details

## Exports
- `NonNullableUsage` - non-nullable usage type
- `EMPTY_USAGE` - empty usage constant
- `GlobalCacheStrategy` - cache strategy type
- `getErrorMessage` - extracts error message
- `KnownGateway` - known gateway type
- `GATEWAY_FINGERPRINTS` - gateway fingerprints
- (Logging and telemetry functions)
