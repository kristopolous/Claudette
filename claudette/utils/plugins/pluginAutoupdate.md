# utils/plugins/pluginAutoupdate

## Purpose
Provides background plugin autoupdate functionality.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: services pluginOperations, config, debug, errors, log, plugins installedPluginsManager/marketplaceManager/pluginIdentifier/schemas

## Logic
1. At startup: updates marketplaces with autoUpdate enabled, then checks installed plugins
2. Updates are non-inplace (disk-only), requiring restart to take effect
3. Official Anthropic marketplaces have autoUpdate enabled by default
4. `PluginAutoUpdateCallback` - callback type for update notifications
5. `pluginUpdateCallback` - stored callback for notifications
6. `pendingNotification` - stores pending updates before callback registered
7. `onPluginsAutoUpdated` - registers callback for auto-update notifications
8. Invokes immediately if updates completed before registration
9. Returns unregister function
10. `getAutoUpdatedPluginNames` - gets plugin names with pending updates
11. `runPluginAutoupdateInBackground` - runs autoupdate in background
12. `shouldRunPluginAutoupdate` - checks if autoupdate should run
13. `hasPendingAutoupdateUpdates` - checks if pending autoupdate updates
14. `getPendingAutoupdateUpdates` - gets pending autoupdate updates
15. `updatePluginOp` - updates plugin operation
16. `shouldSkipPluginAutoupdate` - checks if autoupdate should be skipped
17. `getPendingUpdatesDetails`, `hasPendingUpdates` - pending update functions
18. `isInstallationRelevantToCurrentProject` - checks installation relevance
19. `loadInstalledPluginsFromDisk` - loads installed plugins
20. `getDeclaredMarketplaces`, `loadKnownMarketplacesConfig` - marketplace functions
21. `refreshMarketplace` - refreshes marketplace
22. `parsePluginIdentifier` - parses plugin identifier
23. `isMarketplaceAutoUpdate` - checks marketplace auto-update
24. `PluginScope` - plugin scope type

## Exports
- `PluginAutoUpdateCallback` - callback type
- `onPluginsAutoUpdated` - registers callback
- `getAutoUpdatedPluginNames` - gets updated plugin names
- `runPluginAutoupdateInBackground` - runs autoupdate
- `shouldRunPluginAutoupdate` - checks if should run
- `hasPendingAutoupdateUpdates` - checks pending updates
- `getPendingAutoupdateUpdates` - gets pending updates
- (Autoupdate functions)
