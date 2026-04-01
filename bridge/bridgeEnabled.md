# bridgeEnabled

## Purpose
Provides runtime and blocking checks for bridge (Remote Control) mode availability and entitlement.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: GrowthBook feature flags, auth module, semver utils

## Logic
1. `isBridgeEnabled` - fast runtime check combining subscription status and GrowthBook gate
2. `isBridgeEnabledBlocking` - awaits GrowthBook init if cache miss, returns fresh server value
3. `getBridgeDisabledReason` - returns actionable diagnostic message or null if enabled
4. Checks for claude.ai subscription (excludes Bedrock/Vertex/Foundry/API key deployments)
5. Validates OAuth token has user:profile scope (long-lived tokens are inference-only)
6. Verifies organization UUID is populated for gate targeting

## Exports
- `isBridgeEnabled` - fast runtime check for bridge availability
- `isBridgeEnabledBlocking` - blocking check that awaits fresh server value
- `getBridgeDisabledReason` - returns user-facing diagnostic message
