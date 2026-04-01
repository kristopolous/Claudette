## Purpose
Shared helper functions and types for plugin details screens.

## Imports
- **External**: React
- **Internal**: ConfigurableShortcutHint, Byline, Box, Text

## Logic
Provides utilities used by both DiscoverPlugins and BrowseMarketplace:
- `InstallablePlugin` type - represents installable plugin entry
- `PluginDetailsMenuOption` type - menu option structure
- `extractGitHubRepo` - extracts repo from plugin source
- `buildPluginDetailsMenuOptions` - builds install/homepage/GitHub/back menu
- `PluginSelectionKeyHint` - renders keyboard shortcuts for plugin list

Keeps menu construction consistent across views.

## Exports
- `InstallablePlugin` - Type for plugins available to install
- `PluginDetailsMenuOption` - Type for menu options
- `extractGitHubRepo` - Extract GitHub repository from plugin source
- `buildPluginDetailsMenuOptions` - Build menu options array
- `PluginSelectionKeyHint` - Keyboard shortcuts hint component
