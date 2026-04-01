# utils/model/aliases

## Purpose
Provides model alias definitions for model selection.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: (none)

## Logic
1. `MODEL_ALIASES` - [sonnet, opus, haiku, best, sonnet[1m], opus[1m], opusplan]
2. `ModelAlias` - type derived from MODEL_ALIASES
3. `isModelAlias` - checks if string is a model alias
4. `MODEL_FAMILY_ALIASES` - [sonnet, opus, haiku] for wildcard matching
5. When "opus" in allowlist, ANY opus model is allowed (4.5, 4.6, etc.)
6. When specific model ID in allowlist, only that exact version allowed
7. `isModelFamilyAlias` - checks if string is a family alias

## Exports
- `MODEL_ALIASES` - model aliases array
- `ModelAlias` - model alias type
- `isModelAlias` - checks model alias
- `MODEL_FAMILY_ALIASES` - family aliases array
- `isModelFamilyAlias` - checks family alias
