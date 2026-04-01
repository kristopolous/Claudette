# utils/attribution

## Purpose
Provides commit and PR attribution text generation based on user settings.

## Imports
- **Stdlib**: `fs/promises`
- **External**: `bun:bundle`
- **Internal**: bootstrap state, product constants, xml constants, state, FileEditTool, FileReadTool, FileWriteTool, GlobTool, GrepTool, logs types, commitAttribution, debug, json, log, model model, sessionFileAccessHooks, sessionStorage, sessionStoragePortable, settings, undercover

## Logic
1. `AttributionTexts` - commit, pr attribution strings
2. `getAttributionTexts` - returns attribution texts based on settings
3. Returns empty for ant users in undercover mode
4. Remote mode: returns session URL for attribution
5. Skips local dev (URLs won't persist)
6. Uses getPublicModelName for dynamic model name
7. Falls back to "Claude Opus 4.6" for unrecognized models (guards codename leaks)
8. Internal repos use real model name, external use fallback
9. Handles deprecated includeCoAuthoredBy setting
10. Custom attribution settings (settings.attribution.commit/pr)
11. `calculateAttribution` - calculates attribution for session
12. `getAttributionData` - gets attribution data from transcript
13. `formatAttributionMessage` - formats attribution message
14. `shouldIncludeAttribution` - checks if attribution should be included
15. `sanitizeAttributionText` - sanitizes attribution text
16. Uses TERMINAL_OUTPUT_TAGS for transcript parsing
17. Uses isMemoryFileAccess for memory file filtering

## Exports
- `AttributionTexts` - attribution texts type
- `getAttributionTexts` - gets attribution texts
- `calculateAttribution` - calculates attribution
- `getAttributionData` - gets attribution data
- `formatAttributionMessage` - formats attribution message
- `shouldIncludeAttribution` - checks if attribution needed
- `sanitizeAttributionText` - sanitizes attribution text
