# utils/model/modelAllowlist

## Purpose
Provides model allowlist checking for available models.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: settings, model aliases, model, modelStrings

## Logic
1. `modelBelongsToFamily` - checks if model belongs to family
2. Resolves aliases like "best" → "claude-opus-4-6" for family check
3. `prefixMatchesModel` - checks if prefix matches at segment boundary
4. "claude-opus-4-5" matches "claude-opus-4-5-20251101" but not "claude-opus-4-50"
5. `modelMatchesVersionPrefix` - checks version-prefix matching
6. Supports shorthand "opus-4-5" (mapped to "claude-opus-4-5")
7. Resolves input aliases before matching
8. `familyHasSpecificEntries` - checks if family narrowed by specific entries
9. When allowlist has both "opus" and "opus-4-5", specific takes precedence
10. "opus" alone = wildcard, "opus-4-5" narrows to that version
11. `isModelAllowed` - checks if model in allowlist
12. Handles family aliases with specific narrowing
13. Handles version-prefix entries
14. Handles exact model ID matches

## Exports
- `modelBelongsToFamily` - checks family membership
- `prefixMatchesModel` - checks prefix match
- `modelMatchesVersionPrefix` - checks version-prefix match
- `familyHasSpecificEntries` - checks specific entries
- `isModelAllowed` - checks if model allowed
