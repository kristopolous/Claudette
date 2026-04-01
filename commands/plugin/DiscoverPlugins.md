## Purpose
Discover and install plugins from all configured marketplaces.

## Imports
- **External**: React, figures, SearchBox
- **Internal**: Plugin installation, marketplace helpers, search, pagination

## Logic
Aggregates plugins from all configured marketplaces, filtering out:
- Already installed plugins
- Policy-blocked plugins

Sorts by install count (descending) when available, else alphabetically. Supports:
- Real-time search filtering
- Bulk selection/installation
- Single plugin install from details view
- Multi-scope installation options

Shows empty state messages based on failure reasons (no marketplaces, all installed, policy restrictions, etc.).

## Exports
- `DiscoverPlugins` - Main discovery component
- `EmptyStateMessage` - Context-aware empty state renderer
- `DiscoverPluginsKeyHint` - Keyboard shortcuts hint component
