## Purpose
Provides an interactive theme selection interface with live preview, syntax highlighting toggle, and keyboard shortcuts.

## Imports
- **Stdlib**: none
- **External**: `react`, `react/compiler-runtime`, `bun:bundle`
- **Internal**: `hooks/useExitOnCtrlCDWithKeybindings`, `hooks/useTerminalSize`, `ink`, `keybindings/KeybindingContext`, `keybindings/useKeybinding`, `keybindings/useShortcutDisplay`, `state/AppState`, `utils/gracefulShutdown`, `utils/settings/settings`, `utils/theme`, `components/CustomSelect/index`, `components/design-system/Byline`, `components/design-system/KeyboardShortcutHint`, `components/StructuredDiff/colorDiff`, `components/StructuredDiff`

## Logic
1. Manages theme preview state with ability to save or cancel changes
2. Supports toggling syntax highlighting via keybinding with state persistence
3. Builds a list of theme options including auto, dark, light, colorblind-friendly, and ANSI-only variants
4. Renders a live diff preview to demonstrate the selected theme's appearance
5. Displays syntax highlighting status with environment variable info and toggle shortcut
6. Handles exit flow on cancel, either calling a custom onCancel callback or initiating graceful shutdown
7. Conditionally shows intro text, help text, and keyboard shortcut hints based on props

## Exports
- `ThemePicker` - renders an interactive theme picker with live preview and syntax highlighting controls
- `ThemePickerProps` - type definition for the theme picker component props
