# plugins/PluginInstallationManager

## Purpose
Handles background plugin and marketplace installation from trusted sources without blocking startup.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: AppState, debug, diagLogs, log, plugins marketplaceManager/pluginLoader/reconciler/refresh, analytics

## Logic
1. `updateMarketplaceStatus` - updates marketplace installation status in app state
2. Status transitions: pending → installing → installed/failed
3. `performBackgroundPluginInstallations` - main entry point for background installation
4. Computes diff upfront (declared vs materialized marketplaces)
5. Initializes AppState with pending status for UI spinners
6. Calls reconcileMarketplaces with onProgress callback
7. New installs trigger auto-refresh plugins (fixes plugin-not-found errors)
8. Updates-only set needsRefresh, show /reload-plugins notification
9. Clears marketplace and plugin caches before reconciliation
10. Logs events for analytics tracking
11. Handles errors gracefully without blocking startup

## Exports
- `updateMarketplaceStatus` - updates marketplace status in app state
- `performBackgroundPluginInstallations` - performs background plugin installations
