# pluginStartupCheck

## Purpose
Checks for enabled plugins across all settings sources (including --add-dir), manages plugin installation, and tracks editable scopes for plugin enable/disable operations.

## Imports
- **Stdlib**: path
- **Internal**: ../cwd, ../debug, ../log, ../settings/settings, ./addDirPluginSettings, ./installedPluginsManager, ./marketplaceManager, ./pluginIdentifier, ./pluginInstallationHelpers, ./schemas

## Logic
1. `checkEnabledPlugins()` uses `getInitialSettings()` to merge all sources (policy > local > project > user), then layers --add-dir plugins underneath as lowest priority. Explicitly disabled plugins are removed even if --add-dir enabled them.
2. `getPluginEditableScopes()` determines the user-editable scope that "owns" each enabled plugin, processing sources from lowest to highest precedence (addDir → managed → user → project → local → flag). Used for scope tracking, NOT for authoritative "is enabled" checks.
3. `getInstalledPlugins()` reads from installed_plugins.json (V2 format), triggers V1→V2 migration in background without blocking startup.
4. `findMissingPlugins()` filters enabled plugins against installed ones, then verifies each missing plugin exists in a marketplace via `getPluginById()`.
5. `installSelectedPlugins()` iterates plugins, caches/registers external plugins or registers local plugins, marks them enabled in the correct settings source, and returns install/failed results.

## Exports
- `checkEnabledPlugins` - Returns array of enabled plugin IDs across all settings sources, with --add-dir as lowest priority
- `getPluginEditableScopes` - Returns Map of plugin ID to user-editable scope (used for write-back when enabling/disabling)
- `isPersistableScope` - Type guard: returns true if scope should be persisted to installed_plugins.json (not 'flag')
- `settingSourceToScope` - Converts a SettingSource to its corresponding ExtendedPluginScope
- `getInstalledPlugins` - Returns array of installed plugin IDs from installed_plugins.json (triggers V1→V2 migration)
- `findMissingPlugins` - Returns array of enabled-but-not-installed plugin IDs that exist in a marketplace
- `PluginInstallResult` - Type: `{ installed: string[], failed: Array<{ name: string, error: string }> }`
- `installSelectedPlugins` - Installs plugins, caches/registers them, enables in settings, returns PluginInstallResult

## Source
`pluginStartupCheck`