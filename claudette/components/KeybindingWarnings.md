## Purpose
Displays keybinding configuration validation warnings and errors in the UI.

## Imports
- **Stdlib**: none
- **External**: REACT, REACT_COMPILER
- **Internal**: `Box`, `Text` (ink), `getCachedKeybindingWarnings`, `getKeybindingsPath`, `isKeybindingCustomizationEnabled` (keybindings/loadUserBindings)

## Logic
Only renders when keybinding customization is enabled. Retrieves cached warnings, separates them into errors and warnings by severity, and displays them with the configuration file location. Returns null if customization is disabled or there are no warnings.

## Exports
- `KeybindingWarnings` - renders keybinding configuration issues with error/warning severity indicators and suggestions
