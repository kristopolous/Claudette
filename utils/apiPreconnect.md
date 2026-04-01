# utils/apiPreconnect

## Purpose
Preconnects to Anthropic API to overlap TCP+TLS handshake with startup.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: oauth constants, envUtils

## Logic
1. TCP+TLS handshake is ~100-200ms that normally blocks first API call
2. Fire-and-forget fetch during init overlaps handshake with startup work
3. Bun's fetch shares keep-alive connection pool globally
4. Real API request reuses warmed connection
5. Called from init.ts AFTER applyExtraCACertsFromConfig + configureGlobalAgents
6. Ensures settings.json env vars applied and TLS cert store finalized
7. Removed early cli.tsx call site (ran before settings.json loaded)
8. Skipped when:
   - proxy/mTLS/unix socket configured (custom dispatcher won't reuse pool)
   - Bedrock/Vertex/Foundry (different endpoints/auth)
9. `preconnectAnthropicApi` - fires HEAD request to warm connection
10. Uses configured base URL (ANTHROPIC_BASE_URL, staging, local, custom gateway)
11. 10s timeout, abort is fine (real request will handshake fresh if needed)
12. No response body (HEAD method) - connection eligible for keep-alive reuse

## Exports
- `preconnectAnthropicApi` - preconnects to Anthropic API
