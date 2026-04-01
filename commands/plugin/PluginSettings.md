## Purpose
Plugin settings UI with tabs: Discover, Installed, Marketplaces, Errors.

## Imports
- **External**: React, figures, Tabs, Pane
- **Internal**: All plugin subcomponents, argument parser, error handling

## Logic
Top-level container for all plugin functionality. Maintains:
- Active tab state
- View states for nested screens (browse, details, add, etc.)
- Input value for add marketplace
- Error/result messages
- Child search mode coordination

Routes parsed commands to initial views. Coordinates between tabs and handles escape/exit logic. The heart of the plugin system UI.

## Exports
- `PluginSettings` - Main component that renders the tabbed interface
