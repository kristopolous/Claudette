## Purpose
Displays a dialog for importing MCP servers from Claudette Desktop into the current configuration.

## Imports
- **Stdlib**: none
- **External**: `react` (useCallback, useEffect, useState), `react/compiler-runtime`
- **Internal**: `gracefulShutdown` (utils/gracefulShutdown), `writeToStdout` (utils/process), `Box`, `color`, `Text`, `useTheme` (ink), `addMcpConfig`, `getAllMcpConfigs` (services/mcp/config), `ConfigScope`, `McpServerConfig`, `ScopedMcpServerConfig` (services/mcp/types), `plural` (utils/stringUtils), `ConfigurableShortcutHint`, `SelectMulti` (CustomSelect), `Byline`, `Dialog`, `KeyboardShortcutHint` (design-system)

## Logic
On mount, fetches existing MCP configurations to detect name collisions. Presents a multi-select dialog listing servers from Claudette Desktop with collision indicators. On submit, imports selected servers, auto-renaming collisions with numbered suffixes. Displays a success message with the import count and triggers graceful shutdown. Handles cancel by exiting without changes.

## Exports
- `MCPServerDesktopImportDialog` - renders the MCP server import dialog with multi-select and collision handling
