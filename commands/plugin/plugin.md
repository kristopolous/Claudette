## Purpose
Main plugin management UI component with tabbed interface for Discover, Installed, Marketplaces, and Errors.

## Imports
- **External**: React, figures
- **Internal**: Multiple plugin subcomponents, type definitions, and utility functions from across the project

## Logic
Orchestrates a tabbed interface with four main sections:
- Discover: Browse and install new plugins from all marketplaces
- Installed: Manage installed plugins (enable/disable/uninstall)
- Marketplaces: Manage marketplace sources (add/remove/update)
- Errors: Display and resolve plugin-related errors

Routes commands to appropriate subviews using view state machine. Handles argument parsing, tab navigation, and child search mode coordination.

## Exports
- `PluginSettings` - Main component that renders the plugin management UI
