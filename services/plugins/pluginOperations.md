# plugins/pluginOperations

## Purpose
Provides core plugin operations (install, uninstall, enable, disable, update) as pure library functions.

## Imports
- **Stdlib**: `path`
- **External**: (none)
- **Internal**: bootstrap state, builtinPlugins, plugin types, errors, fsOperations, log, plugins cache/dependencyResolver/installedPluginsManager/marketplaceManager/pluginDirectories/pluginIdentifier/pluginInstallationHelpers/pluginLoader/pluginOptionsStorage/pluginPolicy/pluginStartupCheck/pluginVersioning, schemas, settings, stringUtils

## Logic
1. Pure library functions - NO process.exit(), NO console output
2. Return result objects indicating success/failure with messages
3. Can throw errors for unexpected failures
4. `VALID_INSTALLABLE_SCOPES` - user, project, local (excludes managed)
5. `VALID_UPDATE_SCOPES` - includes managed for updates
6. `installPluginOp` - installs plugin to specified scope
7. `uninstallPluginOp` - removes plugin installation
8. `enablePluginOp` - enables plugin in settings
9. `disablePluginOp` - disables plugin in settings
10. `disableAllPluginsOp` - disables all plugins
11. `updatePluginOp` - updates plugin to latest version
12. Handles dependency resolution via findReverseDependents
13. Marks orphaned versions, clears caches on changes
14. Checks plugin policy restrictions

## Exports
- `VALID_INSTALLABLE_SCOPES`, `VALID_UPDATE_SCOPES` - valid scope constants
- `installPluginOp` - install plugin operation
- `uninstallPluginOp` - uninstall plugin operation
- `enablePluginOp` - enable plugin operation
- `disablePluginOp` - disable plugin operation
- `disableAllPluginsOp` - disable all plugins operation
- `updatePluginOp` - update plugin operation
