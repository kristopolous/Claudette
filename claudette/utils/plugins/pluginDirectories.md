# utils/plugins/pluginDirectories

## Purpose
Provides centralized plugin directory configuration.

## Imports
- **Stdlib**: `fs`, `fs/promises`, `path`
- **External**: (none)
- **Internal**: bootstrap state, debug, envUtils, errors, format, permissions pathValidation

## Logic
1. `PLUGINS_DIR` - 'plugins'
2. `COWORK_PLUGINS_DIR` - 'cowork_plugins'
3. Supports switching via --cowork CLI flag or CLAUDE_CODE_USE_COWORK_PLUGINS env var
4. Base directory can be overridden via CLAUDE_CODE_PLUGIN_CACHE_DIR
5. `getPluginsDirectoryName` - gets directory name based on mode
6. Priority: session state (--cowork flag) > env var > default 'plugins'
7. `getPluginsDirectory` - gets full path to plugins directory
8. Priority: CLAUDE_CODE_PLUGIN_CACHE_DIR env var > default
9. expandTilde handles ~ in env var (settings.json env doesn't expand shell ~)
10. `getPluginSeedDirs` - gets read-only plugin seed directories
11. Customers can pre-bake plugins directory into container image
12. CLAUDE_CODE_PLUGIN_SEED_DIR points to read-only fallback layer
13. Multiple seed directories layered with platform path delimiter (':' on Unix, ';' on Windows)
14. Seed structure mirrors primary plugins directory
15. `clearPluginSeedCache` - clears plugin seed cache
16. `isPluginZipCacheEnabled` - checks if zip cache enabled
17. `getPluginZipCachePath` - gets zip cache path

## Exports
- `PLUGINS_DIR` - plugins directory constant
- `COWORK_PLUGINS_DIR` - cowork plugins directory constant
- `getPluginsDirectoryName` - gets directory name
- `getPluginsDirectory` - gets plugins directory path
- `getPluginSeedDirs` - gets seed directories
- `clearPluginSeedCache` - clears seed cache
- `isPluginZipCacheEnabled` - checks zip cache enabled
- `getPluginZipCachePath` - gets zip cache path
