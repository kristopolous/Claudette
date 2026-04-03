## Purpose
Provides a searchable, navigable settings panel for configuring all application options including models, themes, permissions, notifications, editor mode, and more.

## Imports
- **Stdlib**: none
- **External**: BUILDFLAGS, `figures`, `chalk`, REACT, REACT_COMPILER
- **Internal**: `ink`, `ink/events/keyboard-event`, `keybindings/useKeybinding`, `utils/config`, `utils/authPortable`, `utils/permissions/PermissionMode`, `utils/permissions/permissionSetup`, `utils/log`, `services/analytics/index`, `bridge/bridgeEnabled`, `components/ThemePicker`, `state/AppState`, `components/ModelPicker`, `utils/model/model`, `utils/extraUsage`, `components/ClaudeMdExternalIncludesDialog`, `components/ChannelDowngradeDialog`, `components/design-system/Dialog`, `components/CustomSelect/index`, `components/OutputStylePicker`, `components/LanguagePicker`, `utils/claudemd`, `components/design-system/KeyboardShortcutHint`, `components/ConfigurableShortcutHint`, `components/design-system/Byline`, `components/design-system/Tabs`, `context/modalContext`, `components/SearchBox`, `utils/ide`, `utils/settings/settings`, `bootstrap/state`, `constants/outputStyles`, `utils/envUtils`, `commands`, `services/analytics/growthbook`, `utils/agentSwarmsEnabled`, `utils/swarm/backends/teammateModeSnapshot`, `utils/swarm/teammateModel`, `hooks/useSearchInput`, `hooks/useTerminalSize`, `utils/fastMode`, `utils/fullscreen`

## Logic
Maintains a list of settings items (boolean toggles, enum selectors, managed enum submenus) sourced from global config, user settings, local settings, and app state. Supports search filtering by setting ID, label, or searchText. Handles keyboard navigation (up/down for selection, left/right/tab to cycle enum values, Enter to toggle, printable characters to enter search mode). Each setting change is tracked for the save summary. Submenus open for theme, model, output style, language, external includes, channel downgrade, and auto-update enable dialogs. Escape reverts all changes to mount-time snapshots and closes; Enter persists changes and closes with a summary.

## Exports
- `Config` - UI component that renders the searchable settings panel with navigation, toggles, and submenus for all configurable options
