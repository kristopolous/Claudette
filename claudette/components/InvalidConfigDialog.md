## Purpose
Displays an error dialog when the configuration file contains invalid JSON, offering the user options to exit or reset to defaults.

## Imports
- **Stdlib**: none
- **External**: `react`
- **Internal**: `Box`, `render`, `Text`, `KeybindingSetup`, `AppStateProvider`, `ConfigParseError`, `getBaseRenderOptions`, `jsonStringify`, `writeFileSync_DEPRECATED`, `Select`, `Dialog`

## Logic
Shows the file path and error description in an error-themed dialog. Presents two options: exit to fix manually or reset with default configuration. On reset, writes the default config to the file path using atomic file operations. Renders as a standalone Ink application with its own app state and keybinding providers, using a hardcoded dark theme to avoid circular dependencies with the broken config.

## Exports
- `showInvalidConfigDialog` - async function that renders the invalid config dialog as a standalone Ink app and exits or resets based on user selection
