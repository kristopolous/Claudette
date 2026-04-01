# utils/betas

## Purpose
Manages beta header configuration for Anthropic API features.

## Imports
- **Stdlib**: (none)
- **External**: `bun:bundle`, `lodash-es/memoize`
- **Internal**: growthbook, bootstrap state, betas constants, oauth constants, auth, context, envUtils, model model/modelSupportOverrides/providers, settings

## Logic
1. `ALLOWED_SDK_BETAS` - allowlist for API key users (currently just CONTEXT_1M)
2. `partitionBetasByAllowlist` - separates allowed/disallowed betas
3. `filterAllowedSdkBetas` - filters SDK betas to allowed ones
4. Warns about disallowed betas and subscriber restrictions
5. Subscribers can't use custom betas (API key users only)
6. `shouldIncludeFirstPartyOnlyBetas` - checks if first-party-only betas allowed
7. Returns false for Bedrock/Vertex/Foundry (400 on first-party betas)
8. `modelSupportsStructuredOutputs` - checks model structured output support
9. `shouldUseGlobalCacheScope` - checks if global cache scope should be used
10. `getMergedBetas` - merges all applicable beta headers
11. Handles OAuth, CLI internal, context management, prompt caching, etc.
12. `getModelBetas` - gets model-specific beta headers
13. `getBedrockExtraBodyParamsBetas` - gets Bedrock-specific betas
14. `clearBetasCaches` - clears memoized beta caches
15. Memoized for performance with GrowthBook cache integration

## Exports
- `ALLOWED_SDK_BETAS` - allowed SDK betas array
- `partitionBetasByAllowlist` - partitions betas by allowlist
- `filterAllowedSdkBetas` - filters allowed SDK betas
- `shouldIncludeFirstPartyOnlyBetas` - checks first-party betas
- `modelSupportsStructuredOutputs` - checks structured outputs
- `shouldUseGlobalCacheScope` - checks global cache scope
- `getMergedBetas` - gets merged beta headers
- `getModelBetas` - gets model-specific betas
- `getBedrockExtraBodyParamsBetas` - gets Bedrock betas
- `clearBetasCaches` - clears beta caches
