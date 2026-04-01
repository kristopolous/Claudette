## Purpose
Browse plugins from a specific marketplace for installation.

## Imports
- **External**: React, figures
- **Internal**: Marketplace helpers, plugin installation, pagination, trust warnings

## Logic
Similar to DiscoverPlugins but scoped to a single marketplace. Shows plugins available from target marketplace with:
- Install counts for popularity sorting
- Multi-scope installation (user/project/local)
- Plugin details view
- Bulk selection and installation
- Trust warnings before install

Supports pagination and filtering. Navigates to PluginOptionsFlow after successful install if config needed.

## Exports
- `BrowseMarketplace` - Component for browsing a specific marketplace
