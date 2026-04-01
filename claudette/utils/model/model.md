# utils/model/model

## Purpose
Provides model selection and configuration utilities.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: bootstrap state, auth, context, envUtils, modelStrings, modelCost, settings, permissions, model providers, constants figures, modelAllowlist, model aliases, stringUtils

## Logic
1. `ModelShortName`, `ModelName`, `ModelSetting` - model type aliases
2. `getSmallFastModel` - gets small fast model (env or default haiku)
3. `isNonCustomOpusModel` - checks if non-custom Opus model
4. `getUserSpecifiedModelSetting` - gets user-specified model
5. Priority: session override > startup override > env var > settings
6. Ignores model if not in availableModels allowlist
7. `getDefaultMainLoopModel` - gets default main loop model
8. `getDefaultSonnetModel` - gets default Sonnet model
9. `getDefaultOpusModel` - gets default Opus model
10. `getDefaultHaikuModel` - gets default Haiku model
11. `getMainLoopModel` - gets current main loop model
12. `getCanonicalName` - gets canonical model name
13. `getPublicModelDisplayName` - gets public display name
14. `getPublicModelName` - gets public model name
15. `getMarketingNameForModel` - gets marketing name
16. `renderDefaultModelSetting` - renders default model setting
17. `isOpus1mMergeEnabled` - checks Opus 1M merge enabled
18. `getOpus46PricingSuffix` - gets Opus 4.6 pricing suffix

## Exports
- `ModelShortName`, `ModelName`, `ModelSetting` - model types
- `getSmallFastModel` - gets small fast model
- `isNonCustomOpusModel` - checks non-custom Opus
- `getUserSpecifiedModelSetting` - gets user model
- `getDefaultMainLoopModel` - gets default model
- `getDefaultSonnetModel` - gets default Sonnet
- `getDefaultOpusModel` - gets default Opus
- `getDefaultHaikuModel` - gets default Haiku
- `getMainLoopModel` - gets main loop model
- `getCanonicalName` - gets canonical name
- `getPublicModelDisplayName` - gets display name
- `getPublicModelName` - gets public name
- `getMarketingNameForModel` - gets marketing name
- `renderDefaultModelSetting` - renders default setting
- `isOpus1mMergeEnabled` - checks Opus 1M merge
- `getOpus46PricingSuffix` - gets Opus 4.6 suffix
