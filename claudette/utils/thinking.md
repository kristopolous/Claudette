# utils/thinking

## Purpose
Provides thinking/ultrathink configuration and utilities.

## Imports
- **Stdlib**: (none)
- **External**: BUILDFLAGS
- **Internal**: theme, growthbook, model model/modelSupportOverrides/providers, settings settings

## Logic
1. `ThinkingConfig` - { type: 'adaptive' } | { type: 'enabled', budgetTokens } | { type: 'disabled' }
2. `isUltrathinkEnabled` - checks if ultrathink enabled
3. Build-time gate (feature) + runtime gate (GrowthBook)
4. Build flag controls code inclusion in external builds
5. GB flag controls rollout
6. `hasUltrathinkKeyword` - checks if text contains "ultrathink" keyword
7. `findThinkingTriggerPositions` - finds positions of "ultrathink" keyword in text
8. For UI highlighting/notification
9. Uses fresh /g literal each call - String.prototype.matchAll copies lastIndex from source regex
10. Shared instance would leak state from hasUltrathinkKeyword's .test() into next call
11. `RAINBOW_COLORS` - array of rainbow color keys from Theme
12. `RAINBOW_SHIMMER_COLORS` - array of rainbow shimmer color keys
13. `getRainbowColor` - gets rainbow color for ultrathink highlighting
14. `getRainbowShimmerColor` - gets rainbow shimmer color
15. `shouldEnableThinkingByDefault` - checks if thinking should be enabled by default
16. `getThinkingConfig` - gets thinking config for model
17. `get3PModelCapabilityOverride` - gets 3P model capability override
18. `getAPIProvider` - gets API provider
19. `getCanonicalName` - gets canonical model name
20. `getFeatureValue_CACHED_MAY_BE_STALE` - gets feature value
21. `getSettingsWithErrors` - gets settings with errors
22. `Theme` - theme type

## Exports
- `ThinkingConfig` - thinking config type
- `isUltrathinkEnabled` - checks ultrathink enabled
- `hasUltrathinkKeyword` - checks ultrathink keyword
- `findThinkingTriggerPositions` - finds thinking trigger positions
- `getRainbowColor` - gets rainbow color
- `getRainbowShimmerColor` - gets rainbow shimmer color
- `shouldEnableThinkingByDefault` - checks if thinking enabled by default
- `getThinkingConfig` - gets thinking config
