## Purpose
Provides a read-only multi-level menu for browsing configured hooks by event, matcher, and individual hook details.

## Imports
- **Stdlib**: none
- **External**: REACT, REACT/compiler-runtime
- **Internal**: entrypoints/agentSdkTypes, state/AppState, commands, hooks/useSettingsChange, ink, keybindings/useKeybinding, utils/hooks/hooksConfigManager, utils/hooks/hooksSettings, utils/settings/settings, utils/stringUtils, components/design-system/Dialog, components/hooks/SelectEventMode, components/hooks/SelectHookMode, components/hooks/SelectMatcherMode, components/hooks/ViewHookMode

## Logic
1. Maintains a mode state machine with four modes: select-event, select-matcher, select-hook, view-hook
2. Tracks policy-based hook restrictions and disabled state from settings
3. Groups hooks by event and matcher, computing sorted matchers and hooks for the current selection
4. Registers back-navigation keybindings for each mode level
5. Renders the appropriate sub-component based on current mode, passing derived data as props
6. Shows a disabled state screen when hooks are globally disabled, with explanatory text

## Exports
- `HooksConfigMenu` - orchestrates the read-only hooks browsing experience across four navigation modes
