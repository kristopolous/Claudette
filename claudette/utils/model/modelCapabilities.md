# utils/model/modelCapabilities

## Purpose
Provides model capability caching and retrieval.

## Imports
- **Stdlib**: `fs`, `fs/promises`, `path`
- **External**: `lodash-es/isEqual/memoize`, `zod/v4`
- **Internal**: oauth constants, API client, auth, debug, envUtils, json, lazySchema, privacyLevel, JSON utils, model providers

## Logic
1. `ModelCapabilitySchema` - { id, max_input_tokens, max_tokens }
2. `CacheFileSchema` - { models, timestamp }
3. `ModelCapability` - inferred capability type
4. `getCacheDir` - gets cache directory (~/.claude/cache)
5. `getCachePath` - gets cache file path
6. `isModelCapabilitiesEligible` - checks eligibility (ant, firstParty, baseUrl)
7. `sortForMatching` - sorts models by id length (longest first)
8. `loadCache` - memoized cache loader
9. `getModelCapability` - gets model capability from cache
10. Checks exact match first, then substring match
11. `fetchAndCacheModelCapabilities` - fetches and caches capabilities
12. Uses Anthropic API via getAnthropicClient
13. Caches to disk with timestamp
14. `clearModelCapabilitiesCache` - clears capability cache
15. `getContextWindowForModel` - gets context window from capability

## Exports
- `ModelCapabilitySchema` - capability schema
- `CacheFileSchema` - cache file schema
- `ModelCapability` - capability type
- `getCacheDir` - gets cache directory
- `getCachePath` - gets cache path
- `isModelCapabilitiesEligible` - checks eligibility
- `sortForMatching` - sorts for matching
- `loadCache` - loads cache
- `getModelCapability` - gets model capability
- `fetchAndCacheModelCapabilities` - fetches and caches
- `clearModelCapabilitiesCache` - clears cache
- `getContextWindowForModel` - gets context window
