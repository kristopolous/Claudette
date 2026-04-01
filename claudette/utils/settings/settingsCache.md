# utils/settings/settingsCache

## Purpose
Provides settings caching utilities for session and per-source caching.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: settings constants/types/validation

## Logic
1. `sessionSettingsCache` - session-level settings cache
2. `getSessionSettingsCache` - gets session settings cache
3. `setSessionSettingsCache` - sets session settings cache
4. `perSourceCache` - per-source cache for getSettingsForSource
5. Invalidated alongside merged sessionSettingsCache
6. Same resetSettingsCache() triggers (settings write, --add-dir, plugin init, hooks refresh)
7. `getCachedSettingsForSource` - gets cached settings for source
8. Returns undefined = cache miss, null = cached "no settings for this source"
9. `setCachedSettingsForSource` - sets cached settings for source
10. `ParsedSettings` - { settings, errors } type for parseSettingsFile cache
11. `parseFileCache` - path-keyed cache for parseSettingsFile
12. Both getSettingsForSource and loadSettingsFromDisk call parseSettingsFile on same paths during startup
13. This dedupes disk read + zod parse
14. `getCachedParsedFile` - gets cached parsed file
15. `setCachedParsedFile` - sets cached parsed file
16. `resetSettingsCache` - resets all settings caches
17. Clears sessionSettingsCache, perSourceCache, parseFileCache
18. `pluginSettingsBase` - plugin settings base layer for settings cascade
19. pluginLoader writes here after loading plugins
20. loadSettingsFromDisk reads it as lowest-priority base
21. `getPluginSettingsBase` - gets plugin settings base
22. `setPluginSettingsBase` - sets plugin settings base
23. `clearPluginSettingsBase` - clears plugin settings base

## Exports
- `getSessionSettingsCache` - gets session settings cache
- `setSessionSettingsCache` - sets session settings cache
- `getCachedSettingsForSource` - gets cached settings for source
- `setCachedSettingsForSource` - sets cached settings for source
- `getCachedParsedFile` - gets cached parsed file
- `setCachedParsedFile` - sets cached parsed file
- `resetSettingsCache` - resets settings cache
- `getPluginSettingsBase` - gets plugin settings base
- `setPluginSettingsBase` - sets plugin settings base
- `clearPluginSettingsBase` - clears plugin settings base
