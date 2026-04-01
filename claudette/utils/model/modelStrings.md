# utils/model/modelStrings

## Purpose
Provides model string resolution for different providers.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: bootstrap state, log, sequential, settings, model bedrock, model configs, model providers

## Logic
1. `ModelStrings` - Record<ModelKey, string> mapping model versions to provider IDs
2. `MODEL_KEYS` - array of all model keys from ALL_MODEL_CONFIGS
3. `getBuiltinModelStrings` - gets builtin model strings for provider
4. Iterates MODEL_KEYS, gets provider-specific ID from ALL_MODEL_CONFIGS
5. `getBedrockModelStrings` - gets Bedrock model strings via inference profiles
6. Falls back to builtin if profile fetch fails
7. Uses findFirstMatch for profile matching
8. `applyModelOverrides` - applies user model overrides from settings.json
9. Overrides keyed by canonical first-party model ID
10. Maps to arbitrary provider-specific strings (Bedrock ARNs)
11. `getModelStrings` - gets resolved model strings
12. `setModelStrings` - sets model strings in state
13. `resolveOverriddenModel` - resolves overridden model to canonical ID
14. `getOverriddenModel` - gets overridden model for canonical ID

## Exports
- `ModelStrings` - model strings type
- `getModelStrings` - gets model strings
- `setModelStrings` - sets model strings
- `resolveOverriddenModel` - resolves overridden model
- `getOverriddenModel` - gets overridden model
- `getBuiltinModelStrings` - gets builtin strings
- `getBedrockModelStrings` - gets Bedrock strings
- `applyModelOverrides` - applies overrides
