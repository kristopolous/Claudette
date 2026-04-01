## Purpose
Main view for managing installed plugins across all marketplaces and scopes.

## Imports
- **External**: React, figures
- **Internal**: Many - plugin operations, UI components, state management, utilities

## Logic
Displays a unified list of all installed plugins grouped by scope (builtin, user, project, local, flagged, etc.) with their child MCP servers. Supports:
- Searching/filtering plugins
- Toggle enable/disable
- View details, configure options
- Uninstall with dependency warnings
- Handles failed plugin loads and flagged (delisted) plugins

Uses sophisticated merging logic to show plugins with their associated MCP servers and proper scope ordering.

## Exports
- `ManagePlugins` - Main component rendering the installed plugins list
- `filterManagedDisabledPlugins` - Helper to filter plugins blocked by org policy
- `UnifiedInstalledCell` - Cell component for individual plugin/MCP item
