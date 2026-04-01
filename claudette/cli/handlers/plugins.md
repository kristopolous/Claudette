# plugins

## Purpose
Implements plugin and marketplace subcommand handlers for installation, validation, and management.

## Imports
- **Stdlib**: `path`
- **External**: `figures`
- **Internal**: bootstrap state, analytics, plugin services, types, error/log utils, plugin cache/installCounts/installedPlugins/marketplace/pluginLoader/validation utils, exit helpers, string utils

## Logic
1. `handleMarketplaceError` - standardized error handler for marketplace commands
2. `printValidationResult` - prints plugin manifest validation errors/warnings
3. Re-exports VALID_INSTALLABLE_SCOPES and VALID_UPDATE_SCOPES
4. Supports plugin install/uninstall/update/disable/enable operations
5. Marketplace source management (add/remove/refresh)
6. Plugin MCP server integration loading
7. Install counts tracking
8. Cache management for plugin operations

## Exports
- `handleMarketplaceError` - logs and exits with marketplace error message
- `printValidationResult` - prints validation errors/warnings with figures
- `VALID_INSTALLABLE_SCOPES`, `VALID_UPDATE_SCOPES` - valid scope constants
- (Additional plugin handler functions for various subcommands)
