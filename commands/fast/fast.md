## Purpose
Toggles Fast Mode (research preview using Opus46 model) with interactive picker or shortcut arguments.

## Imports
- **External**: `react`, `chalk`
- **Internal**: Many: `CommandResultDisplay`, `LocalJSXCommandContext`, `Dialog`, `FastIcon`, `Box`, `Link`, `Text`, `useKeybindings`, `logEvent`, `useAppState`, `useSetAppState`, fastMode utils (`clearFastModeCooldown`, `getFastModeModel`, etc.), `formatDuration`, `formatModelPricing`, `getOpus46CostTier`, `updateSettingsForSource`

## Logic
Provides a command to enable/disable Fast Mode. `applyFastMode` updates global settings and app state, switching model if needed. `FastModePicker` component renders a dialog with toggle, pricing info, cooldown status, and unavailability reasons. `handleFastModeShortcut` processes 'on'/'off' arguments for quick toggling. `call` checks feature flag, prefetches status, shows picker or executes shortcut. The command is gated by `isFastModeEnabled()`.

## Exports
- `call` - Main JSX command function
- `FastModePicker` - React component for the toggle dialog
- Internal: `applyFastMode`, `handleFastModeShortcut`
