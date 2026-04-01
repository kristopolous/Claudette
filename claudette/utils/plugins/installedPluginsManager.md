# utils/plugins/installedPluginsManager

## Purpose
Manages plugin installation metadata stored in installed_plugins.json.

## Imports
- **Stdlib**: `path`
- **External**: (none)
- **Internal**: debug, errors, fsOperations, log, JSON utils, pluginDirectories, schemas, bootstrap state, cwd, git gitFilesystem, settings constants/settings, marketplaceManager, pluginIdentifier, pluginLoader

## Logic
1. Separates plugin installation state (global) from enabled/disabled state (per-repository)
2. installed_plugins.json tracks: installed plugins globally, installation metadata (version, timestamps, paths)
3. Enabled/disabled state remains in .claude/settings.json for per-repo control
4. `PersistableScope` - excludes 'flag' (session-only)
5. `migrationCompleted` - prevents running migration multiple times per session
6. `installedPluginsCacheV2` - memoized cache of installed plugins (V2 format)
7. `inMemoryInstalledPlugins` - session-level snapshot at startup
8. `getInstalledPluginsFilePath` - gets installed_plugins.json path
9. `loadInstalledPluginsFromDisk` - loads installed plugins from disk
10. `saveInstalledPluginsToDisk` - saves installed plugins to disk
11. `addInstalledPlugin` - adds plugin to installed list
12. `removeInstalledPlugin` - removes plugin from installed list
13. `getInstalledPlugin` - gets installed plugin by ID
14. `getInstalledPlugins` - gets all installed plugins
15. `clearInstalledPluginsCache` - clears installed plugins cache
16. `migrateInstalledPluginsFile` - migrates from V1 to V2 format
17. `getPluginInstallationEntry` - gets plugin installation entry
18. `isPluginInstalled` - checks if plugin installed

## Exports
- `PersistableScope` - persistable scope type
- `getInstalledPluginsFilePath` - gets installed plugins file path
- `loadInstalledPluginsFromDisk` - loads from disk
- `saveInstalledPluginsToDisk` - saves to disk
- `addInstalledPlugin` - adds plugin
- `removeInstalledPlugin` - removes plugin
- `getInstalledPlugin` - gets plugin
- `getInstalledPlugins` - gets all plugins
- `clearInstalledPluginsCache` - clears cache
- `migrateInstalledPluginsFile` - migrates file
- `getPluginInstallationEntry` - gets installation entry
- `isPluginInstalled` - checks if installed
