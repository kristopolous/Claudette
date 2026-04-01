# utils/plugins/pluginLoader

## Purpose
Discovers, loads, and validates Claudette plugins from marketplaces and git repositories.

## Imports
- **Stdlib**: `fs/promises`, `path`
- **External**: `lodash-es/memoize`
- **Internal**: bootstrap state, plugins builtinPlugins, plugin types, debug, envUtils, errors, execFileNoThrow, file, fsOperations, git, lazySchema, log, settings settings, plugins cacheUtils/fetchTelemetry/installedPluginsManager/marketplaceManager/pluginDirectories/pluginIdentifier/pluginOptionsStorage/schemas/walkPluginMarkdown

## Logic
1. Plugin discovery sources: marketplace-based plugins, session-only plugins (--plugin-dir CLI flag)
2. NPM packages supported but must be referenced through marketplaces
3. Plugin structure: plugin.json (manifest), commands/, agents/, hooks/
4. Handles manifest validation, hooks configuration, duplicate detection, enable/disable state
5. `loadAllPluginsCacheOnly` - loads all plugins from cache
6. `loadAllPlugins` - loads all plugins with full validation
7. `loadPluginFromMarketplace` - loads plugin from marketplace
8. `loadPluginFromGit` - loads plugin from git repository
9. `loadPluginManifest` - loads and validates plugin manifest
10. `validatePluginManifest` - validates manifest structure
11. `getPluginCachePath` - gets plugin cache path
12. `getVersionedCachePath` - gets versioned cache path
13. `clearPluginCache` - clears plugin cache
14. `clonePluginFromGit` - clones plugin from git
15. `extractPluginFromZip` - extracts plugin from zip
16. `walkPluginMarkdown` - walks plugin markdown files
17. `loadPluginCommands` - loads plugin commands
18. `loadPluginAgents` - loads plugin agents
19. `loadPluginHooks` - loads plugin hooks
20. `loadPluginOutputStyles` - loads plugin output styles
21. `getPluginById` - gets plugin by ID
22. `getPluginByName` - gets plugin by name
23. `getEnabledPlugins` - gets enabled plugins
24. `getDisabledPlugins` - gets disabled plugins
25. `isPluginEnabled` - checks if plugin enabled

## Exports
- `loadAllPluginsCacheOnly` - loads cached plugins
- `loadAllPlugins` - loads all plugins
- `loadPluginFromMarketplace` - loads from marketplace
- `loadPluginFromGit` - loads from git
- `loadPluginManifest` - loads manifest
- `validatePluginManifest` - validates manifest
- `getPluginCachePath` - gets cache path
- `getVersionedCachePath` - gets versioned path
- `clearPluginCache` - clears cache
- `clonePluginFromGit` - clones from git
- `extractPluginFromZip` - extracts from zip
- `walkPluginMarkdown` - walks markdown files
- `loadPluginCommands` - loads commands
- `loadPluginAgents` - loads agents
- `loadPluginHooks` - loads hooks
- `loadPluginOutputStyles` - loads output styles
- `getPluginById` - gets plugin by ID
- `getPluginByName` - gets plugin by name
- `getEnabledPlugins` - gets enabled plugins
- `getDisabledPlugins` - gets disabled plugins
- `isPluginEnabled` - checks if enabled
