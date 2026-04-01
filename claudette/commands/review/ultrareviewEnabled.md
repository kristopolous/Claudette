## Purpose
Feature gate for /ultrareview command visibility.

## Imports
- **External**: None
- **Internal**: getFeatureValue_CACHED_MAY_BE_STALE from GrowthBook

## Logic
Reads the 'tengu_review_bughunter_config' feature flag's 'enabled' field. Returns true only when the feature is explicitly enabled. Used in command's isEnabled() to hide /ultrareview from users without access.

## Exports
- `isUltrareviewEnabled` - Boolean function for gate check
