## Purpose
Render a single row in the unified installed plugins list.

## Imports
- **External**: React, figures, color, useTheme
- **Internal**: plural utility, UnifiedInstalledItem type

## Logic
Displays a plugin, flagged plugin, failed plugin, or MCP server with appropriate:
- Selection indicator (pointer)
- Status icon (tick/cross/warning depending on type)
- Name, marketplace, scope tag
- Status text (enabled/disabled/errors/connected/etc.)
- Indentation for child MCP servers under plugins

Handles four item types with distinct visual treatments. Uses theme colors for status indicators.

## Exports
- `UnifiedInstalledCell` - Component rendering a single installed item row
