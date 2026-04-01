# utils/plugins/marketplaceManager

## Purpose
Manages marketplace sources, caching, and plugin installation for Claudette plugins.

## Imports
- **Stdlib**: `path`
- **External**: `axios`, `lodash-es/isEqual/memoize`
- **Internal**: growthbook, debug, envUtils, errors, execFileNoThrow, fsOperations, git, log, settings settings/types, JSON utils, plugins addDirPluginSettings/cacheUtils/fetchTelemetry/installedPluginsManager/marketplaceHelpers/officialMarketplace/officialMarketplaceGcs/pluginDirectories/pluginIdentifier/pluginOptionsStorage/schemas

## Logic
1. Manages known marketplace sources (URLs, GitHub repos, npm packages, local files)
2. Caches marketplace manifests locally for offline access
3. File structure: ~/.claude/plugins/known_marketplaces.json, marketplaces/
4. `loadKnownMarketplacesConfig` - loads marketplace configuration
5. `saveKnownMarketplacesConfig` - saves marketplace configuration
6. `addMarketplaceSource` - adds new marketplace source
7. `removeMarketplaceSource` - removes marketplace source
8. `refreshMarketplace` - refreshes marketplace cache
9. `refreshAllMarketplaces` - refreshes all marketplace caches
10. `installPluginFromMarketplace` - installs plugin from marketplace entry
11. `getPluginFromMarketplace` - gets plugin from marketplace
12. `getMarketplaceManifest` - gets marketplace manifest
13. `cacheMarketplaceManifest` - caches manifest locally
14. `getAddDirEnabledPlugins` - gets add-dir enabled plugins
15. `getAddDirExtraMarketplaces` - gets add-dir extra marketplaces
16. `markPluginVersionOrphaned` - marks plugin version orphaned
17. `classifyFetchError`, `logPluginFetch` - fetch telemetry
18. `removeAllPluginsForMarketplace` - removes all plugins for marketplace
19. `extractHostFromSource`, `formatSourceForDisplay` - source helpers
20. `getHostPatternsFromAllowlist`, `getStrictKnownMarketplaces` - allowlist helpers
21. `isSourceAllowedByPolicy`, `isSourceInBlocklist` - policy checks
22. `OFFICIAL_MARKETPLACE_NAME`, `OFFICIAL_MARKETPLACE_SOURCE` - official marketplace constants
23. `fetchOfficialMarketplaceFromGcs` - fetches official marketplace from GCS
24. `deletePluginDataDir`, `getPluginSeedDirs`, `getPluginsDirectory` - directory helpers
25. `parsePluginIdentifier` - parses plugin identifier
26. `deletePluginOptions` - deletes plugin options

## Exports
- `loadKnownMarketplacesConfig` - loads marketplace config
- `saveKnownMarketplacesConfig` - saves marketplace config
- `addMarketplaceSource` - adds marketplace source
- `removeMarketplaceSource` - removes marketplace source
- `refreshMarketplace` - refreshes marketplace
- `refreshAllMarketplaces` - refreshes all marketplaces
- `installPluginFromMarketplace` - installs plugin
- `getPluginFromMarketplace` - gets plugin
- `getMarketplaceManifest` - gets manifest
- `cacheMarketplaceManifest` - caches manifest
- (Marketplace management functions)
