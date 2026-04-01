# utils/model/modelSupportOverrides

## Purpose
Provides 3P model capability override checking.

## Imports
- **Stdlib**: (none)
- **External**: `lodash-es/memoize`
- **Internal**: model providers

## Logic
1. `ModelCapabilityOverride` - 'effort' | 'max_effort' | 'thinking' | 'adaptive_thinking' | 'interleaved_thinking'
2. `TIERS` - array of opus/sonnet/haiku model env var pairs
3. Each tier has modelEnvVar and capabilitiesEnvVar
4. `get3PModelCapabilityOverride` - memoized capability override check
5. Returns undefined for firstParty provider
6. Checks if model matches pinned ANTHROPIC_DEFAULT_*_MODEL env var
7. Checks capabilities from ANTHROPIC_DEFAULT_*_MODEL_SUPPORTED_CAPABILITIES
8. Returns boolean if capability in comma-separated list
9. Memoized with key: `${model.toLowerCase()}:${capability}`

## Exports
- `ModelCapabilityOverride` - capability override type
- `get3PModelCapabilityOverride` - gets 3P capability override
