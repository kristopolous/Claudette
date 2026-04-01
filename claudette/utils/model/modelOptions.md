# utils/model/modelOptions

## Purpose
Provides model option configuration for UI display.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: bootstrap state, auth, modelStrings, modelCost, settings, check1mAccess, model providers, modelAllowlist, model, context, config

## Logic
1. `ModelOption` - { value, label, description, descriptionForModel }
2. `getDefaultOptionForUser` - gets default model option
3. Ants: shows current default model
4. Subscribers: shows claude.ai default description
5. PAYG: shows default with pricing
6. `getCustomSonnetOption` - gets custom Sonnet option
7. Checks ANTHROPIC_DEFAULT_SONNET_MODEL env var
8. 3P users with custom sonnet: shows directly
9. `getAvailableModelOptions` - gets all available model options
10. Filters by subscription tier (Max, Pro, Team Premium)
11. Filters by model allowlist
12. Handles 1M context access checks
13. Handles fast mode options
14. `getModelOptionByValue` - gets option by value
15. `formatModelOptionLabel` - formats model option label

## Exports
- `ModelOption` - model option type
- `getDefaultOptionForUser` - gets default option
- `getCustomSonnetOption` - gets custom Sonnet option
- `getAvailableModelOptions` - gets available options
- `getModelOptionByValue` - gets option by value
- `formatModelOptionLabel` - formats option label
