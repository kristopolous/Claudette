## Purpose
Provides a tabbed settings interface for configuring sandbox mode, overrides, dependencies, and config options.

## Imports
- **Stdlib**: None
- **External**: REACT, REACT_COMPILER
- **Internal**: `ink`, `keybindings/useKeybinding`, `types/command`, `utils/sandbox/sandbox-adapter`, `utils/settings/settings`, `CustomSelect/select`, `design-system/Pane`, `design-system/Tabs`, `SandboxConfigTab`, `SandboxDependenciesTab`, `SandboxOverridesTab`

## Logic
1. Determines current sandbox mode (auto-allow, regular, or disabled) from SandboxManager state
2. Builds a select options list with current mode indicators
3. Renders tabs for Mode, Overrides, Dependencies (conditionally if errors/warnings exist), and Config
4. Handles mode selection by calling SandboxManager.setSandboxSettings with appropriate flags
5. Displays unix socket warnings when dependency checks have warnings and allowAllUnixSockets is false

## Exports
- `SandboxSettings` - Renders the main sandbox settings UI with tabbed configuration panels
