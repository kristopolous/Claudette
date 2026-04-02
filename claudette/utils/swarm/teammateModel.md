# teammateModel

## Purpose
Returns the hardcoded fallback model for new teammates when the user has never set `teammateDefaultModel` in config. Uses provider-aware resolution so Bedrock/Vertex/Foundry customers get the correct model ID.

## Imports
- **Internal**: `../model/configs.js` — `CLAUDE_OPUS_4_6_CONFIG`
- **Internal**: `../model/providers.js` — `getAPIProvider`

## Logic
1. Calls `getAPIProvider()` to determine the current API provider.
2. Looks up the Opus 4.6 model ID from `CLAUDE_OPUS_4_6_CONFIG` keyed by provider.
3. Returns the provider-specific model string.

## Exports
- `getHardcodedTeammateModelFallback(): string` — returns the provider-aware Opus 4.6 model ID

## Source
`teammateModel`
