## Purpose
Provides a model selection interface that lets users choose between available inference provider models and configure effort levels.

## Imports
- **Stdlib**: none
- **External**: REACT (useCallback, useMemo, useState), REACT_COMPILER, `lodash-es/capitalize`
- **Internal**: `hooks/useExitOnCtrlCDWithKeybindings`, `services/analytics` (logEvent), `utils/fastMode` (FAST_MODE_MODEL_DISPLAY, isFastModeAvailable, isFastModeCooldown, isFastModeEnabled), `ink` (Box, Text), `keybindings/useKeybinding`, `state/AppState` (useAppState, useSetAppState), `utils/effort` (convertEffortValueToLevel, getDefaultEffortForModel, modelSupportsEffort, modelSupportsMaxEffort, resolvePickerEffortPersistence, toPersistableEffort), `utils/model/model` (getDefaultMainLoopModel, modelDisplayString, parseUserSpecifiedModel), `utils/model/modelOptions` (getModelOptions), `utils/settings/settings` (getSettingsForSource, updateSettingsForSource), `components/ConfigurableShortcutHint`, `components/CustomSelect` (Select), `components/design-system/Byline`, `components/design-system/KeyboardShortcutHint`, `components/design-system/Pane`, `components/EffortIndicator` (effortLevelToSymbol)

## Logic
1. Builds a list of available model options based on fast mode state, including the current model if not already present
2. Manages focused model state and computes effort support (whether the focused model supports effort levels and max effort)
3. Provides effort cycling via left/right keybindings with wraparound through low/medium/high/max levels
4. On selection, resolves the model, persists effort settings to user settings (unless skipped), and updates app state
5. Displays effort indicators, fast mode notices, session model warnings, and a selectable list with hidden count indication
6. Wraps content in a Pane when used as a standalone command

## Exports
- `ModelPicker` - renders an interactive model selection UI with effort level configuration
- `Props` - type definition for ModelPicker component props
